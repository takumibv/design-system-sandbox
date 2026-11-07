// 色のコントラスト違反を前景色・背景色の組で集計する（調査用）
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import AxeBuilder from "@axe-core/playwright";
const { chromium } = createRequire(import.meta.url)("playwright");
const APP = process.env.APP_URL ?? "http://localhost:5173";
const states = JSON.parse(readFileSync(process.argv[2] ?? "states.json", "utf8"));
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "ja-JP", reducedMotion: "reduce" })).newPage();
const agg = {};
for (const { id, path } of states) {
	await page.goto(`${APP}${path}`, { waitUntil: "networkidle" });
	await page.waitForTimeout(600);
	const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
	for (const v of r.violations) for (const n of v.nodes) {
		const d = n.any[0]?.data ?? {};
		const k = `${v.id} fg=${d.fgColor} bg=${d.bgColor} ratio=${d.contrastRatio}`;
		(agg[k] ??= { n: 0, ex: n.target.join(" ") + " | " + n.html.slice(0, 90), states: new Set() }).n++;
		agg[k].states.add(id);
	}
}
await browser.close();
for (const [k, v] of Object.entries(agg).sort((a, b) => b[1].n - a[1].n)) console.log(v.n, k, "\n   ", v.ex, "\n    in", [...v.states].slice(0, 4).join(","));
