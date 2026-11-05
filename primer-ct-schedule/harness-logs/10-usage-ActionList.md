# get_component_usage_guidelines

- args: `{"name":"ActionList"}`
- isError: false
- ms: 343
- chars: 13370

---

Here are the usage guidelines for the `ActionList` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [ActionList](/product/components/action-list/)
4.  [Guidelines](/product/components/action-list/guidelines/)

ActionList
==========

ActionList is a vertical list of interactive actions or options. It's composed of items presented in a consistent, single-column format, with room for icons, descriptions, side information, and other rich visuals.

Page navigation navigation
--------------------------

*   [Overview](/product/components/action-list/)
*   [Guidelines](/product/components/action-list/guidelines/)
*   [Accessibility](/product/components/action-list/accessibility/)

More items

ActionLists can have many applications:

*   They're the foundation of [ActionMenu](/product/components/action-menu/), [SelectPanels](/product/components/select-panel/) and [NavLists](/product/components/nav-list/).
*   They can be applied to page sidebars for showing individual actions, handling local navigation, and displaying metadata

ActionLists support section dividers and headers for grouping items, and individual item dividers for added clarity.

ActionLists use a mobile-friendly inset style. Their sizes are adapted on touch devices, and their single-column format should render consistently in any screen size.

Items in an ActionList are generally interactive, and respond visually to `hover`, `active`, and `focus` states. Disabled and read-only items are also supported.

[Anatomy](#anatomy)
-------------------

An ActionList can be composed of:

*   ActionList items
*   Item dividers
*   Section headers (subtle or filled styles)
*   Section dividers (subtle or filled styles)

![ActionList anatomy](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-65-32222.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=65-32222&t=m4y63HLe9rEkR6fx-4)

  

![ActionList item anatomy](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-65-31625.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=65-31625&t=m4y63HLe9rEkR6fx-4)

[Options](#options)
-------------------

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3846-12638.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3846-12638&t=m4y63HLe9rEkR6fx-4)

Use leading visuals to represent system sections, features, or options.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-65-31809.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=65-31809&t=m4y63HLe9rEkR6fx-4)

Use leading visuals in important menu items.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-65-31821.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=65-31821&t=m4y63HLe9rEkR6fx-4)

Use leading visuals to represent content types.

### [Leading visual](#leading-visual)

Leading visuals are optional and appear at the start of an item. They can be octicons, avatars, and other custom visuals that fit a small area.

When listing system sections, features, or options, use leading visuals to improve the items' scannability. In user-generated objects, they can help to indicate the item's content type and status.

Depending on the context, displaying a leading visual may not be necessary. For example, a list of branches in a SelectPanel may not need repeated icons if the surrounding UI provides enough hints about its content type.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-65-31827.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=65-31827&t=m4y63HLe9rEkR6fx-4)

A right arrow as a trailing visual indicates there are more options to choose after selecting an item.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-65-31797.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=65-31797&t=m4y63HLe9rEkR6fx-4)

Trailing text with custom styling to indicate diff change.

### [Trailing visual and trailing text](#trailing-visual-and-trailing-text)

Trailing visual and trailing text can display auxiliary information. They're placed at the right of the item, and can denote status, keyboard shortcuts, or be used to set expectations about what the action does.

Note these side visuals don't have dedicated interaction targets.

Use an [`arrow-right`](/octicons/icon/rrow-right-16/) octicon in menus to indicate the action will open more options, such as in a nested context. Use a [`pencil`](/octicons/icon/pencil-16/) octicon to indicate the item is going to be edited after clicking it.

Custom trailing elements are supported, such as counters, labels, and other custom visuals that may help identify the item.

When using a trailing text for displaying keyboard shortcuts, always confirm the characters match with the user's operating system. For example, to indicate a bold action in a Markdown toolbar, use "Ctrl+B" on Linux and Windows, and "⌘B" on Mac. [See reference for Mac keyboard glyphs](https://support.apple.com/en-us/HT201236).

![Navigation list with an action button used to rerun a job, visible on hover.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-346-77310.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=346-77310&t=m4y63HLe9rEkR6fx-4)

### [Trailing actions](#trailing-actions)

Trailing action buttons can be used to present a secondary interaction related to the contents of the main item, such as opening a menu or Dialog. They may appear when an item is hovered, and can be keyboard focused individually.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-65-31821.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=65-31821&t=m4y63HLe9rEkR6fx-4)

### [Item dividers](#item-dividers)

Item dividers allow users to parse heavier amounts of information. They're placed between items and are useful in complex lists, particularly when descriptions or multi-line text is present.

When considering whether to use item dividers, make sure they truly make the presented information easier to parse, instead of only increasing visual clutter.

When using item dividers, increasing the ActionList item size may also help with legibility.

![Selection](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-65-31833.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=65-31833&t=m4y63HLe9rEkR6fx-4)

