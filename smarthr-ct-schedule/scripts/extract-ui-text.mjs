// src/CTApp.tsx から日本語を含む UI 文言（JSX テキストと文字列リテラル）を抜き出し、
// textlint で検査できるよう harness-logs/ui-text.md に 1 行 1 文言で書き出す。
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync("src/CTApp.tsx", "utf8")
	.split("\n")
	.filter((l) => !/^\s*(\/\/|\/\*|\*|\{\/\*)/.test(l)) // コメント行は除く
	.join("\n");
const ja = /[ぁ-んァ-ヶ一-龠]/;
const found = new Set();
for (const m of src.matchAll(/"([^"\n]+)"|`([^`]+)`|>([^<>{}\n]+)</g)) {
	const t = (m[1] ?? m[2] ?? m[3]).trim();
	if (ja.test(t) && !t.startsWith("shr-")) found.add(t.replace(/\$\{[^}]+\}/g, "〇〇"));
}
const body = [...found].map((t) => `- ${t}`).join("\n");
writeFileSync(
	"harness-logs/ui-text.md",
	`# UI 文言一覧（scripts/extract-ui-text.mjs が自動生成）\n\n${body}\n`,
);
console.log(`${found.size} 件の文言を書き出しました`);
