<!-- tool: get_component_accessibility_guidelines / args: {"name":"PageHeader"} / at: 2026-11-05T10:55:16.652Z / isError: false -->

Here are the accessibility guidelines for the `PageHeader` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [PageHeader](/product/components/page-header/)
4.  [Accessibility](/product/components/page-header/accessibility/)

PageHeader
==========

PageHeader determines the top-level headings of a UI.

Page navigation navigation
--------------------------

*   [Overview](/product/components/page-header/)
*   [Guidelines](/product/components/page-header/guidelines/)
*   [Accessibility](/product/components/page-header/accessibility/)

More items

[Landmark usage](#landmark-usage)
---------------------------------

`PageHeader` allows usage of different HTML landmarks to create a more accessible UI. The usage of `header` and `nav` regions are allowed within `PageHeader`, both with different use cases.

### [`PageHeader` with `header` landmark](#pageheader-with-header-landmark)

When utilizing landmarks, it's best to ensure that you’re using them correctly. For the header landmark you should follow these guidelines.

*   Only utilize `header` if one does not currently exist on the page.
*   Utilize `header` if the `PageHeader` consists of site-oriented content, typically existing at the top of the page.
*   Ensure that when used on `PageHeader`, that the component itself is not within other landmarks, such as `main`.

### [`PageHeader` with `nav` landmark](#pageheader-with-nav-landmark)

Navigation landmarks are best utilized to group links that pertain to navigation of the page. You can have multiple navigation landmarks, but it’s important to ensure that each unique navigation element has a unique label attached, either via `aria-label` or `aria-labelledby`. You can utilize `PageHeader.Navigation` as a `navigation` landmark through the `as` prop. This further extends the accessibility of this component, as it allows users to navigate via landmarks easier. It’s important to note that if you utilize a component with an existing `navigation` landmark such as `UnderlineNav` then you should not use `PageHeader.Navigation` as a navigation landmark, as this would be a duplicate.

For navigation, you should follow these guidelines:

*   If you have a list or grouping of links within `PageHeader.Navigation`, you should utilize the `nav` type for this element.
*   If you’re already utilizing a component with a navigation landmark (such as `UnderlineNav`), you should not use `PageHeader.Navigation` as a navigation landmark.
*   If more than one `navigation` landmark exists on the page at a given time, you should add a unique label to each one. You can do this by either passing an `aria-label` or `aria-labelledby` attribute to `PageHeader.Navigation`.

[Heading Structure](#heading-structure)
---------------------------------------

`PageHeader.Title` renders its content as a heading in the background and most of the time it will have crucial information about the page, so it’s important to ensure that you’re using it in an accessible manner.

`PageHeader.Title` is shipped as an `H2` by default, but only if you do not pass a heading level to it via the `as` prop. You should modify the level of this component if the default heading `H2` does not make sense with the existing heading structure on the page.

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   The `PageHeader` should use clear and descriptive language, to set the context for the page and the content that people will expect to find in it

#### [Vision](#vision)

*   Ensure that text has a color contrast ratio of at least 4.5:1
*   When using leading and trailing actions or visuals, ensure that they have a color contrast ratio of at least 3:1 against the component’s background color

#### [Mobility](#mobility)

*   Leading and trailing actions must have a minimum target size of 24 by 24 CSS pixels. This is to ensure that the controls are large enough to be easily activated by users with moving disabilities

### [Adaptability](#adaptability)

*   Make sure that content within the `PageHeader` component can be increased up to 200%, and remain fully visible
*   All content and functionality must remain readable, usable, and not require horizontal scrolling to read it or operate it, at a viewport size of 320 by 256 CSS pixels
*   When adding additional text spacing, make sure that all content can still be read in its entirety

### [Interaction](#interaction)

#### [Keyboard](#keyboard)

*   Leading and trailing actions in the `PageHeader`, along with any other interactive controls, should receive focus, and be usable with only a keyboard
*   Interactive controls in the `PageHeader` must receive focus in a logical order, which in the majority of cases, will be the order that they are visually displayed

#### [Touch and mouse](#touch-and-mouse)

*   Interactive controls in the `PageHeader` must be activated on the up event, and not the down event, or there must be a way to prevent the action from taking place on the down event

### [Engineering for compatibility with assistive technology](#engineering-for-compatibility-with-assistive-technology)

#### [Screen reader](#screen-reader)

*   The order in which the `PageHeader` contents are implemented should result in a logical reading order
*   Leading and trailing actions that are labelled using only an icon, must have an accessible name
*   Heading levels that maintain the page’s hierarchy and structure must be used, heading levels should not be skipped
*   An appropriate role for the page header must be used. This will be `role="banner"` for most cases, or `role="navigation"`, when the PageHeader contains navigation elements, which do not already themselves contain a `role="navigation"` (applied either implicitly by using a `<nav>` element or explicitly with the `role` attribute)

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

By default, the `PageHeader` component renders a heading level 2 element for the `<PageHeader.Title>`. This helps to ensure that the page is structured appropriately. All content that follows and relates to this heading, should use a `<h3>` and lower, to help maintain the hierarchy of the page.

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

The `PageHeader` should have an accessible name, which should be provided using an `aria-label` attribute. The accessible name should describe the purpose of the component, which is particularly useful when the component has actions or navigation items. In most cases, it will make sense for the accessible name to mirror the `<PageHeader.Title>`.

The component also needs a `role` to convey its type, and how people can expect to interact with it. In most cases, this will probably be `role="banner"`. This will ensure that the content is a landmark region, which can easily be identified and navigated to. There should only be a single `role="banner"` per page. However, where the `PageHeader` is used more for navigational purposes, and includes a series of links to other pages, it should instead have a `role="navigation"` attribute.

### [Maintaining a heading hierarchy](#maintaining-a-heading-hierarchy)

Where the `PageHeader` component is used in a way that a `<h2>` element would disrupt the hierarchy of the page, or its structure, this can be changed with the `<PageHeader.Title>`'s `as` attribute. This can be provided with a different heading level, for example H1 or H3, to render the title as a different element.

[Accessible names for actions and visuals](#accessible-names-for-actions-and-visuals)
-------------------------------------------------------------------------------------

When including actions and visuals in the `PageHeader`, ensure that where necessary, these include accessible names to describe their purpose. For example, when using a `<PageHeader.LeadingAction>` or `<PageHeader.TrailingAction>` to implement an `<IconButton>`, don't forget to use the `aria-label` attribute to provide these controls with accessible names, conveying what the control is for. The same applies to visuals that convey information, such as the commit or pull request icons.

### [Customising the display of the component](#customising-the-display-of-the-component)

Using the `PageHeader` component’s `className` prop, it’s possible to change the style and therefore the display of the component. When doing this, make sure that:

*   content is not truncated, and therefore lost, when zooming in to 200% or adding additional text spacing
*   text (including descriptions, actions, navigation, and visuals) has a contrast of at least 4.5:1 against the component’s background
*   icons have a contrast of at least 3:1 against the component’s background

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   If this component has a role of `banner`, then there should be no other `banner` landmarks on the page
    *   If there are multiple `banner` regions, then they must each have unique accessible names
*   The page has a valid heading structure, with no heading levels missed or skipped

### [Component tests](#component-tests)

*   The `PageHeader` component has an accessible name
*   The `PageHeader` component has an appropriate role, of either `banner` or `navigation`
*   If this component contains a navigation landmark, then this component must not have a duplicate role of `navigation`
*   Interactive controls inside the component receive focus and can be used with only a keyboard
*   Leading and trailing icons have an accessible name to convey equivalent information
