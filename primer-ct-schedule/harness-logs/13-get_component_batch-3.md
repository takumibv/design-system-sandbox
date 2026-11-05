# get_component_batch

- args: `{"names":["PageHeader","ActionList","Link","Token","InlineMessage","Header","CounterLabel","Octicon","Flash","Card"]}`
- isError: false
- ms: 416
- chars: 32302

---

---
name: PageHeader
description: "PageHeader determines the top-level headings of a UI."
import: "@primer/react"
docs: https://primer.style/product/components/page-header
a11y_docs: https://primer.style/product/components/page-header/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/PageHeader
storybook: https://primer.style/react/storybook/?path=/story/components-page-header
---

# PageHeader

PageHeader determines the top-level headings of a UI.

## Usage

```tsx
import { PageHeader } from '@primer/react'
```

### Example

```tsx
() => (
  <div className={classes.PaddingContainer}>
    <PageHeader role="banner" aria-label="Title">
      <PageHeader.TitleArea>
        <PageHeader.Title>Title</PageHeader.Title>
      </PageHeader.TitleArea>
    </PageHeader>
  </div>
)
```

## Props

```yaml
PageHeader:
  aria-label: { type: "string | undefined", description: "A unique label for the rendered landmark" }
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden. The component can be hidden for all viewport widths, or specified viewport widths. Some c..." }
  role: { type: "AriaRole", description: "The ARIA role to assign to the top-level node of this component." }
  as: { type: "React.ElementType", default: "'div'" }
  hasBorder: { type: "boolean", description: "Whether to render a border below the PageHeader. This border will NOT be rendered if the PageHeader has a `PageHeader.Na..." }

PageHeader.ContextArea:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.ParentLink:
  aria-label: { type: "string | undefined", description: "A unique label for the rendered landmark" }
  className: { type: "string | undefined", description: "CSS string" }
  href: { type: "string", description: "The URL to link to." }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "`{ narrow: false regular: true wide: true }`", description: "Whether the parent link is hidden." }

PageHeader.ContextBar:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.ContextAreaActions:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.TitleArea:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }
  variant: { type: "| 'subtitle' | 'medium' | 'large' | { narrow?: | 'subtitle' | 'medium' | 'large' regular?: | 'subtitle' | 'medium' | 'large' wide?: | 'subtitle' | 'medium' | 'large' }", default: "medium", description: "Default title (medium) is the most common page title size. Use for static titles in most situations. Large variant shoul..." }

PageHeader.LeadingAction:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.LeadingVisual:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.Title:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }
  as: { type: "React.ElementType", default: "'h2'" }

