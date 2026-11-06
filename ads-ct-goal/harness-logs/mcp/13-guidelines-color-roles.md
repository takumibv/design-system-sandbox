<!-- transport: remote https://mcp.atlassian.com/v1/ads/public/mcp -->
<!-- request: {"tool":"ads_get_guidelines","args":{"terms":["color roles","accent colors","color meaning"],"limit":2}} -->

## The palette

<ColorPaletteRamps />

## Picking colors for dark mode

Neutral colors are set up in a way that makes it easy to convert a light theme to a dark theme. If
you use our [design tokens](https://atlassian.design/tokens/design-tokens) to apply colors, this
mapping is done for you.

There is a light neutral ramp and an equivalent dark neutral ramp. Neutral100 in the light neutral
ramp should equate to DarkNeutral100 in the dark neutral ramp.

<img
	src={paletteNeutralMapping}
	alt="How light neutral ramp maps to dark neutral ramp in light and dark mode respectively."
/>

Saturated colors are also easy to convert from a light theme to a dark theme using symmetry. We
currently have 10 swatches set up in each palette. If the swatches are divided in half, each half
becomes a mirror.

<img
	src={paletteSaturatedMapping}
	alt="How colors in the blue ramp maps across light and dark mode."
/>

For instance, if a button color is 700 in light theme, it will be 400 in dark theme. If a section
message background is 100 in light theme, it will be 1000 in dark theme. Design tokens will handle
these conversions for you.

<img
	src={paletteJiraBoard}
	alt="Screenshot of a Confluence page, which is shown half in light mode and half in dark mode. The button background uses B700 in light mode and B400 in dark mode. The section message background uses B100 in light mode and B1000 in dark mode."
/>

Using symmetry is a great place to start and will cover most use cases. However, it may not work for
all use cases and color mapping can be adjusted accordingly.

## Dedicated to

These colors have been dedicated to honor the memory of Rosie and Alexandria, and will be woven into
Atlassian apps and design for years to come.

<ColorPaletteDedication />

Color pickers let users choose colors for elements in their content.

Use design tokens for color pickers to ensure the colors work across different themes and
experiences.

<img
	src={colorPickerExampleLight}
	alt="Confluence page in edit mode with the text color picker open."
/>

## Choosing tokens for color pickers

- [Text color pickers](#text-color-pickers)
- [Background color pickers](#background-color-pickers)
- [Chart color pickers](#chart-color-pickers)

A range of colors and shades are available. Determine which ones to include based on the needs of
your experience.

### Text color pickers

There are two accent shades of each text color for a total of 18 text token color options. See the
available [text accent tokens](https://atlassian.design/components/tokens/all-tokens#color-text) in
the design tokens list.

<img
	src={colorPickerTextLight}
	alt="A text color picker with two shades per color. There is a label pointing to each shade of purple as well as the white color option. From most bold to subtle, the labels say color.text.accent.purple.bolder, color.text.accent.purple.default, and color.text.inverse."
/>

If you need additional text colors, you can add a third row of colors using our
[accent icon colors](https://atlassian.design/components/tokens/all-tokens#color-icon). These meet
the right contrasts for large-scale text (at least 18px bold or 24px).

### Background color pickers

There are four accent shades of each background color for a total of 36 background color options.
See the available
[background accent tokens](https://atlassian.design/components/tokens/all-tokens#color-background)
in the design tokens list.

<img
	src={colorPickerBackgroundsLight}
	alt="A background color picker with four shades per color. There is a label pointing to each shade of purple as well as the default color option. From most subtle to bold, the labels say color.background.accent.purple.subtlest, color.background.accent.purple.subtler, color.background.accent.purple.subtle, color.background.accent.purple.bolder, and elevation.surface."
/>

### Chart color pickers

There are three accent shades of each chart color for a total of 27 chart color options. See the
available [chart accent tokens](https://atlassian.design/components/tokens/all-tokens#color-chart)
in the design tokens list.

<img
	src={colorPickerChartLight}
	alt="A chart color picker with three shades per color. There is a label pointing to each shade of purple. From most subtle to bold, the labels say color.chart.purple.bold, color.chart.purple.bolder, and color.chart.purple.boldest."
/>

## Best practices

### Use tokens appropriate to the type of picker

Text tokens should be used for text color pickers, and background tokens should be used for
background color pickers.

<DoDontGrid>
	<DoDont
		type="do"
		image={{
			url: colorPickerChartRoleDo,
			alt: 'Color picker showing chart tokens being used for a chart color picker',
		}}
	>
		Use design tokens appropriate to the type of picker.
	</DoDont>
	<DoDont
		type="dont"
		image={{
			url: colorPickerChartRoleDont,
			alt: 'Color picker showing background tokens incorrectly being used for a chart color picker',
		}}
	>
		Don't use design tokens solely based on how the color looks.
	</DoDont>
</DoDontGrid>

### Ensure there are accessible color pairing options

Consider how colors will be applied by customers to ensure appropriate options are available to
support the creation of accessible content.

For example, check how text and background colors will be used together to ensure the emphasis
levels required for accessible pairings are available.

<DoDontGrid>
	<DoDont
		type="do"
		image={{
			url: colorPickerAccessibleRoleDo,
			alt: 'Color picker with text and background color options that can create accessible contrast ratios when paired together',
		}}
	>
		Provide color options that can be paired in a way that meets accessible contrasts.
	</DoDont>
	<DoDont
		type="dont"
		image={{
			url: colorPickerAccessibleRoleDont,
			alt: 'Color picker with limited color options that cannot create accessible contrast ratios when paired together',
		}}
	>
		Don't offer colors in color pickers that do not support the creation of accessible content.
	</DoDont>
</DoDontGrid>

### Avoid yellow

While yellow accent and chart tokens are available, we recommend not including them in your color
picker.

<DoDontGrid>
	<DoDont
		type="do"
		image={{
			url: colorPickerAvoidYellowTextDo,
			alt: 'Color picker showing orange text color option instead of yellow',
		}}
	>
		Consider using accent tokens other than yellow, such as orange.
	</DoDont>
	<DoDont
		type="dont"
		image={{
			url: colorPickerAvoidYellowTextDont,
			alt: 'Color picker showing yellow text color that appears brown due to contrast requirements',
		}}
	>
		Avoid using yellow accent tokens, as these become brown to meet contrast requirements.
	</DoDont>
</DoDontGrid>

### Use theme agnostic color descriptions

Always provide text descriptions for color options in a picker. Text descriptions should be included
in a tooltip.

Use emphasis levels to describe different shades of the same color, from subtlest to boldest. When
applied to a background color picker, this might appear like:

- Subtlest {color}
- Subtler {color}
- Subtle {color}
- Bold {color}

<DoDontGrid>
	<DoDont
		type="do"
		image={{
			url: colorPickerAgnosticColorDo,
			alt: 'Color picker with tooltips showing theme-agnostic descriptions like subtle blue and bold blue',
		}}
	>
		Use color descriptions that work across light and dark themes, such as 'subtle' and 'bold'.
	</DoDont>
	<DoDont
		type="dont"
		image={{
			url: colorPickerAgnosticColorDont,
			alt: 'Color picker with tooltips showing theme-specific descriptions like light blue and dark blue',
		}}
	>
		Don't use terms such as 'light' and 'dark' to describe colors, as these descriptions become
		inaccurate between light and dark themes.
	</DoDont>
</DoDontGrid>

When defining text descriptions for inverse or default surface color options, use "default" as the
color description where possible. In cases where this doesn't make sense, such as for inverse text,
the description can be changed dynamically between light and dark mode.

<img
	src={colorPickerAgnosticColorLight}
	alt="Color picker in both light mode and dark mode. One swatch option says 'White' in light mode and 'Black' in dark mode."
/>

Accents don't communicate any specific meaning to users, unlike success, warning, or other
[color roles](https://atlassian.design/foundations/color#color-roles).

Use accent colors where users choose a color for their content (in
[color pickers](https://atlassian.design/foundations/color/color-picker-swatches)), or in
experiences where color helps categorize content.

<img
	src={accentsWhiteboardLight}
	alt="Color ramps for all saturated colors, which are blue, teal, green, lime, yellow, orange, red, magenta, and purple."
/>

## Color options

There are 10 accent colors available: blue, teal, green, lime, yellow, purple, magenta, red, orange,
and gray.

<img src={accentsColorsLight} alt="Tags shown in the 10 accent colors." />

## Applying accent colors

Each accent color has dedicated [design tokens](https://atlassian.design/tokens/design-tokens) that
can be applied to backgrounds, text, borders and icons. The full list of tokens is available in
[design token reference list](https://atlassian.design/components/tokens/all-tokens).

If you aren't sure whether to use an accent token, consider whether the color could be swapped for
another without changing the experience or meaning behind it.

<DoDontGrid>
	<DoDont type="do" image={{ url: accentsRoleDo, alt: '' }}>
		Use accent tokens for any experience where the color is just one of many colors, and changing it
		would have no impact on the experience.
	</DoDont>
	<DoDont type="dont" image={{ url: accentsRoleDont, alt: '' }}>
		Don't use accent tokens when the color has a specific meaning in our system, such as
		information, warning, or success.
	</DoDont>
</DoDontGrid>

## Emphasis levels

Accent tokens come in multiple shades, which can either provide different emphasis levels for visual
hierarchy or be used to provide more color options for user-generated content.

### Background accent tokens

Background accent tokens have four emphasis levels ranging from subtlest to bolder.

<img
	src={accentsBackgroundAccentTokensLight}
	alt="A color picker with four shades per color. There is a label pointing to each shade of purple. From most subtle to boldest, the labels say color.background.accent.purple.subtlest, color.background.accent.purple.subtler, color.background.accent.purple.subtle, and color.background.accent.purple.bold."
/>

### Text accent tokens

Text accent tokens have two emphasis levels – default and bolder.

<img
	src={accentsTextAccentTokensLight}
	alt="Examples of text in different colors. A label points to text in a lighter magenta that says color.text.accent.magenta.default. Another label points to text with a darker shade that says color.text.accent.magenta.bolder."
/>

### Icon accent tokens

Icon accent tokens have two emphasis levels – default and bolder.

<img
	src={accentsIconsLight}
	alt="Examples of icons in different colors. A label points to an icon in a lighter magenta that says color.icon.accent.magenta.default. Another label points to an icon with a darker shade that says color.icon.accent.magenta.bolder."
/>

## Accent color accessibility

When pairing accent text or icon colors against backgrounds, make sure they meet
[minimum contrast requirements](https://atlassian.design/foundations/color#accessibility-in-color).

- Pair default or bolder accent text or icons with subtlest and subtler accent backgrounds
- Pair bolder accent text or icons with subtle accent backgrounds
- Pair inverse text or icons with bolder accent backgrounds

If you're pairing text or icon tokens outside of these recommendations, ensure they meet the minimum
contrast requirements against the background.

<img
	src={accentsColorAccessibility2Light}
	alt="Visualization of how various teal text and background pairings can look. Default and bolder text appears on a subtlest background, default and bolder text appears on a subtler background, bolder text appears on a subtle background, and inverse text appears on a bolder background.Visualization of how various teal icon and background pairings can look. Default accent icons or icons using accent text appear on a subtlest background, an icon using accent text appears on a subtler or subtle background, and an inverse icon appears on a bolder background.
"
/>
<img
	src={accentsColorAccessibilityLight}
	alt="Visualization of how various teal text and background pairings can look. Default and bolder text appears on a subtlest background, default and bolder text appears on a subtler background, bolder text appears on a subtle background, and inverse text appears on a bolder background.Visualization of how various teal icon and background pairings can look. Default accent icons or icons using accent text appear on a subtlest background, an icon using accent text appears on a subtler or subtle background, and an inverse icon appears on a bolder background.
"
/>

## Best practices

### Avoid yellow

Yellow presents a unique challenge for accessibility and can appear more like brown. Consider using
a different accent color in its place, such as orange.

<DoDontGrid>
	<DoDont type="do" image={{ url: accentsAvoidYellowDoLight, alt: '' }}>
		Consider using accent tokens other than yellow, such as orange.
	</DoDont>
	<DoDont type="dont" image={{ url: accentsAvoidYellowDontLight, alt: '' }}>
		Avoid using yellow accent tokens, as these become brown to meet contrast requirements.
	</DoDont>
</DoDontGrid>

### Use borders for more contrast around subtle backgrounds

Pair subtler accent backgrounds with accent borders if your
[experience needs to pass 3:1 contrast](https://atlassian.design/foundations/color#accessibility-in-color).

Bolder accent backgrounds meet these requirements on their own. For data visualization, use our
[chart tokens](https://atlassian.design/foundations/color/data-visualization-color#custom-charts)
instead.

<img
	src={accentsBorderTokenLight}
	alt="View of a calendar event with a label pointing to the border color that says color.border.accent.magenta. Another label points to the background color that says color.background.accent.magenta.subtler."
/>

### Avoid mixing different accent colors

Maintain visual harmony by combining foreground and background elements with colors from the same
family.

<DoDontGrid>
	<DoDont type="do" image={{ url: accentsMixingColorsDoLight, alt: '' }}>
		Pair accent background and foreground elements (text, icons, or borders) from the same color to
		create harmonious experiences.
	</DoDont>
	<DoDont type="dont" image={{ url: accentsMixingColorsDontLight, alt: '' }}>
		Don't mix accent backgrounds with different colored foreground elements (text, icons, or
		borders).
	</DoDont>
</DoDontGrid>

import {
	BrandAndNeutralChartTokensTable,
	CategoricalChartTokensTable,
	SemanticChartTokensTable,
} from '@af/design-system-docs-ui';

Data visualization is the representation of information in pictorial or graphical format, such as
charts, graphs, maps, and diagrams. These visuals aid in the communication of complex data so that
insights can be more easily drawn.

Because color can affect our perception of information, the appropriate use of color is critical in
making a data visualization successful.

## Applying color to data visualizations

Color in Atlassian apps experiences are applied using
[design tokens](https://atlassian.design/tokens/design-tokens). For data visualization, chart color
tokens are available to ensure appropriate color contrasts can be met. Use chart tokens for lines,
bars or other UI representing the data. For elements of the chart interface such as axes and text,
use border and text tokens.

<img
	src={dataVisPageAnalyticsLight}
	alt="In this chart example, the title and legend text uses `color.text`, the chart grid lines uses `color.border`, the threshold line uses `color.chart.neutral`, the line representing chart data uses `color.chart.brand`, and the tick labels uses `color.text.subtle`."
/>

- **Title**: `color.text`
- **Tick label**: `color.text.subtle`
- **Threshold or reference line**: `color.chart.neutral`
- **Legend**: `color.text`
- **Gridline**: `color.border`
- **Mark**: `color.chart.brand`

## Types of chart colors

- [Single-color charts](https://atlassian.design/foundations/color/data-visualization-color#single-color-charts)
- [Categorical](https://atlassian.design/foundations/color/data-visualization-color#categorical)
- [Status and severity](https://atlassian.design/foundations/color/data-visualization-color#status-and-severity)
- [Custom charts](https://atlassian.design/foundations/color/data-visualization-color#custom-charts)

Sequential and divergent chart colors are not currently supported.

### Single-color charts

For data visualization requiring only one color, use `color.chart.brand` as the default color
choice. This ensures all data visualization embodies our brand's visual language.

If the data represents status or severity, use the appropriate
[status or severity color token](https://atlassian.design/foundations/color/data-visualization-color#status-and-severity)
instead.

To highlight one piece of data from a data set, use `color.chart.neutral` for the less important
information so that the important data can stand out.

<img
	src={dataVisPageAnalyticsLight}
	alt="Bar chart showing unit test coverage over time. Today is highlighted in blue."
/>

<BrandAndNeutralChartTokensTable />

<DoDontGrid>
	<DoDont type="do" image={{ url: dataVisColorRoleDo, alt: '' }}>
		Use a single color as the default for data visualizations. Only add more colors when needing to
		differentiate between data categories.
	</DoDont>
	<DoDont type="dont" image={{ url: dataVisColorRoleDont, alt: '' }}>
		Don't use more than one color in your data visualization if the additional colors don't serve
		any communication purpose.
	</DoDont>
</DoDontGrid>

### Categorical

Use categorical chart colors when you need to differentiate two or more unrelated data categories
from each other.

<img
	src={dataVisCategoricalChartLight}
	alt="Line chart using categorical colors to represent different conversion rates."
/>

Follow the same sequence as the numbers in the token names. This ensures each color is visually
distinct from its neighbors across all color deficiencies. If the display order can't be controlled
(in line charts for example), provide
[additional visual indicators](https://atlassian.design/foundations/color/data-visualization-color#dont-rely-on-color-alone).

<CategoricalChartTokensTable />

<DoDontGrid>
	<DoDont type="do" image={{ url: dataVisCategoricalDo, alt: '' }}>
		Limit the number of colors presented in your data visualization to 5-6 by grouping additional
		categories together.
	</DoDont>
	<DoDont type="dont" image={{ url: dataVisCategoricalDont, alt: '' }}>
		Avoid using more than 5-6 colors in a data visualization. Too many colors can hinder
		comprehension.
	</DoDont>
</DoDontGrid>

### Status and severity

These chart colors use established color associations for status and severity, such as in progress,
at risk, or high priority. Use these when you want to reinforce meaning through color in your data
visualization.

If more than one set of data exists for a given color association, use bold emphasis to represent
the more extreme value. For example, High priority and Highest priority both use danger tokens, but
Highest uses `color.chart.danger.bold`.

It's important to note that status and severity colors may be hard for users with color deficiencies
to tell apart. For this reason, use other
[visual indicators](https://atlassian.design/foundations/color/data-visualization-color#dont-rely-on-color-alone)
or consider
[categorical colors](https://atlassian.design/foundations/color/data-visualization-color#categorical)
as a better option.

<img src={dataVisStatusSeverityLight} alt="Chart representing breakdown by priority." />

<SemanticChartTokensTable />

### Custom charts

A generic set of chart color tokens is available to support data visualization experiences where end
users can choose their own colors.

They can also be used to build custom categorical color schemes, although our predefined
[categorical tokens](https://atlassian.design/foundations/color/data-visualization-color#categorical)
are recommended for better accessibility and consistency.

These tokens are available in every hue with three emphasis levels. See all custom chart tokens in
our [design token reference list](https://atlassian.design/components/tokens/all-tokens#color-chart)
or get guidance on
[color picker swatches](https://atlassian.design/foundations/color/color-picker-swatches).

<img src={dataVisCustomChartColorsLight} alt="Editing colors on a custom chart in Confluence." />

## Interacting with chart data

Data visualization often allows users to drill into data by hovering or selecting a data point. Use
chart hovered tokens to provide visual feedback for these interactions.

An alternative approach is to fade out data that isn't being interacted with. Use our
`opacity.disabled` token for this implementation.

<img
	src={dataVisChartDataLight}
	alt="Two segmented bar chart examples. In the first example, hovering on one of the segments changes its shade. In the second example, hovering on one of the segments applies opacity to everything except the element being hovered on."
/>

## All chart color tokens

For the full list of chart design tokens and their values, see our
[design token reference list](https://atlassian.design/components/tokens/all-tokens#color-chart).
Every token comes with a description to help you ensure you're using the correct one.

## Chart color accessibility

Our chart colors meet WCAG AA 3:1 contrast ratios when used on any of our
[elevation surfaces](https://atlassian.design/foundations/elevation#types-of-elevations)
([WCAG 1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)).

The following sections provide more guidance to help you achieve better accessibility.

### Apply a border or space between adjacent colors

While these chart colors pass 3:1 contrast ratios against surfaces, they don't against each other.
For this reason, apply a space or border (`color.border.inverse`) as a visual separator between data
elements.

<DoDontGrid>
	<DoDont type="do" image={{ url: dataVisAdjacentColorDoLight, alt: '' }}>
		Apply a visual separator between chart colors.
	</DoDont>
	<DoDont type="dont" image={{ url: dataVisAdjacentColorDontLight, alt: '' }}>
		Don't place chart colors adjacent to each other.
	</DoDont>
</DoDontGrid>

### Don't place text on chart colors

Our chart colors don't support accessible pairings with text, which need at least a 4.5:1 contrast.
Consider placing text next to the chart element instead.

For use cases where text is an essential feature (for example, calendar events), consider using our
other [color tokens](https://atlassian.design/foundations/color) instead.

<DoDontGrid>
	<DoDont type="do" image={{ url: dataVisTextChartsDo, alt: '' }}>
		Position text nearby chart data.
	</DoDont>
	<DoDont type="dont" image={{ url: dataVisTextChartsDont, alt: '' }}>
		Don't apply text over chart colors.
	</DoDont>
</DoDontGrid>

### Don't rely on color alone

Avoid using just color to communicate meaning in your data visualization. Incorporate other visual
indicators such as shapes, line texture, patterns, or direct labels to support users in making sense
of the data. [Highcharts](https://www.highcharts.com/demo) provide some good examples of these
accessible chart experiences.

Additionally, providing the data in alternative formats, such as tables and text-based descriptions,
will ensure all users can access the data in their preferred format.

<DoDontGrid>
	<DoDont type="do" image={{ url: dataVisLineChartDo, alt: '' }}>
		Incorporate visual indicators other than color into your data visualization.
	</DoDont>
	<DoDont type="dont" image={{ url: dataVisLineChartDont, alt: '' }}>
		Don't rely on color alone to communicate meaning in your data visualization.
	</DoDont>
</DoDontGrid>

## Data visualization in dark mode

Chart color tokens currently support two color themes: light and dark. Each token maps to a
different value for each theme so their appearance differs depending on which theme is being used.

- To learn the basics of tokens and themes, go to
  [design tokens](https://atlassian.design/tokens/design-tokens).
- For detailed mappings from light to dark colors, see
  [picking colors for dark mode](https://atlassian.design/foundations/color/color-palette#picking-colors-for-dark-mode).
  Note that if you are using design tokens, you shouldn't have to map your own values.
