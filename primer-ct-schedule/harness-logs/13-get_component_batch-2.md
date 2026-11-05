# get_component_batch

- args: `{"names":["Button","IconButton","Banner","ConfirmationDialog","Dialog","Breadcrumbs","TextInput","Select","DataTable","Blankslate"]}`
- isError: false
- ms: 88
- chars: 61996

---

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
name: Dialog
description: "Dialog is a floating surface used to display transient content such as confirmation actions, selection options, and more."
import: "@primer/react"
docs: https://primer.style/product/components/dialog
a11y_docs: https://primer.style/product/components/dialog/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Dialog
storybook: https://primer.style/react/storybook/?path=/story/components-dialog
---

# Dialog

Dialog is a floating surface used to display transient content such as confirmation actions, selection options, and more.

## Usage

```tsx
import { Dialog } from '@primer/react'
```

### Example

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])
  const onSecondDialogClose = useCallback(() => setSecondOpen(false), [])
  const openSecondDialog = useCallback(() => setSecondOpen(true), [])
  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        Show dialog
      </Button>
      {isOpen && (
        <Dialog
          title="My Dialog"
          onClose={onDialogClose}
          footerButtons={[
            {
              buttonType: 'default',
              content: 'Open Second Dialog',
              onClick: openSecondDialog,
            },
            {
              buttonType: 'danger',
              content: 'Delete the universe',
              onClick: onDialogClose,
            },
            {
              buttonType: 'primary',
              content: 'Proceed',
              onClick: openSecondDialog,
            },
          ]}
        >
          {lipsum}
          {secondOpen && (
            <Dialog
              title="Inner dialog!"
              onClose={onSecondDialogClose}
              width="small"
            >
              Hello world
            </Dialog>
          )}
        </Dialog>
      )}
    </>
  )
}
```

## Props

```yaml
Dialog:
  title: { type: "React.ReactNode", description: "Title of the Dialog. Also serves as the aria-label for this Dialog." }
  subtitle: { type: "React.ReactNode", description: "The Dialog's subtitle. Optional. Rendered below the title in smaller type with less contrast. Also serves as the aria-de..." }
  renderHeader: { type: "React.FunctionComponent<React.PropsWithChildren<DialogHeaderProps>>", description: "Provide a custom renderer for the dialog header. This content is rendered directly into the dialog body area, full bleed..." }
  renderBody: { type: "React.FunctionComponent<React.PropsWithChildren<DialogProps>>", description: "Provide a custom render function for the dialog body. This content is rendered directly into the dialog body area, full ..." }
  renderFooter: { type: "React.FunctionComponent<React.PropsWithChildren<DialogProps>>", description: "Provide a custom render function for the dialog footer. This content is rendered directly into the dialog footer area, f..." }
  footerButtons: { type: "DialogButtonProps[]", description: "Specifies the buttons to be rendered in the Dialog footer." }
  onClose: { type: "(gesture: 'close-button' | 'escape') => void", description: "This method is invoked when a gesture to close the dialog is used (either an Escape key press or clicking the 'X' in the..." }
  role: { type: "'dialog' | 'alertdialog'", description: "The ARIA role to assign to this dialog. See [dialog modal](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) a..." }
  width: { type: "'small' | 'medium' | 'large' | 'xlarge' | string | number", description: "The width of the dialog. small: 296px medium: 320px large: 480px xlarge: 640px Also accepts any valid CSS width value (e..." }
  height: { type: "'small' | 'large' | 'auto'", description: "The height of the dialog. small: 296x480 large: 480x640 auto: variable based on contents" }
  returnFocusRef: { type: "React.RefObject<HTMLElement>" }
  initialFocusRef: { type: "React.RefObject<HTMLElement>", description: "Focus this element when the Dialog opens" }
  position: { type: "'center' | 'left' | 'right' | { narrow: 'center' | 'left' | 'right' | 'bottom' | 'fullscreen', regular: 'center' | 'left' | 'right' | 'bottom' | 'fullscreen', wide: 'center' | 'left' | 'right' | 'bottom' | 'fullscreen' }", description: "The position of the dialog" }
  align: { type: "'top' | 'center' | 'bottom'", description: "The vertical alignment of the dialog. Only applies when position is 'center' (the default). 'top' positions the Dialog ~..." }
  className: { type: "string | undefined", description: "CSS string" }
  style: { type: "React.CSSProperties | undefined", description: "React CSS properties" }

