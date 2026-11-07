Here are the usage guidelines for the `UnderlineNav` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [UnderlineNav](/product/components/underline-nav/)
4.  [Guidelines](/product/components/underline-nav/guidelines/)

UnderlineNav
============

The UnderlineNav is used to display navigation in a horizontal tabbed format.

Page navigation navigation
--------------------------

*   [Overview](/product/components/underline-nav/)
*   [Guidelines](/product/components/underline-nav/guidelines/)
*   [Accessibility](/product/components/underline-nav/accessibility/)

More items

[Anatomy](#anatomy)
-------------------

![Anatomy of the UnderlineNav component](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3983-20829.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3983-20829&t=OIceMocYMRq1FN7G-4)

*   **Item**: Tabs to switch between views when activated.
*   **Current item**: The item currently selected is highlighted with an underline.
*   **Label text**: Describes the navigation item.
*   **Leading icon (optional)**: An icon that identifies the navigation item.
*   **Counter (optional)**: Displays a count next to the label.
*   **Overflow menu**: Reveals extra items when space is limited.

[Best practices](#best-practices)
---------------------------------

*   **Discrete content:** Each tab should load unique content with a dedicated URL.
*   **Default selected item:** A tab should be preselected on page load.
*   **Minimize items:** Limit the number of tabs to avoid clutter; consider using a [NavList](/product/components/nav-list/) for larger menus.
*   **Task completeness:** Each view should allow users to complete tasks without switching tabs.
*   **Non-sequential:** Tabs should support free, non-sequential navigation, not stepped flows.

[Content](#content)
-------------------

Each tab's label should be the title of the view associated with that tab. Keep labels clear, short, and concise.

Don't rely on icons or tooltips to explain the tab.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2765-15794.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2765-15794&t=OIceMocYMRq1FN7G-4)

Use label text that clearly communicates what the tab represents.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2765-16099.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2765-16099&t=OIceMocYMRq1FN7G-4)

Don't rely on supplemental content to communicate what the tab represents.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2765-16280.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2765-16280&t=OIceMocYMRq1FN7G-4)

Use leading icons as an enhancement.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2765-16289.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2765-16289&t=OIceMocYMRq1FN7G-4)

Don't exclude label text.

[Hierarchy](#hierarchy)
-----------------------

Tabs may be used to switch between content at different levels of hierarchy:

*   subpages within a larger context
*   content panels within a section of a page

![A page with three top-level tabs. Then, a placeholder heading and description followed by more tabs to separate subpage content. Top-level tabs are highlighted.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2765-16398.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2765-16398&t=OIceMocYMRq1FN7G-4)

Subpage tabs

![A page with three top-level tabs. Then, a placeholder heading and description followed by more tabs to separate subpage content. Top-level tabs are highlighted.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2765-30396.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2765-30396&t=OIceMocYMRq1FN7G-4)

Page content tabs

  

Avoid more than 2 levels of tab hierarchy. If you need more than 2 levels of hierarchy, consider:

*   rethinking your information architecture
*   removing a layer of hierarchy and putting more content on the page
*   using a [NavList](/product/components/nav-list/) for a level of hierarchy

### [Stacking](#stacking)

Don't stack multiple UnderlineNavs or UnderlinePanels directly on top of eachother to convey hierarchical levels of navigation. Instead, consider using a [NavList](/product/components/nav-list/) for a higher level of hierarchy.

Do

![A page with three top-level tabs. Then, a placeholder heading and description followed by more tabs to separate subpage content. Top-level tabs are highlighted.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2765-34050.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2765-34050&t=OIceMocYMRq1FN7G-4)

Limit the levels of tab hierarchy

Don’t

![A page with three top-level tabs. Then, a placeholder heading and description followed by more tabs to separate subpage content. Top-level tabs are highlighted.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2765-34052.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2765-34052&t=OIceMocYMRq1FN7G-4)

Don't stack tabs or create deep levels of tab hierarchy

[Layout](#layout)
-----------------

### [Placement](#placement)

UnderlineNav should be placed directly above the content it affects.

### [Alignment](#alignment)

Align the the UnderlineNav to the left and, when possible, make the component span the available width.

The left and right edges of the UnderlineNav should not extend beyond the width of the content it affects.

### [Clear beginning and end](#clear-beginning-and-end)

It should be clear where the tab-switchable content begins and ends. Use spacing, borders, headings, or other visual cues to make it clear where the tab-switchable content ends.
