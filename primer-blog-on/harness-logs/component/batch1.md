---
name: Label
description: "Use the label component to add contextual metadata to a design."
import: "@primer/react"
docs: https://primer.style/product/components/label
a11y_docs: https://primer.style/product/components/label/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Label
storybook: https://primer.style/react/storybook/?path=/story/components-label
---

# Label

Use the label component to add contextual metadata to a design.

## Usage

```tsx
import { Label } from '@primer/react'
```

### Example

```tsx
() => <Label>Default</Label>
```

## Props

```yaml
Label:
  variant: { type: "| 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'attention' | 'severe' | 'danger' | 'done' | 'sponsors'", default: "'default'", description: "The color of the label" }
  size: { type: "'small' | 'large'", default: "'small'", description: "How large the label is rendered" }
```

## Examples

### Features: Primary

```tsx
() => <Label variant="primary">Primary</Label>
```

### Features: Secondary

```tsx
() => <Label variant="secondary">Secondary</Label>
```

### Features: Accent

```tsx
() => <Label variant="accent">Accent</Label>
```
---
name: StateLabel
description: "StateLabel is used for rendering the status of an issue or pull request."
import: "@primer/react"
docs: https://primer.style/product/components/state-label
a11y_docs: https://primer.style/product/components/state-label/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/StateLabel
storybook: https://primer.style/react/storybook/?path=/story/components-state-label
---

# StateLabel

StateLabel is used for rendering the status of an issue or pull request.

## Usage

```tsx
import { StateLabel } from '@primer/react'
```

### Example

```tsx
() => <StateLabel status="issueOpened">Open</StateLabel>
```

## Props

```yaml
StateLabel:
  size: { type: "'small' | 'medium'", default: "'medium'" }
  variant: { type: "'small' | 'normal'", default: "'normal'", deprecated: true, description: "Use `size` instead." }
  status: { type: "'issueOpened' | 'issueClosed' | 'issueClosedNotPlanned' | 'pullOpened' | 'pullClosed' | 'pullMerged' | 'draft' | 'issueDraft' | 'pullQueued' | 'unavailable' | 'alertOpened' | 'alertFixed' | 'alertDismissed' | 'alertClosed' | 'open' | 'closed' | 'archived'", required: true }
```

## Examples

### Features: Issue Closed

```tsx
() => <StateLabel status="issueClosed">Closed</StateLabel>
```

### Features: Issue Closed Not Planned

```tsx
() => <StateLabel status="issueClosedNotPlanned">Closed</StateLabel>
```

### Features: Issue Draft

```tsx
() => <StateLabel status="issueDraft">Draft</StateLabel>
```
---
name: PageLayout
description: "PageLayout defines the header, main, pane, and footer areas of a page."
import: "@primer/react"
docs: https://primer.style/product/components/page-layout
a11y_docs: https://primer.style/product/components/page-layout/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/PageLayout
storybook: https://primer.style/react/storybook/?path=/story/components-page-layout
---

# PageLayout

PageLayout defines the header, main, pane, and footer areas of a page.

## Usage

```tsx
import { PageLayout } from '@primer/react'
```

### Example