No props documented.

Dialog.Buttons:
  buttons: { type: "DialogButtonProps[] (see table below)", required: true }

Dialog.CloseButton:
  onClose: { type: "() => void", required: true, description: "Callback for closing the Dialog" }

No props documented.

No props documented.

No props documented.

DialogButtonProps:
  buttonType: { type: "'default' | 'danger' | 'primary' | 'normal'", description: "The variant of Button to use" }
  content: { type: "React.ReactNode", required: true, description: "The Button's inner text" }
  autoFocus: { type: "boolean", description: "If true, and if this is the only button with autoFocus set to true, focus this button automatically when the dialog appe..." }
  ref: { type: "React.RefObject<HTMLButtonElement>", description: " A reference to the rendered Button’s DOM node, used together with `autoFocus` for `focusTrap`’s `initialFocus`." }
```

## Examples

### Features: With Custom Renderers

```tsx
({ width, height, subtitle }: DialogStoryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const onDialogClose = useCallback(() => setIsOpen(false), [])
  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Show dialog</Button>
      {isOpen && (
        <Dialog
          title="My Dialog"
          subtitle={subtitle ? 'This is a subtitle!' : undefined}
          width={width}
          height={height}
          renderHeader={CustomHeader}
          renderBody={CustomBody}
          renderFooter={CustomFooter}
          onClose={onDialogClose}
          footerButtons={[
            {
              buttonType: 'danger',
              content: 'Delete the universe',
              onClick: onDialogClose,
            },
            {
              buttonType: 'primary',
              content: 'Proceed',
            },
          ]}
        >
          {lipsum}
        </Dialog>
      )}
    </>
  )
}
```

### Features: Stress Test

```tsx
({ width, height, subtitle }: DialogStoryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])
  const onSecondDialogClose = useCallback(() => setSecondOpen(false), [])
  const openSecondDialog = useCallback(() => setSecondOpen(true), [])
  const manyButtons = new Array(7).fill(undefined).map((_, i) => ({
    content: `Button ${i}`,
  }))
  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        Show dialog
      </Button>
      {isOpen && (
        <Dialog
          title="This dialog has a really long title. So long, in fact, that it should cause wrapping, going to multiple lines!."
          subtitle={
            subtitle
              ? "It's not a common scenario, sure, but what if the subtitle is generated from a really long value? Do we just break the dialog? Or do we handle it because we are pros?"
              : undefined
          }
          onClose={onDialogClose}
          width={width}
          height={height}
          footerButtons={[
            ...manyButtons,
            {
              buttonType: 'danger',
              content: 'Delete the universe',
              onClick: onDialogClose,
            },
            {
              buttonType: 'primary',
              content: 'Proceed',
              onClick: openSecondDialog,
            },
          ]}
          position={{
            narrow: 'fullscreen',
            regular: 'center',
          }}
        >
          {lipsum}
          {secondOpen && (
            <Dialog
              title="Inner dialog!"
              onClose={onSecondDialogClose}
              width="small"
            >
              Hello world
            </Dialog>
          )}
        </Dialog>
      )}
    </>
  )
}
```

### Features: Repro Multistep Dialog With Conditional Footer

```tsx
({ width, height }: DialogStoryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const onDialogClose = useCallback(() => setIsOpen(false), [])
  const [step, setStep] = React.useState(1)
  const [inputText, setInputText] = React.useState('')
  const dialogRef = useRef<HTMLDivElement>(null)
  const renderFooterConditionally = () => {
    if (step === 1) return null
    return (
      <Dialog.Footer>
        <Button variant="primary">Submit</Button>
      </Dialog.Footer>
    )
  }
  React.useEffect(() => {
    // focus the close button when the step changes
    const focusTarget = dialogRef.current?.querySelector(
      'button[aria-label="Close"]',
    ) as HTMLButtonElement
    // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler
    if (step === 2) {
      focusTarget.focus()
    }
  }, [step])
  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Show dialog</Button>
      {isOpen && (
        <Dialog
          title={`Step ${step}`}
          width={width}
          height={height}
          renderFooter={renderFooterConditionally}
          onClose={onDialogClose}
          footerButtons={[
            {
              buttonType: 'primary',
              content: 'Proceed',
            },
          ]}
          ref={dialogRef}
        >
          {step === 1 ? (
            <Stack gap="spacious" direction="vertical">
              <Stack direction="horizontal" justify="space-between">
                Bug Report <Button onClick={() => setStep(2)}>Choose</Button>
              </Stack>
              <Stack direction="horizontal" justify="space-between">
                Feature request{' '}
                <Button onClick={() => setStep(2)}>Choose</Button>
              </Stack>
            </Stack>
          ) : (
            <div>
              <Stack gap="condensed" direction="vertical">
                <label htmlFor="description">Description</label>
                <TextInput
                  id="description"
                  placeholder="Write the description here"
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                />
              </Stack>
            </div>
          )}
        </Dialog>
      )}
    </>
  )
}
```
---
name: Breadcrumbs
description: "Breadcrumbs display the current page or context within the site, allowing them to navigate different levels of the hierarchy."
import: "@primer/react"
docs: https://primer.style/product/components/breadcrumbs
a11y_docs: https://primer.style/product/components/breadcrumbs/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Breadcrumbs
storybook: https://primer.style/react/storybook/?path=/story/components-breadcrumbs
---

# Breadcrumbs

Breadcrumbs display the current page or context within the site, allowing them to navigate different levels of the hierarchy.

## Usage

```tsx
import { Breadcrumbs } from '@primer/react'
```

### Example

```tsx
() => (
  <Breadcrumbs>
    <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">About</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#" selected>
      Team
    </Breadcrumbs.Item>
  </Breadcrumbs>
)
```

## Props

```yaml
Breadcrumbs:
  className: { type: "string", description: "Additional CSS class names to apply to the breadcrumbs container" }
  children: { type: "Breadcrumbs.Item[]", description: "Breadcrumb items to render. Each item should be a Breadcrumbs.Item component." }
  overflow: { type: "'wrap' | 'menu' | 'menu-with-root'", default: "'wrap'", description: "How to handle overflow when breadcrumbs don't fit in the container. 'wrap' allows items to wrap to new lines. 'menu' col..." }

