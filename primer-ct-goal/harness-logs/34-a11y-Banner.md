<!-- tool: get_component_accessibility_guidelines / args: {"name":"Banner"} / at: 2026-11-05T10:55:27.106Z / isError: false -->

Here are the accessibility guidelines for the `Banner` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Banner](/product/components/banner/)
4.  [Accessibility](/product/components/banner/accessibility/)

Banner
======

Banner is used to highlight important information.

Page navigation navigation
--------------------------

*   [Overview](/product/components/banner/)
*   [Guidelines](/product/components/banner/guidelines/)
*   [Accessibility](/product/components/banner/accessibility/)

More items

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   `Banner` types (critical, warning, success, etc.) must be communicated using more than just color to ensure understanding by all users, including those who have difficulty interpreting color signals
*   `Banner`'s are designed with visual prominence so they are emphasized and noticed by sighted users

#### [Vision](#vision)

*   All text within the `Banner` must have a color contrast ratio of at least 4.5:1
*   Any icons used for the component must have a color contrast ratio of at least 3:1

#### [Mobility](#mobility)

*   If a `Banner` contains links or buttons, these must meet the minimum target size of 24 by 24 CSS pixels for easier activation by users with limited dexterity

### [Adaptability](#adaptability)

*   The `Banner` must be responsive, ensuring all content remains readable without horizontal scrolling when zoomed in up to 200% or viewed at a viewport size of 320 by 256 CSS pixels

### [Interaction](#interaction)

*   When a `Banner` is dismissed, focus must move to a useful place on the page, preventing focus loss and allowing keyboard users to continue their journey smoothly
*   When a `Banner` dynamically appears on a page:
    *   If it contains essential information, focus must move to the `Banner`
    *   If it contains non-essential information and moving focus to the banner would be disruptive, the content must be automatically announced by screen readers using a live region

#### [Keyboard](#keyboard)

*   When a `Banner` dynamically appears, action controls within the `Banner` must be easily accessible using a keyboard

### [Engineering for AT Compatibility](#engineering-for-at-compatibility)

#### [Screen reader](#screen-reader)

*   `Banner`'s should be discoverable for screen reader users by appearing in the page’s heading hierarchy and landmarks
*   A text description for the `Banner`’s purpose must be provided, either in the `Banner` heading, the accessible name of the landmark, or associated with the icon
*   If a `Banner` contains non-essential information, it must be automatically announced to screen readers via a live region, without moving focus

#### [Speech recognition](#speech-recognition)

*   When a `Banner` contains links or buttons, the visible label must match or be included in the accessible name of the control, enabling speech recognition users to operate the control effectively

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

*   The `Banner` is rendered as a `<section>` landmark region, with an accessible name that indicates the type of `Banner`, and contains an `<h2>` heading that by default indicates the type of `Banner`
*   The heading text can be visually hidden and over-ridden with different text
*   The landmark and heading enable screen reader users to easily discover the `Banner` and know what type of message it contains
*   The type of `Banner` is conveyed by an icon, in addition to color, so that color blind users know what type of message it contains
*   The icon is decorative for screen reader users and has `aria-hidden="true"` applied to hide it from the accessibility tree
*   The `Banner`'s icon, text content, action link and button and border color meets minimum contrast requirements for all variants
*   The dismiss button has a recognizable close icon and descriptive accessible name
*   The action controls and dismiss button meet the minimum target size of 24 by 24 CSS pixels
*   The `Banner` is responsive, adjusting to the available space, with all content remaining visible and readable with no horizontal scrolling

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

*   If a `Banner` contains an action control you must provide a sufficiently descriptive label
*   When using a live region, ensure that they are implemented correctly so they can be announced by all screen readers and browser combinations. See [Why are my live regions not working?](https://tetralogical.com/blog/2024/05/01/why-are-my-live-regions-not-working/) for further information

### [Feedback Banners](#feedback-banners)

Banners that are used to communicate feedback require extra accessibility considerations to ensure they are immediately perceived by assistive technology users.

Consider using either a **live region announcement** or **focus management** technique:

*   **Live region announcements**: can be used to announce the new content to screen reader users. This is the preferred method for non-critical information (**though exceptions apply**, such in scenarios where focus loss needs to be handled).
*   **Focus management**: involves shifting a user's focus directly to the new Banner. This method is disruptive when used inappropriately, but is extremely helpful in scenarios where we need to guide the user towards an action.

Here are some questions to consider when deciding which method to use:

#### [Will the user be blocked if they miss the Banner?](#will-the-user-be-blocked-if-they-miss-the-banner)

If a user is blocked from proceeding if they miss the Banner, moving focus is usually preferred over a live region announcement.

A prime example of this is an error banner that appears after a form validation, such as [interactive error summary](https://primer.style/ui-patterns/forms/overview#interactive-summary-of-errors). Moving focus directly into the error banner allows all users (including screen reader users, zoom magnification users, and sighted keyboard users), to immediately perceive the feedback and take the necessary action to resolve the issue.

If the banner communicates non-critical information (e.g. a success banner) that wouldn't block a user if missed, a live region announcement is sufficient.

#### [Does the Banner contain an action?](#does-the-banner-contain-an-action)

If the Banner contains an action, placing focus on the newly shown Banner may be preferred over a live region announcement, especially if the action helps unblock/guide a user within a current flow. This ensures the user can immediately interact with the action without having to manually locate it.

#### [Where is a user's focus when the banner appears?](#where-is-a-users-focus-when-the-banner-appears)

If a user triggers an action that results in the element that they were on being removed from the DOM (that isn't a result of a page navigation), then focus management is required. For example, let's say that a user activates a `Save` button successfully, and the section of the page they were on gets replaced by new content. The removal of the `Save` button from the DOM will result in the user's focus getting lost.

Focus loss is disorienting, especially when some assistive technology users are unexpectedly taken back to the top of the page after performing an action. This is a [WCAG 2.4.3 Focus Order](https://www.w3.org/WAI/wcag22/Understanding/focus-order.html) issue.

If the Banner appears as part of the new content on the page after a user experiences focus loss, then it may be an appropriate focus target. This does not apply to scenarios where the user is navigated to a completely new route.

#### [Still unsure?](#still-unsure)

Many scenarios are nuanced, and can be tricky to figure out the appropriate path forward for. These benefit from additional feedback from assistive technology users.

If you're unsure about which technique is appropriate for your use case, please reach out to the Accessibility team who can help find a path forward.

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   If a `Banner` contains an action control it has a sufficiently descriptive label
*   If a `Banner` is dynamically added to a page without a page reload, focus is either moved to the `Banner` or the `Banner` content is automatically announced by screen readers through the use of a correctly implemented live region. When a `Banner` contains essential content focus is moved to it

### [Component tests](#component-tests)

*   The `Banner` component is exposed as a section landmark with a name appropriate for its variant type
*   The `Banner` has a default heading that matches the variant type
*   The `Banner` heading can be visually hidden and remains in the accessibility tree
*   The `Banner` heading text can be overridden and the landmark's name remains the default value
*   The `Banner` icon is appropriate for the variant type
*   The `Banner` icon has `aria-hidden="true"` and is hidden from the accessibility tree
*   The `Banner`'s icon, text content, action link, and button and border color meet minimum contrast requirements, for all variants
*   The dismiss button uses the close icon and has a descriptive accessible name
*   The action controls and dismiss button meet the minimum target size of 24 by 24 CSS pixels
*   The `Banner` is responsive, adjusting to the available space, with all content remaining visible and readable with no horizontal scrolling
