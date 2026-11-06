<!-- tool: get_component_usage_guidelines / args: {"name":"ToggleSwitch"} / at: 2026-11-05T10:56:29.537Z / isError: false -->

Here are the usage guidelines for the `ToggleSwitch` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [ToggleSwitch](/product/components/toggle-switch/)
4.  [Guidelines](/product/components/toggle-switch/guidelines/)

ToggleSwitch
============

ToggleSwitch is used to immediately toggle a setting on or off.

Page navigation navigation
--------------------------

*   [Overview](/product/components/toggle-switch/)
*   [Guidelines](/product/components/toggle-switch/guidelines/)
*   [Accessibility](/product/components/toggle-switch/accessibility/)

More items

[Anatomy](#anatomy)
-------------------

![Diagram of ToggleSwitch with its parts labeled](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-86032.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-86032&t=OIceMocYMRq1FN7G-4)

*   **Track**: Clickable area the knob moves within. Changes color to show on/off state.
*   **Knob**: Moves to show on/off state.
*   **Status**: Label showing on/off state.

[Label and caption](#label-and-caption)
---------------------------------------

Each ToggleSwitch needs a concise label describing the action (e.g., "Discussions" or "Automatically watch repositories"). Avoid state-descriptive labels.

Optionally, you may include a caption about the setting that is being turned on or off.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-86060.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-86060&t=OIceMocYMRq1FN7G-4)

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-86038.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-86038&t=OIceMocYMRq1FN7G-4)

Use succinct phrases with verbs or nouns

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-86049.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-86049&t=OIceMocYMRq1FN7G-4)

Don't use phrases that describe the switch's state

[Layout](#layout)
-----------------

By default, lay out a ToggleSwitch horizontally justified with its label and optional description.

You may use a vertical layout when a ToggleSwitch is layed out inline with other content, or if a horizontal layout would put the switch too far from its label. If the vertical layout is left-aligned, the "on"/"off" text may be moved to the right of the switch.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-86060.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-86060&t=OIceMocYMRq1FN7G-4)

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-86150.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-86150&t=OIceMocYMRq1FN7G-4)

[Progressive disclosure](#progressive-disclosure)
-------------------------------------------------

The [progressive disclosure pattern](/product/ui-patterns/progressive-disclosure/) may be used to hide or show content based on whether a ToggleSwitch is on. Content revealed on ToggleSwitch activation should always come _after_ the ToggleSwitch.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-86122.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-86122&t=OIceMocYMRq1FN7G-4)

[Mixed values](#mixed-values)
-----------------------------

Avoid using a ToggleSwitch for mixed values. For groups with configurable options, use a button to toggle the section, remembering individual states.

![Configuration options section that can be enabled or disabled. Configuration controls are hidden when it is disabled.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-86098.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-86098&t=OIceMocYMRq1FN7G-4)

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-86068.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-86068&t=OIceMocYMRq1FN7G-4)

Use a button to affect multiple related toggles

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-86083.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-86083&t=OIceMocYMRq1FN7G-4)

Don't use a ToggleSwitch to represent mixed values

[ToggleSwitch vs checkbox](#toggleswitch-vs-checkbox)
-----------------------------------------------------

ToggleSwitches act as instant-save controls for boolean settings, while checkboxes are for selections requiring explicit save actions.

A ToggleSwitch should never be used as a replacement for a checkbox. See [saving patterns](/product/ui-patterns/saving/) for more details.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-86175.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-86175&t=OIceMocYMRq1FN7G-4)

Use a ToggleSwitch like a button

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-86190.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-86190&t=OIceMocYMRq1FN7G-4)

Don't use a ToggleSwitch as a replacement for a checkbox