Breadcrumbs.Item:
  selected: { type: "boolean", default: "false", description: "Whether this item represents the current page. Sets aria-current='page' for accessibility." }
  to: { type: "string | Partial<Path>", description: "Used when the item is rendered using a component like React Router's `Link`. The path to navigate to." }
  href: { type: "string", description: "The URL that the breadcrumb item links to. Used with regular anchor elements." }
  children: { type: "React.ReactNode", required: true, description: "The content to display inside the breadcrumb item, typically text." }
  ref: { type: "React.RefObject<HTMLAnchorElement>" }
  as: { type: "React.ElementType", default: "'a'" }
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
name: DataTable
description: "DataTable is a 2-dimensional data structure where each row is an item, and each column is a data point about the item."
import: "@primer/react/experimental"
docs: https://primer.style/product/components/data-table
a11y_docs: https://primer.style/product/components/data-table/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/DataTable
storybook: https://primer.style/react/storybook/?path=/story/components-data-table
---

# DataTable

DataTable is a 2-dimensional data structure where each row is an item, and each column is a data point about the item.

## Usage

```tsx
import { DataTable } from '@primer/react/experimental'
```

### Example

```tsx
() => (
  <Table.Container>
    <Table.Title as="h2" id="repositories">
      Repositories
    </Table.Title>
    <Table.Subtitle as="p" id="repositories-subtitle">
      A subtitle could appear here to give extra context to the data.
    </Table.Subtitle>
    <DataTable
      aria-labelledby="repositories"
      aria-describedby="repositories-subtitle"
      data={data}
      columns={[
        {
          header: 'Repository',
          field: 'name',
          rowHeader: true,
        },
        {
          header: 'Type',
          field: 'type',
          renderCell: (row) => {
            return <Label>{uppercase(row.type)}</Label>
          },
        },
        {
          header: 'Updated',
          field: 'updatedAt',
          renderCell: (row) => {
            return <RelativeTime date={new Date(row.updatedAt)} />
          },
        },
        {
          header: 'Dependabot',
          field: 'securityFeatures.dependabot',
          renderCell: (row) => {
            return row.securityFeatures.dependabot.length > 0 ? (
              <LabelGroup>
                {row.securityFeatures.dependabot.map((feature) => {
                  return <Label key={feature}>{uppercase(feature)}</Label>
                })}
              </LabelGroup>
            ) : null
          },
        },
        {
          header: 'Code scanning',
          field: 'securityFeatures.codeScanning',
          renderCell: (row) => {
            return row.securityFeatures.codeScanning.length > 0 ? (
              <LabelGroup>
                {row.securityFeatures.codeScanning.map((feature) => {
                  return <Label key={feature}>{uppercase(feature)}</Label>
                })}
              </LabelGroup>
            ) : null
          },
        },
      ]}
    />
  </Table.Container>
)
```

