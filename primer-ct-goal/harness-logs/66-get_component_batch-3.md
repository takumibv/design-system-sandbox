<!-- tool: get_component_batch / args: {"names":["Banner","Button","IconButton","ConfirmationDialog","UnderlineNav","ActionMenu","TextInput","Select","Card","PageHeader"]} / at: 2026-11-05T10:58:31.565Z / isError: false -->

---
name: Banner
description: "Banner is used to highlight important information."
import: "@primer/react"
docs: https://primer.style/product/components/banner
a11y_docs: https://primer.style/product/components/banner/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Banner
storybook: https://primer.style/react/storybook/?path=/story/components-banner
---

# Banner

Banner is used to highlight important information.

## Usage

```tsx
import { Banner } from '@primer/react'
```

### Example

```tsx
() => {
  return (
    <Banner
      onDismiss={action('onDismiss')}
      title="Info"
      description={
        <>
          GitHub users are{' '}
          <Link inline href="#">
            now required
          </Link>{' '}
          to enable two-factor authentication as an additional security measure.
        </>
      }
      primaryAction={<Banner.PrimaryAction>Button</Banner.PrimaryAction>}
      secondaryAction={<Banner.SecondaryAction>Button</Banner.SecondaryAction>}
    />
  )
}
```

## Props

```yaml
Banner:
  aria-label: { type: "string", description: "Provide an optional label to override the default name for the Banner landmark region" }
  className: { type: "string", description: "Provide an optional className to add to the outermost element rendered by the Banner" }
  description: { type: "React.ReactNode", description: "Provide an optional description for the Banner. This should provide supplemental information about the Banner" }
  hideTitle: { type: "boolean", description: "Whether to hide the title visually." }
  icon: { type: "React.ReactNode", deprecated: true, description: "Provide a custom icon for the Banner. This is only available when `variant` is `info` or `upsell`" }
  leadingVisual: { type: "React.ReactNode", description: "Provide a custom leading visual for the Banner. This is only available when `variant` is `info` or `upsell`" }
  onDismiss: { type: "() => void", description: "Optionally provide a handler to be called when the banner is dismissed. Providing this prop will show a dismiss button" }
  primaryAction: { type: "React.ReactNode" }
  secondaryAction: { type: "React.ReactNode" }
  title: { type: "React.ReactNode", description: "The title for the Banner. This will be used as the accessible name and is required unless `Banner.Title` is used as a ch..." }
  variant: { type: "'critical' | 'info' | 'success' | 'upsell' | 'warning'", description: "Specify the type of the Banner" }
  layout: { type: "'default' | 'compact'", description: "Specify the layout of the Banner. Compact layout will reduce the padding." }
  actionsLayout: { type: "'default' | 'inline' | 'stacked'", description: "Override the responsive layout of the action buttons. 'inline' layout will display the buttons inline with the title and..." }
  flush: { type: "boolean", default: "false", description: "Full width banner specifically for use within confined spaces, such as dialogs, tables, cards, or boxes where available ..." }

Banner.Title:
  as: { type: "'h2' | 'h3' | 'h4' | 'h5' | 'h6'" }

Banner.Description:
  className: { type: "string", description: "Class name(s) for custom styling." }

No props documented.

No props documented.
```

## Examples

### Features: Critical

```tsx
() => {
  return (
    <Banner
      title="Critical"
      description={
        <>
          GitHub users are{' '}
          <Link inline href="#">
            now required
          </Link>{' '}
          to enable two-factor authentication as an additional security measure.
        </>
      }
      variant="critical"
    />
  )
}
```

### Features: Info

```tsx
() => {
  return (
    <Banner
      title="Info"
      description={
        <>
          GitHub users are{' '}
          <Link inline href="#">
            now required
          </Link>{' '}
          to enable two-factor authentication as an additional security measure.
        </>
      }
      onDismiss={action('onDismiss')}
      variant="info"
    ></Banner>
  )
}
```

### Features: Success

```tsx
() => {
  return (
    <Banner
      title="Success"
      description={
        <>
          GitHub users are{' '}
          <Link inline href="#">
            now required
          </Link>{' '}
          to enable two-factor authentication as an additional security measure.
        </>
      }
      onDismiss={action('onDismiss')}
      variant="success"
    />
  )
}
```