```tsx
(args) => (
  <PageLayout
    containerWidth={args.containerWidth}
    padding={args.padding}
    rowGap={args.rowGap}
    columnGap={args.columnGap}
  >
    {args['Render header?'] ? (
      <PageLayout.Header
        padding={args['Header.padding']}
        divider={{
          narrow: args['Header.divider.narrow'],
          regular: args['Header.divider.regular'],
          wide: args['Header.divider.wide'],
        }}
        hidden={{
          narrow: args['Header.hidden.narrow'],
          regular: args['Header.hidden.regular'],
          wide: args['Header.hidden.wide'],
        }}
      >
        <Placeholder
          height={args['Header placeholder height']}
          label="Header"
        />
      </PageLayout.Header>
    ) : null}
    <PageLayout.Content
      width={args['Content.width']}
      padding={args['Content.padding']}
      hidden={{
        narrow: args['Content.hidden.narrow'],
        regular: args['Content.hidden.regular'],
        wide: args['Content.hidden.wide'],
      }}
    >
      <Placeholder
        height={args['Content placeholder height']}
        label="Content"
      />
    </PageLayout.Content>
    {args['Render pane?'] ? (
      <PageLayout.Pane
        position={{
          narrow: args['Pane.position.narrow'],
          regular: args['Pane.position.regular'],
          wide: args['Pane.position.wide'],
        }}
        width={args['Pane.width']}
        minWidth={args['Pane.minWidth']}
        sticky={args['Pane.sticky']}
        resizable={args['Pane.resizable']}
        padding={args['Pane.padding']}
        divider={{
          narrow: args['Pane.divider.narrow'],
          regular: args['Pane.divider.regular'],
          wide: args['Pane.divider.wide'],
        }}
        hidden={{
          narrow: args['Pane.hidden.narrow'],
          regular: args['Pane.hidden.regular'],
          wide: args['Pane.hidden.wide'],
        }}
      >
        <Placeholder height={args['Pane placeholder height']} label="Pane" />
      </PageLayout.Pane>
    ) : null}
    {args['Render footer?'] ? (
      <PageLayout.Footer
        padding={args['Footer.padding']}
        divider={{
          narrow: args['Footer.divider.narrow'],
          regular: args['Footer.divider.regular'],
          wide: args['Footer.divider.wide'],
        }}
        hidden={{
          narrow: args['Footer.hidden.narrow'],
          regular: args['Footer.hidden.regular'],
          wide: args['Footer.hidden.wide'],
        }}
      >
        <Placeholder
          height={args['Footer placeholder height']}
          label="Footer"
        />
      </PageLayout.Footer>
    ) : null}
  </PageLayout>
)
```

## Props

```yaml
PageLayout:
  containerWidth: { type: "| 'full' | 'medium' | 'large' | 'xlarge'", default: "'xlarge'", description: "The maximum width of the page container." }
  padding: { type: "| 'none' | 'condensed' | 'normal'", default: "'normal'", description: "The spacing between the outer edges of the page container and the viewport" }
  columnGap: { type: "| 'none' | 'condensed' | 'normal'", default: "'normal'" }
  rowGap: { type: "| 'none' | 'condensed' | 'normal'", default: "'normal'" }

PageLayout.Header:
  aria-label: { type: "string | undefined", description: "A unique label for the rendered banner landmark" }
  aria-labelledby: { type: "string | undefined", description: "An id to an element which uniquely labels the rendered banner landmark" }
  padding: { type: "| 'none' | 'condensed' | 'normal'", default: "'none'", description: "The amount of padding inside the header." }
  divider: { type: "| 'none' | 'line' | { narrow?: | 'none' | 'line' | 'filled' regular?: | 'none' | 'line' wide?: | 'none' | 'line' }", default: "'none'" }
  dividerWhenNarrow: { type: "| 'inherit' | 'none' | 'line' | 'filled'", default: "'inherit'", deprecated: true, description: "Use the divider prop with a responsive value instead." }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the header is hidden." }

PageLayout.Content:
  aria-label: { type: "string", description: "A unique label for the rendered main landmark" }
  aria-labelledby: { type: "string", description: "An id to an element which uniquely labels the rendered main landmark" }
  as: { type: "React.ElementType", default: "'main'", description: "Change the root node to another HTML element or custom component." }
  width: { type: "| 'full' | 'medium' | 'large' | 'xlarge'", default: "'full'", description: "The maximum width of the content region." }
  padding: { type: "| 'none' | 'condensed' | 'normal'", default: "'none'", description: "The amount of padding inside the content." }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageLayout.Pane:
  aria-label: { type: "string | undefined", description: "Label for the pane. Required if the pane overflows and doesn't have aria-labelledby." }
  aria-labelledby: { type: "string | undefined", description: "Id of an element that acts as a label for the pane. Required if the pane overflows and doesn't have aria-label." }
  width: { type: "| 'small' | 'medium' | 'large' | { min: string max: string default: string }", default: "'medium'", description: "The width of the pane. If using custom widths, provide an object with keys 'min', 'max' and 'default'." }
  minWidth: { type: "number", default: "256", description: "The minimum width of the pane." }
  resizable: { type: "boolean", default: "false", description: "When true, the pane may be resized by the user. Uses localStorage persistence by default. Note: with default persistence..." }
  currentWidth: { type: "number | undefined", description: "Current/controlled width value in pixels. Required when `onResizeEnd` is provided. Pass `undefined` when the persisted v..." }
  onResizeEnd: { type: "(width: number) => void", description: "Callback fired when a resize operation ends (drag release or keyboard key up). When provided, replaces localStorage pers..." }
  widthStorageKey: { type: "string", default: "'paneWidth'", description: "localStorage key used to persist the pane width across sessions. Only applies when `resizable` is `true` and no `onResiz..." }
  sticky: { type: "boolean", default: "false", description: "Whether the pane should stick to the top of the screen while the content scrolls." }
  offsetHeader: { type: "number | string", default: "0", description: "Use offsetHeader along with the sticky prop to push the sticky pane down to make room for a sticky header if necessary. ..." }
  padding: { type: "| 'none' | 'condensed' | 'normal'", default: "'none'", description: "The amount of padding inside the pane." }
  divider: { type: "| 'none' | 'line' | { narrow?: | 'none' | 'line' | 'filled' regular?: | 'none' | 'line' wide?: | 'none' | 'line' }", default: "'none'" }
  dividerWhenNarrow: { type: "| 'inherit' | 'none' | 'line' | 'filled'", default: "'inherit'", deprecated: true, description: "Use the divider prop with a responsive value instead." }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the pane is hidden." }
  position: { type: "'end' | 'start' | { narrow?: 'end' | 'start'; regular?: 'end' | 'start'; wide?: 'end' | 'start'; }", description: "Which side of the page the pane should be on. Can be changed for different viewport widths." }
  ref: { type: "React.RefObject<HTMLDivElement>" }

