# get_component_accessibility_guidelines

- args: `{"name":"Breadcrumbs"}`
- isError: false
- ms: 273
- chars: 3592

---

Here are the accessibility guidelines for the `Breadcrumbs` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Breadcrumbs](/product/components/breadcrumbs/)
4.  [Accessibility](/product/components/breadcrumbs/accessibility/)

Breadcrumbs
===========

Breadcrumbs display the current page or context within the site, allowing them to navigate different levels of the hierarchy.

Page navigation navigation
--------------------------

*   [Overview](/product/components/breadcrumbs/)
*   [Guidelines](/product/components/breadcrumbs/guidelines/)
*   [Accessibility](/product/components/breadcrumbs/accessibility/)

More items

Breadcrumbs provide a structured set of links to help users understand their location within a site and allow easy navigation to previous sections.

The last item in the breadcrumb trail represents the current page. It's styled differently for visual clarity and uses the `aria-current` attribute to indicate this to screen readers.

Each breadcrumb link's text should match the `<h1>` or unique part of the `<title>` on the page it links to. If the link text isn't unique, add context to make it distinct. In most cases, the full text should be used, but if it's overly verbose, a shorter label that remains informative can be applied. For example, the final breadcrumb for a blog post might simply read "Blog post" instead of the full title.

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

This component is rendered as a `<nav>` navigation landmark region, with an accessible name of "Breadcrumbs".

    <nav … aria-label="Breadcrumbs">…</nav>

This makes the breadcrumb navigation easily discoverable for screen reader users who navigate via page landmarks.

The individual breadcrumb items are rendered as an `<ol>` ordered list, with each item marked up as a link in a separate `<li>` list item.

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

In the Rails implementation, the link in the last item is automatically given an `aria-current="page"`.

In the current React implementation, you need to explicitly mark the last item as `selected`, which results in `aria-current="page"` being added to the link.

    <Breadcrumbs>
      <Breadcrumbs.Item href="…"> … </Breadcrumbs.Item>
      <Breadcrumbs.Item href="…"> … </Breadcrumbs.Item>…
      <Breadcrumbs.Item href="…" selected>
        …
      </Breadcrumbs.Item>
    </Breadcrumbs>

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   Each breadcrumb link has appropriate and descriptive link text
*   For the React implementation, the last breadcrumb item has been explicitly marked as `selected`, to visually and programmatically identify it as a link referring to the current page

### [Component tests](#component-tests)

*   The breadcrumb component is exposed as a navigation landmark with an appropriate name/label
*   The breadcrumb items have an appropriate structure, such as an `<ol>` ordered list
*   For the Rails implementation, the last item link is programmatically identified as a link to the current page using `aria-current="page"`
*   For the React implementation, if a breadcrumb item has been marked as `selected`, the last item link in the rendered output is programmatically identified as a link to the current page using `aria-current="page"`