---
name: Button
description: "Button is used to initiate actions on a page or form."
import: "@primer/react"
docs: https://primer.style/product/components/button
a11y_docs: https://primer.style/product/components/button/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Button
storybook: https://primer.style/react/storybook/?path=/story/components-button
---

# Button

Button is used to initiate actions on a page or form.

## Usage

```tsx
import { Button } from '@primer/react'
```

### Example

```tsx
() => <Button>Default</Button>
```

## Props

```yaml
Button:
  alignContent: { type: "'start' | 'center'", description: "Content alignment for when visuals are present." }
  as: { type: "React.ElementType", default: "'button'" }
  href: { type: "string", description: "**May only be used when `as` is set to 'a'**. The URL the button links to. If `as` is set to 'a', this prop is required...." }
  block: { type: "boolean", description: "Allow button width to fill its container." }
  children: { type: "React.ReactNode", required: true, description: "The content of the button." }
  count: { type: "number", description: "For counter buttons, the number to display." }
  inactive: { type: "boolean", description: "Whether the button looks visually disabled, but can still accept all the same interactions as an enabled button. This is..." }
  leadingIcon: { type: "React.ComponentType<OcticonProps>", deprecated: true, description: "An icon to display before the button text." }
  leadingVisual: { type: "React.ElementType", description: "A visual to display before the button text." }
  loading: { type: "boolean", description: "When true, the button is in a loading state." }
  loadingAnnouncement: { type: "string", description: "The content to announce to screen readers when loading. This requires `loading` prop to be true" }
  ref: { type: "React.RefObject<HTMLButtonElement>" }
  size: { type: "'small' | 'medium' | 'large'", default: "'medium'" }
  trailingIcon: { type: "React.ComponentType<OcticonProps>", deprecated: true, description: "An icon to display after the button text." }
  trailingVisual: { type: "React.ElementType", description: "A visual to display after the button text." }
  trailingAction: { type: "React.ElementType", description: "Trailing action appears to the right of the trailing visual and is always locked to the end" }
  variant: { type: "'default' | 'primary' | 'danger' | 'invisible' | 'link'", default: "'default'", description: "Change the visual style of the button." }
  labelWrap: { type: "boolean", default: "false", description: "Whether the button label should wrap to multiple lines of it is longer than the button width." }
  disabled: { type: "boolean", description: "Avoid disabling buttons because it will make them inaccessible to users who rely on keyboard navigation. Buttons that ar..." }
```

This component passes through props to `button`. See [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes) for details.

## Examples

### Features: Primary

```tsx
() => <Button variant="primary">Primary</Button>
```

### Features: Danger

```tsx
() => <Button variant="danger">Danger</Button>
```

### Features: Invisible

```tsx
() => <Button variant="invisible">Invisible</Button>
```

---
name: IconButton
description: "IconButton is used for buttons that show an icon in place of a text label."
import: "@primer/react"
docs: https://primer.style/product/components/icon-button
a11y_docs: https://primer.style/product/components/icon-button/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Button
storybook: https://primer.style/react/storybook/?path=/story/components-icon-button
---

# IconButton

IconButton is used for buttons that show an icon in place of a text label.

## Usage

```tsx
import { IconButton } from '@primer/react'
```

### Example

```tsx
() => <IconButton icon={<HeartIcon />} aria-label="Favorite" />
```

## Props

```yaml
IconButton:
  children: { type: "React.ReactNode", required: true, description: "This will be the Button description." }
  as: { type: "React.ElementType", default: "'button'" }
  href: { type: "string", description: "**May only be used when `as` is set to 'a'**. The URL the button links to. If `as` is set to 'a', this prop is required...." }
  variant: { type: "'default' | 'primary' | 'danger' | 'invisible' | 'link'", description: "Changes the look and feel of the button which is different for each variant" }
  size: { type: "'small' | 'medium' | 'large'", description: "Changes the size of the icon button component" }
  inactive: { type: "boolean", description: "Whether the button looks visually disabled, but can still accept all the same interactions as an enabled button." }
  icon: { type: "React.ReactNode | React.ComponentType<IconProps> | React.ExoticComponent<IconProps>", description: "Provide an icon component or React node. It will be placed in the center of the button. Use a React element when passing..." }
  aria-label: { type: "string", description: "Use an aria label to describe the functionality of the button. Please refer to [our guidance on alt text](https://primer..." }
  keyshortcuts: { type: "string", deprecated: true, description: "Use `keybindingHint` instead." }
  keybindingHint: { type: "string | string[]", description: "Optional keybinding hint to show in the tooltip for this button. Pass a string for a single shortcut or an array of stri..." }
  tooltipDirection: { type: "'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw'", default: "'s'", description: "The direction of the tooltip." }
  description: { type: "string", description: "If `description` is provided, we will use a Tooltip to describe the button. Then `aria-label` is used to label the butto..." }
```