PageHeader.TrailingVisual:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.TrailingAction:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.Actions:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.Breadcrumbs:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.Description:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.Navigation:
  aria-label: { type: "string", description: "The aria-label attribute for the navigaton component when it is rendered as a 'nav' element." }
  aria-labelledby: { type: "string", description: "The aria-labelledby attribute for the navigaton component when it is rendered as a 'nav' element." }
  as: { type: "div | nav", default: "'div'", description: "The HTML element used to render the navigation." }
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }
```

## Examples

### Features: Has Large Title

```tsx
() => (
  <div className={classes.PaddingContainer}>
    <PageHeader role="banner" aria-label="Title">
      <PageHeader.TitleArea variant="large">
        <PageHeader.Title>Title</PageHeader.Title>
      </PageHeader.TitleArea>
    </PageHeader>
  </div>
)
```

### Features: With Leading And Trailing Visuals

```tsx
() => (
  <div className={classes.PaddingContainer}>
    <PageHeader role="banner" aria-label="Title">
      <PageHeader.TitleArea>
        <PageHeader.LeadingVisual>
          <GitPullRequestIcon />
        </PageHeader.LeadingVisual>
        <PageHeader.Title>Title</PageHeader.Title>
        <PageHeader.TrailingVisual>
          <Label>Beta</Label>
        </PageHeader.TrailingVisual>
      </PageHeader.TitleArea>
    </PageHeader>
  </div>
)
```

### Features: With Leading Visual Hidden On Regular Viewport

```tsx
() => (
  <div className={classes.PaddingContainer}>
    <PageHeader role="banner" aria-label="Title">
      <PageHeader.TitleArea>
        <PageHeader.LeadingVisual
          hidden={{
            regular: true,
          }}
        >
          <GitPullRequestIcon />
        </PageHeader.LeadingVisual>
        <PageHeader.Title>Title</PageHeader.Title>
        <PageHeader.TrailingVisual>
          <Label>Beta</Label>
        </PageHeader.TrailingVisual>
      </PageHeader.TitleArea>
    </PageHeader>
  </div>
)
```
---
name: ActionList
description: "ActionList is a vertical list of interactive actions or options. It's composed of items presented in a consistent, single-column format, with room for icons, descriptions, side information, and other rich visuals."
import: "@primer/react"
docs: https://primer.style/product/components/action-list
a11y_docs: https://primer.style/product/components/action-list/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/ActionList
storybook: https://primer.style/react/storybook/?path=/story/components-action-list
---

# ActionList

ActionList is a vertical list of interactive actions or options. It's composed of items presented in a consistent, single-column format, with room for icons, descriptions, side information, and other rich visuals.

## Usage

```tsx
import { ActionList } from '@primer/react'
```

### Example

```tsx
() => (
  <ActionList>
    <ActionList.Item>Copy link</ActionList.Item>
    <ActionList.Item>Quote reply</ActionList.Item>
    <ActionList.Item>Edit comment</ActionList.Item>
  </ActionList>
)
```

## Props

```yaml
ActionList:
  children: { type: "ActionList.Item[] | ActionList.LinkItem[] | ActionList.Group[]", required: true }
  variant: { type: "'inset' | 'horizontal-inset' | 'full'", default: "'inset'", description: "`inset` children are offset (vertically and/or horizontally) from list edges. `full` children are flush (vertically and ..." }
  selectionVariant: { type: "'single' | 'multiple'", description: "Whether multiple items or a single item can be selected." }
  showDividers: { type: "boolean", description: "Display a divider above each `Item` in this `List` when it does not follow a `Header` or `Divider`." }
  role: { type: "AriaRole", description: "ARIA role describing the function of the list. `listbox` and `menu` are a common values." }
  disableItemGap: { type: "boolean", default: "false", description: "Disable the gap between items when this `ActionList` is rendered in a `NavList`." }

ActionList.Item:
  children: { type: "React.ReactNode | ActionList.LeadingVisual | ActionList.Description | ActionList.TrailingVisual", required: true, description: "Primary content for an Item" }
  variant: { type: "'default' | 'danger'", default: "'default'", description: "`danger` indicates that the item is destructive." }
  size: { type: "'small' | 'medium' | 'large'", default: "'medium'", description: "The block size of the ActionList item. The `small` size also uses small body text." }
  onSelect: { type: "(event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>) => void", description: "Callback that is called when the item is selected using either the mouse or keyboard. `event.preventDefault()` will prev..." }
  selected: { type: "boolean", default: "false", description: "Indicate whether the item is selected. Only applies to items that can be selected." }
  active: { type: "boolean", default: "false", description: "Indicate whether the item is active. There should never be more than one active item." }
  disabled: { type: "boolean", default: "false", description: "Items that are disabled can not be clicked, selected, or navigated to." }
  inactiveText: { type: "string", description: "Text describing why the item is inactive. This may be used when an item's usual functionality is unavailable due to a sy..." }
  loading: { type: "boolean", description: "Whether the item is loading." }
  role: { type: "AriaRole", description: "ARIA role describing the function of the item. `option` is a common value." }
  id: { type: "string", description: "id to attach to the root element of the Item" }

ActionList.Heading:
  children: { type: "React.ReactNode", required: true, description: "Use to give a heading to list" }
  as: { type: "h1 | h2 | h3 | h4 | h5 | h6", default: "h3", description: "The level of the heading" }
  visuallyHidden: { type: "boolean" }

