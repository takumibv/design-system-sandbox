# find_tokens

- args: `{"query":"muted","group":"fgColor"}`
- isError: false
- ms: 11
- chars: 509

---

Found 2 token(s) matching "muted". Showing top 2:

## Foreground Colors

- `fgColor-black` → `#1f2328`
  - **U**: Pure black text
  - **R**: Avoid using raw black. Use semantic alternatives: fg.default for standard text, fg.muted for secondary text. Raw black/white ignore theme preferences and accessibility settings.
- `fgColor-muted` → `#59636e`
  - **U**: helper-text, muted-text, secondary-text
  - **R**: Use for secondary text like timestamps, metadata, and helper text. Do NOT use for primary content.