## Examples

### Features: Primary

```tsx
() => (
  <IconButton icon={<HeartIcon />} variant="primary" aria-label="Favorite" />
)
```

### Features: Danger

```tsx
() => (
  <IconButton icon={<HeartIcon />} variant="danger" aria-label="Favorite" />
)
```

### Features: Invisible

```tsx
() => (
  <IconButton icon={<HeartIcon />} variant="invisible" aria-label="Favorite" />
)
```

---
name: ConfirmationDialog
description: "ConfirmationDialog is a specialized dialog component used to confirm user actions. It provides a simple way to ask users to confirm or cancel potentially destructive or important actions."
import: "@primer/react"
docs: https://primer.style/product/components/confirmation-dialog
a11y_docs: https://primer.style/product/components/confirmation-dialog/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/ConfirmationDialog
storybook: https://primer.style/react/storybook/?path=/story/components-confirmation-dialog
---

# ConfirmationDialog

ConfirmationDialog is a specialized dialog component used to confirm user actions. It provides a simple way to ask users to confirm or cancel potentially destructive or important actions.

## Usage

```tsx
import { ConfirmationDialog } from '@primer/react'
```

### Example

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])
  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        Show dialog
      </Button>
      {isOpen && (
        <ConfirmationDialog
          title="Delete universe?"
          onClose={onDialogClose}
          confirmButtonContent="Delete it!"
          confirmButtonType="danger"
        >
          Deleting the universe could have disastrous effects, including but not
          limited to destroying all life on Earth.
        </ConfirmationDialog>
      )}
    </>
  )
}
```

## Props

```yaml
ConfirmationDialog:
  onClose: { type: "(gesture: 'confirm' | 'close-button' | 'cancel' | 'escape') => void", required: true, description: "This callback is invoked when a gesture to close the dialog is performed. The first argument indicates the gesture." }
  title: { type: "React.ReactNode", required: true, description: "The title of the ConfirmationDialog. This is usually a brief question." }
  cancelButtonContent: { type: "React.ReactNode", default: "Cancel", description: "The text to use for the cancel button." }
  confirmButtonContent: { type: "React.ReactNode", default: "OK", description: "The text to use for the confirm button." }
  confirmButtonType: { type: "'normal' | 'primary' | 'danger'", default: "normal", description: "The type of button to use for the confirm button." }
  overrideButtonFocus: { type: "'confirm' | 'cancel'", description: "The button that should be initially focused when the dialog is opened. By default, the initial button focus is the confi..." }
  className: { type: "string", description: "Additional class names to apply to the dialog." }
  width: { type: "'small' | 'medium' | 'large' | 'xlarge'", default: "medium", description: "The width of the dialog. small: 296px medium: 320px large: 480px xlarge: 640px" }
  height: { type: "'small' | 'large' | 'auto'", description: "The height of the dialog. small: 480px large: 640px auto: variable based on contents" }
