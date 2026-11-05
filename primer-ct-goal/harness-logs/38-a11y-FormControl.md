<!-- tool: get_component_accessibility_guidelines / args: {"name":"FormControl"} / at: 2026-11-05T10:55:41.584Z / isError: false -->

Here are the accessibility guidelines for the `FormControl` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [FormControl](/product/components/form-control/)
4.  [Accessibility](/product/components/form-control/accessibility/)

FormControl
===========

FormControl displays a labelled input and, optionally, associated validation text and/or hint text.

Page navigation navigation
--------------------------

*   [Overview](/product/components/form-control/)
*   [Accessibility](/product/components/form-control/accessibility/)

More items

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   All form controls must have a clear, descriptive, and permanently visible label, so that users understand the information required
*   Information or formatting requirements for the component’s input field, must be provided
*   The label should appear visually above the text input field
*   Mandatory fields must clearly convey that they are required
*   Errors must be clearly identifiable
*   Error messages, as well as any suggestions to resolve them, must be clear and easy to understand

#### [Vision](#vision)

*   All text within the component must have a color contrast ratio of at least 4.5:1
*   The border for the component must have a color contrast ratio of at least 3:1
*   Leading visuals and error icons must have a color contrast ratio of at least 3:1
*   The form control must have a visible focus style

#### [Mobility](#mobility)

*   The form control must not trap focus, or initiate a change of context when focused or information is entered
*   The field must have a minimum target size of 24×24 CSS pixels. This is to ensure that the element is large enough to be easily activated by users with moving disabilities

### [Adaptability](#adaptability)

*   Make sure that component can be increased up to 200%, and any visible labels remain visible, and that the field is not clipped or hidden
*   The form control must remain readable and not require horizontal scrolling to read or operate it, at a viewport size of 320 by 256 CSS pixels
*   When adding additional text spacing, make sure that visible labels can still be read in their entirety, and that the field is not clipped or hidden

### [Interaction](#interaction)

#### [Keyboard](#keyboard)

*   Each form control field must receive focus when navigating with the `Tab` key

### [Engineering for compatibility with assistive technology](#engineering-for-compatibility-with-assistive-technology)

#### [Screen reader](#screen-reader)

*   The error state of any housed form fields should be conveyed programmatically, using the `aria-invalid=“true”` attribute when rendered in HTML, so that people using screen readers can easily determine an error is present
*   The form control must have an accessible name. Additional instructions or requirements must be easily discoverable by screen reader users - in general, by having them programmatically associated with the input using aria-describedby.
*   If the form control’s form field is disabled, the disabled state must be conveyed by screen readers.

#### [Speech recognition](#speech-recognition)

*   The form control’s input must include the visible label text in its accessible name (ideally at the start of the accessible name), so that people can target it using speech recognition software

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

This helper component manages the programmatic relationship between a `FormControl`’s label, input field, caption, and validation messaging.

As long as these elements are provided correctly, they will be rendered with the correct elements and attributes to link them together.

*   Labels are rendered as `<label>` elements, related to the input field, using the `for` attribute to reference the element’s `id`
*   Captions and validation messages are both rendered as generic `<span>` elements, but are related to the input field, as the input has a `aria-describedby` attribute which references their `id` attributes

An example of this in the rendered HTML is as follows:

    <div …>
      <label for="«rpu»" …>Label</label>
      <span … aria-busy="false">
        <input aria-invalid="true" id="«rpu»" aria-describedby="«rpu»-validationMessage «rpu»-caption" … type="text" />
      </span>
      <div …>
        …
        <span aria-hidden="true" …>
          <svg aria-hidden="true" focusable="false" …>…</svg>
        </span>
        <span id="«rpu»-validationMessage" …>Something went wrong</span>
        …
      </div>
      <span … id="«rpu»-caption">This is a caption</span>
    </div>

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

The `FormControl`’s form field must be given an accessible name, so that people can determine the information required from them.

To achieve this, you’ll need to provide a `<FormControl.Label>`. When structured correctly, the label text will be used as the input field’s accessible name, as demonstrated in the following code example.

    <FormControl>
      <FormControl.Label>Label</FormControl.Label>
      <TextInput />
    </FormControl>
    

### [Providing additional information with captions](#providing-additional-information-with-captions)

If you need to provide additional information about the field, or the format in which information must be entered, this needs to be done with the `<FormControl.Caption>`.

    <FormControl>
      <FormControl.Label>Label</FormControl.Label>
      <TextInput />
      <FormControl.Caption>This is a caption</FormControl.Caption>
    </FormControl>
    

### [Providing feedback with validation messages](#providing-feedback-with-validation-messages)

Any validation, including error messages and related resolutions, must be provided using `<FormControl.Validation>`.

Errors should use the `variant=“error”` prop, and successful interactions should use the `variant=“success”` prop.

    <FormControl>
      <FormControl.Label>Label</FormControl.Label>
      <TextInput />
      <FormControl.Validation variant="error">Something went wrong</FormControl.Validation>
    </FormControl>
    <FormControl>
      <FormControl.Label>Label</FormControl.Label>
      <TextInput />
      <FormControl.Validation variant="success">We've submitted your information</FormControl.Validation>
    </FormControl>
    

### [Customising the display of the component](#customising-the-display-of-the-component)

Using the `FormControl` component’s className prop, it’s possible to change the style and therefore the display of the component. When doing this, make sure that:

*   content is not further truncated, and therefore lost, when zooming in to 200% or adding additional text spacing
*   text (including labels, captions, validation messages, and values) has a contrast of at least 4.5:1 against the component’s background
*   icons have a contrast of at least 3:1 against the component’s background

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   The `FormControl` has a clear and permanently visible label that describes the purpose of the input field

### [Component tests](#component-tests)

*   The component renders a correctly associated pair of a `<label>` element and an input element
*   The label, caption, and validation text all meet the minimum contrast requirements of 4.5:1
*   The input element used in the component has a border that meets the minimum contrast requirement of 3:1
*   The content remains readable, without requiring horizontal scrolling, when zoomed or viewed at a width equivalent to 320 CSS pixels
*   If there is a caption, it is automatically associated with the `<input>` using the `aria-describedby` attribute
*   If there is a validation message, it is automatically associated with the `<input>` using the `aria-describedby` attribute
*   If the `FormControl`'s input is disabled, the `disabled` attribute is present on the input
