# get_component_accessibility_guidelines

- args: `{"name":"Stack"}`
- isError: false
- ms: 371
- chars: 4326

---

Here are the accessibility guidelines for the `Stack` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Stack](/product/components/stack/)
4.  [Accessibility](/product/components/stack/accessibility/)

Stack
=====

Stack is a layout component that creates responsive horizontal and vertical flows.

Page navigation navigation
--------------------------

*   [Overview](/product/components/stack/)
*   [Accessibility](/product/components/stack/accessibility/)

More items

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   `Stack` helps enforce consistent layout patterns, which supports user understanding across pages
*   Logical stacking order (`vertical` or `horizontal`) contributes to content clarity and reduces cognitive load
*   Proper spacing between elements can visually group related content, aiding in comprehension

#### [Vision](#vision)

*   `Stack` allows for clear separation of elements via configurable spacing (`gap`)
*   Ensure child components maintain appropriate color contrast and legible font sizes for visibility

#### [Mobility](#mobility)

*   `Stack` does not interfere with tab order or focus styles
*   Spacing can improve touch target separation for users with motor challenges
*   Avoid using `Stack` in a way that introduces layout shifts or off-screen content when navigating by keyboard

### [Adaptability](#adaptability)

*   `Stack` supports responsive direction and gap properties, ensuring layout adjusts well to different screen sizes
*   Layout remains functional and readable at high zoom levels or on narrow viewports (e.g., 320px wide)
*   Directional props (direction) help content reflow logically in responsive scenarios

### [Interaction](#interaction)

#### [Keyboard](#keyboard)

*   `Stack` itself does not include any interactive elements or keyboard behaviour

### [Engineering for AT Compatibility](#engineering-for-at-compatibility)

#### [Screen reader](#screen-reader)

*   `Stack` does not render semantic HTML or appear in the accessibility tree by default
*   Accessibility depends entirely on the semantics of child elements (e.g. heading levels, ARIA roles)
*   Ensure content inside `Stack` is logically ordered for screen reader reading flow

#### [Speech recognition](#speech-recognition)

*   `Stack` does not affect speech navigation
*   Avoid using `Stack` to wrap unrelated interactive elements without clear groupings

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

*   `Stack` provides no inherent accessibility features; it is a layout-only utility
*   Its `gap` and `align` properties help support accessible visual spacing and content grouping

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

*   Use semantic HTML within `Stack` to convey meaningful content structure
*   Ensure that spacing and layout do not interfere with focus indicators or screen reader reading order
*   Avoid using `Stack` to group interactive controls unless they are contextually related
*   Combine with ARIA roles or landmarks only when wrapping semantically relevant sections (e.g. navigation, form groups)

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   Verify that child content maintains logical tab order and reading order
*   Ensure layout reflows properly at different screen widths and zoom levels
*   Confirm that spacing and layout support content grouping and clarity
*   If used to display dynamic content, check that focus and announcements are handled by the child components

### [Component tests](#component-tests)

*   Rendering with various `gap` and `direction` props results in expected layout
*   Layout is preserved when child elements have variable content sizes
*   `Stack` does not introduce semantic or accessibility tree changes on its own
*   Responsive behaviour adjusts spacing and direction appropriately
