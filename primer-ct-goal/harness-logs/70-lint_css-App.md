<!-- tool: lint_css / args: {"css":"/*\n * アプリ全体の面。ページ単位の通知（Banner）は PageLayout の外側、ナビの直下に置くため、\n * PageLayout（xlarge・padding normal）と同じ最大幅と余白をトークンで与える。\n */\n.app {\n  min-height: 100vh;\n  background-color: var(--bgColor-default);\n}\n\n.main {\n  display: block;\n}\n\n.notices {\n  max-width: 1280px;\n  margin-inline: auto;\n  padding-block-start: var(--stack-padding-normal);\n  padding-inline: var(--stack-padding-normal);\n}\n\n/* 段落の上下マージンは Stack の gap に任せる（ブラウザ既定の p の余白が gap と二重になるため） */\n.main p {\n  margin-block: 0;\n}\n"} / at: 2026-11-05T11:10:41.159Z / isError: false -->

❌ Errors without autofix remaining:
/*
 * アプリ全体の面。ページ単位の通知（Banner）は PageLayout の外側、ナビの直下に置くため、
 * PageLayout（xlarge・padding normal）と同じ最大幅と余白をトークンで与える。
 */
.app {
  min-height: 100vh;
  background-color: var(--bgColor-default);
}

.main {
  display: block;
}

.notices {
  max-width: 1280px;
  margin-inline: auto;
  padding-block-start: var(--stack-padding-normal);
  padding-inline: var(--stack-padding-normal);
}

/* 段落の上下マージンは Stack の gap に任せる（ブラウザ既定の p の余白が gap と二重になるため） */
.main p {
  margin-block: 0;
}

