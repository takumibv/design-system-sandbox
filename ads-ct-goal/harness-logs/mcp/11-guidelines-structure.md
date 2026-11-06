<!-- transport: remote https://mcp.atlassian.com/v1/ads/public/mcp -->
<!-- request: {"tool":"ads_get_guidelines","args":{"terms":["navigation","top navigation","page title","landing page","dashboard","primary task","onboarding"],"limit":1}} -->

<SectionMessage title="">
	Date and time formatting is tied to a person’s locale and account settings. Because of this, what
	a customer sees could be different from the guidelines on this page.
</SectionMessage>

## Date and time for internationalization

Each programming language has an i18n (internationalization) library that automatically localizes
time and date strings based on a user’s locale settings/preferences. Time and date strings should
never be localized manually by a designer, engineer, or translator.

The Product Internationalization team is responsible for creating app UI content in non-English
languages by localizing externalized code strings provided by our Product Engineers.

Engineers must:

- Ensure date and time references/strings are not hardcoded 
- Reference the programming i18n library API, which will automatically format time and date strings
  as per a customer’s detected or selected locale.

## Date formats

Atlassian uses US date formatting (for example: January 12, 2028).

When you’re handing designs over to engineers, you need to specify which date format length is
needed. The i18n library API will use this information to format the date accordingly. Date and time
formats should not be hardcoded.

