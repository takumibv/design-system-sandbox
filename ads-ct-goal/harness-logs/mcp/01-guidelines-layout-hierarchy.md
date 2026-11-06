<!-- transport: remote https://mcp.atlassian.com/v1/ads/public/mcp -->
<!-- request: {"tool":"ads_get_guidelines","args":{"terms":["page layout","visual hierarchy","primary action","information density"],"limit":2}} -->

## Grid anatomy

The layout grid structure has three elements:

- **Columns** divide the page into equal vertical sections, and are used to organise content.
- **Gutters** are the gaps between the columns, and separate content in a consistent way.
- **Margins** define the outer edges of the grid, and prevent content from spilling out over the
  viewable regions.

![](./_assets/grid-anatomy.png)

This grid documentation is for designers only. Engineers should refer to the
[page layout](https://atlassian.design/components/page-layout/examples) component.

## Grid types

There are two types of grid: fluid and fixed. Both grid types use breakpoints to determine whether
the layout needs to change between viewport sizes.

More guidance for [applying grid](https://atlassian.design/foundations/grid-beta/applying-grid/) in
your designs.

### Fluid

The fluid grid stretches across the screen to fill all available space in the main content area.
This means the columns and the content placed within them scale and resize to fill the available
space.

![](./_assets/grid-fluid.png)

They are best used for information-dense pages, such as kanban boards, to maximise screen real
estate. Here’s how a fluid grid is applied in Jira:

![](./_assets/grid-fluid-jira.png)

### Fixed

The fixed grid applies the ideal maximum width to page containers according to the elements being
displayed. There is both a fixed-narrow and fixed-wide grid, so content can be displayed using the
most appropriate width.

![](./_assets/grid-fixed.png)

**Fixed-narrow** grids are best used for content-focused pages, such as blogs and articles, to limit
line length and improve readability. Some internal elements, such as headers, may break out of the
grid to span across the page. Here’s how a fixed-narrow grid is applied in Confluence:

![](./_assets/grid-fixed-narrow.png)

**Fixed-wide** grids are best used for content-dense pages, such as data tables, to balance screen
real estate and readability. Internal table columns do not need to align to the grid. Here’s how a
fixed-wide grid is applied in Atlas:

![](./_assets/grid-fixed-wide.png)

## Breakpoints

Each [breakpoint](https://atlassian.design/components/primitives/responsive/breakpoints/examples) is
the threshold at which the website’s layout changes, to ensure optimal user experience. In
responsive design, a breakpoint range determines the most appropriate number of columns for that
viewport size, plus recommended widths for margins and gutters.

Our grid aligns to the 6 Atlassian Design System breakpoints:

<BreakpointsTable />

## Column span and offset

### Column span

Our grid has 12 columns for
[aligning content](https://atlassian.design/foundations/grid-beta/applying-grid/#step-4-align-content-to-grid).
Content should span across 3 or more columns, up to a maximum of 12. For flexibility, mix and match
the number of columns used to unlock a variety of layouts across different breakpoints.

A 12 column grid with content blocks spanning different numbers of columns, such as 12, 6 and 4

![](./_assets/column-span.png)

### Column offset

Content does not need to span across all 12 columns. It can span a smaller set of columns, resulting
in a layout with content centered on a 12 column grid.

![](./_assets/column-offset.png)

## Layout anatomy

<SectionMessage title="Caution" appearance="warning">
	We are in the process of building a new{' '}
	<Link href="https://atlassian.design/components/navigation-system/layout/examples">
		Layout (Early Access)
	</Link>{' '}
	component which will replace this layout anatomy.
</SectionMessage>

Layout regions are the building blocks for any web page. They are composed of elements and
components that share similar functions. Atlassian’s layout grid starts below the top navigation,
and provides structure to the main content.

![](./_assets/layout-anatomy.png)

### Side navigation and aside

Use an aside to display supporting content on a screen, such as help panels or secondary tasks. The
layout grid typically fills the full width of the viewport, but when the side navigation or aside is
present, the grid should resize to fit the remaining area of the page.

![](./_assets/aside.png)

Some panels can be manually resized by users. Start with these standard sizes:

<SideNavigationAsideTable />

Asides have two states: default and collapsed.

![](./_assets/aside-state.png)

The consistent and intentional use of a spacing system creates a more harmonious experience for the
end user. A spacing system also lays a foundation for responsive design and customisable UI density
in the future, which will enhance the overall quality and accessibility of our apps.

## 8 pixel base unit

Our spacing system is built around a base unit of 8 pixels. This base unit determines the spacing
scale and ensures visual consistency across apps.

## Scale

Building off of the 8px base unit, the main foundation of our spacing system is the spacing scale.
This scale is a limited set of space values that can be used to lay out UI elements in a consistent
way.

Each spacing value is a multiple of the base unit and ranges from 0px to 80px to allow for
flexibility while still maintaining consistency across different layouts.

## Space tokens

The 8px base unit also forms the basis of our space token system, as the base unit `space.100`.
Every space token is a multiple of this base unit, the number suffix representing the percentage of
the base unit.

For example, `space.200` is 200% of the size of the base unit, therefore represents 16px.

Each space token should be used in place of the raw pixel or REM values when adding space between
components or objects on a page. Usage examples are detailed below.

<SpacingTokensTable />

### Negative values

Our space token system also includes
[negative values](https://atlassian.design/components/tokens/all-tokens#space) from
`space.negative.025` to `space.negative.400` (-2px to -32px) available in code. These can be useful
for breaking out of a container's padding or for overlapping elements. Before reaching for negative
tokens, see if you can use the
[Bleed primitive](https://atlassian.design/components/primitives/bleed/example) which is designed
specifically to handle negative whitespace.

## Spacing usage

Different use cases require different ranges of spacing units to achieve the best outcomes. Our
spacing scale can be broken into three different size ranges:

![A horizontal number scale diagram with 0 pixels on the left hand side and 80 pixels on the right hand side, these are the minimum and maximum values on the scale. The 8 pixel unit is highlighted as the space.100 base token. The scale is then broken up into three sections through purple highlighting. There are Small token values from 0 pixels to 8 pixels, Medium token values from 12 pixels to 24 pixels and Large token values from 32 pixels to 80 pixels.](./_assets/spacing-scale.png)

### Small values - 0px to 8px

Use the tokens from `space.0` to `space.100` (0px to 8px) for small and compact pieces of UI.

#### Examples

- Gap between small icons and text
- Container padding of small components (ie badges, icon buttons, table cells)
- Gap between repeating elements (ie button groups)
- Padding within input components
- Vertical spacing between elements in a card (ie a title and description, a description and
  actions)
- Gap between the trigger and elevated element (ie between dropdown button & menu)

### Medium values - 12px to 24px

Use the tokens `space.150` to `space.300` (12px to 24px) for larger and less dense pieces of UI.

#### Examples

- Container padding of larger components (ie buttons)
- Space between avatar/large icon and content (ie section messages)
- Vertical spacing between elements in cards
- Spacing between items in less densely packed or larger components

### Large values - 32px to 80px

Use the tokens `space.400` to `space.1000` (32px to 80px) for the largest pieces of UI and for
layout elements.

#### Examples

- The space between content on the page (ie spacing between top of page and header)
- Alignment within larger pieces of content (ie alignment of content in Flag)

## Layout guidelines

A layout is composed of UI elements and components as well as the space between them. Applying these
guidelines helps customers quickly understand the relationship between elements, allowing them to
scan and digest page content with ease.

Use these guidelines in combination with space tokens to create layouts that are consistent and easy
to understand.

### Group by similarity

Users expect elements to be grouped semantically, or grouped in such a way that it provides greater
context around the information provided.

Using consistent spacing around elements lends them a visual similarity that helps the user
understand their semantic relationship. For example, a table or list of items should be spaced
consistently to create the sense of a cohesive unit or collection.

<DoDontGrid>
	<DoDont type="do" image={{ url: similarityDo, alt: '' }}>
		Group similar items together using similar spacing.
	</DoDont>
	<DoDont type="dont" image={{ url: similarityDont, alt: '' }}>
		Group similar items differently.
	</DoDont>
</DoDontGrid>

### Group by proximity

The distance between elements creates semantic meaning, elements that are placed close to one
another are assumed to be related.

Use this principle to create meaning by placing more related objects closer together, and less
related objects further apart. For example, place elements that are part of the same flow or user
action closer together so users can understand their relation.

<DoDontGrid>
	<DoDont type="do" image={{ url: proximityDo, alt: '' }}>
		Group related items close together so that users can scan the content more easily.
	</DoDont>
	<DoDont type="dont" image={{ url: proximityDont, alt: '' }}>
		Group related items far apart.
	</DoDont>
</DoDontGrid>

### Create order and hierarchy

Users look for order in visual information to reduce the mental effort required to scan and process
data. Therefore, the ordering of elements on a page can be used to encourage users to follow a
certain flow or journey.

Hierarchy is used to rank elements and influence the order in which users view them. The sizing of
different elements lends more importance to larger elements by drawing focus, and less to
smaller-sized elements. Similarly, varying the amount of whitespace around an element can be used to
group elements together or separate them to impart greater importance.

<DoDontGrid>
	<DoDont type="do" image={{ url: hierarchyDo, alt: '' }}>
		Use scale and whitespace to rank elements.
	</DoDont>
	<DoDont type="dont" image={{ url: hierarchyDont, alt: '' }}>
		Give every element the same visual importance.
	</DoDont>
</DoDontGrid>

### Introduce visual rhythm

Patterns of alternating elements and white space create visual rhythm, which influences way users
scan a page and focus their attention.

Using a pattern of similar spacing between elements (such as in a table or list) creates a
predictable rhythm for the user to follow. This consistent rhythm reinforces the similarity in
importance of each of these elements.

Varying the spacing between and sizing of objects creates a more organic flow and guides the user
through a page or experience naturally. Variation creates points of attention and contrast between
objects on the page and improves scannability.

![](./_assets/visual-rhythm.png)

### Use optical adjustment

While using a spacing system improves consistency, the visual harmony of a page may not be perfect
the first time. The visual weight of an element affects the size and spacing that may be required to
create balance on the page, and may deviate from standard spacing patterns. Optical adjustments
should be used to correct these imbalances and maintain the page’s flow.

Optical adjustments require using the spacing scale units and visual intuition to make minor changes
to the spacing between objects in order to create visual harmony.

<DoDontGrid>
	<DoDont type="do" image={{ url: opticalAdjustmentDo, alt: '' }}>
		Adjust spacing to create visual balance.
	</DoDont>
	<DoDont type="dont" image={{ url: opticalAdjustmentDont, alt: '' }}>
		Use standard spacing without considering its alignment with other elements.
	</DoDont>
</DoDontGrid>

## Related

- Learn more about [design tokens](https://atlassian.design/tokens/design-tokens)
- [List of all design tokens](https://atlassian.design/components/tokens/all-tokens)

## About border tokens

Borders define boundaries and add emphasis using a combination of width and color tokens. Width
tokens control a border's prominence, while color tokens provide its meaning. Pair these tokens to
communicate an element’s purpose, such as a simple divider, or a visible interactive state.

## Border width tokens and usage guidelines

Use border width tokens to provide a clear and intentional way to apply width across different
states and use cases.

<Stack space="space.200">
	<BorderTable />
	<Text>* Token values are subject to change and should be used as an indication only.</Text>
</Stack>

### Default border width

The `border.width` token is the default value for all standard borders and dividers. It establishes
the baseline thickness for components that require a subtle, defining outline, ensuring they are
visually distinct.

![](./_assets/border-width.png)

### Selected states

Use the `border.width.selected` token to show users which option they’ve selected from a group.
Apply this token to highlight a user's choice, such as an active tab or a chosen item in a list.

![](./_assets/border-width-selected.png)

### Focus ring

Use the `border.width.focused` token to define the thickness of the focus ring. Apply this token to
show keyboard users where they are on the page. When users press Tab to move through an interface,
the token highlights the active element they can interact with. This helps make your interface
accessible to everyone.

![](./_assets/border-width-focused.png)

## Border color and width pairing

Create borders by pairing width and color tokens. Choose:

- width tokens to control how thick and visible your border appears
- color tokens to show what the border means, like its state or importance

Always pair the right width token with the right color token to keep your interface consistent and
clear for users.

![](./_assets/border-width-color.png)

### Visual indicator for selected state

Always pair the `border.width.selected` token with the `color.border.selected` token, to show users
which items they’ve selected. Use this combination to consistently highlight selected elements, like
an active tab or a chosen list item, throughout the interface.

![](./_assets/border-width-selected-color.png)

### Required pairing for focus state

Always pair the `border.width.focused` token with the `color.border.focused` token to define the
thickness of the focus ring.

Use this combination to consistently highlight elements that receive keyboard focus, so users always
know which element is active and ready for interaction.

To ensure consistency and accessibility when adding a focused state to your components, follow these
standards:

- **Code:** Use the
  [Focusable component](https://atlassian.design/components/primitives/focusable/examples) to wrap
  all interactive elements requiring focus.
- **Design:** Use the
  [Focus Ring component (Atlassians only)](https://go.atlassian.com/focus-ring-component) from the
  Atlassian Design System Figma library.

![](./_assets/border-width-focused-color.png)

It’s important to consider contrast when using different accent colors in your UI. For subtle
backgrounds, pair them with an accent border to meet the 3:1 contrast requirement for accessibility.

[More about accent colors](https://atlassian.design/foundations/color/accents#use-borders-for-more-contrast-around-subtle-backgrounds)

![](./_assets/border-width-accent-color.png)

Use these messages when you want to provide more information without disrupting someone’s work or
requiring them to take action.

An info message needs to leave your reader feeling:

1. Informed
2. Helped and supported
3. In control of their situation

Information messages may be used to communicate a change in state or important information about an
experience or feature. Get right to the point and say why it’s important.

## Tips and tricks

- Get right to the point
- Say why it's important, then let them get back to work
- Keep the information useful and don't disrupt your users experience with the message

## Voice and tone

Inform the user about something that might happen or impact them. Then let them get back to work.
Based on the situation, you can add more of a “wink” to your message, but keep it clear and concise.

## Examples

This flag informs the user they were logged out due to inactivity. It’s personable, informative and
offers a clear action to log back in.

<img
	src={infoMessagesFlag}
	alt="Information flag informing someone they have been logged out. The call-to-action is to login."
/>

This message is used to inform the user and give a reason behind an empty state.

<img
	src={infoMessagesEmptyState}
	alt="Empty state encouraging an admin to add people to a Jira project space."
/>

## Related components

- [Flag](https://atlassian.design/components/flag/examples)
- [Inline message](https://atlassian.design/components/inline-message/examples)
- [Section message](https://atlassian.design/components/section-message/examples)