```

## Examples

### Features: Shorthand Hook

```tsx
() => {
  const confirm = useConfirm()
  const onButtonClick = useCallback(
    async (event: React.MouseEvent) => {
      if (
        (await confirm({
          title: 'Are you sure?',
          content: 'Do you really want to turn this button green?',
        })) &&
        event.target instanceof HTMLElement
      ) {
        event.target.style.color = 'var(--fgColor-success)'
        event.target.textContent = "I'm green!"
      }
    },
    [confirm],
  )
  return (
    <div className={classes.ButtonContainer}>
      <Button onClick={onButtonClick} className={classes.TurnGreenButton}>
        Turn me green!
      </Button>
      <Button onClick={onButtonClick} className={classes.TurnGreenButton}>
        Turn me green!
      </Button>
      <Button onClick={onButtonClick} className={classes.TurnGreenButton}>
        Turn me green!
      </Button>
      <Button onClick={onButtonClick} className={classes.TurnGreenButton}>
        Turn me green!
      </Button>
    </div>
  )
}
```

### Features: Shorthand Hook From Action Menu

```tsx
() => {
  const confirm = useConfirm()
  const [text, setText] = useState('open me')
  const onButtonClick = useCallback(async () => {
    if (
      await confirm({
        title: 'Are you sure?',
        content: 'Do you really want to do a trick?',
      })
    ) {
      setText('tada!')
    }
  }, [confirm])
  return (
    <div className={classes.ButtonContainer}>
      <ActionMenu>
        <ActionMenu.Button>{text}</ActionMenu.Button>
        <ActionMenu.Overlay>
          <ActionList>
            <ActionList.Item onSelect={onButtonClick}>
              Do a trick!
            </ActionList.Item>
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>
    </div>
  )
}
```

### Features: Loading States

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmLoading, setIsConfirmLoading] = useState(false)
  const [isCancelLoading, setIsCancelLoading] = useState(false)
  const handleConfirm = useCallback(() => {
    setIsConfirmLoading(true)
    // Simulate async operation
    setTimeout(() => {
      setIsConfirmLoading(false)
      setIsOpen(false)
    }, 2000)
  }, [])
  const handleCancel = useCallback(() => {
    setIsCancelLoading(true)
    // Simulate async operation
    setTimeout(() => {
      setIsCancelLoading(false)
      setIsOpen(false)
    }, 1500)
  }, [])
  const handleClose = useCallback(
    (gesture: 'confirm' | 'close-button' | 'cancel' | 'escape') => {
      if (gesture === 'confirm') {
        handleConfirm()
      } else if (gesture === 'cancel') {
        handleCancel()
      } else {
        setIsOpen(false)
      }
    },
    [handleConfirm, handleCancel],
  )
  return (
    <div className={classes.ButtonContainer}>
      <Button onClick={() => setIsOpen(true)}>Show Loading Dialog</Button>
      {isOpen && (
        <ConfirmationDialog
          title="Delete this file?"
          confirmButtonType="danger"
          confirmButtonContent="Delete"
          confirmButtonLoading={isConfirmLoading}
          cancelButtonLoading={isCancelLoading}
          onClose={handleClose}
        >
          This action cannot be undone. The file will be permanently deleted
          from your repository.
        </ConfirmationDialog>
      )}
    </div>
  )
}
```

---
name: UnderlineNav
description: "The UnderlineNav is used to display navigation in a horizontal tabbed format."
import: "@primer/react"
docs: https://primer.style/product/components/underline-nav
a11y_docs: https://primer.style/product/components/underline-nav/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/UnderlineNav
storybook: https://primer.style/react/storybook/?path=/story/components-underline-nav
---

# UnderlineNav

The UnderlineNav is used to display navigation in a horizontal tabbed format.

## Usage

```tsx
import { UnderlineNav } from '@primer/react'
```

### Example

```tsx
() => {
  const children = ['Code', 'Pull requests', 'Actions', 'Projects', 'Wiki']
  return (
    <UnderlineNav aria-label="Repository">
      {children.map((child: string, index: number) => (
        <UnderlineNavItem
          key={index}
          href="#"
          aria-current={index === 0 ? 'page' : undefined}
        >
          {child}
        </UnderlineNavItem>
      ))}
    </UnderlineNav>
  )
}
```

## Props

```yaml
UnderlineNav:
  aria-label: { type: "string", description: "A unique name for the rendered nav landmark. It will also be used to label the arrow buttons that control the scroll beh..." }
  children: { type: "UnderlineNav.Item[]", required: true }
  loadingCounters: { type: "boolean", default: "false", description: "Whether the navigation items are in loading state. Component waits for all the counters to finish loading to prevent mul..." }
  hideIconsBreakpoint: { type: "'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | null", default: "'medium'", description: "Controls the container width below which icons are hidden to save space. To keep icons visible in a narrow container, us..." }
  variant: { type: "'inset' | 'flush'", default: "'inset'", description: "`inset` children are offset horizontally from container edges. `flush` children are flush horizontally with container ed..." }

UnderlineNav.Item:
  aria-current: { type: "| 'page' | 'step' | 'location' | 'date' | 'time' | true | false", default: "false", description: "Set `aria-current` to `'page'` to indicate that the item represents the current page. Set `aria-current` to `'location'`..." }
  counter: { type: "number | string", description: "The number to display in the counter label." }
  href: { type: "string", description: "The URL that the item navigates to. Native anchor items default to `href='#'`. When a custom component is supplied with ..." }
  icon: { type: "Component", deprecated: true, description: "The leading icon comes before item label" }
  leadingVisual: { type: "React.ReactElement", description: "The leading visual comes before item label" }
  onSelect: { type: "(event) => void", description: "The handler that gets called when a nav link is selected. For example, a manual route binding can be done here(I.e. 'nav..." }
  as: { type: "React.ElementType", default: "'a'" }
```

