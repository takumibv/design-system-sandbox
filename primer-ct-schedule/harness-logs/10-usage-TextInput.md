# get_component_usage_guidelines

- args: `{"name":"TextInput"}`
- isError: false
- ms: 288
- chars: 2434

---

Here are the usage guidelines for the `TextInput` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [TextInput](/product/components/text-input/)
4.  [Guidelines](/product/components/text-input/guidelines/)

TextInput
=========

TextInput is used to set a value that is a single line of text.

Page navigation navigation
--------------------------

*   [Overview](/product/components/text-input/)
*   [Guidelines](/product/components/text-input/guidelines/)
*   [Accessibility](/product/components/text-input/accessibility/)

More items

[Anatomy](#anatomy)
-------------------

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-915-92567.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=915-92567&t=OIceMocYMRq1FN7G-4)

  

*   **Label (required):** Briefly describes the input's purpose. A label must exist for screen readers, even if it's visually hidden.
*   **Required indicator:** Indicates that a value is required. Must be shown for any required field, even if all fields in the form are required.
*   **Input (required):** Accepts free-form text input. May also contain a leading visual, trailing visual, or trailing action.
    *   **Leading visual:** Icon or short piece of text to clarify its purpose (e.g., “$”). Appears before the input's value.
    *   **Trailing visual:** The same as a leading visual, but appears after the input's value.
    *   **Trailing action:** An action that affects the input. Most commonly used for a button that clears the input.
*   **Caption:** Provides context or usage instructions. Caption text may be displayed at the same time as a validation message, or it may be hidden if it only provides redundant information.
*   **Validation message:** A single validation message may be displayed to provide helpful information for a user to complete their task. It is most commonly used to explain why a value is invalid so they can correct it and submit the form.

[Best practices](#best-practices)
---------------------------------

*   Use placeholder text only as an example of expected input, but never for critical information.
*   Match the input width to the expected length of the value.
*   If the field accepts free-form text _or_ an option from a predetermined list, consider an [autocomplete input](/product/components/autocomplete/).