## Props

```yaml
DataTable:
  aria-describedby: { type: "string", description: "Provide an id to an element which uniquely describes this table" }
  aria-labelledby: { type: "string", description: "Provide an id to an element which uniquely labels this table" }
  data: { type: "Array<Data | DataTableRowGroup<Data>>", description: "Provide rows, row groups, or a mixture of both to render in the table, in display order." }
  columns: { type: "Array<Column<Data>>", description: "Provide the columns for the table and the fields in `data` to which they correspond" }
  getRowId: { type: "(row: Data) => DataTableRowId", description: "Provide a stable row ID. Defaults to row.id. DataTableRowId is an exported string | number type." }
  rowSelection: { type: "boolean", description: "Render row checkboxes and a select-all checkbox for the current page." }
  selectedRows: { type: "ReadonlySet<DataTableRowId>", description: "Control selection using stable IDs from `getRowId`. Missing or non-selectable IDs stay stored but do not count as select..." }
  defaultSelectedRows: { type: "ReadonlySet<DataTableRowId>", description: "Set the initial selection for an uncontrolled, static, single-page table." }
  onSelectionChange: { type: "({ selectedRows }: { selectedRows: Set<DataTableRowId> }) => void", description: "Receive a new selection set when a checkbox is toggled. Data changes alone do not trigger this callback." }
  isRowSelectable: { type: "(row: Data) => boolean", description: "Determine which rows can be selected and counted by select-all." }
  cellPadding: { type: "'condensed' | 'normal' | 'spacious'", description: "Specify the amount of space that should be available around the contents of a cell" }
  aria-describedby: { type: "string", description: "Provide an id to an element which uniquely describes this table" }
  aria-labelledby: { type: "string", description: "Provide an id to an element which uniquely labels this table" }
  initialSortColumn: { type: "string | number", description: "Provide the id or field of the column by which the table is sorted. When using this `prop`, the input data must be sorte..." }
  initialSortDirection: { type: "'ASC' | 'DESC'", description: "Provide the sort direction that the table should be sorted by on the currently sorted column" }
  externalSorting: { type: "boolean", default: "false", description: "Indicate whether the sorting of the table is managed externally. When `true`, the table will not sort the data internall..." }
  onToggleSort: { type: "(columnId: ObjectPaths<Data> | string | number, direction: 'ASC' | 'DESC') => void", description: "Fires every time the user clicks a sortable column header. It reports the column id that is now sorted and the direction..." }

Table:
  aria-describedby: { type: "string", description: "Provide an id to an element which uniquely describes this table" }
  aria-labelledby: { type: "string", description: "Provide an id to an element which uniquely labels this table" }
  children: { type: "React.ReactNode" }
  cellPadding: { type: "'condensed' | 'normal' | 'spacious'", description: "Specify the amount of space that should be available around the contents of a cell" }

Table.Head:
  children: { type: "React.ReactNode" }

Table.Actions:
  children: { type: "React.ReactNode" }

Table.Body:
  children: { type: "React.ReactNode" }

Table.Group:
  id: { type: "string | number", description: "A stable identifier exposed on both group sections as `data-group-id`. The group header's DOM id is generated separately..." }
  label: { type: "string", description: "The visible label for the group, shown in the group header and included in its accessible name along with the row count." }
  rowCount: { type: "number", description: "The number of member rows in the group. Combined with `label` to build the group header's accessible name, for example '..." }
  aria-label: { type: "string", description: "Override the group header's accessible name, for example to localize its row count description." }
  colSpan: { type: "number", description: "The number of columns spanned by the group header." }
  children: { type: "React.ReactNode", description: "The group's member rows, typically a list of `Table.Row` elements. When composing a grouped table directly, use each `Ta..." }

