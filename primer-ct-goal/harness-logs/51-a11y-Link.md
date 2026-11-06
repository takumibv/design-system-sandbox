<!-- tool: get_component_accessibility_guidelines / args: {"name":"Link"} / at: 2026-11-05T10:56:24.590Z / isError: false -->

Here are the accessibility guidelines for the `Link` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Link](/product/components/link/)
4.  [Accessibility](/product/components/link/accessibility/)

Link
====

Links are used to apply styles to hyperlink text.

Page navigation navigation
--------------------------

*   [Overview](/product/components/link/)
*   [Guidelines](/product/components/link/guidelines/)
*   [Accessibility](/product/components/link/accessibility/)

More items

Links are essential for navigation but can be frustrating if not properly considered.

Screen readers expect links and buttons to behave differently. Misusing them can be disorienting. Screen reader users often navigate via link lists, so avoid vague labels like "read more" or "click here."

Use this component only for links that navigate to another location, page, or downloadable file. For in-page actions (e.g., opening modals, expanding widgets, submitting forms), use specific components like [buttons](/product/components/button/). See [Links and buttons](/accessibility/design-guidance/links-and-buttons/) for more on the appropriate use cases for each component.

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   A link’s purpose must be obvious from the link text alone. If you can't get an idea of where a link will take you based on the link text without reading the surrounding text, the link text should be updated
*   Make sure a link's purpose can be understood from the link text alone, without needing the surrounding context

#### [Vision](#vision)

*   Color alone shouldn't distinguish links from text, as this can be hard for users with low or color blind vision
*   Keep underline styling on links within body text for easy identification
*   Like normal text, a link must have a 4.5:1 contrast against the background color it’s placed on
*   If a link is surrounded by text, it must be underlined or pass a 3:1 contrast against the surrounding text
*   Visual cues to demarcate links include:
    *   The `accent.fg` color with `fg.default` text on `canvas[...]` backgrounds
    *   Underlining the link text
    *   Using an icon before or after the link
    *   Using a background shape behind the link
    *   A link color with 3:1 contrast against surrounding text and 4.5:1 against the background
*   Links should look like links, not buttons, except in rare circumstances like CTAs
*   Avoid underlining every link (e.g. navigation lists), but make sure it's visually clear that the element is a link

#### [Mobility](#mobility)

*   Links must have a minimum target size of 24 × 24 CSS pixels so they can be easily activated by users with limited dexterity or who are using touch devices

### [Adaptability](#adaptability)

*   Links and surrounding content must remain readable and operable when the page is zoomed to 400% or when the viewport is resized to 320px wide. Links should reflow naturally without causing horizontal scrolling
*   Links must not break layout or overlap with other content when users increase text size up to 200% using browser controls
*   Make sure links remain legible and their layout stays intact when users apply custom text spacing

### [Interaction](#interaction)

#### [Keyboard](#keyboard)

*   Make sure links receive our global focus indicator styling when navigating with a keyboard (reference: [Focus management](https://primer.style/accessibility/focus-management/))

### [Engineering for AT Compatibility](#engineering-for-at-compatibility)

#### [Screen reader](#screen-reader)

*   Screen readers expect links and buttons to behave differently. Misusing them can be disorienting
*   Screen reader users often navigate via link lists, so avoid vague labels like "read more" or "click here"
*   Links must have appropriate link text that is sufficiently descriptive, giving users enough information to understand where the link will take them
*   For links wrapped around images, the image must have an appropriate text alternative, which acts as the link text
*   When the `muted` property is used, the visual styling changes but not the programmatic accessibility. Don’t rely solely on it to distinguish links
*   It may be acceptable in some scenarios to provide more descriptive link text to screen reader users via `aria-label`, but:
    *   The visible text must be included in full in the accessible name
    *   The sentence must be grammatically correct when read with both visible and ARIA labels
    *   Prefer unified visible and accessible text when possible

#### [Speech recognition](#speech-recognition)

*   The visible text of a link should also be part of the accessible name to support compatibility with voice activation tools

[How to test links](#how-to-test-links)
---------------------------------------

### [Integration tests](#integration-tests)

*   Activating a link changes the URL. It is not intended to be used as a trigger for an action. A `button` is more appropriate for elements that trigger an action when activated.
*   Where `muted` links are used, this visual presentation is not used as the only way to differentiate links or to somehow convey semantic meaning
*   The links have an appropriately descriptive link text; in the case of image links, the images have an appropriate text alternative

### [Component tests](#component-tests)

*   Links are rendered as standard `<a href="…"> … </a>` links
*   Content passed into the component is output as the link's visible text

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

Setting the `muted` property changes the visual presentation of the link to use a more subdued color. However, this visual change is not conveyed programmatically – so muted links will be announced the same way as regular links by screen readers. Don't rely solely on the `muted` property to distinguish links that serve a different purpose. If links need to be differentiated, make the difference clear in the link text itself. Alternatively, group these links separately and add context, such as a preceding heading or explanatory paragraph.

Links must have appropriate link text that is sufficiently descriptive – giving users enough information to understand where the link will take them. For links that are wrapped around images, make sure that the images have an appropriate text alternative, as this will act as the link text.

[Related guidance](#related-guidance)
-------------------------------------

*   [Accessible pattern guidance: Links](/accessibility/patterns/primer-components/links/). Visual design guidance, Do and Don't examples, best practices for writing link text, and common mistakes to avoid.
*   [Accessible design guidance: Links and buttons](/accessibility/design-guidance/links-and-buttons/). Guidance on appropriate use of links vs. buttons, including semantics, accessible naming, opening in new tab or window behavior, and disabling.
