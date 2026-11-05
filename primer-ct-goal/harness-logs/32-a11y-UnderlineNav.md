<!-- tool: get_component_accessibility_guidelines / args: {"name":"UnderlineNav"} / at: 2026-11-05T10:55:19.978Z / isError: false -->

Here are the accessibility guidelines for the `UnderlineNav` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [UnderlineNav](/product/components/underline-nav/)
4.  [Accessibility](/product/components/underline-nav/accessibility/)

UnderlineNav
============

The UnderlineNav is used to display navigation in a horizontal tabbed format.

Page navigation navigation
--------------------------

*   [Overview](/product/components/underline-nav/)
*   [Guidelines](/product/components/underline-nav/guidelines/)
*   [Accessibility](/product/components/underline-nav/accessibility/)

More items

`UnderlineNav` provides a structured set of links to help users navigate to pages of content

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   Each link must have a clear and descriptive label that communicates the purpose of the link
*   Items with a counter must include the counter in the accessible name so it is conveyed to screen reader users
*   If an icon conveys meaning, the adjacent text must provide all necessary information independently of the icon

#### [Vision](#vision)

*   The label text must have sufficient color contrast against the background
*   The active link must be visually distinct for users with low vision
*   Icons in links are decorative by default and hidden from screen readers; they should not be relied upon for conveying meaning
*   Links must have a visible custom focus style with at least a 3:1 contrast ratio against the background

#### [Mobility](#mobility)

*   Each link must have a minimum target size of 24 by 24 CSS pixels to support users with motor impairments

### [Adaptability](#adaptability)

*   The component must not require horizontal scrolling, at a viewport size of 320 by 256 CSS pixels
*   If there is an overflow disclosure menu, the toggle control must be a `<button>` with an `aria-expanded` attribute to convey its expanded/collapsed state

### [Interaction](#interaction)

#### [Keyboard](#keyboard)

*   Each link must be focusable using the `Tab` key
*   Each link must be operable using the `Enter` key

### [Engineering for AT Compatibility](#engineering-for-at-compatibility)

#### [Screen reader](#screen-reader)

*   The navigation should appear within a landmark with a descriptive accessible name
*   The active link must be conveyed to screen readers using `aria-current`
*   Decorative icons must be hidden from screen readers using appropriate ARIA attributes
*   If a counter is present in a link, it must be included in the accessible name

#### [Speech recognition](#speech-recognition)

*   The links accessible names within the `UnderlineNav` must include the visible label text. This ensures that speech recognition users can activate the link by speaking the visible label

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

*   This component is rendered as a `<nav>` navigation landmark region. `UnderlineNav` has an `aria-label` prop to provide an accessible name for the navigation landmark
*   The individual items are rendered as an `<ul>` unordered list, with each item marked up as a link in a separate `<li>` list item
*   The counter text is included in the accessible name of the link
*   The label text and focus style meet minimum color contrast requirements
*   The active link is visually obvious to users with low vision. Whilst the coral underline of an active link does not meet contrast requirements, the label of the active link is bold and has higher contrast than the non-selected labels, which ensures users with low vision can distinguish the active link
*   The links have a target size larger than the 24×24 CSS pixels minimum
*   The component does not cause horizontal scrolling by automatically collapsing overflowing items into a disclosure menu - The control for the menu is a `<button>` with an `aria-expanded` attribute with a value that correctly conveys the expanded state

### [Keyboard navigation](#keyboard-navigation)

Items can be activated using a cursor or keyboard

Key(s)

Description

Enter

Activates the focused item.

Tab

Moves focus to the next item.

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

*   Provide a descriptive accessible name for the navigation landmark by using `aria-label` with an appropriate value

    <UnderlineNav aria-label="Repository">
    

*   Provide a clear and descriptive label for each link
*   Only use decorative icons as a text description cannot be set
*   Set `aria-current` to `"page"` to indicate that the item represents the current page. Set `aria-current` to `"location"` to indicate that the item represents the current location on a page

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   The navigation landmark has an appropriate and descriptive accessible name
*   Each link has an appropriate and descriptive label
*   If an icon is present within a link, the adjacent text inside of the link provides all the necessary information without relying on the icon itself
*   The active link is conveyed to assistive technologies using the `aria-current` attribute, and is set to `"page"` when the item represents the current page and `"location"` when the item represents the current location on the page

### [Component tests](#component-tests)

*   The component container is a `<nav>` and can accept the `aria-label` attribute
*   The navigation consists of an unordered list of links
*   Links that include a counter include the counter in the accessible name
*   The label text has sufficient color contrast against the background
*   The active link is visually obvious to users with low vision
*   Each link has a visible focus style. As it is custom, the focus style must have a minimum contrast ratio of 3:1 against the background
*   Each link has a minimum target size of 24 by 24 CSS pixels
*   Each link can be reached using the `Tab` key and activated by using the `Enter` key
*   The component does not cause horizontal scrolling when zoomed or viewed at a width equivalent to 320 CSS pixels. An overflow disclosure menu is present when space is limited.
*   The control for the overflow disclosure menu is a `<button>` that has an `aria-expanded` attribute with a value that correctly conveys the expanded state
