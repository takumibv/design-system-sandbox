# get_component_accessibility_guidelines

- args: `{"name":"Heading"}`
- isError: false
- ms: 279
- chars: 3423

---

Here are the accessibility guidelines for the `Heading` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Heading](/product/components/heading/)
4.  [Accessibility](/product/components/heading/accessibility/)

Heading
=======

Heading defines the hierarchical structure and importance of the content they contain.

Page navigation navigation
--------------------------

*   [Overview](/product/components/heading/)
*   [Accessibility](/product/components/heading/accessibility/)

More items

Headings describe the content that follows and should meet accessibility and usability standards:

*   **Descriptive:** Each heading should clearly describe its associated content.
*   **Order and Hierarchy:** Content follows the heading in source order. Headings should reflect a logical page hierarchy, ideally without skipping levels (e.g., `<h2>` to `<h3>`).
*   **Appropriate Levels:** Heading levels should fit the document structure. Designs should annotate heading levels when possible.

Headings should be coded accurately, as assistive technology users heavily rely on them for page navigation. Ensure that the heading level implied visually matches the coded level. See [WCAG 1.3.1: Info and Relationships](https://www.w3.org/WAI/wcag22/Understanding/info-and-relationships.html).

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

The heading component provides a role and level, with styles that create a visual hierarchy.

[Handling subheadings, eyebrows, and straplines](#handling-subheadings-eyebrows-and-straplines)
-----------------------------------------------------------------------------------------------

*   **Eyebrows:** Use a `span` with Primer typography styles for visual emphasis as part of the heading.
    
        <h2>
          <span class="h4 lh-condensed text-uppercase">Eyebrow</span>
          Heading
        </h2>
    
*   **Straplines:** Supplementary text that provides extra context should be outside the heading element, within a parent `<header>` to establish association.
    
        <header>
          <h2>Heading</h2>
          <p>Strapline</p>
        </header>
    

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

When using the component, configure it with the heading level provided in annotated designs or with the appropriate level for the structure of the document and content. It should be noted that the visual design may not always match the annotated heading level, and the annotation should always supersede the visual in the implementation if they differ.

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   The text of the heading is descriptive of the content that follows it.
*   The heading is of the appropriate level for the structure of the document and content.
*   The heading is followed by content related to the heading or a heading of one level deeper.
*   All content that relates to the heading follows it in the document source order, even if it appears visually before the heading.

### [Component tests](#component-tests)

*   The component exposes the heading role.
*   The component exposes the heading's level.