Table.Row:
  children: { type: "React.ReactNode" }

Table.Header:
  align: { type: "'end' | 'start'", description: "The horizontal alignment of the cell's content" }
  children: { type: "React.ReactNode" }

Table.SelectionHeader:
  selection: { type: "'all' | 'some' | 'none'", required: true, description: "Whether all, some, or none of the selectable rows are selected." }
  disabled: { type: "boolean", description: "Whether row selection is unavailable." }
  onToggleSelect: { type: "() => void", description: "Request toggling selection for all selectable rows." }
  checkboxRef: { type: "React.Ref<HTMLInputElement>", description: "Forward a ref to the native selection checkbox." }
  aria-label: { type: "string", default: "'Select rows'", description: "Provide the selection checkbox's accessible name." }
  aria-description: { type: "string", description: "Describe the select-all scope, for example 'Select all 10 rows'." }

Table.RowSelection:
  selected: { type: "boolean", required: true, description: "Whether the row is selected." }
  disabled: { type: "boolean", description: "Whether the row cannot be selected." }
  onToggleSelect: { type: "() => void", description: "Request toggling selection for the row." }
  checkboxRef: { type: "React.Ref<HTMLInputElement>", description: "Forward a ref to the native row checkbox." }
  aria-label: { type: "string", default: "'Select row'", description: "Name the row checkbox when `aria-labelledby` is not provided." }
  aria-labelledby: { type: "string", description: "Reference the row header IDs. The checkbox name adds 'Select' before their text." }

Table.Cell:
  align: { type: "'end' | 'start'", description: "The horizontal alignment of the cell's content" }
  children: { type: "React.ReactNode" }
  scope: { type: "'row'", description: "Provide the scope for a table cell, useful for defining a row header using `scope='row'`" }

No props documented.

Table.Container:
  children: { type: "React.ReactNode" }

No props documented.

Table.Title:
  children: { type: "React.ReactNode" }
  id: { type: "string", required: true, description: "Provide a unique id for the table subtitle. This should be used along with `aria-labelledby` on `DataTable`" }

Table.Subtitle:
  children: { type: "React.ReactNode" }
  id: { type: "string", required: true, description: "Provide a unique id for the table subtitle. This should be used along with `aria-describedby` on `DataTable`" }

Table.Skeleton:
  cellPadding: { type: "'condensed' | 'normal' | 'spacious'", default: "normal", description: "Specify the amount of space that should be available around the contents of a cell" }
  columns: { type: "Array<Column<Data>>", required: true }
  rows: { type: "number", default: "10", description: "Optionally specify the number of rows which should be included in the skeleton state of the component" }

