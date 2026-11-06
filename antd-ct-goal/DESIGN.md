---
version: alpha
name: CT Schedule (Ant Design v6 + overrides)
description: Enterprise-grade React UI design system from Ant Group, built around the values Natural, Certain, Meaningful, and Growing.
colors:
  primary: '#0958D9'
  success: '#237804'
  warning: '#874D00'
  error: '#CF1322'
  info: '#0958D9'
  blue: '#1677FF'
  blue-7: '#0958D9'
  purple: '#722ED1'
  cyan: '#13C2C2'
  green: '#52C41A'
  magenta: '#EB2F96'
  red: '#F5222D'
  orange: '#FA8C16'
  yellow: '#FADB14'
  volcano: '#FA541C'
  geekblue: '#2F54EB'
  gold: '#FAAD14'
  lime: '#A0D911'
  surface: '#FFFFFF'
  surface-container: '#FAFAFA'
  surface-layout: '#F5F5F5'
  on-surface: '#1F1F1F'
  on-surface-variant: '#595959'
  on-surface-disabled: '#BFBFBF'
  outline: '#D9D9D9'
  outline-variant: '#F0F0F0'
typography:
  display-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 38px
    fontWeight: '600'
    lineHeight: 46px
  headline-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 20px
  code:
    fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  none: 0px
  sm: 2px
  md: 4px
  DEFAULT: 6px
  lg: 8px
  xl: 16px
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  control-height: 32px
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '#FFFFFF'
    typography: '{typography.body-md}'
    rounded: '{rounded.DEFAULT}'
    height: 32px
    padding: 0 15px
  button-primary-hover:
    backgroundColor: '#4096FF'
  button-primary-active:
    backgroundColor: '#0958D9'
  button-default:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.DEFAULT}'
    height: 32px
    padding: 0 15px
  button-default-hover:
    textColor: '#4096FF'
  input-field:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.DEFAULT}'
    height: 32px
    padding: 4px 11px
  input-field-focus:
    backgroundColor: '{colors.surface}'
  select-field:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.DEFAULT}'
    height: 32px
    padding: 0 11px
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 24px
  modal:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 20px 24px
  menu-item-selected:
    backgroundColor: '#E6F4FF'
    textColor: '{colors.primary}'
    typography: '{typography.body-md}'
  tabs-tab-active:
    textColor: '{colors.primary}'
    typography: '{typography.body-md}'
  table-header:
    backgroundColor: '{colors.surface-container}'
    textColor: '{colors.on-surface}'
    typography: '{typography.title-md}'
    padding: 16px
  tag:
    backgroundColor: '{colors.surface-container}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.md}'
    padding: 0 7px
  tooltip:
    backgroundColor: 'rgba(0, 0, 0, 0.85)'
    textColor: '#FFFFFF'
    typography: '{typography.body-md}'
    rounded: '{rounded.md}'
    padding: 6px 8px
  dropdown-item-hover:
    backgroundColor: '{colors.surface-container}'
    textColor: '{colors.on-surface}'
  alert-success:
    backgroundColor: '#F6FFED'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 8px 12px
  alert-warning:
    backgroundColor: '#FFFBE6'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 8px 12px
  alert-error:
    backgroundColor: '#FFF2F0'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 8px 12px
  alert-info:
    backgroundColor: '#E6F4FF'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: 8px 12px
  badge-status-error:
    backgroundColor: '{colors.error}'
    rounded: '{rounded.full}'
    width: 6px
    height: 6px
  tag-blue:
    backgroundColor: '#E6F4FF'
    textColor: '{colors.blue-7}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.md}'
    padding: 0 7px
  tag-success:
    backgroundColor: '#F6FFED'
    textColor: '{colors.success}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.md}'
    padding: 0 7px
  tag-warning:
    backgroundColor: '#FFFBE6'
    textColor: '{colors.warning}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.md}'
    padding: 0 7px
  text-secondary:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface-variant}'
    typography: '{typography.body-md}'
  form-error-text:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.error}'
    typography: '{typography.body-md}'
---

## Overview

CTスケジュール（antd-ct-goal）の DESIGN.md。Ant Design v6 公式 DESIGN.md（`antd design.md`）の既定値をそのまま引き継ぎ、次の値だけを `ConfigProvider` の `theme.token` で上書きしている。数値は antd のプリセット色の段（blue-7 / green-8 / gold-9 / red-7）から取り、独自の色は作っていない。

- `primary` / `info`：#1677FF → #0958D9（blue-7）。白文字との対比 4.10:1 → 6.16:1。
- `success`：#52C41A → #237804（green-8）。Tag の淡い背景上の文字が 2.2:1 → 5.44:1。
- `warning`：#FAAD14 → #874D00（gold-9）。
- `error`：#FF4D4F → #CF1322（red-7）。Form のエラー文・「必須」表示が白地で 5.57:1。
- 状態色の背景（`colorSuccessBg` など）と枠は既定値のまま固定する（seed を濃くすると派生背景が濁るため）。
- `Typography type="secondary"` の文字色（`colorTextDescription`）を 0.45 → 0.65 の段（on-surface-variant）に揃える。
- 見出し h1/h2/h3 を 24/20/16px にする（1 画面目に主役を収めるため）。

それ以外（文字、余白、角丸、影、動き、Do's and Don'ts）は公式 DESIGN.md に従う。
