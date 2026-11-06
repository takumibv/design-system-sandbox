<!-- tool: get_component_usage_guidelines / args: {"name":"PageHeader"} / at: 2026-11-05T10:55:15.063Z / isError: false -->

Here are the usage guidelines for the `PageHeader` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [PageHeader](/product/components/page-header/)
4.  [Guidelines](/product/components/page-header/guidelines/)

PageHeader
==========

PageHeader determines the top-level headings of a UI.

Page navigation navigation
--------------------------

*   [Overview](/product/components/page-header/)
*   [Guidelines](/product/components/page-header/guidelines/)
*   [Accessibility](/product/components/page-header/accessibility/)

More items

[Anatomy](#anatomy)
-------------------

PageHeader can include a context bar, title bar, description, and contextual navigation (pertaining to the current page).

By default, the [context bar](#context-bar) is visible on narrow viewports only, the [title bar](#title-bar) is visible on all viewports, and the leading action and trailing action are visible on regular viewports.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4007-1795.png&w=2048&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4007-1795&t=pBiZLFjkw1FHqMfS-4)

### [Context bar](#context-bar)

The context bar is intended to set context for the user on smaller viewports and provide any actions that fit within the context bar. As a reminder, by default, the context bar (including its actions) is only visible on narrow viewports.

#### [Parent link](#parent-link)

The default way to let users navigate up in the hierarchy on narrow viewports.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4007-1055.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4007-1055&t=pBiZLFjkw1FHqMfS-4)

### [Context bar actions](#context-bar-actions)

Actions that appear in the context bar specifically.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4007-1065.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4007-1065&t=pBiZLFjkw1FHqMfS-4)

### [Context bar area](#context-bar-area)

The context bar is a generic slot for any component above the title region. Use it for custom breadcrumbs and other navigation elements instead of parent link.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4007-1080.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4007-1080&t=pBiZLFjkw1FHqMfS-4)

### [Title bar](#title-bar)

The title bar can include a static page title, actions, and leading and trailing visuals.

#### [Default title variant](#default-title-variant)

Most common page title size. Use for static titles in most situations.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4007-1089.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4007-1089&t=pBiZLFjkw1FHqMfS-4)

#### [Large title variant](#large-title-variant)

Use large for for user-generated content such as issues, pull requests, or discussions.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4007-1095.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4007-1095&t=pBiZLFjkw1FHqMfS-4)

#### [Subtitle variant](#subtitle-variant)

Use subtitle when a title is already present in the page, such as in a Split page layout.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4007-1100.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4007-1100&t=pBiZLFjkw1FHqMfS-4)

#### [Leading visual](#leading-visual)

Leading visuals are optional and appear at the start of the title. They can be octicons, avatars, and other custom visuals that fit a small area. Leading visuals remain visible on all viewports.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4007-1114.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4007-1114&t=pBiZLFjkw1FHqMfS-4)

#### [Trailing visual](#trailing-visual)

Trailing visual and trailing text can display auxiliary information. They're placed at the right of the item, and can denote status, privacy details, etc. Trailing visuals remain visible on all viewports.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4007-1106.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4007-1106&t=pBiZLFjkw1FHqMfS-4)

#### [Leading action](#leading-action)

A back button can be used as a leading action for local navigation. On narrow viewports, use parent link instead.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4007-1122.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4007-1122&t=pBiZLFjkw1FHqMfS-4)

#### [Trailing action](#trailing-action)

Trailing action can display subtler actions aligned directly next to the title. On narrow viewports, replace the trailing action with an item in an overflow button.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4007-1133.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4007-1133&t=pBiZLFjkw1FHqMfS-4)