ActionList.LinkItem:
  children: { type: "React.ReactNode | ActionList.LeadingVisual | ActionList.Description | ActionList.TrailingVisual", required: true }
  active: { type: "boolean", default: "false", description: "Indicate whether the item is active. There should never be more than one active item." }
  size: { type: "'small' | 'medium' | 'large'", default: "'medium'", description: "The block size of the ActionList item. The `small` size also uses small body text." }
  ref: { type: "React.RefObject<HTMLAnchorElement>" }
  as: { type: "React.ElementType", default: "'a'" }
  inactiveText: { type: "string", description: "Text describing why the item is inactive. This may be used when an item's usual functionality is unavailable due to a sy..." }

ActionList.LeadingVisual:
  children: { type: "React.ReactNode", required: true, description: "Icon (or similar) positioned before item text." }

ActionList.TrailingVisual:
  children: { type: "React.ReactNode", required: true, description: "Visual positioned after item text." }

ActionList.TrailingAction:
  as: { type: "a | button", default: "button", description: "HTML element to render as." }
  label: { type: "string", required: true, description: "Accessible name for the control." }
  icon: { type: "string", required: true, description: "Octicon to pass into IconButton. When this is not set, TrailingAction renders as a `Button` instead of an `IconButton`." }
  href: { type: "string", description: "href when the TrailingAction is rendered as a link." }
  loading: { type: "boolean", default: "false", description: "Whether the TrailingAction is in a loading state. When true, the TrailingAction will render a spinner instead of an icon..." }
  tooltipDirection: { type: "'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw'", default: "'w'", description: "Direction of the tooltip shown when hovering over the TrailingAction. Only applies when `icon` is set." }

ActionList.Description:
  children: { type: "React.ReactNode", required: true }
  variant: { type: "'inline' | 'block'", default: "'inline'", description: "`inline` descriptions are positioned beside primary text. `block` descriptions are positioned below primary text." }
  className: { type: "string | undefined", description: "CSS string" }
  truncate: { type: "boolean", default: "false", description: "Whether the inline description should truncate the text on overflow." }

ActionList.GroupHeading:
  children: { type: "React.ReactNode", required: true, description: "Use to give a heading to the groups" }
  variant: { type: "'filled' | 'subtle'", default: "'subtle'", description: "`filled` style has a background color and top and bottom borders. Subtle style has no background or borders." }
  auxiliaryText: { type: "string", description: "Secondary text which provides additional information about a `Group`." }
  visuallyHidden: { type: "boolean" }
  as: { type: "h1 | h2 | h3 | h4 | h5 | h6", default: "h3", description: "The level of the heading and it is only required (enforce by runtime warning) for lists. (i.e. not required for ActionMe..." }

ActionList.Group:
  children: { type: "ActionList.Item[] | ActionList.LinkItem[]", required: true }
  title: { type: "string", deprecated: true, description: "Please use `ActionList.GroupHeading` instead." }
  auxiliaryText: { type: "string", description: "Secondary text that provides additional information about the group." }
  variant: { type: "'filled' | 'subtle'", default: "'subtle'", description: "`inline` descriptions are positioned beside primary text. `block` descriptions are positioned below primary text." }
  selectionVariant: { type: "'single' | 'multiple' | false", description: "Set `selectionVariant` at the group level." }
  role: { type: "AriaRole", description: "ARIA role describing the function of the list inside the group. `listbox` and `menu` are a common values." }