Table.Pagination:
  aria-label: { type: "string", required: true, description: "Defines a string value that labels the current element. Provide a label for the navigation landmark rendered by this com..." }
  defaultPageIndex: { type: "string", description: "Provide an optional index to specify the default selected page" }
  id: { type: "string", description: "Optionally provide an `id` that is placed on the navigation landmark rendered by this component" }
  onChange: { type: "({ pageIndex }: { pageIndex: number }) => void", description: "Optionally provide a handler that is called whenever the pagination state is updated" }
  pageSize: { type: "number", default: "25", description: "Optionally specify the number of items within a page" }
  totalCount: { type: "number", required: true, description: "Specify the total number of items within the collection" }
  showPages: { type: "boolean | { narrow?: boolean; regular?: boolean; wide?: boolean; }", default: "{narrow: false}", description: "Whether to show the page numbers" }

Table.ErrorDialog:
  children: { type: "React.ReactNode", required: true, description: "The content of the dialog. This is usually a message explaining the error." }
  title: { type: "string", default: "'Error'", description: "The title of the dialog. This is usually a short description of the error." }
  onRetry: { type: "() => void", description: "Event handler called when the user clicks the retry button." }
  onDismiss: { type: "() => void", description: "Event handler called when the dialog is dismissed." }

Table.SortHeader:
  direction: { type: "'ASC' | 'DESC' | 'NONE'", required: true, description: "Specify the sort direction for the TableHeader" }
  onToggleSort: { type: "() => void", required: true, description: "Provide a handler that is called when the sortable TableHeader is interacted with via a click or keyboard interaction" }
  align: { type: "'end' | 'start'", description: "The horizontal alignment of the cell's content" }

Column options:
  align: { type: "'start' | 'end'", description: "The horizontal alignment of the column's content" }
  field: { type: "ObjectPaths<Data>", description: "Optionally provide a field to render for this column. This may be the key of the object or a string that accesses nested..." }
  header: { type: "string | (() => React.ReactNode)", required: true, description: "Provide the name of the column. This will be rendered as a table header within the table itself" }
  maxWidth: { type: "React.CSSProperties['maxWidth']", description: "The maximum width the column can grow to" }
  minWidth: { type: "React.CSSProperties['minWidth']", description: "The minimum width the column can grow to" }
  renderCell: { type: "(data: Data) => React.ReactNode", description: "Provide a custom component or render prop to render the data for this column in a row" }
  rowHeader: { type: "boolean", description: "Specify if the value of this column for a row should be treated as a row header" }
  sortBy: { type: "boolean | 'alphanumeric' | 'basic' | 'datetime' | (a: Data, b: Data) => number", description: "Specify if the table should sort by this column and, if applicable, a specific sort strategy or custom sort strategy" }
  width: { type: "'grow' | 'growCollapse' | 'auto' | React.CSSProperties['width']", default: "'grow'", description: "Controls the width of the column. - 'grow': Stretch to fill available space, and min width is the width of the widest ce..." }
