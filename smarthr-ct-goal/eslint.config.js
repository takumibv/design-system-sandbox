// SmartHR 公式の共有設定（eslint-config-smarthr）。eslint-plugin-smarthr のルールを推奨の強さで有効にしている。
// ※ eslint-plugin-smarthr 自身の `recommended` は全ルール 'off' のため、実際の推奨値はこちらを使う（harness-report 参照）。
import smarthr from 'eslint-config-smarthr'

// src/data/fixtures.ts はブリーフの固定データの写し（入力）なので変更せず、検査から外す。
export default [
  { ignores: ['dist', 'node_modules', 'screenshots', 'eslint.*.js', 'vite.config.ts', 'src/data/fixtures.ts'] },
  ...smarthr,
  {
    settings: { react: { version: '19' } },
  },
]
