<!-- ADS:INIT:START -->
## Getting started with the Atlassian Design System

`init` did not install repository-local skills. Use the public ADS CLI and optional MCP guidance below.

Use `atlas ads` first for structured ADS lookups. If Atlas is unavailable, use `npx @atlaskit/ads-cli` with the same trailing arguments.

### Hosted ADS MCP fallback

Prefer the CLI first. Configure the hosted ADS MCP server only if this repository does not already configure `ads-mcp` or `atlassian-ads-mcp`. Merge the selected server into the existing configuration without replacing other servers, then reload the agent or IDE.

**Cursor — `.cursor/mcp.json`:**

```json
{
  "mcpServers": {
    "ads-mcp": {
      "url": "https://mcp.atlassian.com/v1/ads/public/mcp"
    }
  }
}
```

**VS Code — `.vscode/mcp.json`:**

```json
{
  "servers": {
    "ads-mcp": {
      "type": "http",
      "url": "https://mcp.atlassian.com/v1/ads/public/mcp"
    }
  }
}
```

**Codex — `.codex/config.toml`:**

```toml
[mcp_servers.atlassian-ads-mcp]
url = "https://mcp.atlassian.com/v1/ads/public/mcp"
```

Do not add Rovo MCP configuration to the repository.

This is a temporary initialization section. It may be removed or rephrased once this repository's ADS setup has been completed.
<!-- ADS:INIT:END -->