PageLayout.Sidebar:
  aria-label: { type: "string | undefined", description: "A unique label for the sidebar region." }
  aria-labelledby: { type: "string | undefined", description: "An id to an element which uniquely labels the sidebar region." }
  position: { type: "'start' | 'end'", default: "'start'", description: "Position of the sidebar relative to the page layout. The sidebar spans the full height of the layout, adjacent to the he..." }
  width: { type: "| 'small' | 'medium' | 'large' | { min: string max: string default: string }", default: "'medium'", description: "The width of the sidebar. If using custom widths, provide an object with keys 'min', 'max' and 'default'." }
  minWidth: { type: "number", default: "256", description: "Minimum width of the sidebar when resizable." }
  resizable: { type: "boolean", default: "false", description: "When true, the sidebar may be resized by the user. By default no persistence is applied; pass `widthStorageKey` to persi..." }
  currentWidth: { type: "number | undefined", description: "Current/controlled width value in pixels. Required when `onResizeEnd` is provided. Pass `undefined` when the persisted v..." }
  onResizeEnd: { type: "(width: number) => void", description: "Callback fired when a resize operation ends (drag release or keyboard key up). When provided, replaces localStorage pers..." }
  widthStorageKey: { type: "string", description: "localStorage key used to persist the sidebar width across sessions. Only applies when `resizable` is `true` and no `onRe..." }
  padding: { type: "| 'none' | 'condensed' | 'normal'", default: "'none'", description: "The amount of padding inside the sidebar." }
  divider: { type: "| 'none' | 'line'", default: "'none'", description: "Divider style between the sidebar and the rest of the layout." }
  sticky: { type: "boolean", default: "false", description: "Whether the sidebar sticks to the viewport when scrolling. When enabled, the sidebar uses position: sticky with top: 0 a..." }
  responsiveVariant: { type: "| 'default' | 'fullscreen'", default: "'default'", description: "Controls sidebar behavior at narrow viewport widths (below 768px). 'default' retains its normal inline layout. 'fullscre..." }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the sidebar is hidden." }

PageLayout.Footer:
  aria-label: { type: "string | undefined", description: "A unique label for the rendered contentinfo landmark" }
  aria-labelledby: { type: "string | undefined", description: "An id to an element which uniquely labels the rendered contentinfo landmark" }
  padding: { type: "| 'none' | 'condensed' | 'normal'", default: "'none'", description: "The amount of padding inside the footer." }
  divider: { type: "| 'none' | 'line' | { narrow?: | 'none' | 'line' | 'filled' regular?: | 'none' | 'line' wide?: | 'none' | 'line' }", default: "'none'" }
  dividerWhenNarrow: { type: "| 'inherit' | 'none' | 'line' | 'filled'", default: "'inherit'", deprecated: true, description: "Use the divider prop with a responsive value instead." }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the footer is hidden." }
