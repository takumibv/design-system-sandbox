Here are the usage guidelines for the `SegmentedControl` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [SegmentedControl](/product/components/segmented-control/)
4.  [Guidelines](/product/components/segmented-control/guidelines/)

SegmentedControl
================

SegmentedControl is used to pick one choice from a linear set of closely related choices, and immediately apply that selection.

Page navigation navigation
--------------------------

*   [Overview](/product/components/segmented-control/)
*   [Guidelines](/product/components/segmented-control/guidelines/)
*   [Accessibility](/product/components/segmented-control/accessibility/)

More items

[Anatomy](#anatomy)
-------------------

![A diagram of a SegmentedControl with three buttons. The labeled parts of the SegmentedControl are: the selected third button, the icon in the second button, and the text label in the second button.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56512.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56512&t=OIceMocYMRq1FN7G-4)

[Usage](#usage)
---------------

### [For implicitly saved settings](#for-implicitly-saved-settings)

Use SegmentedControls to pick and immediately apply an option, similar to radio inputs but without needing form submission.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2729-1183.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2729-1183&t=OIceMocYMRq1FN7G-4)

For more information about explicit and automatic save patterns, see the [saving pattern guidleines](/product/ui-patterns/saving/).

### [To toggle content visibility](#to-toggle-content-visibility)

The current implementations of our SegmentedControl do not support rendering segments as links (`<a>` tags). Continue to avoid using SegmentedControls that change the URL until we have a solution for rendering segments as links.

SegmentedControls may also be used to change how content in a view is rendered. The following use cases are an acceptable use for a SegmentedControl:

*   **Sort control**: Sort items in a list.
*   **Filter control**: Show/hide list items, and there should be a segment that shows the full list.
*   **Content formatting picker**: Changes the formatting of the same content.

![A screenshot of a GitHub discussions list with the segmented SegmentedControl for sorting highlighted. The sort options are 'Oldest', 'Newest', and 'Top'.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2729-1877.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2729-1877&t=OIceMocYMRq1FN7G-4)

As a sort control

![A screenshot of the GitHub organization insights page with the SegmentedControl for filtering highlighted. The options are 'All results' and 'Open security advisories'. ](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2729-1917.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2729-1917&t=OIceMocYMRq1FN7G-4)

As a filter control

![A screenshot of the GitHub billing dashboard with a chart showing costs. The SegmentedControl to switch between the chart type is highlighted. The options are 'Line', 'Area', and 'Bar'](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2729-1957.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2729-1957&t=OIceMocYMRq1FN7G-4)

As a content formatting picker

  

If selecting a segment changes the URL, the segments should be rendered as `<a>` tags.

See the [decision tree](/product/ui-patterns/navigation/#choosing-a-pattern-for-tabbed-navigation) for choosing a pattern for tabbed interfaces for more detailed guidance and alternative patterns.

[Content](#content)
-------------------

### [Segments](#segments)

A SegmentedControl should have 2–5 choices with text labels, or up to 6 icon-only segments. If more are needed, consider another choice selection component such as [RadioGroup](/product/components/radio-group/) or [ActionMenu](/product/components/action-menu/).

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56522.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56522&t=OIceMocYMRq1FN7G-4)

Use a SegmentedControl for picking from 5 (6 for icon-only segments) or fewer options.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56929.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56929&t=OIceMocYMRq1FN7G-4)

Don't use a SegmentedControl for more than 5 options.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56570.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56570&t=OIceMocYMRq1FN7G-4)

Use a SegmentedControl for selecting from a list of static values. You may use an auxiliary dropdown adjacent to the SegmentedControl.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56954.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56954&t=OIceMocYMRq1FN7G-4)

Don't use a SegmentedControl with a choice that is a dropdown.

### [Segment icons](#segment-icons)

Icons add visual cues. Be consistent (all icons, all text, or icons with text) and don’t change icons to indicate state.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56621.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56621&t=OIceMocYMRq1FN7G-4)

Use icons as a visual cue to communicate what the choice does.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56900.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56900&t=OIceMocYMRq1FN7G-4)

Don't change or add icons to indicate whether the choice is selected.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56612.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56612&t=OIceMocYMRq1FN7G-4)

Keep the visual cues in each segment consistent.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56891.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56891&t=OIceMocYMRq1FN7G-4)

Don't mix visual cues between segments.

#### [Icon-only segments](#icon-only-segments)

Icons without text labels are fine if their meaning is obvious. Include a tooltip for clarity.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56601.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56601&t=OIceMocYMRq1FN7G-4)

Use icons without a visible label when the icon's meaning is obvious.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56918.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56918&t=OIceMocYMRq1FN7G-4)

Don't use obscure icons without a visible label.

### [Segment label text](#segment-label-text)

Label segments with nouns or short phrases; avoid multiline labels.

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56621.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56621&t=OIceMocYMRq1FN7G-4)

Phrase choice labels as nouns or noun phrases with as few characters as possible.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56909.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56909&t=OIceMocYMRq1FN7G-4)

Don't phrase choice labels as an action or with unnecessarily long strings of text.

### [Contextual information](#contextual-information)

#### [Label](#label)

SegmentedControls must have a text label, even if the label is only accessible to screen readers.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56589.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56589&t=OIceMocYMRq1FN7G-4)

A visible label is the most direct way to identify what the control is used for, but the location and surrounding elements of the control often give enough context to visually hide the label.

#### [Caption](#caption)

An optional caption may be used to provide additional context to help users make a selection or explain what effect the selection will have. Caption text should be as short as possible.

See the [layout](#layout) section for ways to compose a SegmentedControl with a label.

[Interaction](#interaction)
---------------------------

Selections are mutually exclusive and apply instantly, without needing a "Save" button. Once a selection has been made, it can only be deselected by making a new selection.

[Layout](#layout)
-----------------

### [Composing the control with a label and caption](#composing-the-control-with-a-label-and-caption)

#### [Single-column](#single-column)

A single-column layout is the same way form controls (for example, [TextInputs](/product/components/text-input/)) are layed out. The single-column layout is useful for preserving horizontal space.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-2741-6439.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=2741-6439&t=OIceMocYMRq1FN7G-4)

#### [Two-column](#two-column)

Aligns controls with adjacent elements and conserves vertical space while grouping related controls in a way that's easy to scan.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56804.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56804&t=OIceMocYMRq1FN7G-4)

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56837.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56837&t=OIceMocYMRq1FN7G-4)

### [Responsive design](#responsive-design)

For narrow spaces, use icons only or replace the control with an ActionMenu.

#### [Convert to an ActionMenu](#convert-to-an-actionmenu)

Swapping out the SegmentedControl for an ActionMenu is especially helpful when:

*   The icons cannot be understood without visible text labels
*   The control is still too wide when text labels are hidden

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56674.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56674&t=OIceMocYMRq1FN7G-4)

#### [Only show icons](#only-show-icons)

If your SegmentedControl uses icons that can be understood without a visible text label, then you can hide the text labels and rely only on icons.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56700.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56700&t=OIceMocYMRq1FN7G-4)

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56639.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56639&t=OIceMocYMRq1FN7G-4)

Replace the SegmentedControl with an ActionMenu or use icons that are easily understood without text labels.

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-56750.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-56750&t=OIceMocYMRq1FN7G-4)

Wrap the buttons to multiple lines, use an overflow button, or remove buttons
