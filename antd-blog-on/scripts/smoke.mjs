// 操作の通し確認（登録・保存・状態変更・公開の記録・削除・権限）。結果を標準出力に出す
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const APP = process.env.APP_URL ?? "http://localhost:5173";
const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
const msg = async () => (await page.locator(".ant-message-notice").last().innerText({ timeout: 3000 }).catch(() => "(なし)")).trim();
const log = (k, v) => console.log(k.padEnd(28), v);

await page.goto(`${APP}/?as=editor`);
await page.getByRole("button", { name: "この週に予定を入れる" }).first().click();
log("空き週→ドロワーの予定日", await page.getByLabel(/公開予定日/).inputValue());
await page.getByLabel("タイトル").fill("（仮）年末の振り返り");
await page.getByText("チーム・文化", { exact: true }).last().click();
await page.getByRole("button", { name: "登録する" }).click();
log("登録の message", await msg());
log("11/23 週の表示", (await page.locator(".ant-timeline-item").nth(3).innerText()).split("\n").slice(0, 2).join(" / "));

await page.goto(`${APP}/posts/7`);
await page.getByRole("button", { name: "編集" }).click();
await page.getByLabel("タイトル").fill("アクセシビリティ改善の振り返り（改）");
await page.getByRole("button", { name: "保存する" }).click();
await page.getByText(/を保存しました/).waitFor();
log("保存の message", await msg());
log("見出し", await page.locator("h1").innerText());
await page.getByRole("button", { name: /状態を変更/ }).click();
await page.getByText("公開済みにする（公開日と URL を記録）").click();
await page.getByLabel("記事 URL").fill("https://example.com/blog/7");
await page.getByRole("button", { name: "公開済みにする" }).click();
await page.getByText("公開を記録しました").waitFor();
log("公開の message", "公開を記録しました");
log("公開後の状態", await page.locator(".ant-badge-status-text").first().innerText());
log("削除ボタン（一般）", await page.getByRole("button", { name: "削除" }).count());

await page.goto(`${APP}/posts/7?edit=7&fail=save`);
await page.getByRole("button", { name: "保存する" }).click();
log("保存失敗の Alert", (await page.locator(".ant-alert-title").innerText({ timeout: 3000 })).trim());

await page.goto(`${APP}/posts/6?as=editor&fail=delete`);
await page.getByRole("button", { name: "削除" }).click();
await page.getByRole("button", { name: "削除する" }).click();
log("削除失敗のダイアログ", (await page.locator(".ant-modal-confirm-title").innerText({ timeout: 3000 })).trim());

await page.goto(`${APP}/posts/6?as=editor`);
await page.getByRole("button", { name: "削除" }).click();
await page.getByRole("button", { name: "削除する" }).click();
await page.waitForURL("**/posts");
log("削除後の URL と message", page.url().replace(APP, "") + " " + (await msg()));

await page.goto(`${APP}/?as=guest`);
await page.getByRole("button", { name: /Slack でログイン$/ }).click();
log("ログインの message", await msg());
log("ログイン後の右列", await page.locator("h2").nth(1).innerText());
await b.close();