```

## Examples

### Features: Pull Request Page

```tsx
() => (
  <PageLayout>
    <PageLayout.Header>
      <div className={classes.HeaderStack}>
        <div>
          <Heading as="h1" className={classes.TitleHeading}>
            Input validation styles{' '}
            <Text className={classes.TitleSubdued}>#1831</Text>
          </Heading>
          <div className={classes.StatusRow}>
            <StateLabel status="pullOpened">Open</StateLabel>
            <Text className={classes.StatusMeta}>
              <Link href="#" muted className={classes.BoldMetaLink}>
                mperrotti
              </Link>{' '}
              wants to merge 3 commits into{' '}
              <BranchName href="#">main</BranchName> from{' '}
              <BranchName href="#">mp/validation-styles</BranchName>
            </Text>
          </div>
        </div>
        <TabNav>
          <TabNav.Link href="#" selected>
            Conversation
          </TabNav.Link>
          <TabNav.Link href="#">Commits</TabNav.Link>
          <TabNav.Link href="#">Checks</TabNav.Link>
          <TabNav.Link href="#">Files changed</TabNav.Link>
        </TabNav>
      </div>
    </PageLayout.Header>
    <PageLayout.Content>
      <div className={classes.ContentBox}></div>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div className={classes.ScrollBox} tabIndex={0}>
        This box has really long content. If it is too long, it will cause x
        overflow and should show a scrollbar. When this overflows, it should not
        break to overall page layout!
      </div>
    </PageLayout.Content>
    <PageLayout.Pane aria-label="Side pane">
      <div className={classes.PaneStack}>
        <div>
          <Text className={classes.PaneSectionHeading}>Assignees</Text>
          <Text className={classes.PaneMetaText}>
            No one –{' '}
            <Link href="#" muted>
              assign yourself
            </Link>
          </Text>
        </div>
        <div role="separator" className={classes.PaneSeparator}></div>
        <div>
          <Text className={classes.PaneSectionHeading}>Labels</Text>
          <Text className={classes.PaneMetaText}>None yet</Text>
        </div>
      </div>
    </PageLayout.Pane>
  </PageLayout>
)
```

### Features: Sticky Pane

```tsx
(args) => (
  <PageLayout
    rowGap="none"
    columnGap="none"
    padding="none"
    containerWidth="full"
  >
    <PageLayout.Header padding="normal" divider="line">
      <Placeholder label="Header" height={64} />
    </PageLayout.Header>
    <PageLayout.Content padding="normal" width="large">
      <div className={classes.ContentGrid}>
        {Array.from({
          length: args.numParagraphsInContent,
        }).map((_, i) => {
          const testId = `content${i}`
          return (
            <p key={i} className={classes.Paragraph}>
              <span data-testid={testId}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                enim id lorem tempus egestas a non ipsum. Maecenas imperdiet
                ante quam, at varius lorem molestie vel. Sed at eros consequat,
                varius tellus et, auctor felis. Donec pulvinar lacinia urna nec
                commodo. Phasellus at imperdiet risus. Donec sit amet massa
                purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus
                felis. Ut porttitor auctor tellus in imperdiet. Ut blandit
                tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum
                auctor euismod nisi. Nullam tincidunt est in mi tincidunt
                dictum. Sed consectetur aliquet velit ut ornare.
              </span>
            </p>
          )
        })}
      </div>
    </PageLayout.Content>
    <PageLayout.Pane
      position="start"
      resizable
      padding="normal"
      divider="line"
      sticky={args.sticky}
      aria-label="Side pane"
    >
      <div className={classes.ContentGrid}>
        {Array.from({
          length: args.numParagraphsInPane,
        }).map((_, i) => {
          const testId = `paragraph${i}`
          return (
            <p key={i} className={classes.Paragraph}>
              <span data-testid={testId}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                enim id lorem tempus egestas a non ipsum. Maecenas imperdiet
                ante quam, at varius lorem molestie vel. Sed at eros consequat,
                varius tellus et, auctor felis. Donec pulvinar lacinia urna nec
                commodo. Phasellus at imperdiet risus. Donec sit amet massa
                purus.
              </span>
            </p>
          )
        })}
        <p>
          Donec sit amet massa purus.{' '}
          <Link inline href="#foo">
            Plura de lorem Ispum.
          </Link>
        </p>
      </div>
    </PageLayout.Pane>
    <PageLayout.Footer padding="normal" divider="line">
      <Placeholder label="Footer" height={64} />
    </PageLayout.Footer>
  </PageLayout>
)
```

### Features: Nested Scroll Container

```tsx
(args) => (
  <div className={classes.NestedScrollContainer}>
    <Placeholder label="Above scroll container" height={120} />
    <div className={classes.OverflowAuto}>
      <PageLayout
        rowGap="none"
        columnGap="none"
        padding="none"
        containerWidth="full"
      >
        <PageLayout.Header padding="normal" divider="line">
          <Placeholder label="Header" height={64} />
        </PageLayout.Header>
        <PageLayout.Content padding="normal" width="large">
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <div
            className={classes.ContentGrid}
            tabIndex={0}
            role="region"
            aria-label="Page content"
          >
            {Array.from({
              length: args.numParagraphsInContent,
            }).map((_, i) => (
              <p key={i} className={classes.Paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                enim id lorem tempus egestas a non ipsum. Maecenas imperdiet
                ante quam, at varius lorem molestie vel. Sed at eros consequat,
                varius tellus et, auctor felis. Donec pulvinar lacinia urna nec
                commodo. Phasellus at imperdiet risus. Donec sit amet massa
                purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus
                felis. Ut porttitor auctor tellus in imperdiet. Ut blandit
                tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum
                auctor euismod nisi. Nullam tincidunt est in mi tincidunt
                dictum. Sed consectetur aliquet velit ut ornare.
              </p>
            ))}
          </div>
        </PageLayout.Content>
        <PageLayout.Pane
          position="start"
          padding="normal"
          divider="line"
          sticky
          aria-label="Side pane"
        >
          <div className={classes.ContentGrid}>
            {Array.from({
              length: args.numParagraphsInPane,
            }).map((_, i) => (
              <p key={i} className={classes.Paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
                enim id lorem tempus egestas a non ipsum. Maecenas imperdiet
                ante quam, at varius lorem molestie vel. Sed at eros consequat,
                varius tellus et, auctor felis. Donec pulvinar lacinia urna nec
                commodo. Phasellus at imperdiet risus. Donec sit amet massa
                purus.
              </p>
            ))}
          </div>
        </PageLayout.Pane>
        <PageLayout.Footer padding="normal" divider="line">
          <Placeholder label="Footer" height={64} />
        </PageLayout.Footer>
      </PageLayout>
    </div>
    <Placeholder label="Below scroll container" height={120} />
  </div>
)
```
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
name: InlineMessage
description: "InlineMessage is used to inform the user about the result of an action within the content."
import: "@primer/react/experimental"
docs: https://primer.style/product/components/inline-message
a11y_docs: https://primer.style/product/components/inline-message/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/InlineMessage
storybook: https://primer.style/react/storybook/?path=/story/components-inline-message
---

# InlineMessage

InlineMessage is used to inform the user about the result of an action within the content.

## Usage

```tsx
import { InlineMessage } from '@primer/react/experimental'
```

### Example

```tsx
() => {
  return (
    <InlineMessage variant="unavailable">
      An example inline message
    </InlineMessage>
  )
}
```

## Props

```yaml
InlineMessage:
  size: { type: "'small' | 'medium'", default: "'medium'", description: "Specify the size of the inline message" }
  variant: { type: "'critical' | 'success' | 'unvailable' | 'warning'", required: true, description: "Specify the type of the inline message" }
  leadingVisual: { type: "React.ElementType | React.ReactNode", description: "A custom leading visual to display instead of the default variant icon." }
```

## Examples

### Experimental Components Inlinemessage Features: Critical

```tsx
() => {
  return (
    <InlineMessage variant="critical">An example inline message</InlineMessage>
  )
}
```

### Experimental Components Inlinemessage Features: Success

```tsx
() => {
  return (
    <InlineMessage variant="success">An example inline message</InlineMessage>
  )
}
```

### Experimental Components Inlinemessage Features: Unavailable

```tsx
() => {
  return (
    <InlineMessage variant="unavailable">
      An example inline message
    </InlineMessage>
  )
}
```
---
name: CounterLabel
description: "Adds a count to navigational elements and buttons."
import: "@primer/react"
docs: https://primer.style/product/components/counter-label
a11y_docs: https://primer.style/product/components/counter-label/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/CounterLabel
storybook: https://primer.style/react/storybook/?path=/story/components-counter-label
---

# CounterLabel

Adds a count to navigational elements and buttons.

## Usage

```tsx
import { CounterLabel } from '@primer/react'
```

### Example

```tsx
() => <CounterLabel>12</CounterLabel>
```

## Props

```yaml
CounterLabel:
  variant: { type: "'primary' | 'secondary'", description: "Pass in 'primary' for a darker background and inverse text, or 'secondary' for a lighter background and primary text. Om..." }
  scheme: { type: "'primary' | 'secondary'", deprecated: true, description: "Use `variant` instead." }
  className: { type: "string", description: "Class name(s) for custom styling." }
```

## Examples

### Features: Primary Theme

```tsx
() => <CounterLabel variant="primary">12</CounterLabel>
```

### Features: Secondary Theme

```tsx
() => <CounterLabel variant="secondary">12</CounterLabel>
```
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
name: Spinner
description: "A Spinner is an indeterminate loading indicator, ideal for processes with unknown or variable durations."
import: "@primer/react"
docs: https://primer.style/product/components/spinner
a11y_docs: https://primer.style/product/components/spinner/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Spinner
storybook: https://primer.style/react/storybook/?path=/story/components-spinner
---

# Spinner

A Spinner is an indeterminate loading indicator, ideal for processes with unknown or variable durations.

## Usage

```tsx
import { Spinner } from '@primer/react'
```

### Example

```tsx
() => <Spinner />
```

## Props

```yaml
Spinner:
  size: { type: "'small' | 'medium' | 'large'", description: "Sets the width and height of the spinner." }
  srText: { type: "string | null", default: "Loading", description: "Sets the text conveyed by assistive technologies such as screen readers. Set to `null` if the loading state is displayed..." }
  aria-label: { type: "string", deprecated: true, description: "Sets the text conveyed by assistive technologies such as screen readers." }
  className: { type: "string" }
  data-*: { type: "string" }
  delay: { type: "boolean | 'short' | 'long' | number", default: "false", description: "Controls whether and how long to delay rendering the spinner. Set to `true` to delay by 1000ms, `'short'` to delay by 30..." }
```

## Examples

### Features: Small

```tsx
() => <Spinner size="small" />
```

### Features: Large

```tsx
() => <Spinner size="large" />
```

### Features: Suppress Screen Reader Text

```tsx
() => (
  <Stack direction="horizontal" className={classes.SuppressScreenReaderText}>
    <Spinner size="small" srText={null} />
    <AriaStatus>Loading...</AriaStatus>
  </Stack>
)
```
---
name: ProgressBar
description: "A ProgressBar is a simple chart that can be used to show how complete something is, or visualize parts that make up a whole."
import: "@primer/react"
docs: https://primer.style/product/components/progress-bar
a11y_docs: https://primer.style/product/components/progress-bar/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/ProgressBar
storybook: https://primer.style/react/storybook/?path=/story/components-progress-bar
---

# ProgressBar

A ProgressBar is a simple chart that can be used to show how complete something is, or visualize parts that make up a whole.

## Usage

```tsx
import { ProgressBar } from '@primer/react'
```

### Example

```tsx
() => <ProgressBar aria-label="Upload test.png" />
```

## Props

```yaml
ProgressBar:
  animated: { type: "boolean", description: "Whether the filled in area(s) of the progress bar will be animated or not" }
  progress: { type: "number", default: "0", description: "Used to set the size of the green bar" }
  barSize: { type: "| 'small' | 'large' | 'default'", default: "'default'", description: "Controls the height of the progress bar. If omitted, height is set to the default height." }
  inline: { type: "boolean", default: "false", description: "Styles the progress bar inline" }
  bg: { type: "string", default: "'bg.successInverse'", description: "Set the progress bar color" }

ProgressBar.Item:
  aria-label: { type: "string", description: "Defines a string value that labels the current element. @see aria-labelledby." }
  bg: { type: "string", default: "success.emphasis", description: "Set the progress segment color" }
  progress: { type: "string | number", default: "0", description: "Used to set the size of the green bar" }
```

## Examples

### Features: Progress Zero

```tsx
() => <ProgressBar progress="0" aria-label="Upload test.png" />
```

### Features: Progress Half

```tsx
() => <ProgressBar progress="50" aria-label="Upload test.png" />
```

### Features: Progress Done

```tsx
() => <ProgressBar progress="100" aria-label="Upload test.png" />
```
