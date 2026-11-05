# get_component_accessibility_guidelines

- args: `{"name":"Checkbox"}`
- isError: false
- ms: 327
- chars: 6937

---

Here are the accessibility guidelines for the `Checkbox` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Checkbox](/product/components/checkbox/)
4.  [Accessibility](/product/components/checkbox/accessibility/)

Checkbox
========

Checkbox is a form control for single and multiple selections.

Page navigation navigation
--------------------------

*   [Overview](/product/components/checkbox/)
*   [Accessibility](/product/components/checkbox/accessibility/)

More items

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

`Checkboxes` are most commonly used as part of a checkbox group, but a `Checkbox` can be used on its own. The following guidance is for a `Checkbox` used on its own. If using a group of checkboxes, also refer to the [checkbox group accessibility guidance](https://primer.style/product/components/checkbox-group/)

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   A `Checkbox` must have a clear, descriptive, and permanently visible label so that users understand the purpose of the `Checkbox`
*   The label should appear to the right of the `Checkbox` and if there is a caption it should appear below the label
*   Mandatory fields must clearly convey that they are required
*   Errors must be clearly identifiable

#### [Vision](#vision)

*   The text label associated with the `Checkbox` must meet the minimum contrast requirements of 4.5:1
*   The border of a `Checkbox` must have a minimum contrast ratio of 3:1 against the background
*   A `Checkbox` must have a visible focus style. A custom focus style should be used as the browser's default focus style is often hard to see against some backgrounds. A custom focus style must have a minimum contrast ratio of 3:1 against the background

#### [Mobility](#mobility)

*   The target size and spacing of a `Checkbox` must be at least 24 by 24 CSS pixels. This is to ensure that the element is large enough to be easily activated by users with motor impairments
*   A `Checkbox` must not trap focus or initiate a change of context when focused or activated

### [Adaptability](#adaptability)

*   Make sure that the `Checkbox` can be increased up to 200%, and any visible labels remain visible, and that the field is not clipped or hidden
*   The `Checkbox` must remain readable and not require horizontal scrolling to read or operate it, at a viewport size of 320 by 256 CSS pixels
*   When adding additional text spacing, make sure that visible labels can still be read in their entirety, and that the `Checkbox` is not clipped or hidden

### [Interaction](#interaction)

#### [Keyboard](#keyboard)

*   Unless a `Checkbox` is disabled, it must by focusable using the `Tab` key, and pressing the `Space` will check and uncheck the `Checkbox`

### [Engineering for AT Compatibility](#engineering-for-at-compatibility)

#### [Screen reader](#screen-reader)

*   The `Checkbox` must have an associated `<label>` to provide an accessible name that screen readers can announce. Any additional instructions or requirements should also be easily discoverable by screen reader users, typically by programmatically associating them with the input using `aria-describedby`
*   The `Checkbox` must have the correct `checkbox` role to ensure that screen readers accurately convey the type of control
*   The checked state of a `Checkbox` must be conveyed by screen readers so people that cannot see the screen know if it is checked or not
*   If a `Checkbox` is `disabled`, the `disabled` state must be conveyed by screen readers

#### [Speech recognition](#speech-recognition)

*   The accessible name must include any visible text label so that that speech recognition users can activate a `Checkbox` by saying the visible text label

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

*   The label, caption, `Checkbox` border, and custom focus style meet minimum contrast requirements
*   The text is resizable and the text spacing adjustable. The component reflows when zoomed or viewed at a width equivalent to 320 CSS pixels
*   By default, the component renders a correctly associated pair of `<label>` and `<input type="checkbox">`, ensuring the `Checkbox` has an accessible name that includes any visible text
*   Using the the native `<input type="checkbox">` ensures that the `Checkbox` conveys the correct role and checked state to screen readers and has the correct keyboard behavior
*   The caption is automatically associated with the `<input>` using `aria-describedby`
*   When the `Checkbox` is disabled, the `disabled` attribute is applied and the disabled state conveyed to screen readers
*   When the `Checkbox` is given the indeterminate state, `aria-checked="mixed"` is applied and the state conveyed to screen readers

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

*   Do not visually hide a `Checkbox`'s label
*   When using an icon for a leading visual, note that the icon doesn't have a text alternative. They are purely visual and not conveyed to screen readers. Don't rely on these icons alone to convey meaning, ensure that the text label of the button provides sufficient meaning/context on its own
*   Ensure that the `Checkbox` has sufficient spacing from other controls, to meet the minimum target and spacing size of 24 by 24 CSS pixels

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   The `Checkbox` has a clear and permanently visible label that describes the purpose of the `Checkbox`
*   If the `Checkbox` includes a leading visual icon, the input's purpose is clear from the text alone
*   The `Checkbox` has sufficient distance from other controls to meet the minimum target and spacing size of 24 by 24 CSS pixels

### [Component tests](#component-tests)

*   The component renders a correctly associated pair of `<label>` and `<input type="checkbox">`
*   The label appears to the right of the `Checkbox`, and if there is a caption it appears below the label
*   The label and caption meet the minimum contrast requirements of 4.5:1
*   The `Checkbox` border and custom focus style meets the minimum contrast requirement of 3:1
*   The content remains readable, without requiring horizontal scrolling, when zoomed or viewed at a width equivalent to 320 CSS pixels
*   If there is a caption, it is automatically associated with the `<input>` using `aria-describedby`
*   If the `Checkbox` is disabled, the `disabled` attribute is present
*   If the `Checkbox` is indeterminate, `aria-checked="mixed"` is present and conveyed to screen readers
