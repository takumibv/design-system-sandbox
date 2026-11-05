# get_component_examples

- args: `{"name":"ConfirmationDialog"}`
- isError: false
- ms: 338
- chars: 13255

---

Here are some examples of how to use the `ConfirmationDialog` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [ConfirmationDialog](/product/components/confirmation-dialog/)

ConfirmationDialog
==================

ConfirmationDialog is a specialized dialog component used to confirm user actions. It provides a simple way to ask users to confirm or cancel potentially destructive or important actions.

Page navigation navigation
--------------------------

*   [Overview](/product/components/confirmation-dialog/)
*   [Guidelines](/product/components/confirmation-dialog/guidelines/)
*   [Accessibility](/product/components/confirmation-dialog/accessibility/)

More items

React

ready

[Storybook](https://primer.style/react/storybook/?path=/story/components-confirmationdialog--default)|[Source](https://github.com/primer/react/tree/main/packages/react/src/ConfirmationDialog)|[Usage](https://primer-query.githubapp.com/?query=name%3A%22ConfirmationDialog%22+package%3A%22%40primer%2Freact%22)

[React examples](#react-examples)
---------------------------------

### [Default](#default)

Enable product

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {Button, ConfirmationDialog} from '@primer/react'
export default function Default() {
  const \[open, setOpen\] \= React.useState(false)
  return (
    <\>
      <Button onClick\={() \=> setOpen(true)}\>Enable product</Button\>
      {open ? (
        <ConfirmationDialog
          onClose\={() \=> setOpen(false)}
          title\="Delete product"
          confirmButtonContent\="Enable"
          cancelButtonContent\="Cancel"
        \>
          Are you sure you want to enable this product? This action cannot be undone.
        </ConfirmationDialog\>
      ) : null}
    </\>
  )
}

import React from 'react' import {Button, ConfirmationDialog} from '@primer/react' export default function Default() { const \[open, setOpen\] = React.useState(false) return ( <> <Button onClick={() => setOpen(true)}>Enable product</Button> {open ? ( <ConfirmationDialog onClose={() => setOpen(false)} title="Delete product" confirmButtonContent="Enable" cancelButtonContent="Cancel" > Are you sure you want to enable this product? This action cannot be undone. </ConfirmationDialog> ) : null} </> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [With custom button content](#with-custom-button-content)

Enable product

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {Button, ConfirmationDialog} from '@primer/react'
export default function CustomButtons() {
  const \[open, setOpen\] \= React.useState(false)
  return (
    <\>
      <Button onClick\={() \=> setOpen(true)}\>Enable product</Button\>
      {open ? (
        <ConfirmationDialog
          onClose\={() \=> setOpen(false)}
          title\="Delete product"
          confirmButtonContent\="Custom Delete"
          cancelButtonContent\="Custom Cancel"
        \>
          Are you sure you want to enable this product? This action cannot be undone.
        </ConfirmationDialog\>
      ) : null}
    </\>
  )
}

import React from 'react' import {Button, ConfirmationDialog} from '@primer/react' export default function CustomButtons() { const \[open, setOpen\] = React.useState(false) return ( <> <Button onClick={() => setOpen(true)}>Enable product</Button> {open ? ( <ConfirmationDialog onClose={() => setOpen(false)} title="Delete product" confirmButtonContent="Custom Delete" cancelButtonContent="Custom Cancel" > Are you sure you want to enable this product? This action cannot be undone. </ConfirmationDialog> ) : null} </> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Danger confirmation](#danger-confirmation)

Delete product

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {Button, ConfirmationDialog} from '@primer/react'
export default function Danger() {
  const \[open, setOpen\] \= React.useState(false)
  return (
    <\>
      <Button variant\="danger" onClick\={() \=> setOpen(true)}\>
        Delete product
      </Button\>
      {open ? (
        <ConfirmationDialog
          onClose\={() \=> setOpen(false)}
          title\="Delete product"
          confirmButtonContent\="Delete"
          cancelButtonContent\="Cancel"
          confirmButtonType\="danger"
        \>
          Are you sure you want to delete this product? This action cannot be undone.
        </ConfirmationDialog\>
      ) : null}
    </\>
  )
}

import React from 'react' import {Button, ConfirmationDialog} from '@primer/react' export default function Danger() { const \[open, setOpen\] = React.useState(false) return ( <> <Button variant="danger" onClick={() => setOpen(true)}> Delete product </Button> {open ? ( <ConfirmationDialog onClose={() => setOpen(false)} title="Delete product" confirmButtonContent="Delete" cancelButtonContent="Cancel" confirmButtonType="danger" > Are you sure you want to delete this product? This action cannot be undone. </ConfirmationDialog> ) : null} </> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Different sizes](#different-sizes)

The ConfirmationDialog supports different width and height sizes to accommodate varying content lengths.

*   **Small:** Used for very brief confirmations with minimal content.
*   **Medium (default):** Suitable for most confirmation scenarios.
*   **Large:** For confirmations that require more detailed explanations.

Enable product

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {Button, ConfirmationDialog} from '@primer/react'
export default function Sizes() {
  const \[open, setOpen\] \= React.useState(false)
  return (
    <\>
      <Button onClick\={() \=> setOpen(true)}\>Enable product</Button\>
      {open ? (
        <ConfirmationDialog
          onClose\={() \=> setOpen(false)}
          title\="Delete product"
          confirmButtonContent\="Delete"
          cancelButtonContent\="Cancel"
          width\="large"
          height\="auto"
        \>
          Are you sure you want to enable this product? This action cannot be undone.
        </ConfirmationDialog\>
      ) : null}
    </\>
  )
}

import React from 'react' import {Button, ConfirmationDialog} from '@primer/react' export default function Sizes() { const \[open, setOpen\] = React.useState(false) return ( <> <Button onClick={() => setOpen(true)}>Enable product</Button> {open ? ( <ConfirmationDialog onClose={() => setOpen(false)} title="Delete product" confirmButtonContent="Delete" cancelButtonContent="Cancel" width="large" height="auto" > Are you sure you want to enable this product? This action cannot be undone. </ConfirmationDialog> ) : null} </> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Using the useConfirm hook](#using-the-useconfirm-hook)

The `useConfirm` hook provides a convenient way to show confirmation dialogs imperatively without managing state manually.

Turn me green!

Copy

Reset

Open in StackBlitz

code editor

import React, {useCallback} from 'react'
import {Button, useConfirm} from '@primer/react'
export default function UseConfirm() {
  const confirm \= useConfirm()
  const onButtonClick \= useCallback(
    async (event: React.MouseEvent) \=> {
      if (
        (await confirm({title: 'Are you sure?', content: 'Do you really want to turn this button green?'})) &&
        event.target instanceof HTMLElement
      ) {
        event.target.style.color \= 'var(--fgColor-success)'
        event.target.textContent \= "I'm green!"
      }
    },
    \[confirm\],
  )
  return (
    <div\>
      <Button onClick\={onButtonClick}\>Turn me green!</Button\>
    </div\>
  )
}

import React, {useCallback} from 'react' import {Button, useConfirm} from '@primer/react' export default function UseConfirm() { const confirm = useConfirm() const onButtonClick = useCallback( async (event: React.MouseEvent) => { if ( (await confirm({title: 'Are you sure?', content: 'Do you really want to turn this button green?'})) && event.target instanceof HTMLElement ) { event.target.style.color = 'var(--fgColor-success)' event.target.textContent = "I'm green!" } }, \[confirm\], ) return ( <div> <Button onClick={onButtonClick}>Turn me green!</Button> </div> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [More code examples](#more-code-examples)

See the [ConfirmationDialog Storybook stories](https://primer.style/react/storybook/?path=/story/components-confirmationdialog--default)

[Props](#props)
---------------

### [ConfirmationDialog](#ConfirmationDialog)

Name

Default

Description

onClose Required

`(gesture: 'confirm' | 'close-button' | 'cancel' | 'escape') => void`

This callback is invoked when a gesture to close the dialog is performed. The first argument indicates the gesture.

title Required

`React.ReactNode`

The title of the ConfirmationDialog. This is usually a brief question.

cancelButtonContent

`Cancel`

`React.ReactNode`

The text to use for the cancel button.

confirmButtonContent

`OK`

`React.ReactNode`

The text to use for the confirm button.

confirmButtonType

`normal`

`'normal' | 'primary' | 'danger'`

The type of button to use for the confirm button.

overrideButtonFocus

`'confirm' | 'cancel'`

The button that should be initially focused when the dialog is opened. By default, the initial button focus is the confirm button, unless the confirm button is dangerous, in which case the cancel button is focused. This prop should be used rarely, as it can allow dangerous actions to be taken accidentally.

className

`string`

Additional class names to apply to the dialog.

width

`medium`

`'small' | 'medium' | 'large' | 'xlarge'`

The width of the dialog. small: 296px medium: 320px large: 480px xlarge: 640px

height

`'small' | 'large' | 'auto'`

The height of the dialog. small: 480px large: 640px auto: variable based on contents
