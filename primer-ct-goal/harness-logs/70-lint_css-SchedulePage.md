<!-- tool: lint_css / args: {"css":"/*\n * 組み合わせ画面の自前 CSS。Primer に「人の一覧（行の区切り線つきリスト）」に当たる表示専用の部品がないため\n * （ActionList は操作の一覧、DataTable は 390px で横に溢れる）、ul/li に区切り線と余白だけを当てる。\n * 値はすべて primitives のトークン。\n */\n.meta {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--base-size-4);\n  color: var(--fgColor-muted);\n}\n\n.muted {\n  color: var(--fgColor-muted);\n}\n\n.mutedIcon {\n  color: var(--fgColor-muted);\n  vertical-align: text-bottom;\n}\n\n.heroName {\n  font: var(--text-title-shorthand-large);\n  color: var(--fgColor-default);\n}\n\n.pairList,\n.weekList,\n.compactPairs {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.pairList {\n  border: var(--borderWidth-thin) solid var(--borderColor-default);\n  border-radius: var(--borderRadius-medium);\n}\n\n.pairRow {\n  padding: var(--stack-padding-condensed) var(--stack-padding-normal);\n}\n\n.pairRow + .pairRow {\n  border-top: var(--borderWidth-thin) solid var(--borderColor-muted);\n}\n\n/* 自分のペア：色だけに頼らず、行内の Label「あなた」と太字でも示す。面は accent の muted */\n.mine {\n  background-color: var(--bgColor-accent-muted);\n}\n\n.weekItem + .weekItem {\n  margin-top: var(--stack-gap-normal);\n  padding-top: var(--stack-gap-normal);\n  border-top: var(--borderWidth-thin) solid var(--borderColor-muted);\n}\n\n.weekTitle {\n  margin: 0;\n}\n\n.compactPairs {\n  display: grid;\n  gap: var(--base-size-4);\n}\n\n.para {\n  margin: 0;\n}\n"} / at: 2026-11-05T11:10:37.080Z / isError: false -->

/*
 * 組み合わせ画面の自前 CSS。Primer に「人の一覧（行の区切り線つきリスト）」に当たる表示専用の部品がないため
 * （ActionList は操作の一覧、DataTable は 390px で横に溢れる）、ul/li に区切り線と余白だけを当てる。
 * 値はすべて primitives のトークン。
 */
.meta {
  display: inline-flex;
  align-items: center;
  gap: var(--base-size-4);
  color: var(--fgColor-muted);
}

.muted {
  color: var(--fgColor-muted);
}

.mutedIcon {
  color: var(--fgColor-muted);
  vertical-align: text-bottom;
}

.heroName {
  font: var(--text-title-shorthand-large);
  color: var(--fgColor-default);
}

.pairList,
.weekList,
.compactPairs {
  margin: 0;
  padding: 0;
  list-style: none;
}

.pairList {
  border: var(--borderWidth-thin) solid var(--borderColor-default);
  border-radius: var(--borderRadius-medium);
}

.pairRow {
  padding: var(--stack-padding-condensed) var(--stack-padding-normal);
}

.pairRow + .pairRow {
  border-top: var(--borderWidth-thin) solid var(--borderColor-muted);
}

/* 自分のペア：色だけに頼らず、行内の Label「あなた」と太字でも示す。面は accent の muted */
.mine {
  background-color: var(--bgColor-accent-muted);
}

.weekItem + .weekItem {
  margin-top: var(--stack-gap-normal);
  padding-top: var(--stack-gap-normal);
  border-top: var(--borderWidth-thin) solid var(--borderColor-muted);
}

.weekTitle {
  margin: 0;
}

.compactPairs {
  display: grid;
  gap: var(--base-size-4);
}

.para {
  margin: 0;
}