## Examples

### Features: With Icons

```tsx
() => {
  return (
    <UnderlineNav aria-label="Repository with icons">
      <UnderlineNav.Item leadingVisual={<CodeIcon />}>Code</UnderlineNav.Item>
      <UnderlineNav.Item leadingVisual={<EyeIcon />} counter={6}>
        Issues
      </UnderlineNav.Item>
      <UnderlineNav.Item
        aria-current="page"
        leadingVisual={<GitPullRequestIcon />}
      >
        Pull Requests
      </UnderlineNav.Item>
      <UnderlineNav.Item leadingVisual={<CommentDiscussionIcon />} counter={7}>
        Discussions
      </UnderlineNav.Item>
      <UnderlineNav.Item leadingVisual={<ProjectIcon />}>
        Projects
      </UnderlineNav.Item>
    </UnderlineNav>
  )
}
```

### Features: With Counter Labels

```tsx
() => {
  return (
    <UnderlineNav aria-label="Repository with counters">
      <UnderlineNav.Item
        aria-current="page"
        leadingVisual={<CodeIcon />}
        counter="11K"
      >
        Code
      </UnderlineNav.Item>
      <UnderlineNav.Item leadingVisual={<IssueOpenedIcon />} counter={12}>
        Issues
      </UnderlineNav.Item>
    </UnderlineNav>
  )
}
```

### Features: Overflow Template

```tsx
({ initialSelectedIndex = 1 }: { initialSelectedIndex?: number }) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(
    initialSelectedIndex,
  )
  return (
    <UnderlineNav aria-label="Repository" hideIconsBreakpoint="medium">
      {items.map((item, index) => (
        <UnderlineNav.Item
          key={item.navigation}
          leadingVisual={item.icon}
          aria-current={index === selectedIndex ? 'page' : undefined}
          // Set so that navigation in interaction tests does not cause the
          // page to load the storybook iframe URL and instead keeps the test in
          // the local preview
          target="_self"
          onSelect={(event) => {
            event.preventDefault()
            setSelectedIndex(index)
          }}
          counter={item.counter}
          href={item.href}
        >
          {item.navigation}
        </UnderlineNav.Item>
      ))}
    </UnderlineNav>
  )
}
```

---
name: ActionMenu
description: "ActionMenu is composed of ActionList and Overlay patterns used for quick actions and selections."
import: "@primer/react"
docs: https://primer.style/product/components/action-menu
a11y_docs: https://primer.style/product/components/action-menu/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/ActionMenu
storybook: https://primer.style/react/storybook/?path=/story/components-action-menu
---

# ActionMenu

ActionMenu is composed of ActionList and Overlay patterns used for quick actions and selections.

## Usage

```tsx
import { ActionMenu } from '@primer/react'
```

### Example

```tsx
() => (
  <ActionMenu>
    <ActionMenu.Button>Open menu</ActionMenu.Button>
    <ActionMenu.Overlay width="medium">
      <ActionList>
        <ActionList.Item onSelect={() => alert('Copy link clicked')}>
          Copy link
          <ActionList.TrailingVisual>⌘C</ActionList.TrailingVisual>
        </ActionList.Item>
        <ActionList.Item onSelect={() => alert('Quote reply clicked')}>
          Quote reply
          <ActionList.TrailingVisual>⌘Q</ActionList.TrailingVisual>
        </ActionList.Item>
        <ActionList.Item onSelect={() => alert('Edit comment clicked')}>
          Edit comment
          <ActionList.TrailingVisual>⌘E</ActionList.TrailingVisual>
        </ActionList.Item>
        <ActionList.Divider />
        <ActionList.Item
          variant="danger"
          onSelect={() => alert('Delete file clicked')}
        >
          Delete file
          <ActionList.TrailingVisual>⌘D</ActionList.TrailingVisual>
        </ActionList.Item>
      </ActionList>
    </ActionMenu.Overlay>
  </ActionMenu>
)
```

## Props

