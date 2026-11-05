# get_component_accessibility_guidelines

- args: `{"name":"Card"}`
- isError: false
- ms: 430
- chars: 11973

---

Here are the accessibility guidelines for the `Card` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Card](/product/components/card/)
4.  [Accessibility](/product/components/card/accessibility/)

Card
====

Card is a styled container component that groups related content. By default it renders a div element, which carries no implicit semantics. The right markup pattern depends on how the Card is used: as a standalone region, or as one item in a collection (list).

Page navigation navigation
--------------------------

*   [Overview](/product/components/card/)
*   [Accessibility](/product/components/card/accessibility/)

More items

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   A `Card` must have a clear primary label so that all users can understand its purpose. This can be provided using either a visible `Card.Heading` or with sufficient descriptive text
*   When multiple `Card` components are displayed together, each Card's content must be distinctive so that users can identify it easily.

#### [Vision](#vision)

*   Do not rely on color alone to convey information in the `Card`. Instead, use text labels or other indicators for people who cannot perceive color differences
*   All text within a `Card` must have a color contrast ratio of at least 4.5:1 against its background
*   Meaningful non-text elements, such as informative icons and the visual boundaries of UI components like buttons and input fields, must have a contrast ratio of at least 3:1 against adjacent colors
*   Interactive controls inside the `Card` must have a clearly visible focus indicator with a minimum contrast ratio of 3:1 against adjacent colors
*   When the `Card` contains multiple controls, visible hover and focus styles should be applied to controls within the `Card` and not to the `Card` component itself, so that people can understand which specific control they are interacting with

#### [Mobility](#mobility)

*   All interactive controls in a `Card` must meet the minimum target size of 24 by 24 CSS pixels for easier activation by people with limited dexterity
*   There must be sufficient spacing between interactive controls so that each can be activated without accidentally triggering adjacent controls. For any control smaller than 24 by 24 CSS pixels, the space around it must be large enough that a 24 CSS pixel diameter circle centered on the control does not overlap any adjacent control.

### [Adaptability](#adaptability)

*   The `Card` must be responsive, ensuring all content remains readable without horizontal scrolling when zoomed in up to 200% or viewed at a viewport size of 320 by 256 CSS pixels
*   When adding additional line or letter spacing, make sure that the `Card`'s content can still be read in its entirety, and that it is not clipped or hidden

### [Interaction](#interaction)

#### [Keyboard](#keyboard)

*   All interactive controls inside a `Card` must be reachable and operable using a keyboard alone
*   Focus should move through the `Card`'s controls in a logical order that matches the visual reading order
*   Focus must not become trapped inside a `Card`

### [Engineering for AT Compatibility](#engineering-for-at-compatibility)

#### [Screen reader](#screen-reader)

*   A standalone `Card` rendered as a `<section>` must have an accessible name so that screen reader users can identify it when navigating by landmarks. This is wired automatically when a `Card.Heading` is present; alternatively, pass `aria-label` directly on the `Card` element to supply the accessible name without a visible heading.
*   Related content inside a `Card` must follow a logical reading order that reflects the visual layout, so that the sequence announced by a screen reader matches what sighted users perceive
*   `Card`s rendered inside a list must not introduce additional landmark regions; each `Card` rendered inside a list should remain a `<div>`
*   Interactive controls must each have a descriptive accessible name that identifies the specific `Card` they act on; a generic label like "More options" is insufficient when multiple Cards expose the same control. Instead, provide context using the card's topic with descriptive names like "More options for Project Alpha"
*   `Card.Icon` and `Card.Image` can each be treated as decorative or informative (they are treated as decorative by default). If the icon or image conveys information that is not already expressed in the surrounding text, provide an accessible alternative (`aria-label` for `Card.Icon`; a meaningful `alt` value for `Card.Image`). If the surrounding text already communicates the same information, treat the element as decorative to avoid redundant announcements

#### [Speech recognition](#speech-recognition)

*   Visible text labels on interactive controls must be included in the control's accessible name so that speech recognition users can activate controls by speaking the visible text
*   When visually hidden text is used to supplement a control's accessible name (for example, appending the `Card`'s heading to a button), the visible label text should appear at the start of the accessible name

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

*   By default, `Card` renders as a `<div>` with no implicit landmark role
*   When `as="section"` is set, the `Card` renders as a `<section>` element. It is exposed as a landmark region when it has an accessible name (for example, from `Card.Heading` via `aria-labelledby`, or from an `aria-label` passed directly to `Card`)
*   When `Card.Heading` is present alongside `as="section"`, the section's `aria-labelledby` attribute is automatically wired to the heading's `id`, providing the landmark with an accessible name without any extra markup
*   `Card.Heading` renders as `<h3>` by default; the heading level can be changed via the `as` prop to maintain the correct document outline
*   The component is responsive and adjusts to available space. It should not introduce horizontal scrolling by itself; content authors are responsible for ensuring custom content reflows appropriately

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

