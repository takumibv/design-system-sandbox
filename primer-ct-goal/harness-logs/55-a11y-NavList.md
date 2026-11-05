<!-- tool: get_component_accessibility_guidelines / args: {"name":"NavList"} / at: 2026-11-05T10:56:38.034Z / isError: false -->

Here are the accessibility guidelines for the `NavList` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [NavList](/product/components/nav-list/)
4.  [Accessibility](/product/components/nav-list/accessibility/)

NavList
=======

NavList renders a vertical list of navigation links.

Page navigation navigation
--------------------------

*   [Overview](/product/components/nav-list/)
*   [Guidelines](/product/components/nav-list/guidlines/)
*   [Accessibility](/product/components/nav-list/accessibility/)

More items

`NavList`s should always be labeled for assistive technologies, even if the label is visually hidden. The built-in way to do this is `NavList.Heading`, which names the navigation region and labels the `<nav>` landmark for you. See [Labeling the navigation region](#labeling-the-navigation-region) and [Heading levels](#heading-levels) for details.

`NavList` items are links, so they should never contain buttons or other clickable elements.

[Inactive `NavList` items](#inactive-navlist-items)
---------------------------------------------------

Inactive `NavList` items are not rendered as `<a>` tags since we don't know the href value. The only focusabe part of the item is the leading visual. See the [ActionList accessibility guidelines](/product/components/action-list/accessibility/#tooltips-and-dialogs-on-inactive-items) for more details.

[Leading Visuals](#leading-visuals)
-----------------------------------

Leading visuals are intended to be decorative only; the context of the leading visual should be provided in the text of `NavList.Item`. Only the text in `NavList.item` and any trailing visuals within `NavList.Item` are included in its accessible name, while anything inside `NavList.LeadingVisual` will be ignored.

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   Groups should be visually related, to help make the options clearer
*   Navigation items should use clear, easy to understand language
*   When using nested subnav items, the structure should be clear

#### [Vision](#vision)

*   When using leading and trailing visuals, or trailing actions, ensure that the icons have a color contrast ratio of at least 3:1 against the relevant item's background color
*   Ensure that navigation items' text has a color contrast ratio of at least 4.5:1
*   Ensure that the current navigation item communicates that it is the current item, in a way that doesn’t rely on color alone, and that the identifier has a color contrast ratio of at least 3:1 against the tree’s background color

#### [Mobility](#mobility)

*   Every navigation item, as well as every trailing action, must have a minimum target size of 24 by 24 CSS pixels. This is to ensure that the control is large enough to be easily activated by users with motor impairments
*   `NavList`s that have a "Show more" control, when activated, must redirect focus to the first of the newly displayed navigation items

### [Adaptability](#adaptability)

*   Make sure that navigation items can be increased up to 200%, and remain fully visible
*   Every navigation item must remain readable and not require horizontal scrolling to read it or operate it, at a viewport size of 320 by 256 CSS pixels
*   When adding additional text spacing, make sure that all navigation items can still be read in their entirety

### [Interaction](#interaction)

#### [Keyboard](#keyboard)

*   Each navigation item must receive focus when navigating with the `Tab` key
*   The `Enter` key should select the navigation item
*   Navigation items, and any subsequently nested subnav items, or trailing actions, must receive focus in a logical order, which in the majority of cases, will be the order that they are visually displayed

#### [Touch and mouse](#touch-and-mouse)

*   Expanding subnav items, and interacting with navigation items and trailing actions must be activated on the up event, and not the down event, or there must be a way to prevent the action from taking place on the down event

### [Engineering for compatibility with assistive technology](#engineering-for-compatibility-with-assistive-technology)

#### [Screen reader](#screen-reader)

*   The order in which the navigation items are implemented should result in a logical reading order
*   The nesting of subitems in the navigation items must be communicated
*   The `NavList` and any subsequent nested subnavs, must have an accessible name
*   Navigation items must have a `role` of `link`, to help convey how people can interact with these controls
*   Selected and currently active nodes must programmatically convey when they are selected
*   `NavList`s with subnav items must programmatically convey when they are collapsed and expanded
*   If using groups within the `NavList` component, the heading levels used must help maintain the structure and hierarchy of the page. Adding a `NavList.Heading` is the easiest way to do this, as group headings then derive their level from it automatically (see [Heading levels](#heading-levels))
*   Trailing actions must have an accessible name to describe the purpose of the control

#### [Speech recognition](#speech-recognition)

*   All navigation items must include the visible label text in their accessible name
    *   Trailing actions should also include the visible label in their accessible names, to help people using voice control software to interact with them

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

This component is rendered as a `navigation` element, with an unordered list of navigation items. This helps to convey the number of items available to people using assistive technologies.

Nested subnavs follow a similar structure, and are marked up in their own unordered lists, albeit, inside the list item element of the navigation item that they relate to. Along with this, the parent item for the subnav, is automatically provided with an `aria-expanded` attribute, which programmatically conveys the state of the item.

An example of the rendered HTML for this pattern is as follows:

    <nav>
      <ul …>
        <li …>
          <button
            type="button"
            tabindex="0"
            aria-labelledby="«rq3»--label «rq3»--trailing-visual "
            id="«rq3»"
            aria-expanded="true"
            aria-controls="«rq4»"
            …
          >
            …
            <span id="«rq3»--label" …>Item 1</span>
            <span … id="«rq3»--trailing-visual">
              <svg aria-hidden="true" …>…</svg>
            </span>
            …
          </button>
          <ul … id="«rq4»" aria-labelledby="«rq3»">
            <li …>
              <a … tabindex="0" aria-labelledby="«rq6»--label  " id="«rq6»" aria-current="page" href="#" …>
                …
                <span id="«rq6»--label" …>Sub item 1</span>
                …
              </a>
            </li>
            <li …>
              <a … tabindex="0" aria-labelledby="«rq7»--label  " id="«rq7»" href="#" …>
                …
                <span id="«rq7»--label" …>Sub item 2</span>
                …
              </a>
            </li>
          </ul>
        </li>
        <li …>
          <a … tabindex="0" aria-labelledby="«rq8»--label  " id="«rq8»" href="#" …>
            …
            <span id="«rq8»--label" …>Item 2</span>
            …
          </a>
        </li>
        <li …>
          <a … tabindex="0" aria-labelledby="«rq9»--label  " id="«rq9»" href="#" …>
            …
            <span id="«rq9»--label" …>Item 3</span>
            …
          </a>
        </li>
      </ul>
    </nav>

Separate groups (created using multiple `<NavList.Group>`s) are wrapped in list item elements, in an unordered list, providing consistency across the various `NavList` patterns.

When a `NavList.Heading` is used, it renders a heading element whose `id` is referenced by the `<nav>` landmark's `aria-labelledby`, giving the navigation an accessible name. Group headings then render one level below it. For example, an `h2` heading with two groups produces:

    <nav aria-labelledby="«r0»">
      <h2 id="«r0»">Settings</h2>
      <ul …>
        <li …>
          <h3 id="«r1»">Account</h3>
          <ul … aria-labelledby="«r1»">
            …
          </ul>
        </li>
        <li …>
          <h3 id="«r2»">Security</h3>
          <ul … aria-labelledby="«r2»">
            …
          </ul>
        </li>
      </ul>
    </nav>

When `NavList.Heading` has the `visuallyHidden` prop, the heading is still rendered (with visually-hidden styles applied directly to the heading element) and still labels the landmark—it is removed from the visual presentation only, not from the accessibility tree.

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

The `NavList` component must be given a group label to help convey the purpose of the component, and provide context as to what the different navigation items relate to.

### [Labeling the navigation region](#labeling-the-navigation-region)

The recommended way to label a `NavList` is the `NavList.Heading` slot. It renders a real heading at the top of the navigation region and automatically labels the `<nav>` landmark for you (via `aria-labelledby` pointing at the heading's `id`), so screen reader users can both jump to the navigation landmark by its name and navigate by heading.

    <NavList>
      <NavList.Heading>Settings</NavList.Heading>
      …
    </NavList>

If the heading should name the region for assistive technology but not be shown visually, add the `visuallyHidden` prop. The heading stays in the accessibility tree and continues to label the landmark:

    <NavList>
      <NavList.Heading visuallyHidden>Settings</NavList.Heading>
      …
    </NavList>

`NavList.Heading` defaults to an `h2`. To fit the surrounding page outline, you can render it as an `h3` instead with the `as` prop. Only `h2` and `h3` are allowed—never `h1`, which is reserved for the page title. See [Heading levels](#heading-levels) for how this affects group headings.

If you provide your own `aria-label` or `aria-labelledby` on `NavList`, that takes precedence and the heading will not override it.

#### [Labeling without `NavList.Heading`](#labeling-without-navlistheading)

If you don't use `NavList.Heading`, the `NavList` must still be given an accessible name in one of the following ways:

If there’s already a visible label that relates to the `<NavList>` component, use the `aria-labelledby` prop to reference the `id` of the visible label. For example:

    <label id="your-org-label" …>Your organization</label>
    <NavList aria-labelledby="your-org-label" …>
      …
    

This method can also be used with an `sr-only` heading.

Alternatively, you can use the `aria-label` prop to provide the component with an accessible name. For example:

    <NavList aria-label="Your organization" …>
      …
    

### [Heading levels](#heading-levels)

When a `NavList.Heading` is present, `NavList.Group` and `NavList.GroupHeading` automatically render one heading level below it, so the navigation has a correct, shallow outline without any manual wiring:

*   An `h2` heading (the default) gives group headings an `h3`.
*   An `h3` heading gives group headings an `h4`. Group headings never go deeper than `h4`.

When there is no `NavList.Heading`, group headings keep their existing `h3` default, so existing usage is unchanged.

If a single group needs a specific level, pass an explicit `as` to `NavList.GroupHeading`; it always overrides the derived level.

This matters most on settings-style pages, where a `NavList` sits alongside the main page content. Without a region heading, group headings (`h3`) surface a subset of the left-hand navigation links at the same heading level as the page's main content sections, which misrepresents the page hierarchy. Adding a `NavList.Heading` produces the expected `h2 → h3` outline and keeps the navigation distinct from the page content in the heading outline.

### [Setting the state of the active navigation item](#setting-the-state-of-the-active-navigation-item)

When a navigation item is selected, we might change the style of the related control, to make it visually apparent that the state of this control is different. Along with the visual change, we need to make sure that we convey this information programmatically too. We can achieve this with the `aria-current` prop.

The prop takes a few different values, so you'll need to think about the context of use for the component and how you've used it. The following list includes the most common values for the `NavList` component:

*   `page`: When the `NavList` is displaying a set of pages, and you want to convey which of those is currently selected (useful for breadcrumb patterns)
*   `step`: When the `NavList` is displaying a multi-step process, and you want to convey which step the user is currently on
*   `true`: When the `NavList` is displaying a set of items, and you want to convey which of those is currently selected
*   `false`: When an item is not currently selected

For example, here's the prop used to convey that "Item 1" is currently selected and displayed:

    <NavList aria-label="Test items">
      <NavList.Item href="#" aria-current="page">
        Item 1
      </NavList.Item>
      …
    </NavList>
    

For a `NavList` component, only a single navigation item should have an active `aria-current` attribute at any given time. Multiple `aria-current` attributes with selected values might confuse people, and make it difficult to understand which item is active.

### [Naming trailing actions](#naming-trailing-actions)

When you use the `<NavList.TrailingAction>`, you must also provide a `label` prop, to provide an accessible name, which will be announced by screen readers.

For each label, describe the purpose of the control, for example, "Pin item 1". For example:

    <NavList.TrailingAction>
      label="Pin item 1"
      icon={PinIcon}
      onSelect={() => {
        …
      }}
    />
    

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   If the navigation items label text is visible at wide viewports, ensure that it is not hidden or truncated at narrow viewports
*   If using groups within the `NavList` component, the heading levels used must help maintain the structure and hierarchy of the page

### [Component tests](#component-tests)

*   The `NavList` component is exposed as a `<nav>` element, and an appropriate accessible name
*   Each navigation item is exposed as a `link`, with an appropriate accessible name
*   Where a navigation item contains a trailing action, the control has a text alternative to provide equivalent information
*   Selected navigation items convey their state using the `aria-current` attribute, and an appropriate value
*   Each navigation item and any trailing actions, all meet the minimum target size requirement of 24 by 24 CSS pixels
*   Where a "Show more" control is included, when activated, it redirects focus to the expanded content
*   Each navigation item and control in the `NavList` component receives focus
*   Each navigation item and control in the `NavList` component can be activated using only a keyboard
