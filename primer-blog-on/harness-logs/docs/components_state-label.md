<!-- source: https://primer.style/product/components/state-label/ -->
1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [StateLabel](/product/components/state-label/)

StateLabel
==========

StateLabel is used for rendering the status of an issue or pull request.

Page navigation navigation
--------------------------

*   [Overview](/product/components/state-label/)
*   [Accessibility](/product/components/state-label/accessibility/)

More items

React

ready

[Storybook](https://primer.style/react/storybook/?path=/story/components-statelabel-features--issue-opened)|[Source](https://github.com/primer/react/tree/main/packages/react/src/StateLabel)|[Usage](https://primer-query.githubapp.com/?query=name%3A%22StateLabel%22+package%3A%22%40primer%2Freact%22)

Rails

ready

[Docs](/product/getting-started/rails/components/state_label)|[Lookbook](https://primer.style/view-components/lookbook/inspect/primer/beta/state/default/)|[Source](https://github.com/primer/view_components/tree/main/app/components/primer/beta/state.rb)

Figma

[View in Figma](https://www.figma.com/file/GCvY3Qv8czRgZgvl1dG6lp/?node-id=18959%3A64962)

[React examples](#react-examples)
---------------------------------

### [Default](#default)

Open

Copy

Reset

Open in StackBlitz

code editor

<StateLabel status\="issueOpened"\>Open</StateLabel\>

<StateLabel status="issueOpened">Open</StateLabel> /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Status variants](#status-variants)

Each status variant has an associated icon, selected based on the status type and whether it applies to an issue or pull request.

Issue statuses

DraftOpenClosedClosedUnavailable

Pull request statuses

DraftOpenMergedClosedUnavailable

Copy

Reset

Open in StackBlitz

code editor

<Stack\>
  <div\>
    <div\>Issue statuses</div\>
    <Stack direction\="horizontal" align\="center" wrap\="wrap"\>
      <StateLabel status\="issueDraft"\>Draft</StateLabel\>
      <StateLabel status\="issueOpened"\>Open</StateLabel\>
      <StateLabel status\="issueClosed"\>Closed</StateLabel\>
      <StateLabel status\="issueClosedNotPlanned"\>Closed</StateLabel\>
      <StateLabel status\="unavailable"\>Unavailable</StateLabel\>
    </Stack\>
  </div\>
  <div\>
    <div\>Pull request statuses</div\>
    <Stack direction\="horizontal" align\="center" wrap\="wrap"\>
      <StateLabel status\="draft"\>Draft</StateLabel\>
      <StateLabel status\="pullOpened"\>Open</StateLabel\>
      <StateLabel status\="pullMerged"\>Merged</StateLabel\>
      <StateLabel status\="pullClosed"\>Closed</StateLabel\>
      <StateLabel status\="unavailable"\>Unavailable</StateLabel\>
    </Stack\>
  </div\>
</Stack\>

<Stack> <div> <div>Issue statuses</div> <Stack direction="horizontal" align="center" wrap="wrap"> <StateLabel status="issueDraft">Draft</StateLabel> <StateLabel status="issueOpened">Open</StateLabel> <StateLabel status="issueClosed">Closed</StateLabel> <StateLabel status="issueClosedNotPlanned">Closed</StateLabel> <StateLabel status="unavailable">Unavailable</StateLabel> </Stack> </div> <div> <div>Pull request statuses</div> <Stack direction="horizontal" align="center" wrap="wrap"> <StateLabel status="draft">Draft</StateLabel> <StateLabel status="pullOpened">Open</StateLabel> <StateLabel status="pullMerged">Merged</StateLabel> <StateLabel status="pullClosed">Closed</StateLabel> <StateLabel status="unavailable">Unavailable</StateLabel> </Stack> </div> </Stack> /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Small size variant](#small-size-variant)

DefaultSmall

Copy

Reset

Open in StackBlitz

code editor

<Stack direction\="horizontal"\>
  <StateLabel status\="issueOpened"\>Default</StateLabel\>
  <StateLabel status\="issueOpened" variant\="small"\>
    Small
  </StateLabel\>
</Stack\>

<Stack direction="horizontal"> <StateLabel status="issueOpened">Default</StateLabel> <StateLabel status="issueOpened" variant="small"> Small </StateLabel> </Stack> /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

[Props](#props)
---------------

### [StateLabel](#StateLabel)

Name

Default

Description

size

`'medium'`

`'small' | 'medium'`

variant Deprecated

`'normal'`

`'small' | 'normal'`

Use `size` instead.

status Required

`'issueOpened' | 'issueClosed' | 'issueClosedNotPlanned' | 'pullOpened' | 'pullClosed' | 'pullMerged' | 'draft' | 'issueDraft' | 'pullQueued' | 'unavailable' | 'alertOpened' | 'alertFixed' | 'alertDismissed' | 'alertClosed' | 'open' | 'closed' | 'archived'`
