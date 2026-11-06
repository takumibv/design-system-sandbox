// 操作の通り道を確かめる簡易テスト（状態からの復帰・削除・保存・初回設定）
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const APP = process.env.APP_URL ?? 'http://localhost:5173';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 390, height: 900 }, locale: 'ja-JP' })).newPage();
const ok = (label, cond) => console.log(cond ? 'PASS' : 'FAIL', label);
const seen = (t) => p.getByText(t).first().waitFor({ timeout: 3000 }).then(() => true, () => false);

await p.goto(`${APP}/?state=S07`); await p.getByRole('button', { name: 'もう一度読み込む' }).click();
ok('S07 → もう一度読み込む → 組み合わせが出る', await seen('高橋 健太さんとハドルを始める'));

await p.goto(`${APP}/?state=S08`); await p.getByRole('button', { name: 'もう一度ログイン' }).click();
ok('S08 → もう一度ログイン → ログイン済み', await seen('佐藤 美咲としてログインしました'));

await p.goto(`${APP}/members?state=S11`); await p.getByRole('button', { name: '加藤 大輔さんを削除' }).click();
await p.getByRole('dialog').getByRole('button', { name: '削除する' }).click();
ok('S11 → 削除 → 成功の通知', await seen('加藤 大輔さんを削除しました'));
ok('削除後は一覧（11→10 人）', await seen('メンバー一覧（10 人）'));

await p.goto(`${APP}/members?state=S14`); await p.getByRole('button', { name: 'もう一度削除する' }).click();
ok('S14 → もう一度削除する → 失敗のまま（デモでは失敗を固定）', await seen('削除できませんでした'));

await p.goto(`${APP}/settings?state=S01`); await p.getByLabel('参加しない（休職・繁忙期など）').check();
ok('参加しないを選ぶと影響の警告', await seen('保存すると、組み合わせから外れます'));
await p.getByRole('button', { name: '保存する' }).click();
ok('保存 → 成功の通知', await seen('設定を保存しました'));

await p.goto(`${APP}/settings?state=S17`); await p.getByRole('button', { name: '保存する' }).click();
ok('S17 → もう一度保存 → 成功', await seen('設定を保存しました'));

await p.goto(`${APP}/setup?state=S15`); await p.getByRole('button', { name: '設定を完了する' }).click();
ok('S15 → 未入力で送信 → エラー', await seen('社員番号を入力してください'));
await p.getByLabel('社員番号').fill('11'); await p.getByLabel('uチャンネル').click(); await p.getByTitle('#u-mao').click();
await p.getByRole('button', { name: '設定を完了する' }).click();
ok('初回設定の完了 → 組み合わせへ戻る', await seen('設定が完了しました'));
ok('完了後のパス', new URL(p.url()).pathname === '/');

await p.goto(`${APP}/no-such?state=S18`); await p.getByRole('button', { name: '組み合わせに戻る' }).click();
ok('S18 → 組み合わせに戻る', new URL(p.url()).pathname === '/');
await b.close();
