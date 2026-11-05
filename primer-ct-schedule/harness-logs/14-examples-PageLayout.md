# get_component_examples

- args: `{"name":"PageLayout"}`
- isError: false
- ms: 833
- chars: 65018

---

Here are some examples of how to use the `PageLayout` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [PageLayout](/product/components/page-layout/)

PageLayout
==========

PageLayout defines the header, main, pane, and footer areas of a page.

Page navigation navigation
--------------------------

*   [Overview](/product/components/page-layout/)
*   [Accessibility](/product/components/page-layout/accessibility/)

More items

React

ready

[Storybook](https://primer.style/react/storybook/?path=/story/components-pagelayout--default)|[Source](https://github.com/primer/react/tree/main/packages/react/src/PageLayout)|[Usage](https://primer-query.githubapp.com/?query=name%3A%22PageLayout%22+package%3A%22%40primer%2Freact%22)

Rails

ready

[Docs](/product/getting-started/rails/components/page_layout)|[Lookbook](https://primer.style/view-components/lookbook/inspect/primer/alpha/layout/default/)|[Source](https://github.com/primer/view_components/tree/main/app/components/primer/alpha/layout.rb)

[React examples](#react-examples)
---------------------------------

We recommend looking at the [PageLayout Storybook stories](https://primer.style/react/storybook/?path=/story/components-pagelayout--default) to see it in a more realistic context.

The `PageLayout` component is intended for full PageLayouts, so many of the layout adjustments wouldn't be visible in the example boxes.

To ensure a sidebar spans the full page height, the parent element must always fill the viewport, even when content is shorter than the screen.

### [Default](#default)

Header

Content

Pane

Footer

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {PageLayout} from '@primer/react'
export default function Default() {
  return (
    <PageLayout\>
      <PageLayout.Header\>
        <Placeholder height\={64}\>Header</Placeholder\>
      </PageLayout.Header\>
      <PageLayout.Content\>
        <Placeholder height\={400}\>Content</Placeholder\>
      </PageLayout.Content\>
      <PageLayout.Pane\>
        <Placeholder height\={200}\>Pane</Placeholder\>
      </PageLayout.Pane\>
      <PageLayout.Footer\>
        <Placeholder height\={64}\>Footer</Placeholder\>
      </PageLayout.Footer\>
    </PageLayout\>
  )
}
function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) {
  return (
    <div
      style\={{
        width: '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'var(--bgColor-inset)',
        borderRadius: 'var(--borderRadius-medium)',
        border: '1px solid var(--borderColor-muted)',
      }}
    \>
      {children}
    </div\>
  )
}

import React from 'react' import {PageLayout} from '@primer/react' export default function Default() { return ( <PageLayout> <PageLayout.Header> <Placeholder height={64}>Header</Placeholder> </PageLayout.Header> <PageLayout.Content> <Placeholder height={400}>Content</Placeholder> </PageLayout.Content> <PageLayout.Pane> <Placeholder height={200}>Pane</Placeholder> </PageLayout.Pane> <PageLayout.Footer> <Placeholder height={64}>Footer</Placeholder> </PageLayout.Footer> </PageLayout> ) } function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) { return ( <div style={{ width: '100%', height, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > {children} </div> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Dividers between areas](#dividers-between-areas)

Header

Content

Pane

Footer

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {PageLayout} from '@primer/react'
function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) {
  return (
    <div
      style\={{
        width: '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'var(--bgColor-inset)',
        borderRadius: 'var(--borderRadius-medium)',
        border: '1px solid var(--borderColor-muted)',
      }}
    \>
      {children}
    </div\>
  )
}
export default function Dividers() {
  return (
    <PageLayout\>
      <PageLayout.Header divider\="line"\>
        <Placeholder height\={64}\>Header</Placeholder\>
      </PageLayout.Header\>
      <PageLayout.Content\>
        <Placeholder height\={400}\>Content</Placeholder\>
      </PageLayout.Content\>
      <PageLayout.Pane divider\="line"\>
        <Placeholder height\={200}\>Pane</Placeholder\>
      </PageLayout.Pane\>
      <PageLayout.Footer divider\="line"\>
        <Placeholder height\={64}\>Footer</Placeholder\>
      </PageLayout.Footer\>
    </PageLayout\>
  )
}

import React from 'react' import {PageLayout} from '@primer/react' function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) { return ( <div style={{ width: '100%', height, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > {children} </div> ) } export default function Dividers() { return ( <PageLayout> <PageLayout.Header divider="line"> <Placeholder height={64}>Header</Placeholder> </PageLayout.Header> <PageLayout.Content> <Placeholder height={400}>Content</Placeholder> </PageLayout.Content> <PageLayout.Pane divider="line"> <Placeholder height={200}>Pane</Placeholder> </PageLayout.Pane> <PageLayout.Footer divider="line"> <Placeholder height={64}>Footer</Placeholder> </PageLayout.Footer> </PageLayout> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Custom padding between areas](#custom-padding-between-areas)

Header

Content

Pane

Footer

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {PageLayout} from '@primer/react'
function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) {
  return (
    <div
      style\={{
        width: '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'var(--bgColor-inset)',
        borderRadius: 'var(--borderRadius-medium)',
        border: '1px solid var(--borderColor-muted)',
      }}
    \>
      {children}
    </div\>
  )
}
export default function PaddingAreas() {
  return (
    <PageLayout\>
      <PageLayout.Header padding\="condensed"\>
        <Placeholder height\={64}\>Header</Placeholder\>
      </PageLayout.Header\>
      <PageLayout.Content padding\="condensed"\>
        <Placeholder height\={400}\>Content</Placeholder\>
      </PageLayout.Content\>
      <PageLayout.Pane padding\="condensed"\>
        <Placeholder height\={200}\>Pane</Placeholder\>
      </PageLayout.Pane\>
      <PageLayout.Footer padding\="condensed"\>
        <Placeholder height\={64}\>Footer</Placeholder\>
      </PageLayout.Footer\>
    </PageLayout\>
  )
}

import React from 'react' import {PageLayout} from '@primer/react' function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) { return ( <div style={{ width: '100%', height, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > {children} </div> ) } export default function PaddingAreas() { return ( <PageLayout> <PageLayout.Header padding="condensed"> <Placeholder height={64}>Header</Placeholder> </PageLayout.Header> <PageLayout.Content padding="condensed"> <Placeholder height={400}>Content</Placeholder> </PageLayout.Content> <PageLayout.Pane padding="condensed"> <Placeholder height={200}>Pane</Placeholder> </PageLayout.Pane> <PageLayout.Footer padding="condensed"> <Placeholder height={64}>Footer</Placeholder> </PageLayout.Footer> </PageLayout> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Custom padding around layout](#custom-padding-around-layout)

This example removes the padding around the `PageLayout`.

Header

Content

Pane

Footer

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {PageLayout} from '@primer/react'
function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) {
  return (
    <div
      style\={{
        width: '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'var(--bgColor-inset)',
        borderRadius: 'var(--borderRadius-medium)',
        border: '1px solid var(--borderColor-muted)',
      }}
    \>
      {children}
    </div\>
  )
}
export default function Gap() {
  return (
    <PageLayout padding\="none"\>
      <PageLayout.Header\>
        <Placeholder height\={64}\>Header</Placeholder\>
      </PageLayout.Header\>
      <PageLayout.Content\>
        <Placeholder height\={400}\>Content</Placeholder\>
      </PageLayout.Content\>
      <PageLayout.Pane\>
        <Placeholder height\={200}\>Pane</Placeholder\>
      </PageLayout.Pane\>
      <PageLayout.Footer\>
        <Placeholder height\={64}\>Footer</Placeholder\>
      </PageLayout.Footer\>
    </PageLayout\>
  )
}

import React from 'react' import {PageLayout} from '@primer/react' function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) { return ( <div style={{ width: '100%', height, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > {children} </div> ) } export default function Gap() { return ( <PageLayout padding="none"> <PageLayout.Header> <Placeholder height={64}>Header</Placeholder> </PageLayout.Header> <PageLayout.Content> <Placeholder height={400}>Content</Placeholder> </PageLayout.Content> <PageLayout.Pane> <Placeholder height={200}>Pane</Placeholder> </PageLayout.Pane> <PageLayout.Footer> <Placeholder height={64}>Footer</Placeholder> </PageLayout.Footer> </PageLayout> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Custom column and row gap](#custom-column-and-row-gap)

This example removes the gaps between each part of the `PageLayout`.

Header

Content

Pane

Footer

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {PageLayout} from '@primer/react'
function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) {
  return (
    <div
      style\={{
        width: '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'var(--bgColor-inset)',
        borderRadius: 'var(--borderRadius-medium)',
        border: '1px solid var(--borderColor-muted)',
      }}
    \>
      {children}
    </div\>
  )
}
export default function Gap() {
  return (
    <PageLayout rowGap\="none" columnGap\="none"\>
      <PageLayout.Header\>
        <Placeholder height\={64}\>Header</Placeholder\>
      </PageLayout.Header\>
      <PageLayout.Content\>
        <Placeholder height\={400}\>Content</Placeholder\>
      </PageLayout.Content\>
      <PageLayout.Pane\>
        <Placeholder height\={200}\>Pane</Placeholder\>
      </PageLayout.Pane\>
      <PageLayout.Footer\>
        <Placeholder height\={64}\>Footer</Placeholder\>
      </PageLayout.Footer\>
    </PageLayout\>
  )
}

import React from 'react' import {PageLayout} from '@primer/react' function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) { return ( <div style={{ width: '100%', height, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > {children} </div> ) } export default function Gap() { return ( <PageLayout rowGap="none" columnGap="none"> <PageLayout.Header> <Placeholder height={64}>Header</Placeholder> </PageLayout.Header> <PageLayout.Content> <Placeholder height={400}>Content</Placeholder> </PageLayout.Content> <PageLayout.Pane> <Placeholder height={200}>Pane</Placeholder> </PageLayout.Pane> <PageLayout.Footer> <Placeholder height={64}>Footer</Placeholder> </PageLayout.Footer> </PageLayout> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Pane](#pane)

`PageLayout.Pane` sits only beside the content area — unlike `PageLayout.Sidebar`, which is a full-height sidebar that spans adjacent to the header, content, and footer areas.

### [Custom pane width](#custom-pane-width)

You can pick from one of the provided width keys or set arbitrary widths by passing a CSS width as a string. See the PageLayout.Pane props in the [props section](#props) below for more information.

This example configures the pane width as follows:

*   default of `'80px'`
*   minimum of `'40px'`
*   maximum of `'100px'`

Header

Content

Pane

Footer

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {PageLayout} from '@primer/react'
function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) {
  return (
    <div
      style\={{
        width: '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'var(--bgColor-inset)',
        borderRadius: 'var(--borderRadius-medium)',
        border: '1px solid var(--borderColor-muted)',
      }}
    \>
      {children}
    </div\>
  )
}
export default function PaneWidth() {
  return (
    <PageLayout\>
      <PageLayout.Header\>
        <Placeholder height\={64}\>Header</Placeholder\>
      </PageLayout.Header\>
      <PageLayout.Content\>
        <Placeholder height\={400}\>Content</Placeholder\>
      </PageLayout.Content\>
      <PageLayout.Pane width\={{min: '40px', default: '80px', max: '100px'}}\>
        <Placeholder height\={200}\>Pane</Placeholder\>
      </PageLayout.Pane\>
      <PageLayout.Footer\>
        <Placeholder height\={64}\>Footer</Placeholder\>
      </PageLayout.Footer\>
    </PageLayout\>
  )
}

import React from 'react' import {PageLayout} from '@primer/react' function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) { return ( <div style={{ width: '100%', height, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > {children} </div> ) } export default function PaneWidth() { return ( <PageLayout> <PageLayout.Header> <Placeholder height={64}>Header</Placeholder> </PageLayout.Header> <PageLayout.Content> <Placeholder height={400}>Content</Placeholder> </PageLayout.Content> <PageLayout.Pane width={{min: '40px', default: '80px', max: '100px'}}> <Placeholder height={200}>Pane</Placeholder> </PageLayout.Pane> <PageLayout.Footer> <Placeholder height={64}>Footer</Placeholder> </PageLayout.Footer> </PageLayout> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [With a resizable pane](#with-a-resizable-pane)

Header

Content

Pane

Footer

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {PageLayout} from '@primer/react'
function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) {
  return (
    <div
      style\={{
        width: '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'var(--bgColor-inset)',
        borderRadius: 'var(--borderRadius-medium)',
        border: '1px solid var(--borderColor-muted)',
      }}
    \>
      {children}
    </div\>
  )
}
export default function Default() {
  return (
    <PageLayout\>
      <PageLayout.Header\>
        <Placeholder height\={64}\>Header</Placeholder\>
      </PageLayout.Header\>
      <PageLayout.Content\>
        <Placeholder height\={400}\>Content</Placeholder\>
      </PageLayout.Content\>
      <PageLayout.Pane resizable\>
        <Placeholder height\={200}\>Pane</Placeholder\>
      </PageLayout.Pane\>
      <PageLayout.Footer\>
        <Placeholder height\={64}\>Footer</Placeholder\>
      </PageLayout.Footer\>
    </PageLayout\>
  )
}

import React from 'react' import {PageLayout} from '@primer/react' function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) { return ( <div style={{ width: '100%', height, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > {children} </div> ) } export default function Default() { return ( <PageLayout> <PageLayout.Header> <Placeholder height={64}>Header</Placeholder> </PageLayout.Header> <PageLayout.Content> <Placeholder height={400}>Content</Placeholder> </PageLayout.Content> <PageLayout.Pane resizable> <Placeholder height={200}>Pane</Placeholder> </PageLayout.Pane> <PageLayout.Footer> <Placeholder height={64}>Footer</Placeholder> </PageLayout.Footer> </PageLayout> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [With a sticky pane](#with-a-sticky-pane)

Header

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus.

Footer

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {PageLayout} from '@primer/react'
function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) {
  return (
    <div
      style\={{
        width: '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'var(--bgColor-inset)',
        borderRadius: 'var(--borderRadius-medium)',
        border: '1px solid var(--borderColor-muted)',
      }}
    \>
      {children}
    </div\>
  )
}
export default function PaneSticky() {
  return (
    <div style\={{height: '500px', overflow: 'auto'}}\>
      <PageLayout\>
        <PageLayout.Header\>
          <Placeholder height\={64}\>Header</Placeholder\>
        </PageLayout.Header\>
        <PageLayout.Content\>
          {Array.from({length: 5}).map((\_, i) \=> {
            return (
              <p key\={i}\>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non
                ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus
                et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet
                massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus
                in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod
                nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.
              </p\>
            )
          })}
        </PageLayout.Content\>
        <PageLayout.Pane
          // position="start"
          // resizable
          // padding="normal"
          // divider="line"
          sticky
        \>
          {Array.from({length: 5}).map((\_, i) \=> {
            return (
              <p key\={i} style\={{margin: 0}}\>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non
                ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus
                et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet
                massa purus.
              </p\>
            )
          })}
        </PageLayout.Pane\>
        <PageLayout.Footer\>
          <Placeholder height\={64}\>Footer</Placeholder\>
        </PageLayout.Footer\>
      </PageLayout\>
    </div\>
  )
}

import React from 'react' import {PageLayout} from '@primer/react' function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) { return ( <div style={{ width: '100%', height, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > {children} </div> ) } export default function PaneSticky() { return ( <div style={{height: '500px', overflow: 'auto'}}> <PageLayout> <PageLayout.Header> <Placeholder height={64}>Header</Placeholder> </PageLayout.Header> <PageLayout.Content> {Array.from({length: 5}).map((\_, i) => { return ( <p key={i}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare. </p> ) })} </PageLayout.Content> <PageLayout.Pane // position="start" // resizable // padding="normal" // divider="line" sticky > {Array.from({length: 5}).map((\_, i) => { return ( <p key={i} style={{margin: 0}}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. </p> ) })} </PageLayout.Pane> <PageLayout.Footer> <Placeholder height={64}>Footer</Placeholder> </PageLayout.Footer> </PageLayout> </div> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Sidebar](#sidebar)

`PageLayout.Sidebar` is a full-height sidebar that spans adjacent to the header, content, and footer areas — unlike `PageLayout.Pane`, which sits only beside the content area.

To ensure a sidebar spans the full page height, the parent element must always fill the viewport, even when content is shorter than the screen.

### [Sidebar at start (default)](#sidebar-at-start-default)

Sidebar

Header

Content

Footer

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {PageLayout} from '@primer/react'
function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) {
  return (
    <div
      style\={{
        width: '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'var(--bgColor-inset)',
        borderRadius: 'var(--borderRadius-medium)',
        border: '1px solid var(--borderColor-muted)',
      }}
    \>
      {children}
    </div\>
  )
}
export default function SidebarStart() {
  return (
    <PageLayout\>
      <PageLayout.Sidebar width\={{min: '100px', default: '200px', max: '200px'}}\>
        <Placeholder height\={528}\>Sidebar</Placeholder\>
      </PageLayout.Sidebar\>
      <PageLayout.Header\>
        <Placeholder height\={64}\>Header</Placeholder\>
      </PageLayout.Header\>
      <PageLayout.Content\>
        <Placeholder height\={400}\>Content</Placeholder\>
      </PageLayout.Content\>
      <PageLayout.Footer\>
        <Placeholder height\={64}\>Footer</Placeholder\>
      </PageLayout.Footer\>
    </PageLayout\>
  )
}

import React from 'react' import {PageLayout} from '@primer/react' function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) { return ( <div style={{ width: '100%', height, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > {children} </div> ) } export default function SidebarStart() { return ( <PageLayout> <PageLayout.Sidebar width={{min: '100px', default: '200px', max: '200px'}}> <Placeholder height={528}>Sidebar</Placeholder> </PageLayout.Sidebar> <PageLayout.Header> <Placeholder height={64}>Header</Placeholder> </PageLayout.Header> <PageLayout.Content> <Placeholder height={400}>Content</Placeholder> </PageLayout.Content> <PageLayout.Footer> <Placeholder height={64}>Footer</Placeholder> </PageLayout.Footer> </PageLayout> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Sidebar at end](#sidebar-at-end)

Sidebar

Header

Content

Footer

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {PageLayout} from '@primer/react'
function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) {
  return (
    <div
      style\={{
        width: '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'var(--bgColor-inset)',
        borderRadius: 'var(--borderRadius-medium)',
        border: '1px solid var(--borderColor-muted)',
      }}
    \>
      {children}
    </div\>
  )
}
export default function SidebarEnd() {
  return (
    <PageLayout\>
      <PageLayout.Sidebar position\="end" width\={{min: '100px', default: '200px', max: '200px'}}\>
        <Placeholder height\={528}\>Sidebar</Placeholder\>
      </PageLayout.Sidebar\>
      <PageLayout.Header\>
        <Placeholder height\={64}\>Header</Placeholder\>
      </PageLayout.Header\>
      <PageLayout.Content\>
        <Placeholder height\={400}\>Content</Placeholder\>
      </PageLayout.Content\>
      <PageLayout.Footer\>
        <Placeholder height\={64}\>Footer</Placeholder\>
      </PageLayout.Footer\>
    </PageLayout\>
  )
}

import React from 'react' import {PageLayout} from '@primer/react' function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) { return ( <div style={{ width: '100%', height, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > {children} </div> ) } export default function SidebarEnd() { return ( <PageLayout> <PageLayout.Sidebar position="end" width={{min: '100px', default: '200px', max: '200px'}}> <Placeholder height={528}>Sidebar</Placeholder> </PageLayout.Sidebar> <PageLayout.Header> <Placeholder height={64}>Header</Placeholder> </PageLayout.Header> <PageLayout.Content> <Placeholder height={400}>Content</Placeholder> </PageLayout.Content> <PageLayout.Footer> <Placeholder height={64}>Footer</Placeholder> </PageLayout.Footer> </PageLayout> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [With a resizable sidebar](#with-a-resizable-sidebar)

Sidebar

Header

Content

Footer

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {PageLayout} from '@primer/react'
function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) {
  return (
    <div
      style\={{
        width: '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'var(--bgColor-inset)',
        borderRadius: 'var(--borderRadius-medium)',
        border: '1px solid var(--borderColor-muted)',
      }}
    \>
      {children}
    </div\>
  )
}
export default function SidebarResizable() {
  return (
    <PageLayout\>
      <PageLayout.Sidebar resizable width\={{min: '100px', default: '200px', max: '400px'}}\>
        <Placeholder height\={528}\>Sidebar</Placeholder\>
      </PageLayout.Sidebar\>
      <PageLayout.Header\>
        <Placeholder height\={64}\>Header</Placeholder\>
      </PageLayout.Header\>
      <PageLayout.Content\>
        <Placeholder height\={400}\>Content</Placeholder\>
      </PageLayout.Content\>
      <PageLayout.Footer\>
        <Placeholder height\={64}\>Footer</Placeholder\>
      </PageLayout.Footer\>
    </PageLayout\>
  )
}

import React from 'react' import {PageLayout} from '@primer/react' function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) { return ( <div style={{ width: '100%', height, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > {children} </div> ) } export default function SidebarResizable() { return ( <PageLayout> <PageLayout.Sidebar resizable width={{min: '100px', default: '200px', max: '400px'}}> <Placeholder height={528}>Sidebar</Placeholder> </PageLayout.Sidebar> <PageLayout.Header> <Placeholder height={64}>Header</Placeholder> </PageLayout.Header> <PageLayout.Content> <Placeholder height={400}>Content</Placeholder> </PageLayout.Content> <PageLayout.Footer> <Placeholder height={64}>Footer</Placeholder> </PageLayout.Footer> </PageLayout> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [With a sticky sidebar](#with-a-sticky-sidebar)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus.

Header

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.

Footer

Copy

Reset

Open in StackBlitz

code editor

import {PageLayout} from '@primer/react'
export default function SidebarSticky() {
  return (
    <div style\={{height: '500px', overflow: 'auto'}}\>
      <PageLayout\>
        <PageLayout.Sidebar sticky width\={{min: '100px', default: '200px', max: '200px'}}\>
          {Array.from({length: 5}).map((\_, i) \=> {
            return (
              <p key\={i} style\={{margin: 0}}\>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non
                ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus
                et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet
                massa purus.
              </p\>
            )
          })}
        </PageLayout.Sidebar\>
        <PageLayout.Header\>
          <div
            style\={{
              width: '100%',
              height: 64,
              display: 'grid',
              placeItems: 'center',
              backgroundColor: 'var(--bgColor-inset)',
              borderRadius: 'var(--borderRadius-medium)',
              border: '1px solid var(--borderColor-muted)',
            }}
          \>
            Header
          </div\>
        </PageLayout.Header\>
        <PageLayout.Content\>
          {Array.from({length: 5}).map((\_, i) \=> {
            return (
              <p key\={i}\>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non
                ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus
                et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet
                massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus
                in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod
                nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare.
              </p\>
            )
          })}
        </PageLayout.Content\>
        <PageLayout.Footer\>
          <div
            style\={{
              width: '100%',
              height: 64,
              display: 'grid',
              placeItems: 'center',
              backgroundColor: 'var(--bgColor-inset)',
              borderRadius: 'var(--borderRadius-medium)',
              border: '1px solid var(--borderColor-muted)',
            }}
          \>
            Footer
          </div\>
        </PageLayout.Footer\>
      </PageLayout\>
    </div\>
  )
}

import {PageLayout} from '@primer/react' export default function SidebarSticky() { return ( <div style={{height: '500px', overflow: 'auto'}}> <PageLayout> <PageLayout.Sidebar sticky width={{min: '100px', default: '200px', max: '200px'}}> {Array.from({length: 5}).map((\_, i) => { return ( <p key={i} style={{margin: 0}}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. </p> ) })} </PageLayout.Sidebar> <PageLayout.Header> <div style={{ width: '100%', height: 64, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > Header </div> </PageLayout.Header> <PageLayout.Content> {Array.from({length: 5}).map((\_, i) => { return ( <p key={i}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at enim id lorem tempus egestas a non ipsum. Maecenas imperdiet ante quam, at varius lorem molestie vel. Sed at eros consequat, varius tellus et, auctor felis. Donec pulvinar lacinia urna nec commodo. Phasellus at imperdiet risus. Donec sit amet massa purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus felis. Ut porttitor auctor tellus in imperdiet. Ut blandit tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum auctor euismod nisi. Nullam tincidunt est in mi tincidunt dictum. Sed consectetur aliquet velit ut ornare. </p> ) })} </PageLayout.Content> <PageLayout.Footer> <div style={{ width: '100%', height: 64, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > Footer </div> </PageLayout.Footer> </PageLayout> </div> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Sidebar and pane together](#sidebar-and-pane-together)

Sidebar

Header

Content

Pane

Footer

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {PageLayout} from '@primer/react'
function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) {
  return (
    <div
      style\={{
        width: '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'var(--bgColor-inset)',
        borderRadius: 'var(--borderRadius-medium)',
        border: '1px solid var(--borderColor-muted)',
      }}
    \>
      {children}
    </div\>
  )
}
export default function SidebarWithPane() {
  return (
    <PageLayout\>
      <PageLayout.Sidebar resizable width\={{min: '100px', default: '200px', max: '200px'}}\>
        <Placeholder height\={528}\>Sidebar</Placeholder\>
      </PageLayout.Sidebar\>
      <PageLayout.Header\>
        <Placeholder height\={64}\>Header</Placeholder\>
      </PageLayout.Header\>
      <PageLayout.Content\>
        <Placeholder height\={400}\>Content</Placeholder\>
      </PageLayout.Content\>
      <PageLayout.Pane resizable\>
        <Placeholder height\={200}\>Pane</Placeholder\>
      </PageLayout.Pane\>
      <PageLayout.Footer\>
        <Placeholder height\={64}\>Footer</Placeholder\>
      </PageLayout.Footer\>
    </PageLayout\>
  )
}

import React from 'react' import {PageLayout} from '@primer/react' function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) { return ( <div style={{ width: '100%', height, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > {children} </div> ) } export default function SidebarWithPane() { return ( <PageLayout> <PageLayout.Sidebar resizable width={{min: '100px', default: '200px', max: '200px'}}> <Placeholder height={528}>Sidebar</Placeholder> </PageLayout.Sidebar> <PageLayout.Header> <Placeholder height={64}>Header</Placeholder> </PageLayout.Header> <PageLayout.Content> <Placeholder height={400}>Content</Placeholder> </PageLayout.Content> <PageLayout.Pane resizable> <Placeholder height={200}>Pane</Placeholder> </PageLayout.Pane> <PageLayout.Footer> <Placeholder height={64}>Footer</Placeholder> </PageLayout.Footer> </PageLayout> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Fullscreen responsive variant](#fullscreen-responsive-variant)

At narrow viewport widths (below 768px), `responsiveVariant="fullscreen"` causes the sidebar to expand and cover the full viewport like a dialog overlay instead of staying inline.

Sidebar

Header

Content

Footer

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {PageLayout} from '@primer/react'
function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) {
  return (
    <div
      style\={{
        width: '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'var(--bgColor-inset)',
        borderRadius: 'var(--borderRadius-medium)',
        border: '1px solid var(--borderColor-muted)',
      }}
    \>
      {children}
    </div\>
  )
}
export default function SidebarFullscreenResponsive() {
  return (
    <PageLayout\>
      <PageLayout.Sidebar responsiveVariant\="fullscreen" width\={{min: '100px', default: '200px', max: '200px'}}\>
        <Placeholder height\={528}\>Sidebar</Placeholder\>
      </PageLayout.Sidebar\>
      <PageLayout.Header\>
        <Placeholder height\={64}\>Header</Placeholder\>
      </PageLayout.Header\>
      <PageLayout.Content\>
        <Placeholder height\={400}\>Content</Placeholder\>
      </PageLayout.Content\>
      <PageLayout.Footer\>
        <Placeholder height\={64}\>Footer</Placeholder\>
      </PageLayout.Footer\>
    </PageLayout\>
  )
}

import React from 'react' import {PageLayout} from '@primer/react' function Placeholder({height, children}: {height: number | string; children: React.ReactNode}) { return ( <div style={{ width: '100%', height, display: 'grid', placeItems: 'center', backgroundColor: 'var(--bgColor-inset)', borderRadius: 'var(--borderRadius-medium)', border: '1px solid var(--borderColor-muted)', }} > {children} </div> ) } export default function SidebarFullscreenResponsive() { return ( <PageLayout> <PageLayout.Sidebar responsiveVariant="fullscreen" width={{min: '100px', default: '200px', max: '200px'}}> <Placeholder height={528}>Sidebar</Placeholder> </PageLayout.Sidebar> <PageLayout.Header> <Placeholder height={64}>Header</Placeholder> </PageLayout.Header> <PageLayout.Content> <Placeholder height={400}>Content</Placeholder> </PageLayout.Content> <PageLayout.Footer> <Placeholder height={64}>Footer</Placeholder> </PageLayout.Footer> </PageLayout> ) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [More examples in a larger viewport](#more-examples-in-a-larger-viewport)

See the [PageLayout Storybook stories](https://primer.style/react/storybook/?path=/story/components-pagelayout--default).

[Props](#props)
---------------

### [PageLayout](#PageLayout)

Name

Default

Description

containerWidth

`'xlarge'`

`| 'full' | 'medium' | 'large' | 'xlarge'`

The maximum width of the page container.

padding

`'normal'`

`| 'none' | 'condensed' | 'normal'`

The spacing between the outer edges of the page container and the viewport

columnGap

`'normal'`

`| 'none' | 'condensed' | 'normal'`

rowGap

`'normal'`

`| 'none' | 'condensed' | 'normal'`

### [PageLayout.Header](#PageLayout.Header)

Name

Default

Description

aria-label

`string | undefined`

A unique label for the rendered banner landmark

aria-labelledby

`string | undefined`

An id to an element which uniquely labels the rendered banner landmark

padding

`'none'`

`| 'none' | 'condensed' | 'normal'`

The amount of padding inside the header.

divider

`'none'`

`| 'none' | 'line' | { narrow?: | 'none' | 'line' | 'filled' regular?: | 'none' | 'line' wide?: | 'none' | 'line' }`

dividerWhenNarrow Deprecated

`'inherit'`

`| 'inherit' | 'none' | 'line' | 'filled'`

Use the divider prop with a responsive value instead.

hidden

`false`

`| boolean | { narrow?: boolean regular?: boolean wide?: boolean }`

Whether the header is hidden.

### [PageLayout.Content](#PageLayout.Content)

Name

Default

Description

aria-label

`string`

A unique label for the rendered main landmark

aria-labelledby

`string`

An id to an element which uniquely labels the rendered main landmark

as

`'main'`

`React.ElementType`

Change the root node to another HTML element or custom component.

width

`'full'`

`| 'full' | 'medium' | 'large' | 'xlarge'`

The maximum width of the content region.

padding

`'none'`

`| 'none' | 'condensed' | 'normal'`

The amount of padding inside the content.

hidden

`false`

`| boolean | { narrow?: boolean regular?: boolean wide?: boolean }`

Whether the content is hidden.

### [PageLayout.Pane](#PageLayout.Pane)

Name

Default

Description

aria-label

`string | undefined`

Label for the pane. Required if the pane overflows and doesn't have aria-labelledby.

aria-labelledby

`string | undefined`

Id of an element that acts as a label for the pane. Required if the pane overflows and doesn't have aria-label.

width

`'medium'`

`| 'small' | 'medium' | 'large' | { min: string max: string default: string }`

The width of the pane. If using custom widths, provide an object with keys 'min', 'max' and 'default'.

minWidth

`256`

`number`

The minimum width of the pane.

resizable

`false`

`boolean`

When true, the pane may be resized by the user. Uses localStorage persistence by default. Note: with default persistence in SSR, the server-rendered width may differ from the stored client width, causing a brief layout shift on hydration. Use `onResizeEnd` with server-aware storage to avoid this.

currentWidth

`number | undefined`

Current/controlled width value in pixels. Required when `onResizeEnd` is provided. Pass `undefined` when the persisted value has not loaded yet. The `width` prop still defines the default used when resetting (e.g., double-click).

onResizeEnd

`(width: number) => void`

Callback fired when a resize operation ends (drag release or keyboard key up). When provided, replaces localStorage persistence. Requires `currentWidth`.

widthStorageKey

`'paneWidth'`

`string`

localStorage key used to persist the pane width across sessions. Only applies when `resizable` is `true` and no `onResizeEnd` callback is provided.

sticky

`false`

`boolean`

Whether the pane should stick to the top of the screen while the content scrolls.

offsetHeader

`0`

`number | string`

Use offsetHeader along with the sticky prop to push the sticky pane down to make room for a sticky header if necessary. Use the type `string` to specify the height with a unit i.e. 5rem; otherwise the type `number` will be taken as px.

padding

`'none'`

`| 'none' | 'condensed' | 'normal'`

The amount of padding inside the pane.

divider

`'none'`

`| 'none' | 'line' | { narrow?: | 'none' | 'line' | 'filled' regular?: | 'none' | 'line' wide?: | 'none' | 'line' }`

dividerWhenNarrow Deprecated

`'inherit'`

`| 'inherit' | 'none' | 'line' | 'filled'`

Use the divider prop with a responsive value instead.

hidden

`false`

`| boolean | { narrow?: boolean regular?: boolean wide?: boolean }`

Whether the pane is hidden.

position

`'end' | 'start' | { narrow?: 'end' | 'start'; regular?: 'end' | 'start'; wide?: 'end' | 'start'; }`

Which side of the page the pane should be on. Can be changed for different viewport widths.

ref

`React.RefObject<HTMLDivElement>`

### [PageLayout.Sidebar](#PageLayout.Sidebar)

Name

Default

Description

aria-label

`string | undefined`

A unique label for the sidebar region.

aria-labelledby

`string | undefined`

An id to an element which uniquely labels the sidebar region.

position

`'start'`

`'start' | 'end'`

Position of the sidebar relative to the page layout. The sidebar spans the full height of the layout, adjacent to the header, content, and footer.

width

`'medium'`

`| 'small' | 'medium' | 'large' | { min: string max: string default: string }`

The width of the sidebar. If using custom widths, provide an object with keys 'min', 'max' and 'default'.

minWidth

`256`

`number`

Minimum width of the sidebar when resizable.

resizable

`false`

`boolean`

When true, the sidebar may be resized by the user. By default no persistence is applied; pass `widthStorageKey` to persist via localStorage, or use `onResizeEnd` + `currentWidth` for fully controlled persistence.

currentWidth

`number | undefined`

Current/controlled width value in pixels. Required when `onResizeEnd` is provided. Pass `undefined` when the persisted value has not loaded yet. The `width` prop still defines the default used when resetting (e.g., double-click).

onResizeEnd

`(width: number) => void`

Callback fired when a resize operation ends (drag release or keyboard key up). When provided, replaces localStorage persistence. Requires `currentWidth`.

widthStorageKey

`string`

localStorage key used to persist the sidebar width across sessions. Only applies when `resizable` is `true` and no `onResizeEnd` callback is provided. When omitted, localStorage is not used.

padding

`'none'`

`| 'none' | 'condensed' | 'normal'`

The amount of padding inside the sidebar.

divider

`'none'`

`| 'none' | 'line'`

Divider style between the sidebar and the rest of the layout.

sticky

`false`

`boolean`

Whether the sidebar sticks to the viewport when scrolling. When enabled, the sidebar uses position: sticky with top: 0 and height: 100vh.

responsiveVariant

`'default'`

`| 'default' | 'fullscreen'`

Controls sidebar behavior at narrow viewport widths (below 768px). 'default' retains its normal inline layout. 'fullscreen' expands to cover the full viewport like a dialog overlay.

hidden

`false`

`| boolean | { narrow?: boolean regular?: boolean wide?: boolean }`

Whether the sidebar is hidden.

### [PageLayout.Footer](#PageLayout.Footer)

Name

Default

Description

aria-label

`string | undefined`

A unique label for the rendered contentinfo landmark

aria-labelledby

`string | undefined`

An id to an element which uniquely labels the rendered contentinfo landmark

padding

`'none'`

`| 'none' | 'condensed' | 'normal'`

The amount of padding inside the footer.

divider

`'none'`

`| 'none' | 'line' | { narrow?: | 'none' | 'line' | 'filled' regular?: | 'none' | 'line' wide?: | 'none' | 'line' }`

dividerWhenNarrow Deprecated

`'inherit'`

`| 'inherit' | 'none' | 'line' | 'filled'`

Use the divider prop with a responsive value instead.

hidden

`false`

`| boolean | { narrow?: boolean regular?: boolean wide?: boolean }`

Whether the footer is hidden.
