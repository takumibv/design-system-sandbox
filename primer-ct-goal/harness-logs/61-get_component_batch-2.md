<!-- tool: get_component_batch / args: {"names":["Timeline","Heading","Stack","NavList","SkeletonText","SkeletonAvatar","Text","Header","AvatarStack","RelativeTime"]} / at: 2026-11-05T10:56:58.563Z / isError: false -->

---
name: Timeline
description: "The Timeline component is used to display items on a vertical Timeline, connected by Timeline elements."
import: "@primer/react"
docs: https://primer.style/product/components/timeline
a11y_docs: https://primer.style/product/components/timeline/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Timeline
storybook: https://primer.style/react/storybook/?path=/story/components-timeline
---

# Timeline

The Timeline component is used to display items on a vertical Timeline, connected by Timeline elements.

## Usage

```tsx
import { Timeline } from '@primer/react'
```

### Example

```tsx
() => (
  <Timeline>
    <Timeline.Item>
      <Timeline.Badge>
        <GitCommitIcon aria-label="Commit" />
      </Timeline.Badge>
      <Timeline.Body>This is a message</Timeline.Body>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.Badge>
        <GitCommitIcon aria-label="Commit" />
      </Timeline.Badge>
      <Timeline.Body>This is a message</Timeline.Body>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.Badge>
        <GitCommitIcon aria-label="Commit" />
      </Timeline.Badge>
      <Timeline.Body>This is a message</Timeline.Body>
    </Timeline.Item>
  </Timeline>
)
```

## Props

```yaml
Timeline:
  clipSidebar: { type: "| boolean | 'start' | 'end' | 'both'", description: "Controls which ends of the sidebar are clipped. When set to `true` or `'both'`, hides the sidebar above the first and be..." }

Timeline.Item:
  condensed: { type: "boolean", description: "Reduces vertical padding and removes background from an item's badge." }

Timeline.Badge:
  variant: { type: "'accent' | 'success' | 'attention' | 'severe' | 'danger' | 'done' | 'open' | 'closed' | 'sponsors'", description: "The color variant of the badge." }

No props documented.

No props documented.

No props documented.

No props documented.
```

## Examples

### Features: Clip Sidebar

```tsx
() => (
  <Timeline clipSidebar>
    <Timeline.Item>
      <Timeline.Badge>
        <GitCommitIcon aria-label="Commit" />
      </Timeline.Badge>
      <Timeline.Body>This is a message</Timeline.Body>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.Badge>
        <GitCommitIcon aria-label="Commit" />
      </Timeline.Badge>
      <Timeline.Body>This is a message</Timeline.Body>
    </Timeline.Item>
  </Timeline>
)
```

### Features: Clip Sidebar Start

```tsx
() => (
  <Timeline clipSidebar="start">
    <Timeline.Item>
      <Timeline.Badge>
        <GitCommitIcon aria-label="Commit" />
      </Timeline.Badge>
      <Timeline.Body>This is a message</Timeline.Body>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.Badge>
        <GitCommitIcon aria-label="Commit" />
      </Timeline.Badge>
      <Timeline.Body>This is a message</Timeline.Body>
    </Timeline.Item>
  </Timeline>
)
```

### Features: Clip Sidebar End

```tsx
() => (
  <Timeline clipSidebar="end">
    <Timeline.Item>
      <Timeline.Badge>
        <GitCommitIcon aria-label="Commit" />
      </Timeline.Badge>
      <Timeline.Body>This is a message</Timeline.Body>
    </Timeline.Item>
    <Timeline.Item>
      <Timeline.Badge>
        <GitCommitIcon aria-label="Commit" />
      </Timeline.Badge>
      <Timeline.Body>This is a message</Timeline.Body>
    </Timeline.Item>
  </Timeline>
)
```

---
name: Heading
description: "Heading defines the hierarchical structure and importance of the content they contain."
import: "@primer/react"
docs: https://primer.style/product/components/heading
a11y_docs: https://primer.style/product/components/heading/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Heading
storybook: https://primer.style/react/storybook/?path=/story/components-heading
---

# Heading

Heading defines the hierarchical structure and importance of the content they contain.

## Usage

```tsx
import { Heading } from '@primer/react'
```

### Example

```tsx
() => <Heading>Default H2 Heading</Heading>
```