There are 4
[date format lengths](https://cldr.unicode.org/translation/date-time/date-time-patterns#basic-date-formats):
full, long, medium, and short.

### Full date

The full date format is weekday, month, day, year.

<DoDontGrid>
	<DoDont type="do">Sunday, August 14, 2028</DoDont>
</DoDontGrid>

### Long date

A long date format is month, day, year

<DoDontGrid>
	<DoDont type="do">November 8, 2008</DoDont>
</DoDontGrid>

### Medium date

The medium date format is abbreviated month, day, year. Only use this format when space is limited.

<DoDontGrid>
	<DoDont type="do">Sep 26, 1952</DoDont>
</DoDontGrid>

#### Abbreviating months and days

If you need to abbreviate months or days, use the first 3 letters of the month or day.

| Month abbreviation | Month in full |     | Day abbreviation | Day in full |
| ------------------ | ------------- | --- | ---------------- | ----------- |
| Jan                | January       |     | Mon              | Monday      |
| Feb                | February      |     | Tue              | Tuesday     |
| Mar                | March         |     | Wed              | Wednesday   |
| Apr                | April         |     | Thu              | Thursday    |
| May                | May           |     | Fri              | Friday      |
| Jun                | June          |     | Sat              | Saturday    |
| Jul                | July          |     | Sun              | Sunday      |
| Aug                | August        |     |                  |             |
| Sep                | September     |     |                  |             |
| Oct                | October       |     |                  |             |
| Nov                | November      |     |                  |             |
| Dec                | December      |     |                  |             |

### Short date

Short format dates are written in digits.

In most cases, avoid short format dates as different countries use the date in a different order,
which can cause confusion and effect readability and usability. In the US, 10-8-2026 is October 8,
2026, but in Australia and the UK, it’s August 10, 2026.

However, short format dates might be suitable for situations like data storage, sorting or
filtering, or data export/import. If using, use the ISO 8601 international standard for numerical
date format, which is YYYY-MM-DD.

## Ordinal numbers

Don’t use ordinal numbers (1st, 2nd, 3rd, and so on) in dates.

## Date ranges

If you have a date range, use ‘to’ and not hyphens. For example: ‘2020 to 2024’. Hyphens are read
out by screen readers as ‘hyphen’, which can lead to confusion.

An exception is financial years, which use a hyphen without spaces on either side. For example:
FY2008-09

Use ‘and’ if a range is preceded by ‘between’. For example: He was in Paris between 2025 and 2026.

<DoDontGrid>
	<DoDont type="do">2014 to 2015</DoDont>
	<DoDont type="dont">2014-15</DoDont>
</DoDontGrid>

## Time formats

Show time in digits for precision and to give a clearer expression of time.

Specify to engineers which time format length is needed. The i18n library API will then format the
time according to a customer’s account settings. Make sure time is not hardcoded.

Use a colon (:) to separate the hours and minutes (though this might change depending on a user’s
locale and account settings).

Like dates, there are 4
[time format lengths](https://cldr.unicode.org/translation/date-time/date-time-patterns#basic-time-formats):
full, long, medium, and short.

### Full time

The full time format is hour, minutes, seconds, and time zone spelt out.

<DoDontGrid>
	<DoDont type="do">3:30:10 p.m. Pacific Standard Time</DoDont>
</DoDontGrid>

### Long time

The long time format is hour, minutes, seconds, and the time zone initials.

<DoDontGrid>
	<DoDont type="do">11:18:30 p.m. PST</DoDont>
</DoDontGrid>

### Medium time

The medium time format is hour, minutes, and seconds.

<DoDontGrid>
	<DoDont type="do">8:50:28 a.m.</DoDont>
</DoDontGrid>

### Short time

The short time format is hour and minutes.

<DoDontGrid>
	<DoDont type="do">2:40 p.m.</DoDont>
</DoDontGrid>

### 24-hour time

The 24-hour format is useful for more serious communications, for example in the case of outages and
security comms. The use of the 24-hour format is mostly system-driven by the i18n library API.

This format numbers hours from 00:00 hours (midnight) to 23:59 and uses 4 digits: the first 2 digits
are the hours and the next 2 digits are the minutes. Use a colon (:) to separate the hours and
minutes, though this might change depending on someone's account settings.

## Writing time

### Duration and timestamps

When writing timestamps, labels on graphs, or durations, avoid using zeros before the hour. For
example: 5:29. not 05:29. Use a colon between the hours and minutes with no spaces on either side.

### Using a.m. and p.m.

Format time using ‘a.m.’ and ‘p.m.’ when creating content like blogs, manuals, and instructions.

- Lowercase ‘a.m.’ and ‘p.m.’
- Use periods between the letters
- Add a space between the time and the ‘a.m.’ or ‘p.m.’. For example: 6:30 a.m. (not 6:30a.m.)

### Time range

- If you have a time range that’s entirely in the morning or evening, use 'a.m.' or 'p.m.' only
  once. For example: 6:30 to 10 p.m.
- If the time range goes from the morning into the evening (or vice versa), use both. For example:
  10 a.m. to 2 p.m.

### Noon, midday, and midnight

Where suitable, use ‘noon’, ‘midday’ or ‘midnight’ instead of ‘12 am’ or ‘12 pm’ as it makes it
easier for people to differentiate between these times.

### Avoid using ‘fortnightly ‘or ‘bi’ for months and years

Avoid using ‘fortnightly’ and the prefix ‘bi’ to mean either 2 or twice, as these terms can be
confusing.

Instead of:

- **Fortnightly**: write ‘every 2 weeks’
- **Bimonthly**: write ‘twice a month’ or ‘every 2 months’
- **Biannual**: write ‘twice a year’ or ‘every 2 years’.

<DoDontGrid>
	<DoDont type="do">Your sprint will repeat every 2 weeks.</DoDont>
	<DoDont type="dont">Your sprint will repeat fortnightly.</DoDont>
</DoDontGrid>

## Date and time formats

There are also full, long, medium, and short format lengths when combining date and time.

### Full date and time

<DoDontGrid>
	<DoDont type="do">Wednesday, June 12, 2024 at 6:25:59 p.m. Eastern Standard Time</DoDont>
</DoDontGrid>

### Long date and time

<DoDontGrid>
	<DoDont type="do">April 25, 2027 at 9:05:32 p.m. PST</DoDont>
</DoDontGrid>

### Medium date and time

<DoDontGrid>
	<DoDont type="do">Sep 5, 1999, 1:25:59 a.m.</DoDont>
</DoDontGrid>

### Short date and time

<DoDontGrid>
	<DoDont type="do">2028-10-22, 6:25 p.m. </DoDont>
</DoDontGrid>

## Relative date and time

In some cases, like when the exact date is less important, the easiest way to describe something
that happened very recently is using the ‘ago’ format.

For future and past events, use approximate time by rounding down to the largest or most recent date
or time.

You should always provide a way for people to see the actual timestamp, usually via a tooltip.

### Past

| Description                 | Display                      | Display when limited space     |
| --------------------------- | ---------------------------- | ------------------------------ |
| Within the last few seconds | just now                     | now                            |
| Within the last minute      | a minute ago                 | 1 m                            |
| Within 59 minutes           | x minutes ago                | X m                            |
| 60 minutes ago              | 1 hour ago                   | 1 h                            |
| x hours ago                 | x hours ago                  | X h                            |
| 1 day ago                   | yesterday                    | 1 d                            |
| 1 day ago (with time)       | yesterday at 5:05 pm         | n/a                            |
| 2 days ago < 7 days         | x days ago                   | Use the truncated date (Aug 8) |
| 7 days ago                  | 1 week ago                   | Use the truncated date (Aug 8) |
| > 7 days ago                | Date stamp: "August 8, 2018" | Use the truncated date (Aug 8) |

### Future

| Description                   | Display                      | Display when limited space     |
| ----------------------------- | ---------------------------- | ------------------------------ |
| Within the next few seconds   | shortly                      | now                            |
| In the next minute            | In 1 minute                  | in 1 m                         |
| In the next 60 minutes        | In x minutes                 | in X m                         |
| In 60 minutes                 | In 1 hour                    | in 1 hr                        |
| In x hours                    | In x hours                   | in X hr                        |
| In 1 day (by date, not hours) | tomorrow                     | Use the truncated date (Aug 8) |
| In 2 to 7 days                | In x days                    |                                |
| In 7 days                     | In 1 week                    |                                |
| In > 7 days                   | Date stamp: "August 8, 2018" |                                |
| > 7 days ago                  | Date stamp: "August 8, 2018" |                                |

## Style and punctuation

Style and punctuation for dates and time can change depending on locale and is determined by the
i18n library API.

### Capitalization

- Months and days in English are proper nouns and start with a capital letter.
- Specific days or periods in history are all proper nouns, so should be capitalized. For example:
  New Year’s Day, Renaissance, Cold War.
- Use capital letters for all institutional holidays, religious days, and public events. For
  example: Ramadan, Yom Kippur, Good Friday, Martin Luther King Jr. Day.

### Apostrophes

- Avoid using apostrophes in UI copy and in developer and support documentation.
- In more casual writing, you can use an apostrophe to stand in for the missing numerals in the
  year, such as 'the '70s’.

## Resources

- [Int.DateTimeFormat constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#try_it) -
  a JavaScript library that devs can use and where designers can check formatting of date and time.
- [Date formats](https://cldr.unicode.org/translation/date-time/date-time-patterns#basic-date-formats)
- [Time formats](https://cldr.unicode.org/translation/date-time/date-time-patterns#basic-time-formats)

## Color anatomy

### Saturated colors

Saturated colors can infuse meaning to an experience, highlight UI, or create associations with
similar colored UI.

<img
	src={colorSaturatedPaletteLight}
	alt="Color ramps for all saturated colors, which are blue, teal, green, lime, yellow, orange, red, magenta, and purple."
/>

### Neutral colors

Neutral colors apply to most backgrounds, text, and shapes in our experiences. They don’t typically
have a meaning associated with them, though they can imply things like disabled states.

<img
	src={colorNeutralPaletteLight}
	alt="There are dedicated neutrals for both light and dark mode."
/>

Color ramp for light neutrals, and a separate color ramp for dark neutrals.

### Alpha colors

Alpha colors have varying levels of transparency or opacity. Transparency helps UI adapt to
different background colors and elevations.

<img
	src={colorAlphaPaletteLight}
	alt="Light and dark alpha neutral ramps with a circle appearing behind part of the ramps, which demonstrate the transparent quality of the colors."
/>

If you aren't using design tokens, see our
[color palette page](https://atlassian.design/foundations/color/color-palette) for hex codes and
RGBa values.

## Applying color with design tokens

For most Atlassian app experiences, colors are applied using
[design tokens](https://atlassian.design/tokens/design-tokens). This means rather than choosing a
certain shade or value, you’ll choose a design token to apply colors.

For the full list of color design tokens and their values, see our
[design token reference list](https://atlassian.design/components/tokens/all-tokens). Every token
comes with a description to help you ensure you’re using the correct one.

<img
	src={colorTokensInScreenLight}
	alt="Screenshot of a Jira board mapped to different token examples. The board title uses “color.text”, task icon uses “color.icon.accent.green”, and the button background uses “color.background.brand.bold."
/>

All color design tokens start with the word “color”, followed by the property that it's applied to,
such as a background, border, or icon.

<img
	src={colorApplyingColor2Light}
	alt="The design token name, “color.background.danger.bold.hovered”, broken down into parts. The property is “background”, and the modifier is “danger.bold.hovered."
/>

After the property name, the token may have one or more modifiers that represent the different parts
of our color system: color role, emphasis level, and interaction state.

## Color roles

Color roles describe the intention behind the color. For example, color roles are applied to buttons
to differentiate between primary, secondary, warning, or dangerous actions.

<img
	src={colorRolesLight}
	alt="Examples of color roles applied to button backgrounds. Primary button uses the brand color role, default button uses the neutral color role, warning button uses the warning color role, and danger uses the danger color role."
/>

<ColorRolesTable />

<DoDontGrid>
	<DoDont type="do" image={{ url: colorRoleDoLight, alt: '' }}>
		Use the right color role for your situation.
	</DoDont>
	<DoDont type="dont" image={{ url: colorRoleDontLight, alt: '' }}>
		Don’t use an accent when the color has semantic meaning.
	</DoDont>
</DoDontGrid>

## Emphasis levels

Emphasis determines the amount of contrast a color has against the default surface. Emphasis can
range from subtlest to boldest. Bolder colors have more contrast against the default surface, which
adds more attention than subtle colors.

<img
	src={colorEmphasisLevelStatusLight}
	alt="Comparing differences between bold and default lozenges. Bold lozenges have much more contrast than the default lozenges.Comparing differences between default, subtle, and subtlest text. Default text has the highest contrast, subtlest has the least."
/>
<img
	src={colorEmphasisLevelsTextLight}
	alt="Comparing differences between default, subtle, and subtlest text. Default text has the highest contrast, subtlest has the least."
/>

### Use inverse tokens on bold backgrounds

Inverse tokens are designed to show on bold backgrounds. There are inverse tokens for text, borders,
and icons on bold backgrounds.

For bold warning backgrounds, which are yellow, there are special `warning.inverse` tokens designed
to pass WCAG AA contrast requirements.

<img
	src={colorEmphasisLevelInverseLight}
	alt="A danger banner and warning banner with text. The danger banner text is using “color.text.inverse”, and the warning banner text is using “color.text.warning.inverse."
/>

## Interaction states

States communicate the status of an interactive element.

<img
	src={colorInteractionStatesLight}
	alt="Button interaction states, which include default, hovered, and pressed states."
/>
Use hovered, pressed, selected, focused, or disabled tokens to create visual changes related to
interaction states.

### Hovered and pressed for icons

There are no dedicated hovered and pressed tokens for icons. Instead, we recommend using a subtle
neutral background to indicate state changes.

<img
	src={colorInteractionStatesIconsLight}
	alt="Icon interaction states. The default icon background uses “color.background.neutral.subtle”, the hovered icon background uses “color.background.neutral.subtle.hovered”, and the pressed icon background uses “color.background.neutral.subtle.pressed."
/>

## Accessibility in color

We comply with WCAG AA standard contrast ratios:

- **Must pass 3:1 contrast:** Any UI essential to understanding the experience and text 24px or
  larger ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html))
- **Must pass 4.5:1:** Text smaller than 24px
  ([WCAG 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html))

See our [color accessibility](https://atlassian.design/foundations/accessibility#colors) guidance
for more information.

## Designing in dark mode

Design tokens currently support two color themes: light and dark. Each color design token maps to a
different value for each theme so their appearance differs depending on which theme is being used.

- To learn the basics of tokens and themes, go to
  [design tokens](https://atlassian.design/tokens/design-tokens).
- For detailed mappings from light to dark colors, see
  [picking colors for dark mode](https://atlassian.design/foundations/color/color-palette#picking-colors-for-dark-mode).
  Note that if you are using design tokens, you shouldn’t have to map your own values.

## Related

- Learn about the basics of [design tokens](https://atlassian.design/tokens/design-tokens).
- If you need hex codes, RGBA values, or dark mode mappings, see our
  [color palettes](https://atlassian.design/foundations/color/color-palette).
- For guidance on color usage in charts, read our
  [data visualization color guideline](https://atlassian.design/foundations/color/data-visualization-color).
- See the list of [all design tokens](https://atlassian.design/components/tokens/all-tokens) for
  full descriptions and values for all tokens.

<SectionMessage title="">
	These guidelines are for UI and app content. For broader guidance on inclusive language, view
	Brand’s{' '}
	<Link href="https://go.atlassian.com/inclusive-language-guide">
		Inclusive Language Guidelines (Atlassians only)
	</Link>
</SectionMessage>

## Design principles for inclusive language

Inclusive language isn’t about following a list of good and bad words. It’s about taking an approach
that avoids assumptions and stereotypes, and treats people with respect.

### Make content easy to understand

Use plain language. Simple wording is more inclusive and helps people complete their tasks faster
and with higher success rates.

Don’t use [metaphors, idioms](#avoid-metaphors-and-idioms), or jargon.

### Use person-first language when you can’t ask

When you can’t ask someone their preference, use person-first language. It centers around the
person, rather than their difference. For example: ‘people with disabilities’ rather than ‘disabled
people’.

However, some people prefer to use identity-first language to represent themselves, such as many
people in the Deaf community, so it’s best to ask whenever possible.

### Don’t make assumptions about abilities

Don’t use phrasing that makes assumptions about how people experience your app.

For example, by making claims about how easy an experience is, it’s less precise and can exclude
people based on their abilities.

<DoDontGrid>
	<DoDont type="do">Set up your new project in a few steps.</DoDont>
	<DoDont type="dont"> It’s easy to set up a new project.</DoDont>
</DoDontGrid>

### Avoid metaphors and idioms

Metaphors and idioms are non-literal phrases used in regular speech.

- Metaphors are when people compare something to something else (such as ‘they were like a fish out
  of water’)
- Idioms are phrases where the meaning isn’t conveyed by any of the words (such as ‘between a rock
  and a hard place’).

They can be confusing for our global audience, hard to accurately translate, and create an
unnecessary barrier to comprehension. All this can be avoided by being accurate and literal.

<DoDontGrid>
	<DoDont type="do">Automation helps teams create work items faster.</DoDont>
	<DoDont type="dont"> Automation makes creating work items a piece of cake.</DoDont>
	<DoDont type="do">Confluence has many useful features.</DoDont>
	<DoDont type="dont"> Confluence has more features than you can poke a stick at.</DoDont>
</DoDontGrid>

## How to describe people

### Be clear

When you need to describe a group of people, use clear language that aligns with how people describe
themselves, such as whether they use
[person-first or identity-first language](#use-person-first-language-when-you-can’t-ask).

You can also reduce inaccurate assumptions or stereotypes by improving the way you describe people’s
differences. For example:

| Good                                                                         | Better                                                                           | Reason                                                                                                                                                         |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Alternative text helps people with visual disabilities interact with images. | Alternative text helps people who use assistive technology interact with images. | Not all people who use assistive technologies like screen readers have visual disabilities. Using the ‘better’ definition is more inclusive and more accurate. |
| This project was done in consultation with people of Indigenous backgrounds. | This project was done in consultation with First Nations Australians.            | Use specific terms when referring to racial and ethnic groups. Vague terms don't acknowledge the different experiences of racial and ethnic communities.       |

### Don’t change words used to describe people

Avoiding describing people’s differences can reinforce the prejudices of society.

Describing race, ethnicity, disability, age, class, gender, and sexuality isn’t a negative thing,
unless these descriptions are being used in discriminatory ways. For example, it can be ok to use
the phrase ‘people of color’ if you don’t have enough information to be more specific.

Don’t modify phrases to make differences sound positive. Words like ‘differently abled’ or
‘handi-capable’ are patronizing and don’t fit with the diversity of human experiences.

## Words related to disabilities can still be inclusive

Designers avoid some words related to disabilities because they’re trying to be inclusive. Some
words like ‘watch’ and ‘see’ aren't microaggressions because words that relate to disabilities
aren’t negative words.

You should avoid using them in a negative context, but you can use them if they help make things
clear.

| Words             | Reason                                                                                                                                                                                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| View, watch, see  | People who are blind or have low vision aren’t excluded by these words. They still ‘view’ a list of items, only in a different way. Where it makes sense, avoid these words. But you don’t need to remove them if they’re accurate.                             |
| Enabled, disabled | ‘Disabled’ isn't an offensive word. It reflects when people are limited by their environment and society. Avoid associating the word disabled with negative states. Wherever you can, alternatives to ‘disabled’ like ‘turned off’ or ‘unavailable’ are better. |

## Techniques for inclusive experiences

### Use they/them pronouns and gender-neutral language

- When referring to a person, use the pronouns they tell you to use.
- If you don’t know the person or group of people, use they/them pronouns. This makes our apps more
  gender inclusive and easier to read.

<DoDontGrid>
	<DoDont type="do">Ask your project admin to enable editing permissions on their account.</DoDont>
	<DoDont type="dont">
		{' '}
		Ask your project admin to enable editing permissions on his or her account.
	</DoDont>
</DoDontGrid>

### Make alt text concise and consistent

- If images provide information, always include alternative text (‘alt text’) so people using
  assistive technologies can access it.
- When you’re writing alternative text, consider how it will change the experience for a person
  using a screen reader. Is it accurate? Is it too wordy? Is it informative enough?
- If you’re using the same visuals in multiple places, use the same alt text every time it appears.
  And if elements are repetitive, like iconography, be concise so the experience isn’t annoying for
  people using assistive technology.

### Write accurate content, links, and labels

Use accurate, descriptive language for content and links, as it reduces cognitive load and improves
the experience for people who don’t use assistive technology.

Don’t deliberately keep visual labels short and hide the descriptive information behind an
aria-label.

| Example                                                                                                             | Alternative                                                                                                         | Reason                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Ask Rovo about a topic within your company’s knowledge base. [Learn more](https://www.atlassian.com/software/rovo). | Ask Rovo about a topic within your company’s knowledge base. [About Rovo](https://www.atlassian.com/software/rovo). | Accurate, descriptive links reduce people’s cognitive load.                                                                        |
| Atlassian Intelligence is great for speeding up your work and improving productivity.                               | Use Atlassian Intelligence to find answers, get summaries, and generate content.                                    | Don’t use vague promotional language. Describing new features with accuracy builds trust and helps people make informed decisions. |
| Step 1                                                                                                              | Create project (step 1 of 3)                                                                                        | Describe tasks accurately so people know where they are in their workflow.                                                         |

<br></br>

<SectionMessage title="">
	For examples of descriptive links, read{' '}
	<Link href="https://go.atlassian.com/learn-more-alt">
		Alternatives to 'learn more' (Atlassians only)
	</Link>
</SectionMessage>

### Gather form information thoughtfully

- When gathering data about people, avoid pre-defined categories. They often don’t reflect the
  diversity of our world and can prevent people from using software if there isn’t an option for
  them.
- Don’t ask for more information than necessary. Detailed personal information often isn’t relevant
  to our apps, so ask how or if you really need people to identify or group themselves before
  building this into a form.
- If you need to collect information about people’s identities, give them the option to not answer
  or to give a self-defined answer.
- Avoid setting any particular group of people as the default option. This implies that other groups
  are not the norm or not common, or forces some people to navigate and configure fields more than
  others.
- When gathering information about names, use a ‘Full name’ field instead of separating names by
  first name, last name, and salutation.

## Additional resources

Language is changing all the time, so we don’t maintain a list of terms to use or avoid. Instead,
use resources like:

- [APA Inclusive Language Guide](https://www.apa.org/about/apa/equity-diversity-inclusion/language-guidelines)
- [Australian Government Style Manual](https://www.stylemanual.gov.au/accessible-and-inclusive-content/inclusive-language)

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

These messages highlight a new or recently updated experience. Let people know what's changed, and
invite them to try something new. A feature discovery message should leave your reader feeling
curious, excited, and empowered.

For more guidance on this messaging type, see the new or updated feature pattern.

## Tips and tricks

- When introducing the new feature, consider what the user is trying to accomplish, what they were
  just doing, and where they need to go.
- Titles and messages should clearly indicate user benefits. For example, "Find your work faster"
  instead of "New search".
- This should be a positive experience for people, so it's okay to be delightful, just don't overdo
  it.

## Voice and tone

Determine if you need to inform (a feature has moved) or educate (the experience or interaction has
changed). Introduce the change, communicate its benefits, and provide a call to action if
appropriate

Be bold and optimistic about a new feature, especially if there are benefits and improvements for
the user. Be clear and practical, and you can add a little “wink” to entice the user to try
something new.

## Examples

The information flag below promotes the updated search feature, giving the option of learning more
or trying out the new search.

<img src={featureDiscoveryFlag} alt="Information flag to highlight a new search feature." />

This example encourages and empowers the user to begin using Jira as intended by adding work items.

<img
	src={featureDiscoveryStart}
	alt="Information modal promoting how to add a work item to Jira."
/>

This Bitbucket example encourages people to improve their Bitbucket experience by adding branch
permissions. It clearly states the benefits and ideal state of using this feature.

<img
	src={featureDiscoveryBitbucket}
	alt="An information modal for BitBucket highlighting how to add a branch permission."
/>

## Related components

- [Flag](https://atlassian.design/components/flag/examples)
- [Benefits modal](https://atlassian.design/components/onboarding/benefits-modal/usage)
- [Spotlight](https://atlassian.design/components/onboarding/usage)