```

## Examples

### Experimental Components Datatable Features: With Title

```tsx
() => (
  <Table.Container>
    <Table.Title as="h2" id="repositories">
      Repositories
    </Table.Title>
    <DataTable
      aria-labelledby="repositories"
      aria-describedby="repositories-subtitle"
      data={data}
      columns={[
        {
          header: 'Repository',
          field: 'name',
          rowHeader: true,
        },
        {
          header: 'Type',
          field: 'type',
          renderCell: (row) => {
            return <Label>{uppercase(row.type)}</Label>
          },
        },
        {
          header: 'Updated',
          field: 'updatedAt',
          renderCell: (row) => {
            return <RelativeTime date={new Date(row.updatedAt)} />
          },
        },
        {
          header: 'Dependabot',
          field: 'securityFeatures.dependabot',
          renderCell: (row) => {
            return row.securityFeatures.dependabot.length > 0 ? (
              <LabelGroup>
                {row.securityFeatures.dependabot.map((feature) => {
                  return <Label key={feature}>{uppercase(feature)}</Label>
                })}
              </LabelGroup>
            ) : null
          },
        },
        {
          header: 'Code scanning',
          field: 'securityFeatures.codeScanning',
          renderCell: (row) => {
            return row.securityFeatures.codeScanning.length > 0 ? (
              <LabelGroup>
                {row.securityFeatures.codeScanning.map((feature) => {
                  return <Label key={feature}>{uppercase(feature)}</Label>
                })}
              </LabelGroup>
            ) : null
          },
        },
      ]}
    />
  </Table.Container>
)
```

### Experimental Components Datatable Features: With Title And Subtitle

```tsx
() => (
  <Table.Container>
    <Table.Title as="h2" id="repositories">
      Repositories
    </Table.Title>
    <Table.Subtitle as="p" id="repositories-subtitle">
      A subtitle could appear here to give extra context to the data.
    </Table.Subtitle>
    <DataTable
      aria-labelledby="repositories"
      aria-describedby="repositories-subtitle"
      data={data}
      columns={[
        {
          header: 'Repository',
          field: 'name',
          rowHeader: true,
        },
        {
          header: 'Type',
          field: 'type',
          renderCell: (row) => {
            return <Label>{uppercase(row.type)}</Label>
          },
        },
        {
          header: 'Updated',
          field: 'updatedAt',
          renderCell: (row) => {
            return <RelativeTime date={new Date(row.updatedAt)} />
          },
        },
        {
          header: 'Dependabot',
          field: 'securityFeatures.dependabot',
          renderCell: (row) => {
            return row.securityFeatures.dependabot.length > 0 ? (
              <LabelGroup>
                {row.securityFeatures.dependabot.map((feature) => {
                  return <Label key={feature}>{uppercase(feature)}</Label>
                })}
              </LabelGroup>
            ) : null
          },
        },
        {
          header: 'Code scanning',
          field: 'securityFeatures.codeScanning',
          renderCell: (row) => {
            return row.securityFeatures.codeScanning.length > 0 ? (
              <LabelGroup>
                {row.securityFeatures.codeScanning.map((feature) => {
                  return <Label key={feature}>{uppercase(feature)}</Label>
                })}
              </LabelGroup>
            ) : null
          },
        },
      ]}
    />
  </Table.Container>
)
```

### Experimental Components Datatable Features: With Sorting

```tsx
() => {
  const rows = Array.from(data).sort((a, b) => {
    return b.updatedAt - a.updatedAt
  })
  return (
    <Table.Container>
      <Table.Title as="h2" id="repositories">
        Repositories
      </Table.Title>
      <Table.Subtitle as="p" id="repositories-subtitle">
        A subtitle could appear here to give extra context to the data.
      </Table.Subtitle>
      <DataTable
        aria-labelledby="repositories"
        aria-describedby="repositories-subtitle"
        data={rows}
        columns={[
          {
            header: 'Repository',
            field: 'name',
            rowHeader: true,
            sortBy: 'alphanumeric',
          },
          {
            header: 'Type',
            field: 'type',
            renderCell: (row) => {
              return <Label>{uppercase(row.type)}</Label>
            },
          },
          {
            header: 'Updated',
            field: 'updatedAt',
            sortBy: 'datetime',
            renderCell: (row) => {
              return <RelativeTime date={new Date(row.updatedAt)} />
            },
          },
          {
            header: 'Dependabot',
            field: 'securityFeatures.dependabot',
            renderCell: (row) => {
              return row.securityFeatures.dependabot.length > 0 ? (
                <LabelGroup>
                  {row.securityFeatures.dependabot.map((feature) => {
                    return <Label key={feature}>{uppercase(feature)}</Label>
                  })}
                </LabelGroup>
              ) : null
            },
          },
          {
            header: 'Code scanning',
            field: 'securityFeatures.codeScanning',
            renderCell: (row) => {
              return row.securityFeatures.codeScanning.length > 0 ? (
                <LabelGroup>
                  {row.securityFeatures.codeScanning.map((feature) => {
                    return <Label key={feature}>{uppercase(feature)}</Label>
                  })}
                </LabelGroup>
              ) : null
            },
          },
        ]}
        initialSortColumn="updatedAt"
        initialSortDirection="DESC"
      />
    </Table.Container>
  )
}
```
---
name: Blankslate
description: "Blankslate is used as placeholder to tell users why content is missing."
import: "@primer/react/experimental"
docs: https://primer.style/product/components/blankslate
a11y_docs: https://primer.style/product/components/blankslate/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Blankslate
storybook: https://primer.style/react/storybook/?path=/story/components-blankslate
---

# Blankslate

Blankslate is used as placeholder to tell users why content is missing.

## Usage

```tsx
import { Blankslate } from '@primer/react/experimental'
```

### Example

```tsx
() => (
  <Blankslate>
    <Blankslate.Visual>
      <BookIcon size="medium" />
    </Blankslate.Visual>
    <Blankslate.Heading>Welcome to the mona wiki!</Blankslate.Heading>
    <Blankslate.Description>
      Wikis provide a place in your repository to lay out the roadmap of your
      project, show the current status, and document software better, together.
    </Blankslate.Description>
    <Blankslate.PrimaryAction href="#">
      Create the first page
    </Blankslate.PrimaryAction>
    <Blankslate.SecondaryAction href="#">
      Learn more about wikis
    </Blankslate.SecondaryAction>
  </Blankslate>
)
```

## Props

```yaml
Blankslate:
  border: { type: "boolean", description: "Add a border around this component" }
  narrow: { type: "boolean" }
  spacious: { type: "boolean" }
  className: { type: "string", description: "Class name(s) for custom styling." }
  size: { type: "'small' | 'medium' | 'large'", default: "'medium'", description: "The size of the componeont" }

