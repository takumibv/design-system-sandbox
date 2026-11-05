// `antd mcp`（stdio の MCP サーバー）を起動し、JSON-RPC で直接ツールとプロンプトを呼ぶ。
// エージェントの設定（.mcp.json）に登録できなかったため、MCP クライアントの代わりに使う。
// 使い方: node scripts/mcp-probe.mjs <出力先.json> '<呼び出しの JSON 配列>'
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const [out, callsJson] = process.argv.slice(2);
const calls = JSON.parse(callsJson ?? "[]");
const proc = spawn("npx", ["antd", "mcp"], { stdio: ["pipe", "pipe", "inherit"] });
let buf = "";
const pending = new Map();
proc.stdout.on("data", (d) => {
	buf += d;
	let i;
	while ((i = buf.indexOf("\n")) >= 0) {
		const line = buf.slice(0, i);
		buf = buf.slice(i + 1);
		if (!line.trim()) continue;
		const msg = JSON.parse(line);
		pending.get(msg.id)?.(msg);
	}
});
let id = 0;
const rpc = (method, params) =>
	new Promise((res) => {
		const n = ++id;
		pending.set(n, res);
		proc.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", id: n, method, params })}\n`);
	});
const log = [];
const init = await rpc("initialize", {
	protocolVersion: "2025-06-18",
	capabilities: {},
	clientInfo: { name: "mcp-probe", version: "0" },
});
log.push({ method: "initialize", result: init.result });
proc.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" })}\n`);
for (const [method, params] of calls) {
	const r = await rpc(method, params);
	log.push({ method, params, result: r.result ?? r.error });
}
writeFileSync(out, JSON.stringify(log, null, 2));
proc.kill();
console.log(`wrote ${out}`);
