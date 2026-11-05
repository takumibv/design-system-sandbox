// @primer/mcp を stdio で起動し、@modelcontextprotocol/sdk の Client からツールを呼ぶ小さなスクリプト。
// このセッションの MCP 設定に後から @primer/mcp を追加できないため、この方法で呼び出した。
// 使い方:
//   node harness/mcp-call.mjs list                      → ツール一覧を harness-logs/00-list-tools.json に保存
//   node harness/mcp-call.mjs call <tool> '<json args>' [logname]
// 出力は harness-logs/<logname>.md（テキスト）として保存し、標準出力にも出す。
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logs = join(root, "harness-logs");
mkdirSync(logs, { recursive: true });

const transport = new StdioClientTransport({
	// 当初は公式 README どおり `npx @primer/mcp@latest` で起動したが、npx の解決が遅く
	// SDK の既定 60 秒タイムアウトに引っかかったため、devDependencies に入れた同じ版（1.1.2）の bin を直接起動する。
	command: "node",
	args: [join(root, "node_modules/@primer/mcp/bin/mcp.js")],
	cwd: root,
	// サーバー内部の fetch（primer.style からガイドラインを取る）がプロキシを通らず "fetch failed" になったため、
	// Node 22 の NODE_USE_ENV_PROXY=1 で HTTPS_PROXY を使わせる。
	env: { ...process.env, NODE_USE_ENV_PROXY: "1" },
	stderr: "pipe",
});
const client = new Client({ name: "primer-ct-goal-harness", version: "0.0.1" });
await client.connect(transport);

const [cmd, tool, rawArgs, logName] = process.argv.slice(2);
const stamp = new Date().toISOString();
if (cmd === "list") {
	const tools = await client.listTools();
	writeFileSync(join(logs, "00-list-tools.json"), JSON.stringify(tools, null, 2));
	for (const t of tools.tools) console.log(`${t.name}\t${(t.description ?? "").split("\n")[0]}`);
	try {
		const prompts = await client.listPrompts();
		writeFileSync(join(logs, "00-list-prompts.json"), JSON.stringify(prompts, null, 2));
	} catch (e) {
		console.log("listPrompts:", e.message);
	}
	try {
		const resources = await client.listResources();
		writeFileSync(join(logs, "00-list-resources.json"), JSON.stringify(resources, null, 2));
	} catch (e) {
		console.log("listResources:", e.message);
	}
} else if (cmd === "call") {
	const args = rawArgs ? JSON.parse(rawArgs) : {};
	const result = await client.callTool({ name: tool, arguments: args });
	const text = (result.content ?? []).map((c) => (c.type === "text" ? c.text : JSON.stringify(c))).join("\n\n");
	const name = logName ?? `${tool}${args && Object.keys(args).length ? "-" + Object.values(args).join("-").replace(/[^a-zA-Z0-9-]/g, "").slice(0, 40) : ""}`;
	writeFileSync(
		join(logs, `${name}.md`),
		`<!-- tool: ${tool} / args: ${JSON.stringify(args)} / at: ${stamp} / isError: ${!!result.isError} -->\n\n${text}\n`,
	);
	appendFileSync(join(logs, "calls.log"), `${stamp}\t${tool}\t${JSON.stringify(args)}\t-> ${name}.md (${text.length} chars)\n`);
	console.log(text);
}
await client.close();