```yaml
ActionMenu:
  children: { type: "React.ReactElement[]", required: true, description: "Recommended: `ActionMenu.Button` or `ActionMenu.Anchor` with `ActionMenu.Overlay`" }
  open: { type: "boolean", default: "false", description: "If defined, will control the open/closed state of the overlay. Must be used in conjuction with `onOpenChange`." }
  onOpenChange: { type: "(open: boolean) => void", description: "If defined, will control the open/closed state of the overlay. Must be used in conjuction with `open`." }
  anchorRef: { type: "React.RefObject<HTMLElement>", description: "Useful for defining an external anchor" }

ActionMenu.Button:
  children: { type: "React.ReactElement", required: true }

ActionMenu.Anchor:
  children: { type: "React.ReactElement", required: true, description: "Accepts a single child element" }
  id: { type: "string" }

ActionMenu.Overlay:
  children: { type: "React.ReactNode", required: true }
  align: { type: "start | center | end", default: "start" }
  side: { type: "| 'inside-top' | 'inside-bottom' | 'inside-left' | 'inside-right' | 'inside-center' | 'outside-top' | 'outside-bottom' | 'outside-left' | 'outside-right'", default: "'outside-bottom'", description: "Controls which side of the anchor the menu will appear" }
  onPositionChange: { type: "({ position }: { position: AnchorPosition }) => void", description: "Callback that is called when the position of the overlay changes" }
  preventFocusOnClose: { type: "boolean", default: "false", description: "If true, focus will not be returned to the anchor or returnFocusRef when the menu closes. Consumers must manage focus th..." }
  data-test-id: { type: "unknown", description: "ID to use for React testing utilities." }
```

## Examples

### Features: Links And Actions

```tsx
() => (
  <ActionMenu>
    <ActionMenu.Button>Open menu</ActionMenu.Button>
    <ActionMenu.Overlay width="auto">
      <ActionList>
        <ActionList.Item onSelect={() => alert('Workflows clicked')}>
          Workflows
          <ActionList.LeadingVisual>
            <WorkflowIcon />
          </ActionList.LeadingVisual>
        </ActionList.Item>
        <ActionList.Item onSelect={() => alert('Archived items clicked')}>
          Archived items
          <ActionList.LeadingVisual>
            <ArchiveIcon />
          </ActionList.LeadingVisual>
        </ActionList.Item>
        <ActionList.LinkItem href="/">
          Settings
          <ActionList.LeadingVisual>
            <GearIcon />
          </ActionList.LeadingVisual>
        </ActionList.LinkItem>
        <ActionList.Item onSelect={() => alert('Make a copy clicked')}>
          Make a copy
          <ActionList.LeadingVisual>
            <CopyIcon />
          </ActionList.LeadingVisual>
        </ActionList.Item>
        <ActionList.Divider />
        <ActionList.Group>
          <ActionList.GroupHeading>GitHub projects</ActionList.GroupHeading>
          <ActionList.LinkItem href="/">
            What&apos;s new
            <ActionList.LeadingVisual>
              <RocketIcon />
            </ActionList.LeadingVisual>
          </ActionList.LinkItem>
          <ActionList.LinkItem href="/">
            Give feedback
            <ActionList.LeadingVisual>
              <CommentIcon />
            </ActionList.LeadingVisual>
          </ActionList.LinkItem>
          <ActionList.LinkItem href="/">
            GitHub Docs
            <ActionList.LeadingVisual>
              <BookIcon />
            </ActionList.LeadingVisual>
          </ActionList.LinkItem>
        </ActionList.Group>
      </ActionList>
    </ActionMenu.Overlay>
  </ActionMenu>
)
```

### Features: Single Select

```tsx
() => {
  const options = [
    {
      name: 'Fast forward',
    },
    {
      name: 'Recursive',
    },
    {
      name: 'Ours',
    },
    {
      name: 'Octopus',
    },
    {
      name: 'Resolve',
    },
    {
      name: 'Subtree',
    },
  ]
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const selectedType = options[selectedIndex]
  return (
    <ActionMenu>
      <ActionMenu.Button>
        <span className={classes.MutedText}>Options:</span> {selectedType.name}
      </ActionMenu.Button>
      <ActionMenu.Overlay width="auto">
        <ActionList selectionVariant="single">
          {options.map((options, index) => (
            <ActionList.Item
              key={index}
              selected={index === selectedIndex}
              onSelect={() => setSelectedIndex(index)}
            >
              {options.name}
            </ActionList.Item>
          ))}
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  )
}
```

### Features: Multi Select

