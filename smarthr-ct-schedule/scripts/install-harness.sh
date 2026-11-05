#!/bin/sh
# SmartHR Design System の公式プラグイン（Claude Code 用スキル）をプロジェクトに取り込む。
# このセッションでは /plugin（plugin marketplace add）が使えなかったため、
# プラグイン README の手順の代わりに、リポジトリを clone して skills を .claude/skills/ にコピーする。
# 調査時のコミット: ed07a7705601275f9689b66b48b16625759d8f81（2026-11-04）
set -eu
REV="${1:-ed07a7705601275f9689b66b48b16625759d8f81}"
TMP="$(mktemp -d)"
git clone --filter=blob:none https://github.com/kufu/smarthr-design-system.git "$TMP/sds"
git -C "$TMP/sds" checkout "$REV"
mkdir -p .claude/skills
# design-pattern-guidelines/patterns はサイト記事へのシンボリックリンクなので -L で実体をコピーする
cp -rL "$TMP/sds/plugins/smarthr-design-system/skills/"* .claude/skills/
cp "$TMP/sds/.textlintrc" harness-logs/sds-textlintrc.json
cp "$TMP/sds/dict/prh-books.yml" prh-books.yml
rm -rf "$TMP"
echo "installed: $(ls .claude/skills)"
