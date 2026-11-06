<!-- tool: lint_css / args: {"css":"/*\n * 頭文字アバター。Primer の Avatar は src（画像）が必須で、画像が無い人の頭文字表示を持たないため自作した。\n * 形・大きさは Avatar に合わせ、色は人ごとの識別色として display-* トークンを使う（意味を持つ semantic 色とは分ける）。\n */\n.initial {\n  display: inline-flex;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: center;\n  border-radius: var(--borderRadius-full);\n  box-shadow: 0 0 0 var(--borderWidth-thin) var(--avatar-borderColor);\n  font-weight: var(--base-text-weight-semibold);\n  line-height: 1;\n  user-select: none;\n}\n\n.size20 {\n  width: var(--base-size-20);\n  height: var(--base-size-20);\n  font-size: var(--text-caption-size);\n}\n\n.size32 {\n  width: var(--base-size-32);\n  height: var(--base-size-32);\n  font-size: var(--text-body-size-medium);\n}\n\n.size48 {\n  width: var(--base-size-48);\n  height: var(--base-size-48);\n  font-size: var(--text-title-size-medium);\n}\n\n.blue {\n  background-color: var(--display-blue-bgColor-muted);\n  color: var(--display-blue-fgColor);\n}\n\n.green {\n  background-color: var(--display-green-bgColor-muted);\n  color: var(--display-green-fgColor);\n}\n\n.purple {\n  background-color: var(--display-purple-bgColor-muted);\n  color: var(--display-purple-fgColor);\n}\n\n.orange {\n  background-color: var(--display-orange-bgColor-muted);\n  color: var(--display-orange-fgColor);\n}\n"} / at: 2026-11-05T11:10:32.853Z / isError: false -->

❌ Errors without autofix remaining:
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
  box-shadow: 0 0 0 var(--borderWidth-thin) var(--avatar-borderColor);
  font-weight: var(--base-text-weight-semibold);
  line-height: 1;
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

