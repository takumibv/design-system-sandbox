// 原本 (DADS版 Storybook) と Primer 版を同じ状態・同じ幅で撮影し、axe と横はみ出しを検査する。
// 原本リポジトリを clone できない環境では ORIGINAL_URL=skip とし、ADS 版で撮影済みの
// screenshots/original/*.png（同じ Story・同じ幅）を再利用する。原本の axe 結果は ADS 版の report.json を参照。
// 使い方: ORIGINAL_URL=http://localhost:6008 PRIMER_URL=http://localhost:6011 node scripts/screenshots.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { createRequire } from "node:module";

// 環境にプリインストールされた playwright を使う（NODE_PATH=$(npm root -g) で解決）
const { chromium } = createRequire(import.meta.url)("playwright");

const ORIGINAL = process.env.ORIGINAL_URL ?? "http://localhost:6008";
const PRIMER = process.env.PRIMER_URL ?? "http://localhost:6011";
// [ファイル名, 原本 Story ID, Primer 版クエリ]
const cases = [
	["schedule-default", "pages-ct組み合わせ表--default", ""],
	["schedule-guest", "pages-ct組み合わせ表--guest", "signedIn=0"],
	["schedule-rest", "pages-ct組み合わせ表--rest", "state=rest"],
	["schedule-holiday", "pages-ct組み合わせ表--holiday", "state=holiday"],
	["schedule-insufficient", "pages-ct組み合わせ表--insufficient", "state=insufficient"],
	["schedule-loading", "pages-ct組み合わせ表--loading", "state=loading"],
	["schedule-login-error", "pages-ct組み合わせ表--login-error", "state=loginError&signedIn=0"],
	["schedule-saved", "pages-ct組み合わせ表--saved", "state=saveSuccess"],
	["members-default", "pages-メンバー一覧--default", "screen=members"],
	["members-empty", "pages-メンバー一覧--empty", "screen=members&state=empty&signedIn=0"],
	["members-delete-confirm", "pages-メンバー一覧--delete-confirm", "screen=members&dialog=1"],
	["members-delete-error", "pages-メンバー一覧--delete-error", "screen=members&state=deleteError"],
	["settings-default", "pages-自分の設定--default", "screen=settings"],
	["settings-onboarding", "pages-自分の設定--onboarding", "screen=onboarding"],
	["settings-validation", "pages-自分の設定--validation", "screen=onboarding&state=validation"],
	["not-found", "pages-存在しないページ--default", "screen=notFound"],
];
const widths = [1440, 390];
mkdirSync("screenshots/original", { recursive: true });
mkdirSync("screenshots/primer", { recursive: true });

const browser = await chromium.launch();
const report = [];
for (const width of widths) {
	const context = await browser.newContext({ viewport: { width, height: 900 } });
	const page = await context.newPage();
	for (const [file, story, query] of cases) {
		for (const [kind, url] of [
			...(ORIGINAL === "skip"
				? []
				: [["original", `${ORIGINAL}/iframe.html?id=${encodeURIComponent(story)}&viewMode=story`]]),
			["primer", `${PRIMER}/?${query}`],
		]) {
			await page.goto(url, { waitUntil: "networkidle" });
			await page.waitForTimeout(800);
			const overflow = await page.evaluate(
				() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
			);
			const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
			await page.screenshot({ path: `screenshots/${kind}/${file}-${width}.png`, fullPage: true });
			report.push({
				kind,
				file,
				width,
				overflow,
				violations: axe.violations.map((v) => `${v.id}(${v.nodes.length})`),
			});
		}
	}
	await context.close();
}
await browser.close();
writeFileSync("screenshots/report.json", JSON.stringify(report, null, 2));
for (const r of report)
	console.log(r.kind.padEnd(8), r.file.padEnd(24), r.width, "overflow", r.overflow, r.violations.join(" "));
