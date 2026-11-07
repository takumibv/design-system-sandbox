// primer.style の文書ページを取得し、<main> を Markdown にして標準出力へ出す（@primer/mcp と同じ cheerio + turndown 方式）。
// 使い方: NODE_USE_ENV_PROXY=1 node fetch-doc.mjs /product/getting-started/foundations/layout/
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
const require = createRequire(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../node_modules/@primer/mcp/package.json"));
const cheerio = require("cheerio");
const TurndownService = require("turndown");
const url = new URL(process.argv[2], "https://primer.style");
const res = await fetch(url);
console.error(res.status, res.url);
const $ = cheerio.load(await res.text());
console.log(`<!-- source: ${res.url} -->\n` + new TurndownService().turndown($("main").html() ?? ""));