```

## Examples

### Features: Simple List

```tsx
() => (
  <ActionList>
    <ActionList.Item>Copy link</ActionList.Item>
    <ActionList.Item>Quote reply</ActionList.Item>
    <ActionList.Item>Edit comment</ActionList.Item>
    <ActionList.Divider />
    <ActionList.Item variant="danger">Delete file</ActionList.Item>
  </ActionList>
)
```

### Features: With Visual List Heading

```tsx
() => (
  <ActionList>
    <ActionList.Heading as="h2" size="small">
      Filter by
    </ActionList.Heading>
    <ActionList.Group>
      <ActionList.GroupHeading as="h3">Repositories</ActionList.GroupHeading>
      <ActionList.Item onSelect={() => {}}>
        <ActionList.LeadingVisual>
          <FileDirectoryIcon />
        </ActionList.LeadingVisual>
        app/assets/modules
      </ActionList.Item>
      <ActionList.Item onSelect={() => {}}>
        <ActionList.LeadingVisual>
          <FileDirectoryIcon />
        </ActionList.LeadingVisual>
        src/react/components
      </ActionList.Item>
      <ActionList.Item onSelect={() => {}}>
        <ActionList.LeadingVisual>
          <FileDirectoryIcon />
        </ActionList.LeadingVisual>
        memex/shared-ui/components
      </ActionList.Item>
      <ActionList.Item onSelect={() => {}}>
        <ActionList.LeadingVisual>
          <FileDirectoryIcon />
        </ActionList.LeadingVisual>
        views/assets/modules
      </ActionList.Item>
    </ActionList.Group>

    <ActionList.Group>
      <ActionList.GroupHeading as="h3">Advanced</ActionList.GroupHeading>
      <ActionList.Item onSelect={() => {}}>
        <ActionList.LeadingVisual>
          <PlusCircleIcon />
        </ActionList.LeadingVisual>
        Owner
      </ActionList.Item>
      <ActionList.Item onSelect={() => {}}>
        <ActionList.LeadingVisual>
          <PlusCircleIcon />
        </ActionList.LeadingVisual>
        Symbol
      </ActionList.Item>
      <ActionList.Item onSelect={() => {}}>
        <ActionList.LeadingVisual>
          <PlusCircleIcon />
        </ActionList.LeadingVisual>
        Exclude archived
      </ActionList.Item>
    </ActionList.Group>
  </ActionList>
)
```

### Features: With Custom Heading

```tsx
() => (
  <>
    <Heading as="h1" id="list-heading" className={classes.HeadingLarge}>
      Details
    </Heading>
    <ActionList aria-labelledby="list-heading">
      <ActionList.LinkItem href="https://github.com/primer/react#readme">
        <ActionList.LeadingVisual>
          <BookIcon />
        </ActionList.LeadingVisual>
        Readme
      </ActionList.LinkItem>
      <ActionList.LinkItem href="https://github.com/primer/react/blob/main/LICENSE">
        <ActionList.LeadingVisual>
          <LawIcon />
        </ActionList.LeadingVisual>
        MIT License
      </ActionList.LinkItem>
      <ActionList.LinkItem href="https://github.com/primer/react/stargazers">
        <ActionList.LeadingVisual>
          <StarIcon />
        </ActionList.LeadingVisual>
        <strong>1.5k</strong> stars
      </ActionList.LinkItem>
      <ActionList.LinkItem href="https://github.com/primer/react/watchers">
        <ActionList.LeadingVisual>
          <EyeIcon />
        </ActionList.LeadingVisual>
        <strong>21</strong> watching
      </ActionList.LinkItem>
      <ActionList.LinkItem href="https://github.com/primer/react/network/members">
        <ActionList.LeadingVisual>
          <RepoForkedIcon />
        </ActionList.LeadingVisual>
        <strong>225</strong> forks
      </ActionList.LinkItem>
    </ActionList>
  </>
)
```
---
name: Link
description: "Links are used to apply styles to hyperlink text."
import: "@primer/react"
docs: https://primer.style/product/components/link
a11y_docs: https://primer.style/product/components/link/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Link
storybook: https://primer.style/react/storybook/?path=/story/components-link
---

# Link

Links are used to apply styles to hyperlink text.

## Usage

```tsx
import { Link } from '@primer/react'
```

### Example

```tsx
() => <Link href="#">Links are great</Link>
```

## Props

```yaml
Link:
  href: { type: "string", description: "URL to be used for the Link. (The `href` is passed to the underlying `<a>` element. If `as` is specified, the link behav..." }
  muted: { type: "boolean", default: "false", description: "Uses a less prominent shade for Link color, and the default link shade on hover." }
  inline: { type: "boolean", default: "false", description: "Set to true for links adjacent to text, underlining them for clear visibility and improved accessibility." }
  hoverColor: { type: "string", deprecated: true, description: "Use CSS modules to style hover color." }
  ref: { type: "React.RefObject<HTMLAnchorElement>" }
  as: { type: "React.ElementType", default: "'a'" }
