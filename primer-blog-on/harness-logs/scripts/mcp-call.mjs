// @primer/mcp を stdio で起動し、@modelcontextprotocol/sdk の Client でツールを呼ぶ。
// 使い方: node mcp-call.mjs list            -> ツール一覧を表示
//         node mcp-call.mjs <tool> '<json>'  -> ツールを呼んで本文を表示
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
// Node の組み込み fetch はプロキシ環境変数を読まないため NODE_USE_ENV_PROXY=1 を渡す（get_pattern 等が primer.style を取得するため）
const transport = new StdioClientTransport({ command: "node", args: [path.join(root, "node_modules/@primer/mcp/bin/mcp.js")], cwd: root, stderr: "inherit", env: { ...process.env, NODE_USE_ENV_PROXY: "1" } });
const client = new Client({ name: "primer-blog-on-harness", version: "0.0.1" });
await client.connect(transport);
const [cmd, arg] = process.argv.slice(2);
if (!cmd || cmd === "list") {
  const { tools } = await client.listTools();
  for (const t of tools) console.log(`## ${t.name}\n${t.description ?? ""}\ninput: ${JSON.stringify(t.inputSchema?.properties ?? {})}\n`);
} else {
  const res = await client.callTool({ name: cmd, arguments: arg ? JSON.parse(arg) : {} });
  for (const c of res.content ?? []) console.log(c.type === "text" ? c.text : JSON.stringify(c));
  if (res.isError) console.error("[isError]");
}
await client.close();
