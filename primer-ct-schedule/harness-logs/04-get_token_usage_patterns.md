# get_token_usage_patterns

- args: `{}`
- isError: false
- ms: 2
- chars: 3965

---

# Design Token Reference Examples

> **CRITICAL FOR AI**: To implement the examples below, DO NOT search for tokens one-by-one. 
> Use `get_token_group_bundle(groups: ["control", "stack", "focus", "borderRadius"])` to fetch the required token values in a single call.

---

## 1. Interaction Pattern: The Primary Button
*Demonstrates: 5 states, color pairing, typography shorthand, and motion.*

```css
.btn-primary {
  /* Logic: Use control tokens for interactive elements */
  background-color: var(--control-bgColor-rest);
  color: var(--fgColor-default);
  font: var(--text-body-shorthand-medium); /* MUST use shorthand */
  
  /* Scale: DEFAULT is medium/normal */
  padding-block: var(--control-medium-paddingBlock);
  padding-inline: var(--control-medium-paddingInline-normal);
  border: none;
  border-radius: var(--borderRadius-medium);
  cursor: pointer;

  /* Motion: MUST be <300ms */
  transition: background-color 150ms ease, transform 100ms ease;
}

.btn-primary:hover {
  background-color: var(--control-bgColor-hover);
}

.btn-primary:focus-visible {
  outline: var(--focus-outline);
  outline-offset: var(--focus-outline-offset, var(--outline-focus-offset));
}

.btn-primary:active {
  background-color: var(--control-bgColor-active);
  transform: scale(0.98);
}

.btn-primary:disabled {
  /* Logic: MUST pair bgColor-disabled with fgColor-disabled */
  background-color: var(--bgColor-disabled);
  color: var(--fgColor-disabled);
  cursor: not-allowed;
}
```

---

## 2. Layout Pattern: Vertical Stack
*Demonstrates: Layout spacing rules and matching padding density.*

```css
.card-stack {
  display: flex;
  flex-direction: column;

  /* Logic: Use stack tokens for layout spacing */
  gap: var(--stack-gap-normal);
  padding: var(--stack-padding-normal);
  
  background-color: var(--bgColor-default);
  border: 1px solid var(--borderColor-default);
  border-radius: var(--borderRadius-large);
}

/* Logic: Matching padding density to purpose */
.card-header {
  padding-block-end: var(--stack-gap-condensed);
  border-bottom: 1px solid var(--borderColor-muted);
}
```

---

## Implementation Rules for AI:
1. **Shorthand First**: Always use `font: var(...)` rather than splitting size/weight.
2. **States**: Never implement a button without all 5 states.
3. **Spacing**: Use `control-` tokens for the component itself and `stack-` tokens for the container/layout.
4. **Motion**: Always include the `prefers-reduced-motion` media query to set transitions to `none`.
```css
@media (prefers-reduced-motion: reduce) {
  .btn-primary {
    transition: none;
  }
}
```

---

## Golden Example: Reference Component

```css
/* Button: All 5 interactive states with correct token usage */
.btn {
  /* Base styles */
  background-color: var(--control-bgColor-rest);
  color: var(--fgColor-default);
  border: none;
  border-radius: var(--borderRadius-medium);
  padding-block: var(--control-medium-paddingBlock);
  padding-inline: var(--control-medium-paddingInline-normal);
  font: var(--text-body-shorthand-medium);
  cursor: pointer;

  /* Motion: Use functional motion tokens */
  transition:
    background-color var(--motion-transition-hover),
    box-shadow var(--motion-transition-hover),
    transform var(--motion-transition-hover);
}

/* State: Hover */
.btn:hover {
  background-color: var(--control-bgColor-hover);
}

/* State: Focus-visible (MUST use :focus-visible, not :focus) */
.btn:focus-visible {
  outline: var(--focus-outline);
  outline-offset: var(--outline-focus-offset);
}

/* State: Active/Pressed */
.btn:active {
  background-color: var(--control-bgColor-active);
  transform: scale(0.98);
}

/* State: Disabled */
.btn:disabled {
  background-color: var(--bgColor-disabled);
  color: var(--fgColor-disabled);
  cursor: not-allowed;
  opacity: 1; /* NEVER use opacity for disabled */
}

/* Accessibility: MUST respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}
```

---