```

## Examples

### Features: Muted

```tsx
() => (
  <Link href="#" muted>
    Link
  </Link>
)
```

### Features: Inline

```tsx
() => (
  <div data-a11y-link-underlines="true">
    <Link inline={true} href="#">
      Link
    </Link>
  </div>
)
```
---
name: Token
description: "Token is a compact representation of an object, and is typically used to show a collection of related metadata."
import: "@primer/react"
docs: https://primer.style/product/components/token
a11y_docs: https://primer.style/product/components/token/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Token
storybook: https://primer.style/react/storybook/?path=/story/components-token
---

# Token

Token is a compact representation of an object, and is typically used to show a collection of related metadata.

## Usage

```tsx
import { Token } from '@primer/react'
```

### Example

```tsx
() => <Token text="token" />
```

## Props

```yaml
Token:
  leadingVisual: { type: "React.ComponentType<React.PropsWithChildren<any>>", description: "A function that renders a component before the token text" }
  text: { type: "string", required: true, description: "The text label inside the token" }
  as: { type: "'button' | 'a' | 'span'", default: "'span'" }
  onRemove: { type: "() => void", description: "The function that gets called when a user clicks the remove button, or keys `Backspace` or `Delete` when focused on the ..." }
  hideRemoveButton: { type: "boolean", description: "Whether the remove button should be rendered in the token" }
  isSelected: { type: "boolean", description: "Whether the token is selected" }
  id: { type: "number | string", description: "A unique identifier that can be associated with the token" }
  size: { type: "'small' | 'medium' | 'large' | 'xlarge'", description: "Which size the token will be rendered at" }

IssueLabelToken:
  fillColor: { type: "string", description: "The color that corresponds to the label" }
  text: { type: "string", required: true, description: "The text label inside the token" }
  as: { type: "'button' | 'a' | 'span'", default: "'span'" }
  onRemove: { type: "() => void", description: "The function that gets called when a user clicks the remove button, or keys `Backspace` or `Delete` when focused on the ..." }
  hideRemoveButton: { type: "boolean", description: "Whether the remove button should be rendered in the token" }
  isSelected: { type: "boolean", description: "Whether the token is selected" }
  id: { type: "number | string", description: "A unique identifier that can be associated with the token" }
  size: { type: "'small' | 'medium' | 'large' | 'xlarge'", description: "Which size the token will be rendered at" }
```

## Examples

### Features: Interactive Token

```tsx
() => {
  return (
    <div className={classes.TokenRow}>
      <Token
        as="a"
        href="/?path=/story/components-token-features--issue-label-token-custom-colors"
        text="Link"
      />
      <Token as="button" onClick={action('clicked')} text="Button" />
    </div>
  )
}
```

### Features: Token With Leading Visual

```tsx
() => {
  return <Token text="token" leadingVisual={GitBranchIcon} />
}
```

### Features: Token With On Remove Fn

```tsx
({ ...args }) => {
  return (
    <div className={classes.TokenRow}>
      <Token text="token" onRemove={action('remove me')} {...args} />
      <Token
        as="a"
        href="/?path=/story/components-token-features--issue-label-token-custom-colors"
        onRemove={action('remove me')}
        text="Link"
        {...args}
      />
      <Token
        as="button"
        onClick={action('clicked')}
        onRemove={action('remove me')}
        text="Button"
        {...args}
      />
    </div>
  )
}
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
## Header

Status: fetch-error. Failed to load documentation for Header.
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
## Octicon

Status: fetch-error. Failed to load documentation for Octicon.
## Flash

Status: fetch-error. Failed to load documentation for Flash.
---
name: Card
description: "Card is a styled container component that groups related content. By default it renders a div element, which carries no implicit semantics. The right markup pattern depends on how the Card is used: as a standalone region, or as one item in a collection (list)."
import: "@primer/react/experimental"
docs: https://primer.style/product/components/card
a11y_docs: https://primer.style/product/components/card/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Card
storybook: https://primer.style/react/storybook/?path=/story/components-card
---

# Card

