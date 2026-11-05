# get_component_accessibility_guidelines

- args: `{"name":"Token"}`
- isError: false
- ms: 343
- chars: 7363

---

Here are the accessibility guidelines for the `Token` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Token](/product/components/token/)
4.  [Accessibility](/product/components/token/accessibility/)

Token
=====

Token is a compact representation of an object, and is typically used to show a collection of related metadata.

Page navigation navigation
--------------------------

*   [Overview](/product/components/token/)
*   [Guidelines](/product/components/token/guidelines/)
*   [Accessibility](/product/components/token/accessibility/)

More items

A `Token` can be static text, a link or a button, and may be removable.

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   A `Token` must be implemented using appropriate semantic HTML:
    *   Use `<span>` for static text
    *   Use `<a>` for links
    *   Use `<button>` for buttons
*   If a `Token` is a link or button and removable via Backspace or Delete, this keyboard functionality must be communicated to screen reader users via accessible name or description
*   A `Token` may have a leading visual (icon) which is decorative only and should be hidden from screen readers
*   A removable `Token` must contain a close icon to visually indicate removability

#### [Vision](#vision)

*   Text within a `Token` must meet a minimum contrast ratio of 4.5:1 against its background
*   The default `Token` in dark mode does not meet this requirement (grey on dark grey)
*   An interactive `Token` must have a visible custom focus style that meets a minimum contrast of 3:1 against the background
*   Avoid relying on browser defaults due to poor contrast in some environments

#### [Mobility](#mobility)

*   The control for removing a `Token` must meet a minimum target size of 24 by 24 CSS pixels
    *   The small and medium variants currently do not meet this requirement

### [Adaptability](#adaptability)

*   Text resizing and spacing adjustments must be supported
*   Content must remain readable without requiring horizontal scrolling at small screen widths (e.g., 320 CSS pixels)

### [Interaction](#interaction)

#### [Keyboard](#keyboard)

*   A removable `Token` must be dismissible via keyboard (e.g. `Backspace` or `Delete`)
*   A static text `Token` that is removable must include a `<button>` with an accessible name indicating the `Token` that will be removed

### [Engineering for AT Compatibility](#engineering-for-at-compatibility)

#### [Screen reader](#screen-reader)

*   A removable `Token` must include accessible names or descriptions for screen readers that clarify:
    *   That the `Token` is removable
    *   How it can be removed (e.g., by keypress if no visible remove button is present)
*   Icons used as leading visuals should be hidden from screen readers if they are decorative

#### [Speech recognition](#speech-recognition)

*   For both interactive an `Token` (marked up as `<button>`) and a `Token` that includes a separate remove button, the accessible name of the button must include the visible label text. This ensures that speech recognition users can activate the button by speaking the visible label

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

*   `Token` are a `<span>` by default, but a link can use an `<a>` and a button can use a `<button>` by specifying the appropriate element with the `as` prop
*   The default color meets the minimum contrast requirement of 4.5:1 between foreground and background colors
*   A `Token` that is interactive has a visible focus style
*   A `Token` that is removable has a close icon
*   The control for removing a `Token` meets the minimum target size of 24 by 24 CSS pixels in the `large` and `xlarge` variants
*   The removable `Token` has built in keyboard accessibility
*   A static text `Token` that is removable contains a `<button>` with an accessible name that conveys which `Token` will be removed
*   A `Token` that is a link or a button and is removable includes the instructions " (press backspace or delete to remove)" for screen reader users as part of the accessible name by default. `IssueToken` does not include the instruction

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

*   If using custom colors, ensure the text in a `Token` has a minimum contrast of 4.5:1 against the `Token` background
*   If a `Token` has the functionality of a link (takes a user to a page) or a button (performs an action), set the appropriate semantic element by using the `as` prop
*   When using a removable `Token` that is a link or button, do not use the small or medium variants as the close control does not meet the minimum target size and spacing requirements of 24 by 24 CSS pixels
*   If an `IssueToken` is a link or a button and is removable, the keyboard instructions " (press backspace or delete to remove)" must be added to the accessible name or description for screen reader users, as they are not included by default
*   Only use decorative icons for the leading visual as a text description cannot be set

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   The text contrast of custom colors meets the minimum requirement of 4.5:1 between foreground and background colors
*   A `Token` is implemented using the appropriate HTML element:
    *   A `Token` that is a link uses an `<a>` element
    *   A `Token` that is a button uses a `<button>` element
    *   A `Token` that is text uses a `<span>` element
*   A `Token` that is removable and is a link or a button use either the `large` or `xlarge` variant. The `small` and `medium` variant's close control do not meet the minimum target size and spacing requirements
*   If an `IssueToken` is a link or a button and is removable, the keyboard instructions " (press backspace or delete to remove)" has been added to the accessible name or description
*   A leading visual is only used for decorative purpose

### [Component tests](#component-tests)

*   The text contrast of default colors meet the minimum requirement of 4.5:1 between foreground and background colors
*   `Token` that is interactive has a visible focus style
*   When a `Token` is removable it has a close icon
*   In the `large` and `xlarge` variants of a `Token`, the target size, including spacing of the control for removing the `Token`, is at least 24 by 24 CSS pixels
*   If a `Token` is removable and is a `<span>`, then the control to remove the `Token` is a `<button>` with a descriptive accessible name, and is focusable with the "Tab" key and can be activated using the "Esc" and "Space" keys
*   If a `Token` is removable and is an `<a>` or a `<button>`:
    *   a close button is not rendered, the `Token` is removed by focusing the `Token` and using the "Backspace" or "Delete" keys
    *   the text "(press backspace or delete to remove)" is included as visibly hidden text in the link/button so it is part of the accessible name