```tsx
() => {
  type Option = {
    name: string
    selected: boolean
  }
  const [options, setOptions] = React.useState<Option[]>([
    {
      name: 'Show code folding buttons',
      selected: true,
    },
    {
      name: 'Wrap lines',
      selected: false,
    },
    {
      name: 'Center content',
      selected: false,
    },
  ])
  const toggle = (name: string) => {
    setOptions(
      options.map((option) => {
        if (option.name === name) option.selected = !option.selected
        return option
      }),
    )
  }
  return (
    <ActionMenu>
      <ActionMenu.Button>Display</ActionMenu.Button>
      <ActionMenu.Overlay width="auto">
        <ActionList selectionVariant="multiple">
          {options.map((options) => (
            <ActionList.Item
              key={options.name}
              selected={options.selected}
              onSelect={() => toggle(options.name)}
            >
              {options.name}
            </ActionList.Item>
          ))}
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  )
}
```

---
name: TextInput
description: "TextInput is used to set a value that is a single line of text."
import: "@primer/react"
docs: https://primer.style/product/components/text-input
a11y_docs: https://primer.style/product/components/text-input/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/TextInput
storybook: https://primer.style/react/storybook/?path=/story/components-text-input
---

# TextInput

TextInput is used to set a value that is a single line of text.

## Usage

```tsx
import { TextInput } from '@primer/react'
```

### Example

```tsx
() => (
  <form>
    <FormControl>
      <FormControl.Label>Default label</FormControl.Label>
      <TextInput />
    </FormControl>
  </form>
)
```

## Props

```yaml
TextInput:
  aria-label: { type: "string", description: "Gives the input an accessible name." }
  autoComplete: { type: "string", description: "Allows input to autofill based on value given." }
  block: { type: "boolean", default: "false", description: "Creates a full-width input element" }
  characterLimit: { type: "number", description: "The maximum number of characters allowed in the input" }
  contrast: { type: "boolean", default: "false", deprecated: true, description: "Deprecated. Omit this prop to use the default background." }
  size: { type: "'small' | 'medium' | 'large'", description: "Creates a smaller or larger input than the default." }
  loading: { type: "boolean", description: "Whether to show a loading indicator in the input" }
  loaderPosition: { type: "'auto' | 'leading' | 'trailing'", description: "Which position to render the loading indicator - 'auto' (default): at the end of the input, unless a `leadingVisual` is ..." }
  loaderText: { type: "string", default: "Loading", description: "Text for screen readers to convey the loading state, should be descriptive and explain what is loading. This prop should..." }
  leadingVisual: { type: "string | React.ComponentType", description: "Visual positioned on the left edge inside the input" }
  monospace: { type: "boolean", default: "false", description: "Shows input in monospace font" }
  trailingVisual: { type: "string | React.ComponentType", description: "Visual positioned on the right edge inside the input" }
  trailingAction: { type: "React.ReactElement<HTMLProps<HTMLButtonElement>>", description: "A visual that renders inside the input after the typing area" }
  validationStatus: { type: "'error' | 'success'", description: "Style the input to match the status" }
  variant: { type: "'small' | 'medium' | 'large'", deprecated: true, description: "(Use size) Creates a smaller or larger input than the default." }
  width: { type: "string | number", deprecated: true, description: "(Use css modules) Set the width of the input" }
  maxWidth: { type: "string | number", deprecated: true, description: "(Use css modules) Set the maximum width of the input" }
  minWidth: { type: "string | number", deprecated: true, description: "(Use css modules) Set the minimum width of the input" }
  icon: { type: "React.ComponentType", deprecated: true, description: "(Use leadingVisual or trailingVisual) An Octicon React component. To be used inside of input. Positioned on the left edg..." }
  ref: { type: "React.RefObject<HTMLInputElement>" }

TextInput.Action:
  aria-label: { type: "string", description: "Text that appears in a tooltip. If an icon is passed, this is also used as the label used by assistive technologies." }
  tooltipDirection: { type: "'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw'", default: "s", description: "Sets where the tooltip renders in relation to the target." }
  icon: { type: "React.FunctionComponent", description: "The icon to render inside the button" }
  variant: { type: "'default' | 'primary' | 'invisible' | 'danger'", deprecated: true, description: "(Deprecated so that only the 'invisible' variant is used) Determine's the styles on a button" }
  ref: { type: "React.RefObject<HTMLButtonElement>" }
  as: { type: "React.ElementType", default: "'button'" }
```

