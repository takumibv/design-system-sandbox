# get_component_examples

- args: `{"name":"Avatar"}`
- isError: false
- ms: 298
- chars: 5278

---

Here are some examples of how to use the `Avatar` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Avatar](/product/components/avatar/)

Avatar
======

Avatar is an image that represents a user or organization.

React

ready

[Storybook](https://primer.style/react/storybook/?path=/story/components-avatar--default)|[Source](https://github.com/primer/react/tree/main/packages/react/src/Avatar)|[Usage](https://primer-query.githubapp.com/?query=name%3A%22Avatar%22+package%3A%22%40primer%2Freact%22)

Rails

ready

[Docs](/product/getting-started/rails/components/avatar)|[Lookbook](https://primer.style/view-components/lookbook/inspect/primer/beta/avatar/default/)|[Source](https://github.com/primer/view_components/tree/main/app/components/primer/beta/avatar.rb)

Figma

[View in Figma](https://www.figma.com/file/GCvY3Qv8czRgZgvl1dG6lp/?node-id=3805%3A11)

Use Avatars to represent users, organizations, bots, or teams. On GitHub, Avatars are either rounded squares or circles.

[React examples](#react-examples)
---------------------------------

### [Default](#default)

![Mona user avatar](https://avatars.githubusercontent.com/u/92997159?v=4)

Copy

Reset

Open in StackBlitz

code editor

<Avatar src\="https://avatars.githubusercontent.com/u/92997159?v=4" alt\="Mona user avatar" />

<Avatar src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="Mona user avatar" /> /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Custom size](#custom-size)

Avatars start at 16px and increment by base-4 until 32px. At 32px, the scale switches to base-8 up to 48px. 64px is the largest size in this scale.

![Mona user avatar](https://avatars.githubusercontent.com/u/92997159?v=4)

Copy

Reset

Open in StackBlitz

code editor

<Avatar size\={48} src\="https://avatars.githubusercontent.com/u/92997159?v=4" alt\="Mona user avatar" />

<Avatar size={48} src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="Mona user avatar" /> /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Square shape](#square-shape)

Avatars appear as two different shapes, each with their own functional purpose.

*   **Circle Avatars** represent individual people.
*   **Square Avatars** represent non-human entities, such as bots, AI agents, teams, or organizations.

![Mona user avatar](https://avatars.githubusercontent.com/u/92997159?v=4)

Copy

Reset

Open in StackBlitz

code editor

<Avatar square src\="https://avatars.githubusercontent.com/u/92997159?v=4" alt\="Mona user avatar" />

<Avatar square src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="Mona user avatar" /> /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [More code examples](#more-code-examples)

See the [Avatar Storybook stories](https://primer.style/react/storybook/?path=/story/components-avatar--default).

[Props](#props)
---------------

### [Avatar](#Avatar)

Name

Default

Description

alt

`''`

`string`

Provide alt text when the avatar is used without a name next to it.

size

`20`

`number | { narrow?: number; regular?: number; wide?: number; }`

The size of the avatar in pixels.

square

`false`

`boolean`

If true, the avatar will be square instead of circular.

src

`string`

URL of the avatar image.
