# get_component_accessibility_guidelines

- args: `{"name":"ActionList"}`
- isError: false
- ms: 336
- chars: 2514

---

Here are the accessibility guidelines for the `ActionList` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [ActionList](/product/components/action-list/)
4.  [Accessibility](/product/components/action-list/accessibility/)

ActionList
==========

ActionList is a vertical list of interactive actions or options. It's composed of items presented in a consistent, single-column format, with room for icons, descriptions, side information, and other rich visuals.

Page navigation navigation
--------------------------

*   [Overview](/product/components/action-list/)
*   [Guidelines](/product/components/action-list/guidelines/)
*   [Accessibility](/product/components/action-list/accessibility/)

More items

[Conveying filter results to assistive technologies](#conveying-filter-results-to-assistive-technologies)
---------------------------------------------------------------------------------------------------------

If an ActionList is being used to display a filtered list of options, a screen reader should announce when filtering is completed.

For more information, see the [conveying status (filter results)](/product/ui-patterns/loading/#filter-results) section of the loading state pattern guidelines.

[Tooltips and Dialogs on inactive items](#tooltips-and-dialogs-on-inactive-items)
---------------------------------------------------------------------------------

![An ActionList with the first item in an inactive state. There is an annotation with HTML markup showing an SVG element wrapped in a button element.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2128-24042.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2128-24042&t=m4y63HLe9rEkR6fx-4)

If an ActionList item is inactive, it will no longer be an `<a>` or `<button>`, so it will not be focusable.

To ensure that keyboard-only users can still read the that explains why the item is inactive, an icon indicating the inactive state is wrapped in a focusable button.

The button will show text explaining the inactive state in a tooltip when hovered. If a tooltip is not sufficient, a [Dialog](/product/components/dialog/) with even more information can be shown when clicking the button.

**Inactive items cannot use a tooltip when rendered in a menu or listbox.** See the [ActionMenu documentation](/product/components/action-menu/guidelines/#inactive-menu-items) for more information.
