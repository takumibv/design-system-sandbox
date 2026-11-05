# get_typography_usage

- args: `{}`
- isError: false
- ms: 299
- chars: 3225

---

Here is the documentation for typography usage in Primer:

1.  [Product UI](/product/)
2.  [Getting started](/product/getting-started/)
3.  [Foundations](/product/getting-started/foundations/)
4.  [Typography](/product/getting-started/foundations/typography/)

Typography
==========

Text sizes, weights and font families used across GitHub.

Looking for Primer's color design tokens? See the [typography primitives](/product/primitives/typography/) page.

[Typographic styles](#typographic-styles)
-----------------------------------------

### [Overview](#overview)

Typography design tokens use `rem` units for a more [accessible](https://www.w3.org/WAI/wcag22/Understanding/resize-text.html) browser zoom experience. Additionally, line height values are unitless and vary per style, making them align to the 4px grid. Each style is opinionated, as reflected in the “shorthand” tokens which control size, family, weight, and line-height with a single `font` CSS declaration.

[Best practices](#best-practices)
---------------------------------

### [Hierarchy](#hierarchy)

When establishing hierarchy for GitHub products, designers should remember that we stress efficient, clean reading experiences for our users. Refrain from utilizing color as a primary method of emphasis.

### [Readability](#readability)

*   **Line height**—Utilize line-height tokens for proper alignment.
    
*   **Line length**—It's considered a good practice to keep lines around 80 characters or less—[W3 Page Structure Guidelines](https://www.w3.org/WAI/tutorials/page-structure/styling/). Cases vary depending on the situation, but this serves as a general rule of thumb for designing layouts.
    
*   **Type alignment**—Our content is typically left-aligned and ragged right. Be sensible in deviating from this standard, as justifying, centering, and right-aligning text is atypical of GitHub products.
    

Do![A css class targeting h2 with font-weight set to the variable --test-subtitle-weight.](https://user-images.githubusercontent.com/18661030/234685417-f1cbb3b6-dfdf-4594-9b96-357569aaa688.png)

Use weight CSS variables to set font-weight

Don’t![A css class targeting h2 with font-weight set to 700.](https://user-images.githubusercontent.com/18661030/234685419-2f935ad2-5f78-4b23-8529-274030ea6039.png)

Don't use arbitrary weight number values for font-weight

Do![A screenshot of a repository settings page. First is an H1 that is labelled Repository settings followed by an h2 labelled general.](https://user-images.githubusercontent.com/18661030/234685422-963b8278-e6d0-49c9-9943-1f781975c21a.png)

Use semantic title markup combined with styles

Don’t![An html snippet with a main HTMLElement that contains an h2 HTMLElement than an h1 HTMLElement.](https://user-images.githubusercontent.com/18661030/234685425-ba616cab-d7e6-445e-9ed2-33425a4efd30.png)

Don’t adjust semantic heading tag order to achieve a specific visual design

[Related links](#related-links)
-------------------------------

*   [Typography design tokens](/product/primitives/typography/)
*   [Heading component](/product/components/heading/)
*   [PageHeader component](/product/components/page-header/)
*   [Text component](/product/components/text/)