## Props

```yaml
Heading:
  as: { type: "React.ElementType", default: "'h2'" }
  variant: { type: "'large' | 'medium' | 'small'" }
```

## Examples

### Features: Small

```tsx
() => <Heading variant="small">Small heading</Heading>
```

### Features: Medium

```tsx
() => <Heading variant="medium">Medium heading</Heading>
```

### Features: Large

```tsx
() => <Heading variant="large">Large heading</Heading>
```

---
name: Stack
description: "Stack is a layout component that creates responsive horizontal and vertical flows."
import: "@primer/react"
docs: https://primer.style/product/components/stack
a11y_docs: https://primer.style/product/components/stack/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Stack
storybook: https://primer.style/react/storybook/?path=/story/components-stack
---

# Stack

Stack is a layout component that creates responsive horizontal and vertical flows.

## Usage

```tsx
import { Stack } from '@primer/react'
```

### Example

```tsx
() => (
  <Stack>
    <div
      style={{
        background: 'var(--display-lemon-bgColor-muted)',
        borderRadius: 'var(--borderRadius-medium)',
        padding: 'var(--base-size-8)',
      }}
    >
      First
    </div>
    <div
      style={{
        background: 'var(--display-olive-bgColor-muted)',
        borderRadius: 'var(--borderRadius-medium)',
        padding: 'var(--base-size-8)',
      }}
    >
      Second
    </div>
    <div
      style={{
        background: 'var(--display-lime-bgColor-muted)',
        borderRadius: 'var(--borderRadius-medium)',
        padding: 'var(--base-size-8)',
      }}
    >
      Third
    </div>
  </Stack>
)
```

## Props

```yaml
Stack:
  gap: { type: "'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious' | ResponsiveValue<'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious'>", description: "Specify the gap between children elements in the stack." }
  direction: { type: "'horizontal' | 'vertical' | ResponsiveValue<'horizontal' | 'vertical'>", description: "Specify the orientation for the stack container." }
  align: { type: "'stretch' | 'start' | 'center' | 'end' | 'baseline' | ResponsiveValue<'stretch' | 'start' | 'center' | 'end' | 'baseline'>", description: "Specify the alignment between items in the cross-axis of the orientation." }
  wrap: { type: "'wrap' | 'nowrap' | ResponsiveValue<'wrap' | 'nowrap'>", description: "Specify whether items are forced onto one line or can wrap onto multiple lines." }
  justify: { type: "'start' | 'center' | 'end' | 'space-between' | 'space-evenly' | ResponsiveValue<'start' | 'center' | 'end' | 'space-between' | 'space-evenly'>", description: "Specify how items will be distributed in the stacking direction." }
  padding: { type: "'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious' | ResponsiveValue<'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious'>", description: "Specify the padding of the stack container." }
  paddingBlock: { type: "'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious' | ResponsiveValue<'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious'>", description: "Specify the block (vertical) padding of the stack container. Overrides the block axis of padding when both are set." }
  paddingInline: { type: "'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious' | ResponsiveValue<'none' | 'tight' | 'condensed' | 'cozy' | 'normal' | 'spacious'>", description: "Specify the inline (horizontal) padding of the stack container. Overrides the inline axis of padding when both are set." }
  className: { type: "string" }

Stack.Item:
  grow: { type: "boolean | ResponsiveValue<boolean>", description: "Allow item to keep size or expand to fill the available space." }
  shrink: { type: "boolean | ResponsiveValue<boolean>", description: "Allow item to keep size or shrink to fit the available space." }
  className: { type: "string" }
```

## Examples

### Features: Gap Scale

```tsx
() => (
  <Stack gap="spacious">
    {(
      ['none', 'tight', 'condensed', 'cozy', 'normal', 'spacious'] as const
    ).map((gap) => (
      <Stack key={gap}>
        <span
          style={{
            fontSize: 'var(--text-body-size-small)',
            color: 'var(--fgColor-muted)',
          }}
        >
          gap=&quot;{gap}&quot;
        </span>
        <Stack direction="horizontal" gap={gap}>
          <Placeholder label="A" />
          <Placeholder label="B" />
          <Placeholder label="C" />
        </Stack>
      </Stack>
    ))}
  </Stack>
)
```

### Features: Directional Padding

