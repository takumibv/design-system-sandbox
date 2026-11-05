# get_component_accessibility_guidelines

- args: `{"name":"Text"}`
- isError: false
- ms: 371
- chars: 1476

---

Here are the accessibility guidelines for the `Text` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Text](/product/components/text/)
4.  [Accessibility](/product/components/text/accessibility/)

Text
====

An abstraction for using Primer's typographic styles.

Page navigation navigation
--------------------------

*   [Overview](/product/components/text/)
*   [Accessibility](/product/components/text/accessibility/)

More items

The component provides no semantic information. It's only function is to provide access to color tokens for styling text content.

It is up to the designer / implemented to select the appropriate color token for the text content to ensure that it has sufficient contrast against the background color.

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

None.

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

When using the component, ensure that the color token used for the text content has sufficient contrast against the background color.

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

None

### [Component tests](#component-tests)

The text output has sufficient contrast against the background color.
