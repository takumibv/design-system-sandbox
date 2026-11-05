<!-- tool: get_component_accessibility_guidelines / args: {"name":"StateLabel"} / at: 2026-11-05T10:56:05.329Z / isError: false -->

Here are the accessibility guidelines for the `StateLabel` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [StateLabel](/product/components/state-label/)
4.  [Accessibility](/product/components/state-label/accessibility/)

StateLabel
==========

StateLabel is used for rendering the status of an issue or pull request.

Page navigation navigation
--------------------------

*   [Overview](/product/components/state-label/)
*   [Accessibility](/product/components/state-label/accessibility/)

More items

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

`StateLabel` quickly provides people with the status of an issue or pull request.

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   `StateLabel`s should be labelled consistently, so that people can easily determine their purpose
*   `StateLabel` icons should be used consistently, so that people can determine their use

#### [Vision](#vision)

*   Text content inside the `StateLabel` must have a color contrast ratio of at least 4.5:1 against the label’s background color
*   `StateLabel` icons must have a colour contrast ratio of at least 3:1 against the label’s background color

### [Adaptability](#adaptability)

*   Make sure that text can be increased up to 200%, and that the `StateLabel`’s text remains visible
*   Every `StateLabel` must remain readable and not require horizontal scrolling to read it, at a viewport size of 320 by 256 CSS pixels
*   When adding additional text spacing, make sure that any visible labels can still be read in their entirety

### [Engineering for compatibility with assistive technology](#engineering-for-compatibility-with-assistive-technology)

#### [Screen reader](#screen-reader)

*   The `StateLabel` icon should have a text alternative to convey whether it relates to an issue or pull request

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

The component is rendered as a semantically neutral `<span>` element.

The text is resizable and the text spacing adjustable.

If the content of the component is longer/wider than the available viewport space, it reflows over multiple lines and does not cause overflowing content or horizontal scrollbars.

Colors with sufficient contrast are provided for the available `status` values.

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

Authors can set the `status` values for the component and provide the visible label text. However, the `status` and visible label text must be used consistently across the product. This will help people feel confident in understanding the status of an issue or pull request when they encounter this component.

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   The label for the component is clear and matches one of the variations used in the guidelines
*   If a custom background color is used, text meets the minimum contrast requirement of 4.5:1
*   If a custom background color is used, the `StateLabel` icon meets the minimum contrast requirement of 3:1
*   The `StateLabel` icon has a text alternative to convey whether the status relates to an issue or pull request

### [Component tests](#component-tests)

*   The component is rendered as a semantically neutral `<span>`
*   The component’s buttons remain readable and do not require horizontal scrolling when resized or zoomed to a viewport of 320px by 256px