```tsx
() => (
  <Stack gap="normal">
    <Stack
      padding="normal"
      style={{
        backgroundColor: 'var(--bgColor-muted)',
      }}
    >
      <Placeholder label='padding="normal" (all sides)' />
    </Stack>
    <Stack
      padding="normal"
      paddingInline="spacious"
      style={{
        backgroundColor: 'var(--bgColor-muted)',
      }}
    >
      <Placeholder label='padding="normal" paddingInline="spacious"' />
    </Stack>
    <Stack
      paddingBlock="condensed"
      paddingInline="spacious"
      style={{
        backgroundColor: 'var(--bgColor-muted)',
      }}
    >
      <Placeholder label='paddingBlock="condensed" paddingInline="spacious"' />
    </Stack>
  </Stack>
)
```

### Features: Padding Scale

```tsx
() => (
  <Stack gap="spacious">
    {(
      ['none', 'tight', 'condensed', 'cozy', 'normal', 'spacious'] as const
    ).map((padding) => (
      <Stack key={padding}>
        <span
          style={{
            fontSize: 'var(--text-body-size-small)',
            color: 'var(--fgColor-muted)',
          }}
        >
          padding=&quot;{padding}&quot;
        </span>
        <Stack
          padding={padding}
          style={{
            backgroundColor: 'var(--bgColor-muted)',
          }}
        >
          <Placeholder label="Content" />
        </Stack>
      </Stack>
    ))}
  </Stack>
)
```

---
name: NavList
description: "NavList renders a vertical list of navigation links."
import: "@primer/react"
docs: https://primer.style/product/components/nav-list
a11y_docs: https://primer.style/product/components/nav-list/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/NavList
storybook: https://primer.style/react/storybook/?path=/story/components-nav-list
---

# NavList

NavList renders a vertical list of navigation links.

## Usage

```tsx
import { NavList } from '@primer/react'
```

### Example

```tsx
() => (
  <PageLayout>
    <PageLayout.Pane position="start">
      <NavList>
        <NavList.Item href="#" aria-current="page">
          Item 1
        </NavList.Item>
        <NavList.Item href="#">Item 2</NavList.Item>
        <NavList.Item href="#">Item 3</NavList.Item>
      </NavList>
    </PageLayout.Pane>
    <PageLayout.Content></PageLayout.Content>
  </PageLayout>
)
```

## Props

