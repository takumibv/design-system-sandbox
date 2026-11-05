# get_component_usage_guidelines

- args: `{"name":"Dialog"}`
- isError: false
- ms: 297
- chars: 15543

---

Here are the usage guidelines for the `Dialog` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Dialog](/product/components/dialog/)
4.  [Guidelines](/product/components/dialog/guidelines/)

Dialog
======

Dialog is a floating surface used to display transient content such as confirmation actions, selection options, and more.

Page navigation navigation
--------------------------

*   [Overview](/product/components/dialog/)
*   [Guidelines](/product/components/dialog/guidelines/)
*   [Accessibility](/product/components/dialog/accessibility/)

More items

Dialogs can streamline the interface by allowing extra content to be disclosed as needed. Dialogs create a new modality to the user, and can expedite the completion of individual tasks.

[Anatomy](#anatomy)
-------------------

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3905-23901.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3905-23901&t=OIceMocYMRq1FN7G-4)

### [Header region](#header-region)

The **header** region provides context for the Dialog. By default, the region supports a title, description, and a close button. Titles and descriptions may wrap to multiple lines if necessary.

The title is required for all Dialogs, but may be visually hidden for custom scenarios such as a command palette. The close button is required and may **not** be visually hidden. The title has a default size along with a larger option for confirmation Dialogs.

The header region provides a slot for custom content in place of the default title/description, though a title is still required and may be visually hidden. Secondary action IconButtons may be placed next to the close button.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52231.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52231&t=BNVvXw4klNadkUlo-11)

Header with title and description.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52244.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52244&t=BNVvXw4klNadkUlo-11)

Confirmation dialog title.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52237.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52237&t=OIceMocYMRq1FN7G-4)

Header with custom variant and a secondary action button.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52250.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52250&t=OIceMocYMRq1FN7G-4)

Command palette with a visually hidden title.

### [Subheader region](#subheader-region)

The subheader region is an optional space for interactive controls. Use it to display a search field, a filter menu, or a local navigation component.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52297.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52297&t=BNVvXw4klNadkUlo-11)

Header displaying a subheader with a search field.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52322.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52322&t=BNVvXw4klNadkUlo-11)

Header displaying a subheader with a local navigation.

### [Body region](#body-region)

The body region is the main content of the Dialog. It can contain any content that is relevant to the task at hand. The body region is scrollable if the content exceeds the height of the Dialog.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52355.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52355&t=BNVvXw4klNadkUlo-11)

Body content will scroll vertically if the content exceeds the overall Dialog height.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52363.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52363&t=OIceMocYMRq1FN7G-4)

The body may contain additional content such as Banners and form controls.

### [Footer region](#footer-region)

The footer region may be used to show confirmation actions, navigation links, or specialized actions. Primary actions should be aligned to the right of the footer, and grouped by additional related actions. Secondary actions may be shown aligned to the left side.

If the content area has overflow scrolling, a divider should be added between the footer and content area. Otherwise, showing a divider is optional.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52416.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52416&t=BNVvXw4klNadkUlo-11)

Use buttons in a footer to let the user complete a task.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52371.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52371&t=OIceMocYMRq1FN7G-4)

Footer with small buttons aligned to the right.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52395.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52395&t=BNVvXw4klNadkUlo-11)

Footer with an auxiliary action aligned to the left.

### [Backdrop](#backdrop)

Dialog displays with a **backdrop**, which dims the rest of the page. By default, clicking on the **backdrop** will dismiss the Dialog. However, if the Dialog contains a form that can have unsaved changes, the **backdrop** won't dismiss the Dialog, regardless of the state of the form.

[Spacing](#spacing)
-------------------

The edges of Dialog are free of text and heavy visuals to visually distinguish the Dialog as an elevated surface, alongside its shadow. Content within the body and header should remain within the 16px safe area. However, inner components that have transparent or discrete backgrounds may bleed into the padding for visual alignment.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52443.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52443&t=BNVvXw4klNadkUlo-11)

  

1.  A search field appears closer to the edges while the search icon remains within the safe area.
2.  Close button placed `8px` away from the edges. Note that the "×" glyph remains within the safe area.
3.  ActionList items in the Body region.
4.  Footer buttons always appear inside the safe area.

[Usage](#usage)
---------------

### [Keep content simple](#keep-content-simple)

Dialogs are meant to be interacted with in a single context. Avoid creating a whole page inside a Dialog. Prefer single-column layouts that convey a clear goal from the moment the Dialog is opened.

However, Dialogs are powerful tools when creating space for single-context interfaces. When designing a new feature to support a main interface, start by considering if the new feature can be created under a single context.

If the answer is yes, designing the feature inside a Dialog provides an easy way to add responsive support, and avoid deeper navigations. If the answer is no, or if a side navigation is required for the feature, consider designing a new page.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52891.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52891&t=OIceMocYMRq1FN7G-4)

Prefer a single column layout.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52900.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52900&t=OIceMocYMRq1FN7G-4)