### [Selection states](#selection-states)

ActionList items support single select and multi-select. Selections are represented with a [`check`](/octicons/icon/check-16/) octicon placed at the beginning of the item.

When listing selectable items alongside non-selectable items in a menu, use dividers to differentiate between the item types.

Don't mix single select and multi-select of selections in the same list.

![ActionList item in danger variation](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-65-31870.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=65-31870&t=m4y63HLe9rEkR6fx-4)

### [Danger items](#danger-items)

An ActionList item can have a special "danger" style, to be used in cases that require extra attention from the user.

For destructive or irremediable actions, show a confirmation Dialog for extra friction. If the action is not destructive, present the user a way to undo the action instead of asking for confirmation. [Never use a warning when you mean undo](https://alistapart.com/article/neveruseawarning/).

Place danger items at the end of the list.

![An ActionList with the first item in an inactive state. A cursor is hovering the alert icon in the leading visual slot.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2128-24031.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2128-24031&t=m4y63HLe9rEkR6fx-4)

### [Inactive items](#inactive-items)

Inactive items will not respond to user input, and are visually styled to indicate they will not perform an action when activated.

If there's a leading visual, replace it with an alert icon.

If there's _not_ a leading visual, the alert icon is put in the same position as the trailing visual.

Inactive items behave differently when rendered in a menu. See the [inactive item variations](#inactive-item-variations) section for more details.

![An ActionList with the first item in a loading state](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2403-13952.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2403-13952&t=m4y63HLe9rEkR6fx-4)

### [Loading items](#loading-items)

If an ActionList item is not yet interactive because the required data is still loading, it may be rendered in a loading state.

The position of the loading icon depends on the same logic as where the alert icon goes in inactive items:

If there's a leading visual, replace it with a loading indicator.

If there's _not_ a leading visual, the loading indicator is put in the same position as the trailing visual.

### [Inactive item variations](#inactive-item-variations)

Inactive items must include text that explains why they're inactive. The placement of this text depends on context. Because [menus](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menu_role) and [listboxes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/listbox_role) use a different interaction pattern than lists, inactive items behave differently. This helps ensure a good experience for assistive technology users.

See the [ActionList accessibility documentation](/product/components/action-list/accessibility/) for information on the assistive technology user experience.

For more on inactive states, see the [degraded interactions](/product/ui-patterns/degraded-experiences/#degraded-interactions) section of the "Degraded experiences" UI pattern documentation.

![An ActionList with the first item in an inactive state. A cursor is hovering the alert icon in the leading visual slot.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4532-11726.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4532-11726&t=XMkgTucLUd4xty64-4)

#### [With list role (default)](#with-list-role-default)

By default, the explanation is shown **in a tooltip**. The tooltip is triggered by an alert icon, placed in either the leading or trailing visual slot.

![An ActionMenu with the first item in an inactive state.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4532-9098.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4532-9098&t=XMkgTucLUd4xty64-4)

#### [With menu or listbox role](#with-menu-or-listbox-role)

When `ActionList` is used with a `listbox` or `menu` role, **the tooltip and alert icon are removed**. Tooltips are anchored to `<button>` elements, but children of menus and listboxes use roles like `option`, `menuitem`, `checkboxmenuitem`, and `radiomenuitem`, which should not contain buttons.

Instead, display the explanation text directly within the menu item.

[Responsive layout](#responsive-layout)
---------------------------------------

For information on responsive layout of an ActionList that is used in a sidebar, see the [responsive sidebar navigation patterns](/product/ui-patterns/navigation/#responsive-sidebar-navigation-patterns) section of our navigation guidelines for more information.

[Examples](#examples)
---------------------

[![ActionMenu](https://user-images.githubusercontent.com/980622/234046230-8ae1db9b-bcb9-436c-85f3-b55e02e4f2ac.png)](/product/components/action-menu)

### [ActionMenu](#actionmenu)

ActionMenus are a list of items, with each item representing an action, command, or current selection, which can be a single or multi-select.

[Documentation](/product/components/action-menu/)

[![SelectPanel](https://user-images.githubusercontent.com/293280/123876997-4158f900-d8f1-11eb-85cb-461d9bbee0cb.png)](/product/components/selectpanel)

### [SelectPanel](#selectpanel)

SelectPanels allow manipulating long lists of options, with filtering and other advanced interactions. They can be used for single or multi-selection.

[Documentation](/product/components/select-panel/)

[![SelectPanel](https://user-images.githubusercontent.com/980622/234065576-c4de31e0-e3e8-455f-bd5d-410a3dc6b9ec.png)](/product/components/nav-list)

### [NavList](#navlist)

A NavList organizes navigation links for the user's current context and indicates which view they're currently on. It is typically used as a sidebar that changes what is rendered in the main content area.

[Documentation](/product/components/nav-list/)