```yaml
NavList:
  aria-label: { type: "string" }
  aria-labelledby: { type: "string" }
  disableItemGap: { type: "boolean", default: "false", description: "Disable the gap between items when the item gap feature is enabled." }
  ref: { type: "React.RefObject<HTMLElement>" }
  as: { type: "React.ElementType", default: "'nav'" }

NavList.Heading:
  as: { type: "'h2' | 'h3'", default: "'h2'", description: "Semantic heading level for the NavList. Also sets the default level for child group headings, which render one level dee..." }
  visuallyHidden: { type: "boolean", default: "false", description: "Visually hide the heading while keeping it available to assistive technology and as the accessible name for the `nav` la..." }
  children: { type: "ReactNode", required: true, description: "The text rendered as the NavList's heading." }
  id: { type: "string", description: "Custom id for the heading element. When set, it is used as the `aria-labelledby` target that names the `nav` landmark; o..." }
  className: { type: "string", description: "Custom CSS class name." }
  style: { type: "React.CSSProperties", description: "Custom CSS styles." }

NavList.Item:
  href: { type: "string", description: "The URL that the item navigates to. `href` is passed to the underlying `<a>` element. If `as` is specified, the componen..." }
  aria-current: { type: "| 'page' | 'step' | 'location' | 'date' | 'time' | true | false", default: "false", description: "Set `aria-current` to `'page'` to indicate that the item represents the current page. Set `aria-current` to `'location'`..." }
  defaultOpen: { type: "boolean", description: "The open state of the item when it is initially rendered if the item has a SubNav." }
  inactiveText: { type: "string", description: "Text to explain why this item is currently inactive and cannot be activated." }
  ref: { type: "React.RefObject<HTMLAnchorElement>" }
  as: { type: "React.ElementType", default: "'a'" }

NavList.Description:
  variant: { type: "'inline' | 'block'", default: "'inline'", description: "`inline` descriptions are positioned beside primary text. `block` descriptions are positioned below primary text." }
  truncate: { type: "boolean", default: "false", description: "Whether the inline description should truncate the text on overflow." }
  className: { type: "string", description: "Custom CSS class name." }
  style: { type: "React.CSSProperties", description: "Custom CSS styles." }

NavList.LeadingVisual:
  ref: { type: "React.RefObject<HTMLElement>" }

NavList.TrailingVisual:
  ref: { type: "React.RefObject<HTMLElement>" }

NavList.SubNav:
  ref: { type: "React.RefObject<HTMLElement>" }

NavList.Group:
  children: { type: "ReactNode", required: true, description: "A related set of NavList.Items" }
  title: { type: "string", description: "The text that gets rendered as the group's heading. Alternatively, you can pass the `NavList.GroupHeading` component as ..." }
  hideDivider: { type: "boolean", default: "false", description: "Whether to hide the divider that is rendered before the group." }
  ref: { type: "React.RefObject<HTMLElement>" }

NavList.GroupHeading:
  auxiliaryText: { type: "string", description: "Secondary text which provides additional information about a `Group`." }
  variant: { type: "'subtle' | 'filled'", description: "Style variations. Usage is discretionary. - `'filled'` - Superimposed on a background, offset from nearby content - `'su..." }
  visuallyHidden: { type: "boolean" }
  ref: { type: "React.RefObject<HTMLElement>" }
  as: { type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'", description: "Heading level for the group heading. Sets the semantic heading tag. Defaults to one level below a `NavList.Heading` (h3 ..." }

NavList.Divider:
  ref: { type: "React.RefObject<HTMLElement>" }

NavList.TrailingAction:
  as: { type: "a | button", default: "button", description: "HTML element to render as." }
  label: { type: "string", required: true, description: "Accessible name for the control." }
  icon: { type: "string", required: true, description: "Octicon to pass into IconButton. When this is not set, TrailingAction renders as a `Button` instead of an `IconButton`." }
  href: { type: "string", description: "href when the TrailingAction is rendered as a link." }

NavList.GroupExpand:
  label: { type: "string", required: true, description: "Accessible name for the control." }
  pages: { type: "number", default: "0", description: "The total number of pages, used to calculate the number of items to show at a given time." }
  items: { type: "Array<GroupItems>", required: true, description: "The NavList.Items to render in the group." }
  renderItem: { type: "(item: {text: string}) => React.ReactNode", description: "A function that returns a ReactNode to render in the group. If this is not provided, the group will only render the item..." }
  ref: { type: "React.RefObject<HTMLButtonElement>" }
```

## Examples

### Features: Expand With Custom Items

```tsx
() => {
  const items: {
    href: string
    text: string
    'aria-current'?: 'page'
  }[] = [
    {
      href: '#',
      text: 'Item 4',
      'aria-current': 'page',
    },
    {
      href: '#',
      text: 'Item 5',
    },
    {
      href: '#',
      text: 'Item 6',
    },
    {
      href: '#',
      text: 'Item 7',
    },
    {
      href: '#',
      text: 'Item 8',
    },
    {
      href: '#',
      text: 'Item 9',
    },
  ]
  const Item = ({
    leadingVisual,
    text,
    trailingVisual,
    ...rest
  }: CustomItemProps) => {
    return (
      <NavList.Item key={text} onClick={() => {}} href="#" {...rest}>
        {leadingVisual ? (
          <NavList.LeadingVisual>
            <Octicon icon={leadingVisual} />
          </NavList.LeadingVisual>
        ) : null}
        {text}

        {trailingVisual ? (
          <NavList.TrailingVisual>
            {typeof trailingVisual === 'string' ? (
              trailingVisual
            ) : (
              <Octicon icon={trailingVisual as React.ElementType} />
            )}
            <VisuallyHidden>results</VisuallyHidden>
          </NavList.TrailingVisual>
        ) : null}
      </NavList.Item>
    )
  }
  return (
    <PageLayout>
      <PageLayout.Pane position="start">
        <NavList>
          <NavList.Item href="#">Item 1</NavList.Item>
          <NavList.Item href="#">Item 2</NavList.Item>
          <NavList.Item href="#">Item 3</NavList.Item>
          <NavList.GroupExpand
            label="Show more"
            items={items}
            renderItem={Item}
          />
        </NavList>
      </PageLayout.Pane>
      <PageLayout.Content></PageLayout.Content>
    </PageLayout>
  )
}
```

### Features: Expand With Pages

```tsx
() => {
  const items = [
    {
      href: '#',
      text: 'Item 4',
    },
    {
      href: '#',
      text: 'Item 5',
    },
    {
      href: '#',
      text: 'Item 6',
    },
    {
      href: '#',
      text: 'Item 7',
    },
    {
      href: '#',
      text: 'Item 8',
    },
    {
      href: '#',
      text: 'Item 9',
    },
  ]
  return (
    <PageLayout>
      <PageLayout.Pane position="start">
        <NavList>
          <NavList.Item href="#" aria-current="page">
            Item 1
          </NavList.Item>
          <NavList.Item href="#">Item 2</NavList.Item>
          <NavList.Item href="#">Item 3</NavList.Item>
          <NavList.GroupExpand pages={2} label="Show more" items={items} />
        </NavList>
      </PageLayout.Pane>
      <PageLayout.Content></PageLayout.Content>
    </PageLayout>
  )
}
```

### Features: Group With Expand And Custom Items

```tsx
() => {
  const Item = ({
    leadingVisual: LeadingVisual,
    text,
    trailingVisual: TrailingVisual,
    ...rest
  }: CustomItemProps) => {
    return (
      <NavList.Item onClick={() => {}} href="#" {...rest} key={text}>
        {LeadingVisual ? (
          <NavList.LeadingVisual>
            <LeadingVisual />
          </NavList.LeadingVisual>
        ) : null}
        {text}

        {TrailingVisual ? (
          <NavList.TrailingVisual>
            {typeof TrailingVisual === 'string' ? (
              TrailingVisual
            ) : (
              <TrailingVisual />
            )}
            <VisuallyHidden>results</VisuallyHidden>
          </NavList.TrailingVisual>
        ) : null}
      </NavList.Item>
    )
  }
  const items = [
    {
      href: '#',
      text: 'Commits',
      leadingVisual: GitCommitIcon,
      trailingVisual: '32k',
    },
    {
      href: '#',
      text: 'Packages',
      leadingVisual: PackageIcon,
      trailingVisual: '1k',
    },
    {
      href: '#',
      text: 'Wikis',
      leadingVisual: BookIcon,
      trailingVisual: '121',
    },
    {
      href: '#',
      text: 'Topics',
      leadingVisual: MilestoneIcon,
      trailingVisual: '12k',
    },
    {
      href: '#',
      text: 'Marketplace',
      leadingVisual: TelescopeIcon,
      trailingVisual: ArrowRightIcon,
    },
  ]
  return (
    <NavList>
      <NavList.Group>
        <NavList.Item aria-current="page">
          <NavList.LeadingVisual>
            <CodeIcon />
          </NavList.LeadingVisual>
          Code
          <NavList.TrailingVisual>3k</NavList.TrailingVisual>
        </NavList.Item>
        <NavList.Item>
          <NavList.LeadingVisual>
            <RepoIcon />
          </NavList.LeadingVisual>
          Repositories
          <NavList.TrailingVisual>713</NavList.TrailingVisual>
        </NavList.Item>
        <NavList.Item>
          <NavList.LeadingVisual>
            <IssueOpenedIcon />
          </NavList.LeadingVisual>
          Issues
          <NavList.TrailingVisual>6k</NavList.TrailingVisual>
        </NavList.Item>
        <NavList.Item>
          <NavList.LeadingVisual>
            <GitPullRequestIcon />
          </NavList.LeadingVisual>
          Pull requests
          <NavList.TrailingVisual>4k</NavList.TrailingVisual>
        </NavList.Item>
        <NavList.Item>
          <NavList.LeadingVisual>
            <CommentDiscussionIcon />
          </NavList.LeadingVisual>
          Discussions
          <NavList.TrailingVisual>236</NavList.TrailingVisual>
        </NavList.Item>
        <NavList.Item>
          <NavList.LeadingVisual>
            <PeopleIcon />
          </NavList.LeadingVisual>
          Users
          <NavList.TrailingVisual>10k</NavList.TrailingVisual>
        </NavList.Item>
        <NavList.GroupExpand items={items} renderItem={Item} />
      </NavList.Group>
    </NavList>
  )
}
```

---
name: SkeletonText
description: "SkeletonText shows a placeholder for loading text to improve perceived performance."
import: "@primer/react/experimental"
docs: https://primer.style/product/components/skeleton-text
a11y_docs: https://primer.style/product/components/skeleton-text/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/SkeletonText
storybook: https://primer.style/react/storybook/?path=/story/components-skeleton-text
---

# SkeletonText

SkeletonText shows a placeholder for loading text to improve perceived performance.

## Usage

```tsx
import { SkeletonText } from '@primer/react/experimental'
```

### Example

```tsx
() => <SkeletonText />
```

## Props

```yaml
SkeletonText:
  size: { type: "'display' | 'titleLarge' | 'titleMedium' | 'titleSmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall' | 'subtitle'", default: "'bodyMedium'", description: "Size of the text that the skeleton is replacing." }
  lines: { type: "number", default: "1", description: "Number of lines of skeleton text to render." }
  maxWidth: { type: "string", description: "Maximum width that the line(s) of skeleton text can take up. Accepts any valid CSS `max-width` value." }
  className: { type: "string", description: "Class name for custom styling." }
```

## Examples

### Skeletontext Features: With Max Width

```tsx
() => <SkeletonText maxWidth={200} />
```

### Skeletontext Features: With Multiple Lines

```tsx
() => <SkeletonText lines={3} />
```

### Skeletontext Features: Display

```tsx
() => <SkeletonText size="display" />
```

---
name: SkeletonAvatar
description: "SkeletonAvatars are placeholders for loading Avatars. They support the same variants as the Avatar component."
import: "@primer/react/experimental"
docs: https://primer.style/product/components/skeleton-avatar
a11y_docs: https://primer.style/product/components/skeleton-avatar/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/SkeletonAvatar
storybook: https://primer.style/react/storybook/?path=/story/components-skeleton-avatar
---

# SkeletonAvatar

SkeletonAvatars are placeholders for loading Avatars. They support the same variants as the Avatar component.

## Usage

```tsx
import { SkeletonAvatar } from '@primer/react/experimental'
```

### Example

```tsx
() => <SkeletonAvatar />
```

## Props

```yaml
SkeletonAvatar:
  size: { type: "number | { narrow?: number; regular?: number; wide?: number; }", default: "20", description: "The size of the avatar in pixels." }
  square: { type: "boolean", default: "false", description: "If true, the avatar will be square instead of circular." }
  className: { type: "string", description: "Class name for custom styling." }
```

## Examples

### Skeletonavatar Features: Square

```tsx
() => <SkeletonAvatar square />
```

### Skeletonavatar Features: Size

```tsx
() => (
  <div>
    <SkeletonAvatar size={4} />
    <SkeletonAvatar size={8} />
    <SkeletonAvatar size={12} />
    <SkeletonAvatar size={16} />
    <SkeletonAvatar size={20} />
    <SkeletonAvatar size={24} />
    <SkeletonAvatar size={28} />
    <SkeletonAvatar size={32} />
    <SkeletonAvatar size={40} />
    <SkeletonAvatar size={48} />
    <SkeletonAvatar size={56} />
    <SkeletonAvatar size={64} />
  </div>
)
```

### Skeletonavatar Features: Size Responsive

```tsx
() => (
  <div>
    <SkeletonAvatar
      size={{
        narrow: 4,
        regular: 8,
        wide: 12,
      }}
    />
    <SkeletonAvatar
      size={{
        narrow: 8,
        regular: 12,
        wide: 16,
      }}
    />
    <SkeletonAvatar
      size={{
        narrow: 12,
        regular: 16,
        wide: 20,
      }}
    />
    <SkeletonAvatar
      size={{
        narrow: 16,
        regular: 20,
        wide: 24,
      }}
    />
    <SkeletonAvatar
      size={{
        narrow: 20,
        regular: 24,
        wide: 28,
      }}
    />
    <SkeletonAvatar
      size={{
        narrow: 24,
        regular: 28,
        wide: 32,
      }}
    />
    <SkeletonAvatar
      size={{
        narrow: 28,
        regular: 32,
        wide: 40,
      }}
    />
    <SkeletonAvatar
      size={{
        narrow: 32,
        regular: 40,
        wide: 48,
      }}
    />
    <SkeletonAvatar
      size={{
        narrow: 40,
        regular: 48,
        wide: 56,
      }}
    />
    <SkeletonAvatar
      size={{
        narrow: 48,
        regular: 56,
        wide: 64,
      }}
    />
  </div>
)
```

---
name: Text
description: "An abstraction for using Primer's typographic styles."
import: "@primer/react"
docs: https://primer.style/product/components/text
a11y_docs: https://primer.style/product/components/text/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Text
storybook: https://primer.style/react/storybook/?path=/story/components-text
---

# Text

An abstraction for using Primer's typographic styles.

## Usage

```tsx
import { Text } from '@primer/react'
```

### Example

```tsx
() => <Text>Default Text</Text>
```

## Props

```yaml
Text:
  as: { type: "React.ElementType", default: "'span'" }
  size: { type: "'large' | 'medium' | 'small'" }
  weight: { type: "'light' | 'normal' | 'medium' | 'semibold'" }
  whiteSpace: { type: "'pre' | 'normal' | 'nowrap' | 'pre-wrap' | 'pre-line'" }
```

## Examples

### Features: Polymorphism

```tsx
() => (
  <div className={classes.PolymorphismContainer}>
    <Text as="em">Emphasized text</Text>
    <Text as="i">Italicized text</Text>
    <Text as="strong">Strong text</Text>
    <Text as="small">Small text</Text>
    <Text as="u">Text with underline</Text>
  </div>
)
```

### Features: Styled Text

```tsx
() => (
  <Text as="p" className={classes.StyledText} size="small">
    Stylized text
  </Text>
)
```

### Features: Size Small

```tsx
() => (
  <Text as="span" size="small">
    Stylized text
  </Text>
)
```

## Header

Status: fetch-error. Failed to load documentation for Header.

---
name: AvatarStack
description: "AvatarStack displays two or more Avatars in an inline stack."
import: "@primer/react"
docs: https://primer.style/product/components/avatar-stack
a11y_docs: https://primer.style/product/components/avatar-stack/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/AvatarStack
storybook: https://primer.style/react/storybook/?path=/story/components-avatar-stack
---

# AvatarStack

AvatarStack displays two or more Avatars in an inline stack.

## Usage

```tsx
import { AvatarStack } from '@primer/react'
```

### Example

```tsx
() => (
  <AvatarStack>
    <Avatar
      alt="Primer logo"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      alt="GitHub logo"
      src="https://avatars.githubusercontent.com/github"
    />
    <Avatar alt="Atom logo" src="https://avatars.githubusercontent.com/atom" />
    <Avatar
      alt="GitHub Desktop logo"
      src="https://avatars.githubusercontent.com/u/13171334?v=4"
    />
  </AvatarStack>
)
```

## Props

```yaml
AvatarStack:
  children: { type: "ReactNode", description: "A set of Avatar components to stack" }
  alignRight: { type: "boolean", default: "false", description: "Align the avatars to the right" }
  disableExpand: { type: "boolean", default: "false", description: "Do not spread the avatars on hover" }
  variant: { type: "'cascade' | 'stack'", default: "'cascade'", description: "The style of overlapping avatars. 'cascade' increases the overlap for 3rd+ avatars, while 'stack' uses a uniform overlap..." }
  shape: { type: "'circle' | 'square'", default: "'circle'", description: "The shape of the avatars." }
  size: { type: "number | { narrow?: number; regular?: number; wide?: number; }", default: "20", description: "The size of the avatar children in pixels." }
  className: { type: "string", description: "Class name for custom styling." }
```

## Examples

### Features: Align Right

```tsx
() => (
  <AvatarStack alignRight>
    <Avatar
      alt="Primer logo"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      alt="GitHub logo"
      src="https://avatars.githubusercontent.com/github"
    />
    <Avatar alt="Atom logo" src="https://avatars.githubusercontent.com/atom" />
    <Avatar
      alt="GitHub Desktop logo"
      src="https://avatars.githubusercontent.com/u/13171334?v=4"
    />
  </AvatarStack>
)
```

### Features: Disable Expand On Hover

```tsx
() => (
  <AvatarStack disableExpand>
    <Avatar
      alt="Primer logo"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      alt="GitHub logo"
      src="https://avatars.githubusercontent.com/github"
    />
    <Avatar alt="Atom logo" src="https://avatars.githubusercontent.com/atom" />
    <Avatar
      alt="GitHub Desktop logo"
      src="https://avatars.githubusercontent.com/u/13171334?v=4"
    />
  </AvatarStack>
)
```

### Features: Custom Size On Parent

```tsx
() => (
  <AvatarStack size={32}>
    <Avatar
      alt="Primer logo"
      src="https://avatars.githubusercontent.com/u/7143434?v=4"
    />
    <Avatar
      alt="GitHub logo"
      src="https://avatars.githubusercontent.com/github"
    />
    <Avatar alt="Atom logo" src="https://avatars.githubusercontent.com/atom" />
    <Avatar
      alt="GitHub Desktop logo"
      src="https://avatars.githubusercontent.com/u/13171334?v=4"
    />
  </AvatarStack>
)
```

---
name: RelativeTime
description: "RelativeTime displays time in a way that is clear, concise, and accessible."
import: "@primer/react"
docs: https://primer.style/product/components/relative-time
a11y_docs: https://primer.style/product/components/relative-time/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/RelativeTime
storybook: https://primer.style/react/storybook/?path=/story/components-relative-time
---

# RelativeTime

RelativeTime displays time in a way that is clear, concise, and accessible.

## Usage

```tsx
import { RelativeTime } from '@primer/react'
```

### Example

```tsx
() => <RelativeTime date={new Date('2020-01-01T00:00:00Z')} noTitle={true} />
```

## Props

```yaml
RelativeTime:
  datetime: { type: "string", required: true, description: "An ISO8601 time representing the time" }
  date: { type: "string", description: "Instead of passing the `datetime`, it is possible to pass a full `Date` object into the `date` prop" }
  format: { type: "'auto' | 'micro' | 'elapsed'", default: "'auto'", description: "The format with which to display the time" }
  tense: { type: "'auto' | 'past' | 'future'", default: "'auto'", description: "The tense to use when displaying a relative time" }
  precision: { type: "'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'", default: "'second'", description: "The precision to use when displaying an elapsed time" }
  threshold: { type: "string", default: "'P30D'", description: "The threshold (ISO8601 duration) to display relative dates within" }
  prefix: { type: "string", default: "'on'", description: "The prefix to use when displaying a localised (non relative) date" }
  second: { type: "'numeric' | '2-digit'", description: "The format with which to render seconds" }
  minute: { type: "'numeric' | '2-digit'", description: "The format with which to render minutes" }
  hour: { type: "'numeric' | '2-digit'", description: "The format with which to render hours" }
  weekday: { type: "'short' | 'long' | 'narrow'", description: "The format with which to render weekdays" }
  day: { type: "'numeric' | '2-digit'", description: "The format with which to render days" }
  month: { type: "'numeric' | '2-digit' | 'short' | 'long' | 'narrow'", default: "'numeric'", description: "The format with which to render months" }
  year: { type: "'numeric' | '2-digit'", description: "The format with which to render years" }
  timeZoneName: { type: "'long' | 'short' | 'shortOffset' | 'longOffset' | 'shortGeneric' | 'longGeneric'", description: "The format with which to render the time zone" }
  ref: { type: "React.RefObject<RelativeTimeElement>" }
  noTitle: { type: "boolean", description: "Removes the `title` attribute provided on the element by default" }
  attributeChangedCallback: { type: "(attrName: string, oldValue: unknown, newValue: unknown) => void" }
  connectedCallback: { type: "() => void" }
  onRelativeTimeUpdated: { type: "null | (event: RelativeTimeUpdatedEvent) => void" }
  update: { type: "() => void" }
  as: { type: "React.ElementType", default: "'relative-time'" }
```

## Examples

### Features: Micro Format

```tsx
(args) => {
  const { date, ...rest } = args
  return (
    <RelativeTime
      noTitle={true}
      {...rest}
      date={new Date(date)}
      format="micro"
    />
  )
}
```

### Features: Recent Time

```tsx
(args) => {
  const { ...rest } = args
  return <RelativeTime noTitle={true} {...rest} date={new Date()} />
}
```

### Features: Count Down Timer

```tsx
(args) => {
  const { ...rest } = args
  return <RelativeTime noTitle={true} {...rest} />
}
```
