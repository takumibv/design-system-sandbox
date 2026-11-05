# get_component_accessibility_guidelines

- args: `{"name":"Button"}`
- isError: false
- ms: 297
- chars: 9981

---

Here are the accessibility guidelines for the `Button` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Button](/product/components/button/)
4.  [Accessibility](/product/components/button/accessibility/)

Button
======

Button is used to initiate actions on a page or form.

Page navigation navigation
--------------------------

*   [Overview](/product/components/button/)
*   [Guidelines](/product/components/button/guidelines/)
*   [Accessibility](/product/components/button/accessibility/)

More items

Buttons need clear, descriptive labels so accessible names convey the action. Labels should be concise, descriptive, and include sufficient context without relying too heavily on icons or other visual cues. In fact, leading and trailing icons are purely decorative and ignored by screen readers.

### [Button Schemes](#button-schemes)

Button schemes (`danger`, `primary`, `invisible`) offer visual distinctions, but color alone isn’t reliable for users with color impairments or screen readers. Make sure button text always provides sufficient meaning.

### [Target Size](#target-size)

Give buttons a minimum target size of 24×24 CSS pixels to support users with motor impairments.

[Do not disable buttons](#do-not-disable-buttons)
-------------------------------------------------

There are rare cases where it's ok to disable a Button, but it should generally be avoided. In forms mode, they won't be discovered as they won't take keyboard focus.

For more information on disabled controls, see [Disabling links and buttons](/accessibility/design-guidance/links-and-buttons/#disabling-links-and-buttons).

[Inactive buttons and `aria-disabled`](#inactive-buttons-and-aria-disabled)
---------------------------------------------------------------------------

An [inactive](/product/components/button/guidelines/#inactive-buttons) Button **should not be conveyed as disabled** with `aria-disabled` if it performs an action when activated. For example, showing a dialog with more info about why the Button is inactive.

An [inactive](/product/components/button/guidelines/#inactive-buttons) Button **may be conveyed as disabled** with `aria-disabled` if it does not perform an action when activated.

[Descriptive buttons](#descriptive-buttons)
-------------------------------------------

Labeling buttons properly lets users know what will happen when they activate the control, lessens errors, and increases confidence.

Read more about [descriptive buttons](/accessibility/patterns/primer-components/descriptive-buttons/).

[Button loading state](#button-loading-state)
---------------------------------------------

![A Button in a loading state with a11y annotations](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2330-168968.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2330-168968&t=OIceMocYMRq1FN7G-4)

  

For loading buttons, don't remove them from the DOM or add `disabled` to avoid disrupting focus and keyboard navigation.

Instead, add `aria-disabled="true"` to indicate the loading state. Include a visually hidden, ARIA live region (using `aria-live="polite"`) message like "Saving profile" to communicate status. The live region must be present on page load, but the message inside the live region should only be rendered while the Button is in a loading state.

If there's an error, shift focus to a relevant heading, such as an `<h2>` in the error banner.

This message should be in an ARIA live region, using `aria-live="polite"`. The live region must be present on page load, but the message inside the live region should only be rendered while the Button is in a loading state.

If an error prevents process from being completed, focus should be brought to an `<h2>` (or next relevant heading) of the error banner.

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

The component is rendered as a regular `<button> … </button>` element. The content passed to the component is used as the button's accessible name.

In rare cases when the `disabled` property is set, the component is rendered as a standard `<button disabled> … </button>` disabled button.

In rare cases when the `inactive` property is set, the component is rendered as `<button aria-disabled="true"> … </button>` – the control itself is visually styled to appear disabled. However, the control is still keyboard-focusable, and can still be activated.

The selectable variant/scheme colors meet minimum color contrast requirements.

The medium and large variants meet the minimum target size requirement. However, the small Button variant may currently fall below the minimum requirements - see the implementation requirements section for details.

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

When using a trailing action icon, the icon will lack a text alternative. If the trailing action is used to indicate that the Button will have a particular effect, such as opening a dropdown, you will need to add additional programmatic information to the Button to convey this information to screen reader users – for instance, by adding an `aria-haspopup` attribute, and conveying the current state of the dropdown (whether it's expanded or collapsed) with `aria-expanded`.

When using the small Button variant, make sure that the resulting Button has an appropriate width. While the padding of the medium and large Button variants is sufficient to meet this requirement, no matter the content of the Button, the padding of the small Button variant is not sufficient if the content passed to the Button is extremely narrow. For example, a single letter "i" would result in a Button width of 21.5 CSS pixels. Make sure the content of the Button's small variation is wide enough to meet this requirement.

When providing an accessible name (via `aria-label` or `aria-labelledby`) that overrides the visually-presented label, make sure that the accessible name includes the visible label in totality. This lets speech-input users activate the control using information that is visually available. This approach should be used with caution – make sure that the visible label and the accessible name remain in sync.

When a button's visible label changes as a result of it being activated, make sure that this information is also communicated to assistive technology users. For example, if a `Star` button is activated, and the visual label dynamically changes to `Starred`, this change must be conveyed to screen reader users. Currently, when the label/accessible name of the currently focused element is dynamically updated, this change is not consistently announced, and additional work will be required to notify screen reader users of the change. For more details, refer to [Staff-only: Dynamically updating button labels](https://github.com/github/accessibility/blob/85b3a929bfcb9bc5a3fd7b18c83b12d0c38a775e/docs/wiki/screen-reader-testing/dynamically-updated-buttons-support-april-2024.md). In the specific scenario where the button's accessible name is coming from an `aria-label`, remember to update the `aria-label` when the visual label is updated. This should trigger an announcement without the use of a live region. Refer to [Staff-only: Dynamically updating button labels](https://github.com/github/accessibility/blob/85b3a929bfcb9bc5a3fd7b18c83b12d0c38a775e/docs/wiki/screen-reader-testing/dynamically-updated-buttons-support-april-2024.md).

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   The button has a sufficiently descriptive label
*   If the button includes icons for its leading or trailing visuals, the button's purpose is clear even without the icons (as these are only decorative and are not conveyed to screen reader users)
*   If the button uses a schema/variant for a particular presentation, the button does not solely rely on this visual aspect to convey its purpose, or to differentiate it from other buttons
*   If the button uses a trailing action icon to visually hint at its functionality, it also conveys this additional information programmatically through the use of appropriate `aria-*` attributes
*   For the small variation (which currently doesn't enforce an appropriate minimum size), the button has a minimum target size of 24×24 CSS pixels
*   If the button has an `aria-label` or `aria-labelledby` that overrides the visually-presented label, the accessible name includes the visible label allowing speech input users to activate the control based on visual information.
*   If the button's visible label is updated communicating that a change has taken place, make sure that this change is also communicated to assistive technology users through appropriate techniques.

### [Component tests](#component-tests)

*   Content passed into the component is output as the button's visible label
*   Unless the button is `disabled`, it can be focused and activated using the keyboard
*   If the button is set to be `inactive`, it still receives keyboard focus, but conveys its inactive/disabled state to screen readers with the `aria-disabled="true"` attribute
*   The button has a minimum target size of 24×24 CSS pixels, regardless of content

[Related guidance](#related-guidance)
-------------------------------------

*   [Accessible design guidance: Links and buttons](/accessibility/design-guidance/links-and-buttons/). Principles for choosing between links and buttons, semantics, accessible naming, and disabling.
*   [Accessible pattern guidance: Buttons](/accessibility/patterns/primer-components/descriptive-buttons/). Element choice, accessible naming, visual distinction, and common mistakes for buttons.
