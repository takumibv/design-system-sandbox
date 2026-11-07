Here are the guidelines for the `Navigation` pattern for Primer:

1.  [Product UI](/product/)
2.  [UI Patterns](/product/ui-patterns/)
3.  [Navigation](/product/ui-patterns/navigation/)

Navigation
==========

Navigation patterns help users understand where they are and where they can go next.

This documentation provides an overview of navigation design patterns within Primer. For more granular guidance about the components and insights into their implementation, reference their respective guidelines pages.

[Best practices](#best-practices)
---------------------------------

Prioritize clarity and simplicity to facilitate seamless user interaction.

### [Clear user orientation](#clear-user-orientation)

Users should always have a clear understanding of their location within the application. Intuitive navigational cues minimize ambiguity.

### [Streamlined choices](#streamlined-choices)

Minimize the number of navigational elements while ensuring that the most essential items are available. This balance can help prevent users from feeling overwhelmed with too many options, but also ensure that they can easily find what they need.

### [Contextual transitions](#contextual-transitions)

Strive to maintain a balance between contextual clarity and minimal interruption. While transitions such as page refreshes or showing a Dialog are useful for indicating context switches, excessive transitions can lead to unnecessary cognitive load.

[Contextual shifts and transitions](#contextual-shifts-and-transitions)
-----------------------------------------------------------------------

### [Entirely new page](#entirely-new-page)

This is the default behavior of clicking a link or submitting a form. The URL changes and the requested page loads.

In GitHub's single-page app architecture, this behavior is emulated without a traditional page reload.

If you're navigating from a parent page to a child page, the child page should have a clear way to navigate back to the parent page. This is often done with [breadcrumbs](/product/components/breadcrumbs/) or a "back" button.

For example, when adding a new Codespace secret, the user is taken to a new page to fill out the secret details. There is a breadcrumb at the top of the page letting them go back to the Codespace settings page.

Be mindful of data loss when a user is navigating away from a page where they have unsaved changes. See the [saving](/product/ui-patterns/saving/) guidelines for more info on handling unsaved changes.

### [Same page, different state](#same-page-different-state)

Example: user activated a different state of their current page.

When using this kind of navigation, strive to avoid full page reloads when feasible. This could help maintain a fast and smooth user experience.

The URL may or may not change.

### [New spot on the same page](#new-spot-on-the-same-page)

Example: User navigated to a different section or moved focus to a specific element within the same page.

The page content is not changed. This behavior is commonly used for scrolling to new sections or focusing on input fields.

The URL should change if the section scrolled to is a page anchor.

### [Moving into a Dialog](#moving-into-a-dialog)

Opening a Dialog brings the user into a new context, but can feel "lighter" than going to a whole new page. Focus is moved into the Dialog, and the user can't interact with the rest of the page without dismissing the Dialog.

The URL may or may not change when opening a Dialog.

[Patterns and components](#patterns-and-components)
---------------------------------------------------

### [NavList](#navlist)

A vertical list of links that can be used to implement a parent-detail navigation pattern. Users can navigate between different child views without leaving the parent page. It's often used in the sidebar of a split page layout.

Activating a NavList item should change the URL.

[NavList component guidelines](/product/components/nav-list/)

![A NavList component](https://github.com/primer/design/assets/2313998/ce7949ad-d9d7-4f07-a531-73c074ff6b54)

### [TreeView](#treeview)

A TreeView isn't semantically a form of navigation: it's for activating an option from a hierarchical list. However, it's often used to implement a parent-detail navigation pattern. It's often used in the sidebar of a split page layout.

Activating a TreeView item may or may not change the URL.

[TreeView component guidelines](/product/components/tree-view/)

![A TreeView component](https://github.com/primer/design/assets/2313998/ac179492-b53e-4211-a61a-0c4605808c64)

### [Tabs](#tabs)

Tabs allow users to switch between related views within a consistent context, enhancing navigation efficiency and organization.

Use the [UnderlineNav](/product/components/underline-nav/) component when activating a tab changes the URL.

Use the [UnderlinePanels](/product/components/underline-panels/) component when activating a tab changes the content in the same page or context without changing the URL.

Activating a tab may or may not change the URL, but you can't mix tabs that change the URL with tabs just switch the visible tab panel.

[UnderlineNav component guidelines](/product/components/underline-nav/)

[Underline panel component guidelines](/product/components/underline-panels/)

![An UnderlineNav component highlighted on a repository page](https://github.com/primer/design/assets/2313998/f287c9dc-fb4c-401e-aa2e-5ca7e30ea27d)

### [ActionMenu](#actionmenu)

An ActionMenu is not semantically a form of navigation: it's for activating an option from a list. However, it may contain some options that open a Dialog or change the URL when activated.

ActionMenus are also used to overflow horizontal navigation elements (such as tabs) when the container is too narrow to display all options inline.

Activating an ActionMenu item may or may not change the URL.

[ActionMenu component guidelines](/product/components/action-menu/)

![Screenshot of '+' ActionMenu expanded in global navigation](https://github.com/primer/design/assets/2313998/f8efba93-2a4f-43f6-b428-d804b423c737)

### [Breadcrumbs](#breadcrumbs)

Breadcrumbs show the user where they are using a hierarchical list of links. Going from start to end, each link is one level of hierarchy deeper.

Activating a breadcrumb item should change the URL.

[Breadcrumbs component guidelines](/product/components/breadcrumbs/)

![Screenshot of files page breadcrumb](https://github.com/primer/design/assets/2313998/2a8aa05b-b406-44f8-9f8d-5f621fcad221)

### [Pagination](#pagination)

Pagination is used to sequentially navigate long collections of content that's been broken into smaller chunks.

Activating a pagination item should change the URL.

[Pagination component guidelines](/product/components/pagination/)

![Screenshot of issues page pagination](https://github.com/primer/design/assets/2313998/7052c7d9-1e7a-41c1-8854-f85630c92df2)

### [SegmentedControl](#segmentedcontrol)

While primarily used to make a selection from a short list, SegmentedControls can be employed as navigational components for **filtering**, **sorting**, or **viewing content in a different format**.

When being used for navigation, activating a SegmentedControl option may or may not change the URL.

[SegmentedControl component guidelines](/product/components/segmented-control/)

![Screenshot of code/blame/preview on .md files](https://github.com/primer/design/assets/2313998/0b1e308d-a351-4457-8214-d863d8f76635)

[Choosing a pattern for tabbed navigation](#choosing-a-pattern-for-tabbed-navigation)
-------------------------------------------------------------------------------------

When designing an interface with tabbed navigation, first reach for [UnderlineNav](/product/components/underline-nav/) (when clicking the tab changes the URL) or [UnderlinePanels](/product/components/underline-panels/) (when clicking the tab just toggles tab panel visibility).

If these components don't fit your use-case, you may use a [SegmentedControl](/product/components/segmented-control/#to-toggle-content-visibility) where the segments are links or `role="tab"`.

![Decision tree for switching views using a tabbed interface. The tree begins with the statement 'I want to switch views using a tabbed interface' and splits into several paths: If the format of the content changes (e.g., changing between 'List' and 'Grid' views), and the selection switches content visibility like tabs, use a SegmentedControl that is a tablist, with each view as its own tab panel. If not, use a SegmentedControl with link segments. If the items are mutually exclusive options that sort content on the page, and the URL changes when you activate an item, use a SegmentedControl with button segments. If not, use a SegmentedControl with link segments. If the items are mutually exclusive options that filter content on the page, and there is an option like 'All' that removes the filter, use UnderlinePanels. If not, and the URL changes when you activate an item, use UnderlineNav. If not, use UnderlinePanels.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3247-11847.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3247-11847&t=4vKZ3HnoVCdDoQsq-4)

[Layout](#layout)
-----------------

Layout is used to structure your content in a way that reflects the hierarchy of the navigation within the app. Navigational elements should be laid out in close proximity to the content they affect.

For example, Pagination should go directly below the collection it navigates.

### [Layouts for navigating in the same context](#layouts-for-navigating-in-the-same-context)

#### [Parent-detail split page layout](#parent-detail-split-page-layout)

![Screenshot of a repo's security advisories page with the sidebar and main areas highlighted](https://github.com/primer/design/assets/2313998/7d8bafeb-f971-45d2-ac0e-7850d7f81912)

A "parent" sidebar that affects "detail" content. The "parent" navigation remains on screen while the user navigates between different "detail" views.

#### [Tabbed interfaces](#tabbed-interfaces)

![Screenshot of a repo's security advisories page with the tabs and tab panel areas highlighted](https://github.com/primer/design/assets/2313998/f7fb7251-f9bf-4d58-b6ec-16b66f3959da)

Tabbed interfaces enable seamless navigation between different subpages within a unified context. Tabs go directly above the content they affect.

### [Headings and hierarchical page sections](#headings-and-hierarchical-page-sections)

![Wireframe of a settings page with multiple nested sections](https://github.com/primer/design/assets/2313998/e924678e-1bf6-4317-8953-53d3cd6da3e3)

A [PageHeader](/product/components/page-header/) is the title area at the top of the main content region that shows the user where they are. It may also to contain navigational elements like breadcrumbs or a link to go up a level of hierarchy.

Use section headings to show the user where they are in the context of the page. These headings should be styled to reflect their hierarchy within the page. Page section headings should be marked up with the appropriate heading level (`h3`–`h6`).

See our [typographic style options](https://primer.style/primitives/storybook/?path=/story/typography-functional--overview) for heading styles.

[Responsive sidebar navigation patterns](#responsive-sidebar-navigation-patterns)
---------------------------------------------------------------------------------

On wide viewports, the sidebar is always visible. The way we show sidebar controls on narrow viewports depends on how the sidebar affects the main content area.

### [Sidebar as index of links to detail pages](#sidebar-as-index-of-links-to-detail-pages)

![Wide repo settings page](https://github.com/primer/design/assets/2313998/70299dbf-306d-4791-be02-e14da92e7dd4)

Wide viewports

![Index page next to detail page](https://github.com/primer/design/assets/2313998/0a36f76d-17aa-4982-b67b-423b1374ec00)

Narrow viewports

On narrow viewports, the sidebar is not visible if the user is navigated to `/{parent}/{detail-page}`. To see the detail page links, users must go back to `/{parent}`.

If the flow only allows users to go one level deep (for example, `/{parent}/{detail-page}`), show a link to navigate back to the parent route to see the sidebar as an index page.

![Close-up of header with back arrow](https://github.com/primer/design/assets/2313998/25f52e90-5c4f-405f-92ce-341e8d5d6032)

If the flow allows the user to go deeper than the detail page (for example, `{parent}/{detail-page}/{child-route}`), use a [breadcrumb](/product/components/breadcrumbs/) to allow users to navigate anywhere in the hierarchy. The breadcrumbs may also be visible on wide viewports, but it's not really needed since the user can use the link in the sidebar to go up a level.

![Close-up of header with breadcrumbs](https://github.com/primer/design/assets/2313998/3d203719-dfba-4d3d-9fb5-c4f07598a4c1)

  

You can see examples of this pattern implemented using Primer React components in Storybook:

*   [PageLayout / Examples / Parent-detail (w/ back arrow)](https://primer.style/react/storybook?path=/story/components-pagelayout-examples--parent-detail)
*   [PageLayout / Examples / Parent-detail (w/ breadcrumbs)](https://primer.style/react/storybook?path=/story/components-pagelayout-examples--parent-detail-breadcrumb)

### [Sidebar as set of filter options](#sidebar-as-set-of-filter-options)

![Wide marketplace redesign page](https://github.com/primer/design/assets/2313998/74d3dba1-58c9-4912-bcb0-e5bd095c5899)

Wide viewports

![Marketplace page on small screen with ActionMenu open](https://github.com/primer/design/assets/2313998/b2d5fbd6-77e5-4d13-8f73-68217aaf907a)

Narrow viewports

  

On narrow viewports, the sidebar is hidden and filter options become items in a menu. Putting the menu options in a menu saves screen real estate without removing them from the page.

You can see examples of this pattern implemented using Primer React components in Storybook:

*   [PageLayout / Examples / Filters (ActionMenu on narrow)](https://primer.style/react/storybook?path=/story/components-pagelayout-examples--filter-action-menu)
*   [PageLayout / Examples / Filters (bottom sheet on narrow)](https://primer.style/react/storybook?path=/story/components-pagelayout-examples--filter-bottom-sheet)
*   [PageLayout / Examples / Filters w/ 2 levels (bottom sheet on narrow)](https://primer.style/react/storybook?path=/story/components-pagelayout-examples--filter-bottom-sheet)

#### [Filter menu](#filter-menu)

Use an [ActionMenu](/product/components/action-menu/) for most cases, but use a [bottom sheet Dialog](/product/components/dialog/#bottom-sheets) if there are too many options to comfortably fit in an ActionMenu. There's no hard guideline on the max number of items for an ActionMenu but you can use 15 as the max if you're unsure.

##### [Menu trigger options](#menu-trigger-options)

By default, add a new button to the main content area header. Activating this button opens the menu of filter options.

![Marketplace page on small screen with ActionMenu open](https://github.com/primer/design/assets/2313998/263cc002-0e1f-4413-bb5b-b760385581a5)

Alternatively, you may use the content area's heading as a trigger to open the menu of filter options when activated. This pattern is useful for keeping the PageHeader clean by repurposing the heading as a control instead of adding another button to the header. The heading text will be the same as the currently selected filter, so this pattern works when the names of the filters describe the page content.

Since the heading will contain a button, it should be perceivable as an interactive element: it should have styles for interative states (hover, focus, and pressed) and a trailing dropdown triangle to differntiate it from plain text.

### [Sidebar with a mix of detail page links and filter options](#sidebar-with-a-mix-of-detail-page-links-and-filter-options)

![Wide search page](https://github.com/primer/design/assets/2313998/436586c9-0ef8-434c-80e0-efd4a8b76767)

Wide viewports

![Narrow search index page + Narrow search page with bottom sheet open](https://github.com/primer/design/assets/2313998/4bd55169-aefb-4b05-bafc-bbebefbd4761)

Narrow viewports

  

This pattern is just a combination of the two previous patterns described in this section.

On narrow viewports, the sidebar is hidden. Filter options become items in a menu, and detail page links are moved to a parent "index" view.

You can see an example of this pattern implemented using Primer React components in Storybook: [PageLayout / Examples / Parent-detail + filters (filters as btm sheet on narrow)](?path=/story/components-pagelayout-examples--parent-detail-plus-filters)

[Accessibility](#accessibility)
-------------------------------

### [Skip links](#skip-links)

Facilitate efficient navigation for screen reader users by including skip links to bypass dense redundant content and navigate directly to essential sections.

Example for skipping redundant content: there is a skip link near the global navigation that allows users skip over all the global navigation items and go straight to the main content.

Example for skipping dense content: there is a skip link near the header of a DataTable that allows users to skip over the large amount of content often rendered in a DataTable.

### [Tab order](#tab-order)

Users should be able to tab through the navigation elements in a logical order. The tab order should reflect the visual order of the elements.

### [Scannable headings](#scannable-headings)

A correct heading structure is critical for enabling users to navigate quickly within a page. Headings are by far the most common navigation technique for screen reader users.

Follow our accessibility [guidelines for headings](/accessibility/headings/).

[Related links](#related-links)
-------------------------------

*   [ActionMenu](/product/components/action-menu/)
*   [Breadcrumbs](/product/components/breadcrumbs/)
*   [Link](/product/components/link/)
*   [Pagination](/product/components/pagination/)
*   [SegmentedControl](/product/components/segmented-control/)
*   [UnderlineNav](/product/components/underline-nav/)
*   [UnderlinePanels](/product/components/underline-panels/)
*   [Accessibility - focus management](/accessibility/focus-management/)
*   [Accessibility - headings](/accessibility/headings/)
*   [Accessibility - links](/accessibility/links/)
*   [Responsive layout](/product/getting-started/foundations/layout/#page-types)
*   [Saving](/product/ui-patterns/saving/)
