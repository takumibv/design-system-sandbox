<!-- tool: get_component_accessibility_guidelines / args: {"name":"Spinner"} / at: 2026-11-05T10:56:13.108Z / isError: false -->

Here are the accessibility guidelines for the `Spinner` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Spinner](/product/components/spinner/)
4.  [Accessibility](/product/components/spinner/accessibility/)

Spinner
=======

A Spinner is an indeterminate loading indicator, ideal for processes with unknown or variable durations.

Page navigation navigation
--------------------------

*   [Overview](/product/components/spinner/)
*   [Accessibility](/product/components/spinner/accessibility/)

More items

Use the `Spinner` component to provide a visible loading indicator for situations where an asynchronous API call or process may take a moderate amount of time (between 1 and 3 seconds) – see [Adapting to different wait times](/product/ui-patterns/loading/#adapting-to-different-wait-times).

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

The component only provides a visual, animated spinner icon. This icon is not exposed to screen readers, as it's an `<svg>` without a `role`, `aria-label`, or any text content.

    <svg height="32px" width="32px" viewBox="0 0 16 16" fill="none" class="Spinner__StyledSpinner…">…</svg>

The spinner icon uses the default `currentColor` of its parent container. Unless authors specifically override the default colors, the icon meets minimum color contrast requirements on the canvas default white background.

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

Do not rely solely on the `Spinner` component as a loading indicator, as it currently isn't exposed to screen readers, and has no built-in announcement.

Only use it as part of a fully realised solution (including `aria-live` notifications) for conveying loading/processing states. Refer to the [loading guidelines](/product/ui-patterns/loading/) for more details.

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   The component only provides a visual indicator, and passes color contrast. Additional solutions are required (such as the use of `aria-live` notifications in our [loading guidelines](/product/ui-patterns/loading/)) to convey the loading state for screen reader users.
*   If you are using custom colors, verify that the Spinner's "spinning" section meets the minimum color contrast requirement of `3:1` against the background it's presented on

### [Component tests](#component-tests)

The component renders an `<svg>` element without any text content (as otherwise this would be announced by screen readers)
