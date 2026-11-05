# find_tokens

- args: `{"query":"breakpoint"}`
- isError: false
- ms: 5
- chars: 1521

---

No tokens found matching "breakpoint".

### 💡 Available Groups:
`Ansi`, `avatar`, `avatarStack`, `Background Colors`, `base`, `bgColor`, `border`, `Border`, `Border Colors`, `Border Radius`, `Border Width`, `borderColor`, `borderRadius`, `borderWidth`, `boxShadow`, `button`, `buttonCounter`, `buttonKeybindingHint`, `card`, `codeMirror`, `color`, `contribution`, `control`, `controlKnob`, `controlStack`, `controlTrack`, `counter`, `dashboard`, `data`, `diffBlob`, `display`, `Easing`, `fgColor`, `focus`, `Focus`, `Font Stacks`, `fontStack`, `Foreground Colors`, `header`, `headerSearch`, `highlight`, `label`, `menu`, `outline`, `overlay`, `page`, `Prettylights`, `progressBar`, `reactionButton`, `Selection`, `selectMenu`, `Shadow`, `sideNav`, `skeletonLoader`, `spinner`, `stack`, `text`, `timelineBadge`, `tooltip`, `topicTag`, `treeViewItem`, `underlineNav`

### Troubleshooting for AI:
1. **Multi-word Queries**: Search keywords use 'AND' logic. If searching "text shorthand typography" fails, try a single keyword like "shorthand" within the "text" group.
2. **Property Mismatch**: Do not search for CSS properties like "offset", "padding", or "font-size". Use semantic intent keywords: "danger", "muted", "emphasis".
3. **Typography**: Remember that `caption`, `display`, and `code` groups do NOT support size suffixes. Use the base shorthand only.
4. **Group Intent**: Use the `group` parameter instead of putting group names in the `query` string (e.g., use group: "stack" instead of query: "stack padding").
