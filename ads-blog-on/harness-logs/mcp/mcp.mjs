import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
const mode = process.argv[2]; const tool = process.argv[3]; const args = process.argv[4] ? JSON.parse(process.argv[4]) : {};
const client = new Client({ name: "blog-plan-harness-check", version: "0.0.1" });
const transport = mode === "remote"
  ? new StreamableHTTPClientTransport(new URL("https://mcp.atlassian.com/v1/ads/public/mcp"))
  : new StdioClientTransport({ command: "node", args: [new URL("./node_modules/@atlaskit/ads-mcp/index.js", import.meta.url).pathname], stderr: "ignore" });
await client.connect(transport);
if (tool === "list") {
  const r = await client.listTools();
  for (const t of r.tools) console.log(`## ${t.name}\n${t.description}\nargs: ${JSON.stringify(t.inputSchema?.properties ?? {})}\n`);
  try { const p = await client.listPrompts(); console.log("PROMPTS:", JSON.stringify(p.prompts.map(x=>x.name))); } catch(e){ console.log("prompts: n/a", e.message); }
  try { const p = await client.listResources(); console.log("RESOURCES:", JSON.stringify(p.resources.map(x=>x.uri))); } catch(e){ console.log("resources: n/a", e.message); }
  console.log("SERVER INSTRUCTIONS:", client.getInstructions?.());
} else {
  const r = await client.callTool({ name: tool, arguments: args });
  for (const c of r.content) console.log(c.type === "text" ? c.text : JSON.stringify(c));
}
await client.close();
