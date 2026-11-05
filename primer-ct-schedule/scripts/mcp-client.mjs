// @primer/mcp（stdio）に MCP クライアントとして接続し、ツールを呼んで出力を harness-logs/ に保存する。
// このセッションの MCP 設定に @primer/mcp を追加できなかったための代替手段。
//
// 使い方:
//   node scripts/mcp-client.mjs list                         # ツール一覧を保存
//   node scripts/mcp-client.mjs call <tool> '<json-args>' [log-name]
//   node scripts/mcp-client.mjs batch scripts/harness-calls.json
//
// Node の fetch がプロキシを通るよう NODE_USE_ENV_PROXY=1 を子プロセスに渡す（@primer/mcp は
// 多くのツールで primer.style の HTML/llms.txt をその場で取得する）。
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LOG_DIR = "harness-logs";
mkdirSync(LOG_DIR, { recursive: true });

const transport = new StdioClientTransport({
	command: "npx",
	args: ["--no-install", "--prefix", process.cwd(), "@primer/mcp"],
	env: { ...process.env, NODE_USE_ENV_PROXY: "1" },
	stderr: "pipe",
	cwd: process.env.MCP_CWD ?? process.cwd(),
});
const client = new Client({ name: "ct-schedule-harness-probe", version: "0.1.0" });
await client.connect(transport);

const ledger = `${LOG_DIR}/calls.jsonl`;
const textOf = (res) =>
	(res.content ?? []).map((c) => (c.type === "text" ? c.text : JSON.stringify(c))).join("\n");

async function call(name, args = {}, logName) {
	const started = Date.now();
	let res;
	try {
		res = await client.callTool({ name, arguments: args });
	} catch (e) {
		res = { isError: true, content: [{ type: "text", text: `CLIENT ERROR: ${e.message}` }] };
	}
	const text = textOf(res);
	const file = `${LOG_DIR}/${logName ?? `${name}${Object.values(args).length ? `-${Object.values(args).join("-")}` : ""}`}.md`
		.replace(/[^\w./-]+/g, "_");
	writeFileSync(
		file,
		`# ${name}\n\n- args: \`${JSON.stringify(args)}\`\n- isError: ${!!res.isError}\n- ms: ${Date.now() - started}\n- chars: ${text.length}\n\n---\n\n${text}\n`,
	);
	appendFileSync(
		ledger,
		`${JSON.stringify({ at: new Date().toISOString(), tool: name, args, isError: !!res.isError, chars: text.length, file })}\n`,
	);
	console.log(`${res.isError ? "ERR" : "ok "} ${name} ${JSON.stringify(args)} -> ${file} (${text.length} chars)`);
	return text;
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === "list") {
	const { tools } = await client.listTools();
	const info = client.getServerVersion();
	const instructions = client.getInstructions?.() ?? "";
	writeFileSync(`${LOG_DIR}/00-server-info.json`, JSON.stringify({ info, instructions }, null, 2));
	writeFileSync(`${LOG_DIR}/00-list-tools.json`, JSON.stringify(tools, null, 2));
	for (const t of tools) console.log(`${t.name}: ${(t.description ?? "").split("\n")[0]}`);
	try {
		const { prompts } = await client.listPrompts();
		writeFileSync(`${LOG_DIR}/00-list-prompts.json`, JSON.stringify(prompts, null, 2));
	} catch (e) {
		console.log("prompts:", e.message);
	}
	try {
		const { resources } = await client.listResources();
		writeFileSync(`${LOG_DIR}/00-list-resources.json`, JSON.stringify(resources, null, 2));
	} catch (e) {
		console.log("resources:", e.message);
	}
} else if (cmd === "call") {
	const [name, json = "{}", logName] = rest;
	await call(name, JSON.parse(json), logName);
} else if (cmd === "batch") {
	const calls = JSON.parse(readFileSync(rest[0], "utf8"));
	for (const c of calls) await call(c.tool, c.args ?? {}, c.log);
} else {
	console.error("usage: list | call <tool> <json> [log] | batch <file>");
	process.exitCode = 1;
}
await client.close();
