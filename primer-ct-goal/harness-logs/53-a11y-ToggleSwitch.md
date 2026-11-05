<!-- tool: get_component_accessibility_guidelines / args: {"name":"ToggleSwitch"} / at: 2026-11-05T10:56:31.229Z / isError: false -->

Here are the accessibility guidelines for the `ToggleSwitch` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [ToggleSwitch](/product/components/toggle-switch/)
4.  [Accessibility](/product/components/toggle-switch/accessibility/)

ToggleSwitch
============

ToggleSwitch is used to immediately toggle a setting on or off.

Page navigation navigation
--------------------------

*   [Overview](/product/components/toggle-switch/)
*   [Guidelines](/product/components/toggle-switch/guidelines/)
*   [Accessibility](/product/components/toggle-switch/accessibility/)

More items

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   A `ToggleSwitch` must have a clear, descriptive, and permanently visible label so that users understand the purpose of the input
*   If there is additional information about the setting, it should be provided as a caption underneath the control

#### [Vision](#vision)

*   All text must meet the minimum contrast requirement of 4.5:1
*   The control itself must have a minimum contrast ratio of 3:1 against the background
*   A `ToggleSwitch` must have a visible focus style; a custom style should be used instead of the browser default to ensure visibility. This custom focus style must also meet the 3:1 contrast ratio requirement

#### [Mobility](#mobility)

*   The control must have a minimum target size and spacing of 24 by 24 CSS pixels to support users with motor impairments

### [Adaptability](#adaptability)

*   Text must be resizable, and spacing adjustable
*   Content must remain readable without requiring horizontal scrolling, at a viewport size of 320 by 256 CSS pixels

### [Interaction](#interaction)

#### [Keyboard](#keyboard)

*   Unless disabled, a `ToggleSwitch` must be focusable using the `Tab` key
*   The `Space` key, and optionally the `Enter` key, must toggle the switch
*   A `ToggleSwitch` must not trap focus or trigger a change of context when it receives focus or is toggled

### [Engineering for AT Compatibility](#engineering-for-at-compatibility)

#### [Screen reader](#screen-reader)

*   The `ToggleSwitch` must have an accessible name that is announced by screen readers
*   The accessible name must match or include the visible label to ensure consistency
*   Additional content should be programmatically associated using `aria-describedby`
*   The control must have an appropriate role and state so screen readers identify it as a toggleable input
*   Its on/off state must be conveyed to screen readers
*   If the `ToggleSwitch` is disabled or in a loading state, that state must also be conveyed

#### [Speech recognition](#speech-recognition)

*   The accessible name must match or include the visible label text so that speech recognition users can activate the control by saying its visible label

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

*   The label, caption, control and custom focus style meet minimum contrast requirements
*   The text is resizable and the text spacing adjustable
*   The component uses the native `<button>` with `aria-pressed` applied, so screen readers users know that it is a control that can be toggled and it has the correct keyboard behavior
*   When the `ToggleSwitch` is disabled, the `disabled` attribute is applied and the disabled state conveyed to screen readers

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

*   Provide a descriptive visible label, in a semantically neutral element. Make the visible label the accessible name of the `ToggleSwitch` by applying `aria-labelledby` to the `ToggleSwitch` and referencing the `id` of the label:

    <div id="label">Email</div>
    <ToggleSwitch aria-labelledby="label"  />
    

If the `ToggleSwitch` has a caption, associate the caption using `aria-describedby`:

    <div id="label">Email</div>
    <ToggleSwitch aria-labelledby="label" aria-describedby="caption"  />
    <div id="caption">A digest will be sent weekly</div>
    

*   Make sure the component reflows when zoomed or viewed at a width equivalent to 320 CSS pixels
*   When setting the `loading` property, the component will include a visual spinner. Note that this spinner is not conveyed to screen readers. You will need to use additional methods (such as a visually hidden live region notification) to convey this state to screen reader users. See the [documentation for loading](https://primer.style/ui-patterns/loading/) for further details

### [Touch target](#touch-target)

When the UI is rendered on a touch-screen device, ensure that the ToggleSwitch has a large enough touch target size. The ToggleSwitch should respond to hovers, clicks, and taps anywhere in the touch target area, even if it isn't directly on the control.

![Diagram showing touch target size on medium and small ToggleSwitches](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-86132.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-86132&t=OIceMocYMRq1FN7G-4)

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   The `ToggleSwitch` has a sufficiently descriptive visible label
*   The label is associated with the `<button>` using `aria-labelledby`
*   If there is a caption, it is associated with the `<button>` using `aria-describedby`
*   If the `ToggleSwitch` has a loading state, the state is conveyed to screen reader user, such as a visually hidden live region notification

### [Component tests](#component-tests)

*   The label, status text and caption meet the minimum contrast requirements of 4.5:1
*   The control border and custom focus style meets the minimum contrast requirement of 3:1
*   The content remains readable, without requiring horizontal scrolling, when zoomed or viewed at a width equivalent to 320 CSS pixels
*   The control meets the minimum target size of 24 by 24 CSS pixels
*   The component renders a `<button>` with `aria-pressed` applied. In the off state `aria-pressed` is set to `false`, in the on state `true`
*   If the `ToggleSwitch` is disabled, the `disabled` attribute is present on the `<button>`
