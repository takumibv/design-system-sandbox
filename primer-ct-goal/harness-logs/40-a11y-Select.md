<!-- tool: get_component_accessibility_guidelines / args: {"name":"Select"} / at: 2026-11-05T10:55:48.136Z / isError: false -->

Here are the accessibility guidelines for the `Select` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Select](/product/components/select/)
4.  [Accessibility](/product/components/select/accessibility/)

Select
======

Select is for choosing a single option from a dropdown menu of predefined choices.

Page navigation navigation
--------------------------

*   [Overview](/product/components/select/)
*   [Guidelines](/product/components/select/guidelines/)
*   [Accessibility](/product/components/select/accessibility/)

More items

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   A `Select` must have a clear, descriptive, and permanently visible label that helps users understand the purpose of the input and the relationship between the available options
*   The label should be placed above the `Select`. If there is additional information about the options, it should be provided as a caption underneath the select
*   `Select` placeholders must not be used as substitutes for labels. Placeholders should be used sparingly and must not convey essential information
*   `Select` options should not be prefixed with emojis, as this disrupts typeahead functionality
*   If the `Select`’s value is invalid, users must be informed not just visually but also with a clear, descriptive error message that explains the issue and how to correct it

#### [Vision](#vision)

*   The `Select` must maintain required color contrast ratios (with text meeting a minimum contrast ratio of 4.5:1, and icons/graphics meeting a minimum contrast ratio of 3:1)
*   A custom focus style must be visible and meet minimum contrast standards to aid users with low vision

#### [Mobility](#mobility)

*   The control must meet minimum target size requirements (24 by 24 CSS pixels) to accommodate users with limited motor control

### [Adaptability](#adaptability)

*   Text resizing and spacing adjustments must be supported without loss of readability or function
*   The `Select` component must be usable without horizontal scrolling, at a viewport size of 320 by 256 CSS pixels

### [Interaction](#interaction)

*   A `Select` must not trap keyboard focus
*   The `Select` must not trigger a context change upon receiving focus or selecting an option unless this is expected and clearly communicated

#### [Keyboard](#keyboard)

*   Unless `disabled`, a `Select` must be focusable using the `Tab` key
*   Options within the `Select` must be navigable and selectable via keyboard

### [Engineering for AT compatibility](#engineering-for-at-compatibility)

#### [Screen reader](#screen-reader)

*   The input must have an associated `<label>` to provide an accessible name for screen readers
*   Additional descriptive content about the options should be programmatically associated with the input, typically using `aria-describedby`
*   The `Select` must expose the correct role (`combobox`), state (e.g. `expanded`/`collapsed`), and value to assistive technologies
*   If the `Select` is `disabled`, this state must also be programmatically conveyed to screen readers
*   Any invalid state must be programmatically indicated, and an accompanying error message must be discoverable by assistive technologies

#### [Speech recognition](#speech-recognition)

*   The visible label must match or be included in the accessible name, allowing speech recognition users to operate the `Select` by speaking the visible label
*   If the label is visually hidden, an equivalent visible label elsewhere on the page must exist to ensure operability by speech recognition users

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

*   Provide a sufficiently descriptive visible label
*   While the component allows for the visible label of the `Select` to be hidden, this should only be done if there is an equivalent visible text already that acts as the label. In that case, make sure that the input's accessible name matches or contains the visible text

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   The `Select` has a sufficiently descriptive visible label, and does not rely on the use of a placeholder option to act as the visible label
*   If the `<label>` has been visually hidden, there is an equivalent visible text that acts as the label, and the input's accessible name matches or contains the visible text.
*   If the `Select` has error validation, it has a descriptive error message that provides information about what the error is, and how to correct it

### [Component tests](#component-tests)

*   The component renders a `<label>` element and a `<select>`; the `<label for="…">` attribute points to the `id` of the `<select>`
*   The label appears above the `Select`, and if there is a caption it appears below the `Select`
*   The label, caption, value and validation messages meet the minimum contrast requirements of 4.5:1
*   The `Select`'s arrow icon and custom focus style meets the minimum contrast requirement of 3:1
*   The content remains readable, without requiring horizontal scrolling, when zoomed or viewed at a width equivalent to 320 CSS pixels
*   The control meets the minimum target size of 24 by 24 CSS pixels
*   If the component is required, the rendered `<label>` includes an asterisk and the `<select>` has an `aria-required="true"`
*   If the component has a caption, the caption is rendered as an additional container underneath the `<select>`, and the `<select>` has an `aria-describedby="…"` pointing to the `id` attribute of the container
*   If the component has validation, the message is rendered as an additional container underneath the `<select>`, and the `<select>` has an `aria-describedby="…"` pointing to the `id` attribute of the container
    *   If the component has error validation, the rendered `<select>` includes the `aria-invalid="true"` attribute, and the rendered icon is an alert
    *   If the component has success validation, the rendered `<select>` includes the `aria-invalid="false"` attribute, and the rendered icon is a check
*   If the component is disabled, the rendered `<select>` includes the `disabled` HTML attribute
