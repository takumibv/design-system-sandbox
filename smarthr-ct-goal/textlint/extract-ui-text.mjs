// src/**/*.tsx の JSX テキストと日本語を含む文字列リテラルを抜き出し、textlint にかけるための Markdown を作る。
// 1 行 1 文言。行末の HTML コメントに出典（ファイル:行）を残す。
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import ts from 'typescript'

const root = new URL('..', import.meta.url).pathname
const files = []
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.tsx?$/.test(f) && !f.endsWith('fixtures.ts')) files.push(p)
  }
}
walk(join(root, 'src'))

const ja = /[぀-ヿ㐀-鿿]/
const out = ['# UI 文言（src から自動抽出）', '']
for (const file of files) {
  const src = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const visit = (node) => {
    let text
    if (ts.isJsxText(node)) text = node.text.replace(/\s+/g, ' ').trim()
    else if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && !ts.isImportDeclaration(node.parent))
      text = node.text
    else if (ts.isTemplateExpression(node)) text = [node.head.text, ...node.templateSpans.map((s) => `〇〇${s.literal.text}`)].join('')
    // コメントは対象外（getFullText ではなく node 単位で拾う）
    if (text && ja.test(text)) {
      const { line } = src.getLineAndCharacterOfPosition(node.getStart())
      // 出典コメントは別の行に置く（同じ行に置くと、末尾の空白がかっこ周りの規則に誤検知される）
      out.push(`<!-- ${relative(root, file)}:${line + 1} -->`, text, '')
    }
    if (!ts.isTemplateExpression(node)) ts.forEachChild(node, visit)
  }
  visit(src)
}
writeFileSync(join(root, 'textlint/ui-text.md'), out.join('\n'))
console.log(`${(out.length - 2) / 3} 件を textlint/ui-text.md に書き出しました`)
