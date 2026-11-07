<!-- source: https://primer.style/product/components/label/ -->
1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Label](/product/components/label/)

Label
=====

Use the label component to add contextual metadata to a design.

Page navigation navigation
--------------------------

*   [Overview](/product/components/label/)
*   [Accessibility](/product/components/label/accessibility/)

More items

React

ready

[Storybook](https://primer.style/react/storybook/?path=/story/components-label--default)|[Source](https://github.com/primer/react/tree/main/packages/react/src/Label)|[Usage](https://primer-query.githubapp.com/?query=name%3A%22Label%22+package%3A%22%40primer%2Freact%22)

Rails

ready

[Docs](/product/getting-started/rails/components/label)|[Lookbook](https://primer.style/view-components/lookbook/inspect/primer/beta/label/default/)|[Source](https://github.com/primer/view_components/tree/main/app/components/primer/beta/label.rb)

Figma

[View in Figma](https://www.figma.com/file/GCvY3Qv8czRgZgvl1dG6lp/?node-id=18959%3A65008)

A label is a piece of text that is visually stylized to differentiate it as contextual metadata. It can be used to add a status, category, or other metadata to a design.

[React examples](#react-examples)
---------------------------------

### [Default](#default)

Default

Copy

Reset

Open in StackBlitz

code editor

<Label\>Default</Label\>

<Label>Default</Label> /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Style variants](#style-variants)

The Label component ships with different visual variant options.

DefaultPrimarySecondaryAccentSuccessAttentionSevereDangerDoneSponsors

Copy

Reset

Open in StackBlitz

code editor

<Stack direction\="horizontal" wrap\="wrap"\>
  <Label\>Default</Label\>
  <Label variant\="primary"\>Primary</Label\>
  <Label variant\="secondary"\>Secondary</Label\>
  <Label variant\="accent"\>Accent</Label\>
  <Label variant\="success"\>Success</Label\>
  <Label variant\="attention"\>Attention</Label\>
  <Label variant\="severe"\>Severe</Label\>
  <Label variant\="danger"\>Danger</Label\>
  <Label variant\="done"\>Done</Label\>
  <Label variant\="sponsors"\>Sponsors</Label\>
</Stack\>

<Stack direction="horizontal" wrap="wrap"> <Label>Default</Label> <Label variant="primary">Primary</Label> <Label variant="secondary">Secondary</Label> <Label variant="accent">Accent</Label> <Label variant="success">Success</Label> <Label variant="attention">Attention</Label> <Label variant="severe">Severe</Label> <Label variant="danger">Danger</Label> <Label variant="done">Done</Label> <Label variant="sponsors">Sponsors</Label> </Stack> /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Size variants](#size-variants)

The Label component can also be rendered in a `large` size variant.

Small (default)Large

Copy

Reset

Open in StackBlitz

code editor

<Stack direction\="horizontal" align\="center"\>
  <Label\>Small (default)</Label\>
  <Label size\="large"\>Large</Label\>
</Stack\>

<Stack direction="horizontal" align="center"> <Label>Small (default)</Label> <Label size="large">Large</Label> </Stack> /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

[Props](#props)
---------------

### [Label](#Label)

Name

Default

Description

variant

`'default'`

`| 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'attention' | 'severe' | 'danger' | 'done' | 'sponsors'`

The color of the label

size

`'small'`

`'small' | 'large'`

How large the label is rendered

[Related links](#related-links)
-------------------------------

*   [CounterLabel](/product/components/counter-label/)
*   [LabelGroup](/product/components/label-group/)
*   [StateLabel](/product/components/state-label/)
*   [Token](/product/components/token/)
*   [Feature onboarding](/product/ui-patterns/feature-onboarding/)