No props documented.

Blankslate.Heading:
  as: { type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'" }

No props documented.

Blankslate.PrimaryAction:
  href: { type: "string", description: "Link to complete primary action. If defined, will render as an anchor instead of a button." }

Blankslate.SecondaryAction:
  href: { type: "string", description: "Link to complete secondary action" }
```

## Examples

### Experimental Components Blankslate Features: With Visual

```tsx
() => (
  <Blankslate>
    <Blankslate.Visual>
      <BookIcon size="medium" />
    </Blankslate.Visual>
    <Blankslate.Heading>Blankslate heading</Blankslate.Heading>
    <Blankslate.Description>
      Use it to provide information when no dynamic content exists.
    </Blankslate.Description>
  </Blankslate>
)
```

### Experimental Components Blankslate Features: With Primary Action As Link

```tsx
() => (
  <Blankslate>
    <Blankslate.Visual>
      <BookIcon size="medium" />
    </Blankslate.Visual>
    <Blankslate.Heading>Blankslate heading</Blankslate.Heading>
    <Blankslate.Description>
      Use it to provide information when no dynamic content exists.
    </Blankslate.Description>
    <Blankslate.PrimaryAction href="#">Primary action</Blankslate.PrimaryAction>
  </Blankslate>
)
```

### Experimental Components Blankslate Features: With Primary Action As Button

```tsx
() => {
  const [isOpen, setIsOpen] = React.useState(false)
  const onDialogClose = React.useCallback(() => setIsOpen(false), [])
  return (
    <>
      <Blankslate>
        <Blankslate.Visual>
          <BookIcon size="medium" />
        </Blankslate.Visual>
        <Blankslate.Heading>Blankslate heading</Blankslate.Heading>
        <Blankslate.Description>
          Use it to provide information when no dynamic content exists.
        </Blankslate.Description>
        <Blankslate.PrimaryAction onClick={() => setIsOpen(true)}>
          Primary action
        </Blankslate.PrimaryAction>
      </Blankslate>
      {isOpen ? (
        <ConfirmationDialog
          title="Delete universe?"
          onClose={onDialogClose}
          confirmButtonContent="Delete it!"
          confirmButtonType="danger"
        >
          Deleting the universe could have disastrous effects, including but not
          limited to destroying all life on Earth.
        </ConfirmationDialog>
      ) : null}
    </>
  )
}
```
