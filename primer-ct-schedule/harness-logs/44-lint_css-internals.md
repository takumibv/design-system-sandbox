# lint_css の中身の確認（MCP サーバーの lint_css は 'npx stylelint --stdin --fix' を実行するだけ）

## 1. プロジェクトの stylelint 設定がない場所で同じコマンドを実行
```
ConfigurationError: No configuration provided for <空のディレクトリ>
    at getConfigForFile (file:///home/user/design-system-sandbox/primer-ct-schedule/node_modules/stylelint/lib/getConfigForFile.mjs:76:9)
```

## 2. このプロジェクト（@primer/stylelint-config あり）で実行。stderr に出る理由は MCP の応答には含まれない
```
.card { color: #24292f; padding: var(--base-size-12); margin: var(--base-size-12); }

<input css XwOYok>
  1:1   ×  Expected no more than 1 declaration                                                                                               declaration-block-single-line-max-declarations
  1:16  ×  Please use a Primer foreground color variable instead of '#24292f'. https://primer.style/foundations/primitives/color#foreground  primer/colors

× 2 problems (2 errors, 0 warnings)

```
