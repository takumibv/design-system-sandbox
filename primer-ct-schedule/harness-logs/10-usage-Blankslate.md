# get_component_usage_guidelines

- args: `{"name":"Blankslate"}`
- isError: false
- ms: 359
- chars: 5163

---

Here are the usage guidelines for the `Blankslate` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Blankslate](/product/components/blankslate/)
4.  [Guidelines](/product/components/blankslate/guidelines/)

Blankslate
==========

Blankslate is used as placeholder to tell users why content is missing.

Page navigation navigation
--------------------------

*   [Overview](/product/components/blankslate/)
*   [Guidelines](/product/components/blankslate/guidelines/)

More items

[Anatomy](#anatomy)
-------------------

The Blankslate component is made up of several elements that work together to inform the user about a feature and how to proceed forward. Below are the different elements of the component and how to modify them.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4786-728.png&w=2048&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4786-728&t=WGpNkqbgsZyx4bcO-4)

### [Graphic](#graphic)

The graphic can bring delight, preview an interface element, or represent the goal of the feature. Graphics should be placed intentionally and with thought about the intention of the content. Graphics also differ in meaning and appeal to the user, which is why the Blankslate component has multiple variations. These variations are outlined later on this page.

Please note that when a graphic is used to convey meaning or purpose, rather than purely for decoration, this information must also be conveyed to users that may not be able to see it, such as screen reader users. Either make sure that the meaning or purpose is also conveyed in the actual text used inside the component, or add a text alternative to the image itself. In the case of [Octicons](/octicons/), this is done by adding an `aria-label` attribute to the element - for example, `<Octicon icon={RepoIcon} aria-label="Repository" />`. For other graphics, this implementation is at the consumer's discretion.

### [Primary Text](#primary-text)

Use primary text to explain the purpose of the empty state, help users feel comfortable to engage with the content, or begin a feature flow. Primary text should sound welcoming, human, and convey the intention of the feature.

### [Secondary text](#secondary-text)

This optional text is used to inform the user about the feature in more detail. Secondary text should be brief and non-redundant if possible. From the text, users should be able to understand the general purpose of the feature and how it may help them accomplish a goal.

### [Primary action](#primary-action)

Blankslates can and are encouraged to use one primary action. This button should lead to a feature or component creation flow. Button copy should be kept brief and descriptive. If a button requires further specification, consider adding an Octicon.

### [Secondary action](#secondary-action)

Secondary actions are optional and are represented by a text link located below the primary action button. A secondary action is used to direct a user to additional content about the feature. This might look like `Learn more about X` or "`Check out the guide on X`.

### [Border](#border)

The border is invisible by default, but can be added to help define the structure of the Blankslate component when needed. This can be particularly helpful in page layouts where the Blankslate is not the only content on the screen.

[Content and copy](#content-and-copy)
-------------------------------------

Empty states should explain features _in addition_ to conveying intention. In the example below, the primary text is used to provide a welcome invitation to creating a positive community while the secondary text supports this intent by informing the user on how to do this by providing a code of conduct.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-5152-2588.png&w=2048&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=5152-2588&t=Stq20f2faieAt6yN-4)

[First time user experiences](#first-time-user-experiences)
-----------------------------------------------------------

For first time user experiences, the primary text should welcome the user to the platform and feature. Secondary text should seek to educate the user, but at a simpler, less-technical level.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-5152-2691.png&w=2048&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=5152-2691&t=Stq20f2faieAt6yN-4)

[In a narrow container](#in-a-narrow-container)
-----------------------------------------------

When a Blankslate is rendered in a narrow area, the spacing and font sizes are reduced so that it's visually proportional to the narrow area it's being rendered in. This is implemented using container queries, so this will happen on any viewport size.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4786-647.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4786-647&t=WGpNkqbgsZyx4bcO-4)
