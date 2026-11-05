# get_component_accessibility_guidelines

- args: `{"name":"IconButton"}`
- isError: false
- ms: 281
- chars: 4874

---

Here are the accessibility guidelines for the `IconButton` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [IconButton](/product/components/icon-button/)
4.  [Accessibility](/product/components/icon-button/accessibility/)

IconButton
==========

IconButton is used for buttons that show an icon in place of a text label.

Page navigation navigation
--------------------------

*   [Overview](/product/components/icon-button/)
*   [Guidelines](/product/components/icon-button/guidelines/)
*   [Accessibility](/product/components/icon-button/accessibility/)

More items

Even though the label is visually hidden, a text label needs to be defined so a screen reader can read that label to the user. A graphical `IconButton` must:

1.  Have an accessible name (acting as a text alternative for the Octicon) that describes the action that will be performed when the button is activated.
2.  Be visually recognisable as representing the action. For example, a magnifying glass icon could be used to represent a search button, with a text alternative of "Search". This allows voice control software users to activate the button by saying "click search", whereas an icon that wasn't recognisable as representing the text alternative would leave the user guessing at the button's accessible name, and other users guessing at its purpose.

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

By default, this component is rendered as a regular `<button>` with a nested `<svg>` for the Octicon. The `aria-label` property is used as the button's accessible name.

    <button … aria-label="…">
      <svg aria-hidden="true" …> … </svg>
    </button>

When the `disabled` property is set, the component is rendered as a standard `<button disabled> … </button>` disabled button.

When the `inactive` property is set, the component is rendered as `<button aria-disabled="true"> … </button>` – the control itself is visually styled to appear disabled. However, the control is still keyboard-focusable, and can still be activated.

The selectable variant/scheme colors meet minimum color contrast requirements.

The size variants all meet the minimum target size requirement.

`IconButton` automatically has a visible tooltip that appears when the button is hovered and when it receives keyboard focus. The tooltip visually replicates the accessible name of the button. The tooltip can be hovered when using the mouse, and can be dismissed using `Esc` without needing to move the mouse or focus away from the button.

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

### [Accessible name](#accessible-name)

You must provide a sufficiently descriptive `aria-label` for the component.

### [Target size](#target-size)

The button must have a minimum target size of 24×24 CSS pixels. This is to ensure that the button is large enough to be easily activated by users with motor impairments.

### [Convey meaning with more than color](#convey-meaning-with-more-than-color)

`IconButton` has different schemes/variants (such as `default`, `danger`, `invisible`), which result in different colors for the icon, background, and borders. These differences are purely visual, so they may be difficult to distinguish for users with impaired color perception. They also won't be perceived by screen reader users. For this reason, you can't rely on the scheme/variant alone to give meaning to your buttons.

Make sure to differentiate IconButtons through the use of sufficiently different Octicons, rather than their visual presentation.

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   The button has a sufficiently descriptive accessible name
*   The button uses an icon with sufficiently clear meaning that conveys its action
*   If the button uses a schema/variant for a particular presentation, the button does not solely rely on this visual aspect to convey its purpose, or to differentiate it from other buttons

### [Component tests](#component-tests)

*   The `aria-label` added to the component is output as the button's `aria-label`
*   Unless the button is `disabled`, it can be focused and activated using the keyboard
*   If the button is set to be `inactive`, it still receives keyboard focus, but it conveys its inactive/disabled state to screen readers with the `aria-disabled="true"` attribute
*   The button has a minimum target size of 24×24 CSS pixels, regardless of content
*   The tooltip for the button can be hovered with the mouse, and the tooltip can be dismissed using `Esc` without needing to move the mouse or focus away from the button