Avoid side navigation within a Dialog.

### [Nested Dialogs](#nested-dialogs)

It is acceptable to have up to two nested Dialogs as long as the Dialog is implemented with [expected focus management behavior](#trigger-elements-and-keyboard-focus). Upon closing the second nested Dialog, focus should return to the trigger control within the first Dialog. When the two stacked Dialogs are open, pressing `Esc` should only close the top-level Dialog. When one clicks outside of the second Dialog with a mouse, only the second Dialog should close.

However, having more than three nested Dialogs is discouraged because it adds unnecessary complexity to the user experience and can be disorienting for some users.

### [Deep linking](#deep-linking)

It's crucial to consider if the Dialog should be accessible via a link. For instance, if our users intend to link to this specific content from outside GitHub.

While we can rely on parameters in the URL to open Dialogs on page load, this approach can disorient users because they might not understand to what context this Dialog belongs to since the rest of the page will be dimmed by a [backdrop](#backdrop).

In such situations, it is often more advisable to avoid using a Dialog altogether and instead display the additional information directly on the page or create a new dedicated page. This approach allows for better integration of the content within the overall website structure.

### [Dialogs should work well on any device](#dialogs-should-work-well-on-any-device)

Dialogs must adjust their designs to fit in smaller viewports. Make sure the Overlay contents work with all supported sizes and input methods.

Center aligned Dialog becomes fullscreen on narrow viewport.

Center aligned Dialog becomes a bottom sheet on narrow viewport.

[Regular-viewport placement](#regular-viewport-placement)
---------------------------------------------------------

### [Centered](#centered)

By default, Dialog appears centered in the viewport, with a visible backdrop that dims the rest of the window for focus. Centered Dialogs are surrounded by a safe area of `16px` between the frame and the viewport for all sizes.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52927.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52927&t=OIceMocYMRq1FN7G-4)

Dialog centered within a desktop screen.

### [Side sheets](#side-sheets)

Side sheets slide from the right or left edges of the viewport and are always fixed to both the top and bottom of the viewport. **Left side sheets are reserved for global navigation drawers. Right side sheets are used for global actions, but can also be considered for quick previews in full-width pages.**

Side sheets take the entire height of the viewport, and should be used sparingly. Don't use side sheets to present create/edit forms, or flows that may contain a lot of information. For that, use a page instead.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52956.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52956&t=OIceMocYMRq1FN7G-4)

Left aligned side sheet is reserved for global navigation only.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52970.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52970&t=OIceMocYMRq1FN7G-4)

Right aligned side sheet can be used for global actions, but may also be considered for quick previews or configuration panels.

Side sheets are still considered as Dialogs, which means that interacting with the content in the background is not possible. This needs to be indicated by a [backdrop](#backdrop) and should always cover the global navigation. This prevents multiple side sheets from appearing simultaneously.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3905-23902.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3905-23902&t=OIceMocYMRq1FN7G-4)

Side sheets appear on top of the page (including the navigation).

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3905-23930.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3905-23930&t=OIceMocYMRq1FN7G-4)

Avoid side sheets that allow interactions with the rest of the page.

Right side sheets serve multiple purposes, including facilitating global actions and providing quick previews in full-width pages. However, it is important to exercise caution when implementing side sheets in pages that are not full-width. The objective is to minimize the distance users need to travel with their mouse cursor to access the side sheet, especially on wide screens. This consideration is essential for maximizing productivity.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3905-24468.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3905-24468&t=OIceMocYMRq1FN7G-4)

Use side sheets to provide a quick preview in full-width pages.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3905-24452.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3905-24452&t=OIceMocYMRq1FN7G-4)

Unless it's a global action, avoid side sheets in pages where content does not stretch the full width of the page.

[Narrow-viewport placement](#narrow-viewport-placement)
-------------------------------------------------------

### [Bottom sheets](#bottom-sheets)

A bottom sheet is a variant supported on narrow viewports made to facilitate reachability. Dialogs that appear centered in large screens may adapt to appear as a bottom sheet on small screens.

A bottom sheet always dims the rest of the screen for focus and takes up the full width of the viewport. Tapping on the backdrop dismisses the Dialog.

Use a bottom to indicate that the user is still in the context of the main page, and that the Dialog is a secondary action.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-53006.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-53006&t=OIceMocYMRq1FN7G-4)

Bottom sheet in portrait mode.

In landscape mode, a bottom sheet has a maximum width of `480px`, and is centered horizontally.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-52984.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-52984&t=OIceMocYMRq1FN7G-4)

Bottom sheet in landscape mode.

### [Full-screen](#full-screen)

Full-screen Dialogs may be used to present content that needs all the available space on narrow viewports, or to act as a new page without navigating away from the main page. Dialogs that have one or more input fields should always use the full-screen variant.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-36-53059.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=36-53059&t=OIceMocYMRq1FN7G-4)

Full-screen Dialog in portrait mode.
