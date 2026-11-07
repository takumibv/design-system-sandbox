Here are the usage guidelines for the `ActionMenu` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [ActionMenu](/product/components/action-menu/)
4.  [Guidelines](/product/components/action-menu/guidelines/)

ActionMenu
==========

ActionMenu is composed of ActionList and Overlay patterns used for quick actions and selections.

Page navigation navigation
--------------------------

*   [Overview](/product/components/action-menu/)
*   [Guidelines](/product/components/action-menu/guidelines/)
*   [Accessibility](/product/components/action-menu/accessibility/)

More items

The ActionMenu is an extremely versatile component that is not restricted to a single type of ActionList items at a time. It can be used to create a combination of single select, multi-select, commands, and submenus.

By using dividers and section titles, a hierarchy can be established within the ActionMenu, making it easier to navigate and understand. This allows users to quickly find and access the actions they need, while also providing a clear and organized structure to the menu.

[Anatomy](#anatomy)
-------------------

![ActionMenu opened with an internal \`Settings\` label. Several elements are emphasized, such as the trigger, actions, overlay menu, trailing visual shortcuts, trailing visual submenu indicator, and the 3 dot dialog indicator.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-969-93829.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=969-93829&t=m4y63HLe9rEkR6fx-4)

[Content](#content)
-------------------

### [Avoid input controls](#avoid-input-controls)

The focus should always remain on menu items, and therefore the menu shouldn't include additional form elements like `button`, `input`, or `checkbox`.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3880-12685.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3880-12685&t=m4y63HLe9rEkR6fx-4)

Use ActionMenu for quick actions.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3880-12687.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3880-12687&t=m4y63HLe9rEkR6fx-4)

Don't add FormControls like a filterable input, use [SelectPanel](/product/components/select-panel/) instead.

### [Icons](#icons)

When designing menus, it is crucial to adhere to the meaning of the icons used. If any item in the menu does not have a corresponding icon, then all items in that menu should be presented without icons.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3880-14681.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3880-14681&t=m4y63HLe9rEkR6fx-4)

When one of the items doesn't have an icon then remove icons altogether.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3880-16435.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3880-16435&t=m4y63HLe9rEkR6fx-4)

Don't mix items with or without icons as this makes it harder to read.

Especially when providing single or multi select items that rely on a crossmark icon should be avoided as they could be confused with the item's checkmark.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3880-16597.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3880-16597&t=m4y63HLe9rEkR6fx-4)

Avoid the usage of icons if the icon conflicts with the selected states checkmark.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3880-17077.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3880-17077&t=m4y63HLe9rEkR6fx-4)

Don't use crossmark icons for single or multi select items.

### [Trailing visuals](#trailing-visuals)

Avoid using trailing visuals to add additional interactions, which reserves them for submenu indicators or keyboard shortcuts.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3880-17185.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3880-17185&t=m4y63HLe9rEkR6fx-4)

Create a new section for additional functionality.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3880-17200.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3880-17200&t=m4y63HLe9rEkR6fx-4)

Don't store additional toggleable functionality in trailing visuals.

### [Multi-level](#multi-level)

It's important to understand that menus can't include additional form elements like inputs.

Since you can't include form elements within a menu that also means that you can't combine a [SelectPanel](/product/components/select-panel/) with a ActionMenu. Alternatively, you can open a [Dialog](/product/components/dialog/).

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3880-17705.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3880-17705&t=m4y63HLe9rEkR6fx-4)

If you want to present filterable data open a Dialog instead of a submenu.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3880-17722.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3880-17722&t=m4y63HLe9rEkR6fx-4)

Don't use form elements inside a menu.

When using submenus, don't use the trailing visual to communicate selected values within its submenu. Leave this space for submenu indicators.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3882-12203.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3882-12203&t=m4y63HLe9rEkR6fx-4)

Use trailing visuals for submenu indicators or keyboard shortcuts.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3882-12467.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3882-12467&t=m4y63HLe9rEkR6fx-4)

Don't use trailing visual to communicate selected items in submenus.

### [Inactive menu items](#inactive-menu-items)

![An ActionMenu with the first item in an inactive state.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4532-9098.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4532-9098&t=XMkgTucLUd4xty64-4)

ActionMenu with an inactive item

![An ActionList with the first item in an inactive state. A cursor is hovering the alert icon in the leading visual slot.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4532-11726.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4532-11726&t=XMkgTucLUd4xty64-4)

ActionList with an inactive item

Inactive `ActionList.Item`s appear differently when used in an `ActionMenu`.

Since inactive menu items must remain focusable, we cannot nest a focusable child to show a tooltip. To accommodate this limitation, we use a slightly different pattern than a regular list of items:

*   The text explaining the inactive state is displayed directly in the item, not in a tooltip.
*   No [alert icon](/octicons/icon/alert-16/) is needed, as the error message provides sufficient context.

See the [ActionMenu accessibility documentation](/product/components/action-menu/accessibility/#inactive-menu-items-vs-disabled-menu-items) for more information.
