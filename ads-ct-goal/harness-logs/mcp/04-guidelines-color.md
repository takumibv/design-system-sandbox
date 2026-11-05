<!-- transport: remote https://mcp.atlassian.com/v1/ads/public/mcp -->
<!-- request: {"tool":"ads_get_guidelines","args":{"terms":["color roles","accent colors","lozenge color meaning"],"limit":1}} -->

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
