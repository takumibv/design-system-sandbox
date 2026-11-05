# get_component_usage_guidelines

- args: `{"name":"Token"}`
- isError: false
- ms: 281
- chars: 3647

---

Here are the usage guidelines for the `Token` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Token](/product/components/token/)
4.  [Guidelines](/product/components/token/guidelines/)

Token
=====

Token is a compact representation of an object, and is typically used to show a collection of related metadata.

Page navigation navigation
--------------------------

*   [Overview](/product/components/token/)
*   [Guidelines](/product/components/token/guidelines/)
*   [Accessibility](/product/components/token/accessibility/)

More items

Tokens are typically used in groups, either as read-only labels or for data entry.

[Anatomy](#anatomy)
-------------------

![token anatomy diagram](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-111178.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-111178&t=OIceMocYMRq1FN7G-4)

*   **Leading visual** (optional): Provides additional context (e.g.: user avatar)
*   **Label** (required): Concise text label
*   **Remove button** (optional): Removes the token from an editable group of tokens

[Interactivity](#interactivity)
-------------------------------

Tokens are usually interactive, with hover and focus states. They can function like links/buttons but should not replace them.

For removable tokens, users can press "Backspace" or "Delete" to remove. Screen readers should announce these options.

Examples of interactions:

*   An issue label token that links to a list of issues with that label
*   A user token that shows a profile summary dialog on hover

[Truncating tokens](#truncating-tokens)
---------------------------------------

![a group of tokens restricted to one line with a counter for hidden tokens](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-943-92743.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=943-92743&t=OIceMocYMRq1FN7G-4)

When space is limited, like in a table, some tokens in a group may be hidden. The amount hidden tokens is added in a text label, e.g. `+3`. Make sure to add an accessible label like `3 more tokens` to make this screen reader accessible.

It is important to make sure that users can access all tokens in a group, even if they have to navigate to a detail view to see them all.

[Tokens as a way to enter information](#tokens-as-a-way-to-enter-information)
-----------------------------------------------------------------------------

The [TextInputWithTokens](/product/components/text-input-with-tokens/) component is designed to handle this usage.

![TextInputWithTokens inside with an autocomplete menu below it](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-111164.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-111164&t=OIceMocYMRq1FN7G-4)

If tokens are being used for data input, it should be obvious that the user is in an edit or creation context.

Consider pairing with [Autocomplete](/product/components/autocomplete/) for selection.

The remove button is standard but can be hidden if another method suits the case.

![tokens rendered at all sizes](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-168-111176.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=168-111176&t=OIceMocYMRq1FN7G-4)

Tokens in inputs can wrap to multiple lines, expanding the input's height. Set a max height if needed; exceeding rows will scroll.
