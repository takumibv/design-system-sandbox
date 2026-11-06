<!-- tool: get_component_accessibility_guidelines / args: {"name":"Timeline"} / at: 2026-11-05T10:56:17.564Z / isError: false -->

Here are the accessibility guidelines for the `Timeline` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Timeline](/product/components/timeline/)
4.  [Accessibility](/product/components/timeline/accessibility/)

Timeline
========

The Timeline component is used to display items on a vertical Timeline, connected by Timeline elements.

Page navigation navigation
--------------------------

*   [Overview](/product/components/timeline/)
*   [Accessibility](/product/components/timeline/accessibility/)

More items

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   `Timeline` content should follow a chronological or logical order to help users mentally model the sequence of events
*   Avoid overloading a single item with too much information; break long descriptions into manageable chunks for easier comprehension
*   Use consistent visual markers (e.g., icons, spacing) to reinforce the event structure and support pattern recognition
*   If event types are differentiated by color or icon only, ensure they’re also described in text for users with cognitive disabilities

#### [Vision](#vision)

*   The vertical lines connecting `timeline` items lack sufficient contrast, which may make them hard to see for users with low vision. However, because they are decorative and not required to understand the structure, they are not subject to the WCAG 3:1 contrast requirement
*   The text in `timeline` items must meet a minimum contrast ratio of 4.5:1 to ensure readability
*   Text must be resizable and zoomable without content loss or requiring horizontal scrolling, supporting users with low vision

#### [Mobility](#mobility)

*   Ensure all interactive elements within a `timeline` item (e.g. inline links) meet minimum touch target size of 24×24 CSS pixels

### [Adaptability](#adaptability)

*   Text must remain readable when resized or zoomed, and must not require horizontal scrolling, to ensure it remains accessible at narrow viewports or high zoom levels

### [Interaction](#interaction)

#### [Keyboard](#keyboard)

*   `Timeline` items must not trap focus; all interactive elements inside each item must be accessible using `Tab` and `Shift`+`Tab`
*   Keyboard users should be able to reach all actionable content (e.g. inline links) without encountering visual or focus loss due to scrolling

### [Engineering for AT Compatibility](#engineering-for-at-compatibility)

#### [Screen reader](#screen-reader)

*   Currently, the `timeline` is implemented using non-semantic `<div>` elements. Replacing them with a semantic list would allow screen readers to announce how many items are in the `timeline` and where each begins and ends
*   Octicons used as badges should include a text alternative when they convey essential information about the message type. Even if the message type is also described in surrounding text, a text alternative helps screen reader users quickly identify relevant items without listening to full content

#### [Speech recognition](#speech-recognition)

*   Ensure all interactive elements (e.g. inline links) within `timeline` items have clear and unique visible labels that match their programmatic labels

### [Timeline breaks](#timeline-breaks)

The `Timeline.Break` component allows for content in the `timeline` to be visually separated. This should be used for decorative purposes only. Since this component is decorative, it is not conveyed to assistive technologies like screen readers and is not required to meet contrast requirements.

The content within `Timeline.Item` should clearly communicate the status and state of that item, so that if there is a need to separate content, the context of the separation is communicated in `Timeline.Item`.

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

*   The text meets the colour contrast requirement of 4.5:1, and is resizable and can be zoomed without loss of content or requiring horizontal scrolling
*   The accessible name of an icon can be set by passing an `aria-label` to `Octicon`

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

*   It is not yet possible to use a list for the `timeline`, only non-semantic `<div>` elements
*   Provide an appropriate text alternative for each icon by applying an `aria-label` to the `Octicon`:

    <Timeline.Item>
        <Timeline.Badge>
        <Octicon icon={GitCommitIcon} aria-label="Commit" />
        </Timeline.Badge>
        <Timeline.Body>Update with a long format description</Timeline.Body>
    </Timeline.Item>
    

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   Icons that are not decorative have an appropriate accessible name
*   If content within the `timeline` is visually separated, using `Timeline.Break`, the context of the separation is communicated in `Timeline.Item`

### [Component tests](#component-tests)

*   The text meets the colour contrast requirement of 4.5:1
*   The text is resizable and can be zoomed without loss of content or requiring horizontal scrolling
*   When an `aria-label` with a value is applied to `Octicon`, an `aria-label` with the value is rendered on the icon SVG, and the icon is not hidden from the accessibility tree
