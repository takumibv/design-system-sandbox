<!-- tool: get_component_accessibility_guidelines / args: {"name":"TextInput"} / at: 2026-11-05T10:55:44.974Z / isError: false -->

Here are the accessibility guidelines for the `TextInput` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [TextInput](/product/components/text-input/)
4.  [Accessibility](/product/components/text-input/accessibility/)

TextInput
=========

TextInput is used to set a value that is a single line of text.

Page navigation navigation
--------------------------

*   [Overview](/product/components/text-input/)
*   [Guidelines](/product/components/text-input/guidelines/)
*   [Accessibility](/product/components/text-input/accessibility/)

More items

The text input must have a clear, descriptive, and visible label that informs the user about the information they are expected to enter.

If there are additional instructions or requirements for the information the user is expected to enter, these should be provided as a caption underneath the text input.

The input must have an associated `<label>` to give it an accessible name that is announced by screen readers. Additional instructions or requirements must be easily discoverable by screen reader users - in general, by having them programmatically associated with the input using `aria-describedby`.

If the text input's value is invalid, this must be programmatically conveyed, and not solely rely on visual styling (such as a colored border). In addition, the form must show a descriptive error message that provides further information to the user about what the error is, and how to correct it. See [documentation for form validation](/product/ui-patterns/forms/#validation) for further details.

*   Text inputs must have a visible label. While the component allows for labels to be visually hidden, this is only permitted if there is equivalent visible text already within the page that acts as a label for the input. In limited cases an icon alone could act as the visible label, so not just text.
*   [Placeholder text](/accessibility/placeholders/) is **never** an acceptable substitute for a label because:
    *   The placeholder text disappears as soon as the input has a value
    *   Placeholder text colors are typically too light to meet the minimum color contrast ratio required for accessibility
    *   Do not rely solely on placeholder text as a label. Once a user enters information in a text input, this placeholder text won't be visible anymore, effectively leading to the input lacking a label.
*   Text inputs whose value is used to filter a list of results should be paired with an announcement for the effect of the filter. For more information, see the [conveying status (filter results)](/product/ui-patterns/loading/#filter-results) section of the loading state pattern guidelines.
*   Text inputs that collect personal information about the user who is filling in the form require an `autocomplete` attribute with the appropriate value, as this can help users understand the purpose of text input.

### [Built-in accessibility features](#built-in-accessibility-features)

By default, the component renders a correctly associated pair of `<label>` and `<input type="text">`.

Rails and React implementations automatically associate input captions and validation messages with the `<input>` using `aria-describedby`.

The colors used to visually denote the validation state of the input meet minimum color contrast requirements.

Usage of the `autocomplete` attribute is available in `TextInput` via the `autoComplete` prop in the React version.

### [Implementation requirements](#implementation-requirements)

When using Octicons for leading and trailing visuals, note that icons don't have any text alternative. They are purely visual, and not conveyed to screen readers. Don't rely on these icons alone to convey meaning – make sure that the text label of the button provides sufficient meaning/context on its own.

In the React version, when setting the `loading` property, the component will include a visual spinner. Note that this spinner is not conveyed to screen readers. You will need to use additional methods (such as a visually hidden live region notification) to convey this state to screen reader users. See the [documentation for loading](/product/ui-patterns/loading/) for further details.

While the Rails version of the component allows for the visible label of the text input to be hidden using `visually_hide_label`, this should only be done if there is an equivalent visible text that acts as the label. In that case, make sure that the actual label / accessible name of the input matches, or is at least contained within, the visible text acting as the label.

If using this component in a way where the input can be mapped to an `autocomplete` value, you should utilize the `autocomplete` attribute with the correct value.

### [How to test the component](#how-to-test-the-component)

#### [Integration tests](#integration-tests)

*   The text input has a sufficiently descriptive visible label, and does not rely on the use of placeholder text alone to act as the visible label
*   If the text input includes icons for its leading or trailing visuals, the input's purpose is clear even without the icons (as these are only decorative and are not conveyed to screen reader users)
*   In the React version, when using the `loading` state, this state is conveyed appropriately to screen reader users
*   Ensure that the text input has an `autocomplete` attribute attached, if the field collects personal information about the user who is filling in the form and maps to an autocomplete field described in [Input Purposes for User Interface Components](https://www.w3.org/TR/wcag22/#input-purposes)

#### [Component tests](#component-tests)

The `<label for="…">` attribute must point to the `id` of the `<input>`

*   If the component is set to `disabled`, the rendered `<input>` includes the `disabled` HTML attribute
*   If the component has a `placeholder` attribute, the rendered `<input>` includes the `placeholder` HTML attribute
*   If the component has an `autocomplete` attribute, the rendered `<input>` includes the `autocomplete` HTML attribute
*   If the component has an `autocomplete` attribute, the correct value is used for the `autocomplete` HTML attribute.
*   In the Rails implementation, if the component has a `caption`, the caption is rendered as an additional container underneath the `<input>`, and the `<input>` has an `aria-describedby="…"` pointing to the `id` attribute of the container
*   In the Rails implementation, if the component has a `validationMessage`, the message is rendered as an additional container underneath the `<input>`, and the `<input>` has an `aria-describedby="…"` pointing to the `id` attribute of the container
*   In the React implementation, text input fields are composed with the `FormControl` component.
    *   If `FormControl` has a `FormControl.Caption` child, the rendered `<input>` includes the `aria-describedby="…"` pointing to the `id` attribute of the caption
    *   If `FormControl` has a `FormControl.ValidationMessage` child, the rendered `<input>` includes the `aria-describedby="…"` pointing to the `id` attribute of the validation message
*   In the Rails implementation, if the component is set to `invalid`, the rendered `<input>` includes the `aria-invalid="true"` attribute
*   In the React implementation, if the component has a `validationStatus` with the value of `"error"`, the rendered `<input>` includes the `aria-invalid="true"` attribute
