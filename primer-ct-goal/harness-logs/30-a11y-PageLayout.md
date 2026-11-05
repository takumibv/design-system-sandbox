<!-- tool: get_component_accessibility_guidelines / args: {"name":"PageLayout"} / at: 2026-11-05T10:55:13.380Z / isError: false -->

Here are the accessibility guidelines for the `PageLayout` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [PageLayout](/product/components/page-layout/)
4.  [Accessibility](/product/components/page-layout/accessibility/)

PageLayout
==========

PageLayout defines the header, main, pane, and footer areas of a page.

Page navigation navigation
--------------------------

*   [Overview](/product/components/page-layout/)
*   [Accessibility](/product/components/page-layout/accessibility/)

More items

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   The layout should follow a logical and consistent structure across pages to reduce cognitive load
*   Landmarks (e.g. `<header>`, `<main>`, `<aside>`, `<footer>`) help users understand the purpose of each region
*   Minimize distractions in fixed elements (e.g., sticky headers or panes) to help users focus on content
*   Avoid overloading any one section with too many interactive controls or dense text

#### [Vision](#vision)

*   Ensure sufficient color contrast between content, background, and section borders (minimum 4.5:1 for text)

#### [Mobility](#mobility)

*   All interactive elements within the layout (e.g. controls in the header or pane) must meet minimum target size (24×24 CSS pixels)
*   Avoid layout shifts during keyboard navigation; focus indicators should remain visible and unobstructed
*   Ensure that sticky or fixed areas (like headers or panes) do not block keyboard focus as users `Tab` through the page

### [Adaptability](#adaptability)

*   Layout must reflow properly at narrow widths, including collapsing or stacking pane content
*   Content must be readable and usable at 200% zoom or in a viewport of 320px wide, without requiring horizontal scrolling
*   Use semantic HTML and landmark elements to support assistive technologies and flexible navigation
*   Ensure users can resize text and spacing without breaking layout integrity

### [Interaction](#interaction)

#### [Keyboard](#keyboard)

*   The page layout itself doesn’t require keyboard interaction, but all interactive elements inside it (e.g., buttons, filters) must be keyboard accessible
*   Sticky or fixed elements must not interrupt natural tab flow
*   Skip links should be provided to quickly jump to main content

### [Engineering for AT Compatibility](#engineering-for-at-compatibility)

#### [Screen reader](#screen-reader)

*   Use semantic HTML5 landmarks (`<header>`, `<main>`, `<aside>`, `<footer>`) so screen reader users can navigate by region

#### [Speech recognition](#speech-recognition)

*   Ensure visible labels match programmatic labels for interactive elements
*   All controls and landmarks should be uniquely identifiable by name for voice commands (e.g., “click main content” or “scroll pane”)
*   Avoid generic IDs or ambiguous naming that could confuse speech recognition parsing

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

*   The layout uses semantic HTML5 landmarks:
    *   header for site or section headers
    *   main for primary content
    *   footer for page-level footers
*   Landmarks allow screen reader users to navigate directly to different sections of the page

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

*   If multiple headers/footers exist (e.g. for nested components), use `aria-label` or `aria-labelledby` to distinguish them
*   Avoid hiding content visually that is still in the accessibility tree. If conditionally rendering sections, ensure you use `hidden` or `aria-hidden` appropriately

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   The correct landmarks (`<header>`, `<main>`, `<footer>`) are rendered on the page
*   There is only one `<main>` region
*   Landmarks have appropriate accessible names when needed (`aria-label` or `aria-labelledby`)
*   When used with dynamic content, the focus is managed correctly
*   Content inside `<main>` is reachable via keyboard navigation

### [Component tests](#component-tests)

*   Renders semantic HTML5 landmarks (`header`, `main`, `footer`) with correct structure
*   Does not contain hardcoded dimensions or overflow behaviors that prevent content resizing or zooming
*   Properly renders child content in logical DOM order (e.g., `header` appears before `main`, `footer` at the end)