## Examples

### Features: Disabled

```tsx
() => (
  <form>
    <FormControl>
      <FormControl.Label>Default label</FormControl.Label>
      <TextInput disabled />
    </FormControl>
  </form>
)
```

### Features: With Caption

```tsx
() => (
  <form>
    <FormControl>
      <FormControl.Label>Default label</FormControl.Label>
      <FormControl.Caption>This is a caption</FormControl.Caption>
      <TextInput />
    </FormControl>
  </form>
)
```

### Features: Visually Hidden Label

```tsx
() => (
  <form>
    <Heading as="h2" variant="small">
      Primer form title
    </Heading>
    <FormControl>
      <FormControl.Label visuallyHidden>Primer form label</FormControl.Label>
      <TextInput />
      <FormControl.Caption>
        Label is visually hidden; the title describes the purpose visually
      </FormControl.Caption>
    </FormControl>
  </form>
)
```

---
name: Select
description: "Select is for choosing a single option from a dropdown menu of predefined choices."
import: "@primer/react"
docs: https://primer.style/product/components/select
a11y_docs: https://primer.style/product/components/select/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Select
storybook: https://primer.style/react/storybook/?path=/story/components-select
---

# Select

Select is for choosing a single option from a dropdown menu of predefined choices.

## Usage

```tsx
import { Select } from '@primer/react'
```

### Example

```tsx
() => (
  <form>
    <FormControl>
      <FormControl.Label>Default label</FormControl.Label>
      <Select>
        <Select.Option value="one">Choice one</Select.Option>
        <Select.Option value="two">Choice two</Select.Option>
        <Select.Option value="three">Choice three</Select.Option>
        <Select.Option value="four">Choice four</Select.Option>
        <Select.Option value="five">Choice five</Select.Option>
        <Select.Option value="six">Choice six</Select.Option>
      </Select>
    </FormControl>
  </form>
)
```

## Props

```yaml
Select:
  block: { type: "boolean", default: "false", description: "Creates a full width input element" }
  contrast: { type: "boolean", default: "false", description: "Changes background color to a higher contrast color" }
  placeholder: { type: "string", description: "Placeholder text to show when no option is selected. This option is hidden from the dropdown menu when the 'required' pr..." }
  size: { type: "'small' | 'medium' | 'large'", description: "Creates a smaller or larger input than the default." }
  validationStatus: { type: "'error' | 'success'", description: "Style the input to match the status" }
```

## Examples

### Features: With Option Groups

```tsx
() => (
  <form>
    <FormControl>
      <FormControl.Label>Default label</FormControl.Label>
      <Select>
        <Select.OptGroup label="Group one">
          <Select.Option value="one">Choice one</Select.Option>
          <Select.Option value="two">Choice two</Select.Option>
          <Select.Option value="three">Choice three</Select.Option>
          <Select.Option value="four">Choice four</Select.Option>
        </Select.OptGroup>
        <Select.OptGroup disabled label="Group two">
          <Select.Option value="five">Choice five</Select.Option>
          <Select.Option value="six">Choice six</Select.Option>
        </Select.OptGroup>
      </Select>
    </FormControl>
  </form>
)
```

### Features: Disabled

```tsx
() => (
  <form>
    <FormControl disabled>
      <FormControl.Label>Default label</FormControl.Label>
      <Select>
        <Select.Option value="one">Choice one</Select.Option>
        <Select.Option value="two">Choice two</Select.Option>
        <Select.Option value="three">Choice three</Select.Option>
        <Select.Option value="four">Choice four</Select.Option>
        <Select.Option value="five">Choice five</Select.Option>
        <Select.Option value="six">Choice six</Select.Option>
      </Select>
    </FormControl>
  </form>
)
```

### Features: With Caption

```tsx
() => (
  <form>
    <FormControl>
      <FormControl.Label>Default label</FormControl.Label>
      <FormControl.Caption>This is a caption</FormControl.Caption>
      <Select>
        <Select.Option value="one">Choice one</Select.Option>
        <Select.Option value="two">Choice two</Select.Option>
        <Select.Option value="three">Choice three</Select.Option>
        <Select.Option value="four">Choice four</Select.Option>
        <Select.Option value="five">Choice five</Select.Option>
        <Select.Option value="six">Choice six</Select.Option>
      </Select>
    </FormControl>
  </form>
)
```

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
