// ADS MCP を @modelcontextprotocol/sdk の Client で呼び、結果を harness-logs/mcp/ に保存する小さなスクリプト。
// まずホスト版（HTTP）に接続し、失敗したらローカルの stdio 版（node_modules/.bin/ads-mcp）に切り替える。
// 使い方:
//   node harness-logs/mcp-client.mjs list                         … ツール一覧を保存
//   node harness-logs/mcp-client.mjs call <保存名> <tool> '<json>' … 1 回呼んで保存
//   node harness-logs/mcp-client.mjs batch <plan.json>             … [{name, tool, args}] をまとめて呼ぶ
//   環境変数 ADS_MCP=local でローカル版を強制
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "mcp");
mkdirSync(outDir, { recursive: true });
const REMOTE = "https://mcp.atlassian.com/v1/ads/public/mcp";

async function connect() {
	if (process.env.ADS_MCP !== "local") {
		try {
			const client = new Client({ name: "ct-schedule-harness-probe", version: "0.0.1" });
			await client.connect(new StreamableHTTPClientTransport(new URL(REMOTE)));
			return { client, transport: `remote ${REMOTE}` };
		} catch (error) {
			console.error(`remote failed: ${error?.message ?? error}`);
		}
	}
	const client = new Client({ name: "ct-schedule-harness-probe", version: "0.0.1" });
	await client.connect(new StdioClientTransport({ command: join(here, "..", "node_modules", ".bin", "ads-mcp"), args: [], stderr: "ignore" }));
	return { client, transport: "local stdio node_modules/.bin/ads-mcp" };
}

const save = (name, transport, request, result) => {
	const text = (result.content ?? []).map((c) => (c.type === "text" ? c.text : JSON.stringify(c))).join("\n");
	writeFileSync(join(outDir, `${name}.md`), `<!-- transport: ${transport} -->\n<!-- request: ${JSON.stringify(request)} -->\n${result.isError ? "<!-- isError: true -->\n" : ""}\n${text}\n`);
	console.log(`${name}: ${text.length} chars${result.isError ? " (isError)" : ""}`);
};

const [cmd, ...rest] = process.argv.slice(2);
const { client, transport } = await connect();
console.log(`connected: ${transport}`);
try {
	if (cmd === "list") {
		const tools = await client.listTools();
		writeFileSync(join(outDir, "00-tools.json"), JSON.stringify({ transport, server: client.getServerVersion(), instructions: client.getInstructions(), tools: tools.tools }, null, 2));
		for (const t of tools.tools) console.log(`- ${t.name}: ${(t.description ?? "").split("\n")[0].slice(0, 140)}`);
	} else if (cmd === "call") {
		const [name, tool, json] = rest;
		const args = json ? JSON.parse(json) : {};
		save(name, transport, { tool, args }, await client.callTool({ name: tool, arguments: args }));
	} else if (cmd === "batch") {
		const plan = JSON.parse(readFileSync(rest[0], "utf8"));
		for (const { name, tool, args } of plan) {
			try {
				save(name, transport, { tool, args }, await client.callTool({ name: tool, arguments: args ?? {} }));
			} catch (error) {
				writeFileSync(join(outDir, `${name}.md`), `<!-- transport: ${transport} -->\n<!-- request: ${JSON.stringify({ tool, args })} -->\nERROR: ${error?.message ?? error}\n`);
				console.log(`${name}: ERROR ${error?.message ?? error}`);
			}
		}
	}
} finally {
	await client.close();
}