Card is a styled container component that groups related content. By default it renders a div element, which carries no implicit semantics. The right markup pattern depends on how the Card is used: as a standalone region, or as one item in a collection (list).

## Usage

```tsx
import { Card } from '@primer/react/experimental'
```

### Example

```tsx
() => {
  return (
    <Card>
      <Card.Icon icon={RocketIcon} />
      <Card.Heading>Card Heading</Card.Heading>
      <Card.Description>
        This is a description of the card providing supplemental information.
      </Card.Description>
      <Card.Metadata>
        <PeopleIcon size={16} />3 contributors
      </Card.Metadata>
    </Card>
  )
}
```

## Props

```yaml
Card:
  children: { type: "React.ReactNode", required: true, description: "The contents of the card. Provide either `Card.*` subcomponents (for example `Card.Heading`, `Card.Description`, `Card.M..." }
  className: { type: "string", description: "CSS class name(s) for custom styling." }
  padding: { type: "'none' | 'condensed' | 'normal'", default: "'normal'", description: "Controls the internal padding of the Card." }
  borderRadius: { type: "'medium' | 'large'", default: "'large'", description: "Controls the border radius of the Card." }
  as: { type: "'div' | 'section'", default: "'div'", description: "The HTML element to render. Use `'section'` for **standalone** Cards (not inside a list of cards) so screen readers anno..." }

Card.Icon:
  icon: { type: "React.ElementType", description: "An Octicon or custom SVG icon to render." }
  aria-label: { type: "string", description: "Accessible label for the icon. When omitted, the icon is treated as decorative." }

Card.Image:
  src: { type: "string", description: "The image source URL." }
  alt: { type: "string", default: "''", description: "Alt text for accessibility. Defaults to empty string (decorative)." }

Card.Heading:
  as: { type: "'h2' | 'h3' | 'h4' | 'h5' | 'h6'", default: "'h3'", description: "The heading level to render. When the parent Card uses `as='section'`, the heading's `id` is automatically wired to the ..." }

Card.Description:
  children: { type: "React.ReactNode", required: true, description: "The descriptive text for the card. Rendered inside a `<p>` element so should be flowing text content." }

Card.Action:
  children: { type: "React.ReactNode", required: true, description: "Interactive control for the top-right corner of the card." }

Card.Metadata:
  children: { type: "React.ReactNode", required: true, description: "Metadata content for the bottom of the card. Accepts any content: plain text, icons, or other Primer components." }
```

## Examples

### Experimental Components Card Features: With Image

```tsx
() => {
  return (
    <Card>
      <Card.Image src="https://github.com/octocat.png" alt="Octocat" />
      <Card.Heading>Card with Image</Card.Heading>
      <Card.Description>
        This card uses an edge-to-edge image instead of an icon.
      </Card.Description>
    </Card>
  )
}
```

### Experimental Components Card Features: With Metadata

```tsx
() => {
  return (
    <Card>
      <Card.Icon icon={RepoIcon} />
      <Card.Heading>primer/react</Card.Heading>
      <Card.Description>
        {
          "GitHub's design system implemented as React components for building consistent user interfaces."
        }
      </Card.Description>
      <Card.Metadata>
        <StarIcon size={16} />
        1.2k stars
      </Card.Metadata>
    </Card>
  )
}
```

### Experimental Components Card Features: With Menu

```tsx
() => {
  return (
    <Card>
      <Card.Icon icon={RepoIcon} />
      <Card.Heading>primer/react</Card.Heading>
      <Card.Description>
        {
          "GitHub's design system implemented as React components for building consistent user interfaces."
        }
      </Card.Description>
      <Card.Action>
        <ActionMenu>
          <ActionMenu.Anchor>
            <IconButton
              icon={KebabHorizontalIcon}
              aria-label="More options for primer/react"
              variant="invisible"
            />
          </ActionMenu.Anchor>
          <ActionMenu.Overlay>
            <ActionList>
              <ActionList.Item>Star</ActionList.Item>
              <ActionList.Item>Watch</ActionList.Item>
              <ActionList.Item>Fork</ActionList.Item>
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
      </Card.Action>
    </Card>
  )
}
```
