# get_component_accessibility_guidelines

- args: `{"name":"Label"}`
- isError: false
- ms: 265
- chars: 3268

---

Here are the accessibility guidelines for the `Label` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Label](/product/components/label/)
4.  [Accessibility](/product/components/label/accessibility/)

Label
=====

Use the label component to add contextual metadata to a design.

Page navigation navigation
--------------------------

*   [Overview](/product/components/label/)
*   [Accessibility](/product/components/label/accessibility/)

More items

By itself, this component only provides a consistent visual styling to text. Authors should consider how the `Label`s will be used, and how to provide semantic/programmatic information for screen reader users.

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

The `Label` component only provides a styled visual wrapper around its content. By default, the component results in a `<span>` element with an appropriate CSS class.

The selectable variant/scheme colors meet minimum color contrast requirements.

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

### [Add structure when needed](#add-structure-when-needed)

The component itself does not convey any semantics or meaning, so you will need to provide this in the code/structures where the `Label` is used. For instance, if `Label` components represent a list of tags/labels, make sure to group them in an actual `<ul>` unordered list, with each `Label` wrapped in a separate `<li>` list item.

### [Convey meaning with more than color](#convey-meaning-with-more-than-color)

`Label` has different schemes/variants (such as `accent`, `attention`, `success`, `danger`), which result in different colors for the text, background, and borders. These differences are purely visual, so they may be difficult to distinguish for users with impaired color perception. They also won't be perceived by screen reader users. For this reason, you can't rely on the scheme/variant alone to give meaning to your content.

Make sure that the label text provides sufficient meaning/context on its own, regardless of its visual presentation. For example, if `Label` components are used to list a series of successes and failures, do not rely solely on the use of the `success` and `danger` schemes/variants to communicate that meaning. Make each label's meaning clear by prefixing it with an appropriate "Pass: …" and "Fail: …" string.

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   The `Label` is not used in a way where it relies solely on the use of color (the specific scheme/variant used) to convey its meaning
*   If the `Label` is intended to provide additional meaning/semantics (such as being part of a list of labels), it is wrapped in an appropriate structure (such as an actual list)

### [Component tests](#component-tests)

*   Content passed into the component is output as the label's visible text
*   The contrast for all variants/schemes meets the minimum requirement of 4.5:1 between foreground and background colors
