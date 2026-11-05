# get_component_usage_guidelines

- args: `{"name":"Select"}`
- isError: false
- ms: 283
- chars: 2399

---

Here are the usage guidelines for the `Select` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Select](/product/components/select/)
4.  [Guidelines](/product/components/select/guidelines/)

Select
======

Select is for choosing a single option from a dropdown menu of predefined choices.

Page navigation navigation
--------------------------

*   [Overview](/product/components/select/)
*   [Guidelines](/product/components/select/guidelines/)
*   [Accessibility](/product/components/select/accessibility/)

More items

[Anatomy](#anatomy)
-------------------

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-956-93046.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=956-93046&t=OIceMocYMRq1FN7G-4)

  

**Label (required):** A short title that labels the group of options and helps users understand the relationship between the options in the group

**Required indicator:** Indicates that a selection is required

**Input (required):** Displays the selected value and is used to toggle the dropdown menu

**Caption:** May be used to provide additional context about the options when the label alone is not sufficient. Caption text should be as short as possible. Caption text may be displayed at the same time as a validation message, or it may be hidden if it only provides redundant information.

**Validation message:** A single validation message may be displayed to provide helpful information for a user to complete their task. It is most commonly used to explain why a value is invalid so they can correct it and submit the form.

[Best practices](#best-practices)
---------------------------------

*   Use a Select component for longer lists of options. If there are 6 or fewer options and you don't need to conserve vertical space, consider using a [RadioGroup](/product/components/radio-group/) instead.
*   Provide a default selected option when possible
*   Order the menu options in a logical order to make it easier for users to find the option they're looking for. Default to alphabetical order.

[Interactions](#interactions)
-----------------------------

This is just a native [select](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select), so the interactions will match the paradigms of the user's OS and browser.
