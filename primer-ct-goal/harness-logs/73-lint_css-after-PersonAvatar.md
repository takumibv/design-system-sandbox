<!-- tool: lint_css / args: {"css":"/*\n * 頭文字アバター。Primer の Avatar は src（画像）が必須で、画像が無い人の頭文字表示を持たないため自作した。\n * 形・大きさは Avatar に合わせ、色は人ごとの識別色として display-* トークンを使う（意味を持つ semantic 色とは分ける）。\n */\n.initial {\n  display: inline-flex;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: center;\n  border-radius: var(--borderRadius-full);\n  box-sizing: border-box;\n  border: var(--borderWidth-thin) solid var(--avatar-borderColor);\n  font-weight: var(--base-text-weight-semibold);\n  user-select: none;\n}\n\n.size20 {\n  width: var(--base-size-20);\n  height: var(--base-size-20);\n  font-size: var(--text-caption-size);\n}\n\n.size32 {\n  width: var(--base-size-32);\n  height: var(--base-size-32);\n  font-size: var(--text-body-size-medium);\n}\n\n.size48 {\n  width: var(--base-size-48);\n  height: var(--base-size-48);\n  font-size: var(--text-title-size-medium);\n}\n\n/*\n * stylelint の primer/no-display-colors は display-* を「alpha」として警告する。\n * 一方 MCP の find_tokens は display-* を説明なしで返し、get_design_token_specs の Logic Matrix は\n * blue→accent / green→success … と semantic 色への置き換えを勧める。\n * しかし semantic 色はこのアプリで意味（success＝参加、accent＝自分）を持たせているため、\n * 意味を持たない「人ごとの識別色」に使うと意味が混ざる。ブリーフが人ごとの固定色を求めているので、警告を承知で display-* を使う。\n */\n/* stylelint-disable primer/no-display-colors */\n.blue {\n  background-color: var(--display-blue-bgColor-muted);\n  color: var(--display-blue-fgColor);\n}\n\n.green {\n  background-color: var(--display-green-bgColor-muted);\n  color: var(--display-green-fgColor);\n}\n\n.purple {\n  background-color: var(--display-purple-bgColor-muted);\n  color: var(--display-purple-fgColor);\n}\n\n.orange {\n  background-color: var(--display-orange-bgColor-muted);\n  color: var(--display-orange-fgColor);\n}\n/* stylelint-enable primer/no-display-colors */\n"} / at: 2026-11-05T11:11:03.872Z / isError: false -->

/*
 * 頭文字アバター。Primer の Avatar は src（画像）が必須で、画像が無い人の頭文字表示を持たないため自作した。
 * 形・大きさは Avatar に合わせ、色は人ごとの識別色として display-* トークンを使う（意味を持つ semantic 色とは分ける）。
 */
.initial {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: var(--borderRadius-full);
  box-sizing: border-box;
  border: var(--borderWidth-thin) solid var(--avatar-borderColor);
  font-weight: var(--base-text-weight-semibold);
  user-select: none;
}

.size20 {
  width: var(--base-size-20);
  height: var(--base-size-20);
  font-size: var(--text-caption-size);
}

.size32 {
  width: var(--base-size-32);
  height: var(--base-size-32);
  font-size: var(--text-body-size-medium);
}

.size48 {
  width: var(--base-size-48);
  height: var(--base-size-48);
  font-size: var(--text-title-size-medium);
}

/*
 * stylelint の primer/no-display-colors は display-* を「alpha」として警告する。
 * 一方 MCP の find_tokens は display-* を説明なしで返し、get_design_token_specs の Logic Matrix は
 * blue→accent / green→success … と semantic 色への置き換えを勧める。
 * しかし semantic 色はこのアプリで意味（success＝参加、accent＝自分）を持たせているため、
 * 意味を持たない「人ごとの識別色」に使うと意味が混ざる。ブリーフが人ごとの固定色を求めているので、警告を承知で display-* を使う。
 */
/* stylelint-disable primer/no-display-colors */
.blue {
  background-color: var(--display-blue-bgColor-muted);
  color: var(--display-blue-fgColor);
}

.green {
  background-color: var(--display-green-bgColor-muted);
  color: var(--display-green-fgColor);
}

.purple {
  background-color: var(--display-purple-bgColor-muted);
  color: var(--display-purple-fgColor);
}

.orange {
  background-color: var(--display-orange-bgColor-muted);
  color: var(--display-orange-fgColor);
}
/* stylelint-enable primer/no-display-colors */