### [Choosing the right semantics](#choosing-the-right-semantics)

The appropriate markup depends on how the `Card` is used.

#### [Standalone Card](#standalone-card)

When a `Card` stands on its own as a meaningful chunk of page content, render it as a `<section>`. Ensure it has an accessible name so it is exposed as a landmark region that screen reader users can navigate to directly.

    <Card as="section">
      <Card.Heading>Project Alpha</Card.Heading>
      <Card.Description>Card content</Card.Description>
    </Card>

When `Card.Heading` is present, `aria-labelledby` is automatically wired to the heading's `id`. If there is no visible heading, provide your own accessible name directly on the `Card` using `aria-label`:

    <Card as="section" aria-label="Project Alpha">
      <Card.Description>Card content</Card.Description>
    </Card>

Choose a `Card.Heading` level (`h2` through `h6`) that fits the surrounding document outline without skipping heading levels. The default is `h3`.

#### [Card in a collection](#card-in-a-collection)

When multiple Cards are rendered together, place each `Card` inside a list item (`<li>`). The list provides the grouping semantics, so each Card should remain a `<div>` (the default) and must not be set to `as="section"`.

    <ul aria-label="Repositories">
      <li>
        <Card>
          <Card.Description>primer/react</Card.Description>
          <Card.Metadata>Updated 2 hours ago</Card.Metadata>
        </Card>
      </li>
      {/* …more list items */}
    </ul>

Do not use heading elements (`Card.Heading` or custom `<h2>`–`<h6>`) inside list-item Cards. In a collection, the list items already group each Card's content, so adding headings creates redundant and unnecessary structure for screen reader users. Use `Card.Description` or other non-heading content for the Card's primary text.

### [Providing context for interactive controls](#providing-context-for-interactive-controls)

`Card.Action` renders a single interactive control (typically an `IconButton`) in the top-right corner of the `Card`. The control's accessible name must clearly identify which `Card` it acts on. A generic label like `"More options"` is insufficient when the page contains several `Card`s.

    <Card.Action>
      <IconButton
        icon={KebabHorizontalIcon}
        aria-label="More options for Project Alpha"
        variant="invisible"
      />
    </Card.Action>

The same principle applies to any interactive content passed as `Card` children. When several Cards expose identical controls, include the `Card`'s subject in each control's accessible name. Visually hidden text is a common technique to do this while keeping the visible label concise:

    <Button leadingVisual={StarIcon} size="small">
      Star <VisuallyHidden>primer/react</VisuallyHidden>
    </Button>

### [Images and icons](#images-and-icons)

`Card.Image` accepts the standard `<img>` attributes. When the image is decorative, no action is needed because `alt=""` is applied automatically by default. Provide a meaningful `alt` value only when the image conveys information that is not already available in the surrounding text.

    {/* Informative images need a meaningful text alternative using the alt attribute */}
    <Card.Image src="octocat.png" alt="Octocat" />

`Card.Icon` is decorative by default and is hidden from assistive technologies. Only provide an `aria-label` when the icon conveys information that is not already expressed in the surrounding text.

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   A standalone `Card` is exposed as a region landmark with an accessible name that reflects the `Card`'s subject
*   Where the same control appears on multiple `Card`s, for example, a "Star" button on each repository Card, each instance has a unique accessible name that includes the `Card`'s subject, so users can tell them apart
*   Informative `Card.Image` images have a meaningful text alternative using the `alt` attribute and reflect the image content in context
*   The document heading structure is maintained. `Card` headings fit the surrounding page outline without skipping levels

### [Component tests](#component-tests)

*   `Card` renders as `<div>` by default and as `<section>` when `as="section"` is set
*   When `as="section"` and a `Card.Heading` are both present, the section's `aria-labelledby` references the heading's unique `id`
*   `Card`s rendered inside a list item do not introduce additional landmark regions
*   No heading elements are present inside list-item `Card`s
*   `Card.Icon` has `aria-hidden="true"` by default and is hidden from the accessibility tree; when an `aria-label` is provided, the icon is exposed with that label
*   `Card.Image` renders with the provided `alt` prop; when no `alt` is supplied, it defaults to an empty string
*   Interactive controls within example `Card` content have an accessible name
*   Interactive controls within example `Card` content meet the minimum target size of 24 by 24 CSS pixels
*   Text, interactive elements, and meaningful graphics in example `Card` content meet minimum color contrast requirements (4.5:1 for text; 3:1 for non-text elements)
*   Example `Card` content remains fully readable without horizontal scrolling when zoomed or viewed at a width equivalent to 320 CSS pixels
