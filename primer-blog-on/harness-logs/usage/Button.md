Here are the usage guidelines for the `Button` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Button](/product/components/button/)
4.  [Guidelines](/product/components/button/guidelines/)

Button
======

Button is used to initiate actions on a page or form.

Page navigation navigation
--------------------------

*   [Overview](/product/components/button/)
*   [Guidelines](/product/components/button/guidelines/)
*   [Accessibility](/product/components/button/accessibility/)

More items

Buttons allow users to initiate an action or command when clicked or tapped. The Button's label or text description indicates the purpose of the action to the user. At GitHub, buttons are a fundamental building block of our products. Most of the time, we use the `secondary` variant, but other variants of buttons may be used to indicate something special about the Button's hierarchy or functionality.

[Anatomy](#anatomy)
-------------------

![Anatomy of a Button, including the label, leading visual, trailing visual, and trailing action](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-39-28220.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=39-28220&t=N4TXDzNBDXw8iRB3-4)

[Inactive buttons](#inactive-buttons)
-------------------------------------

![A Button that looks like a disabled primary Button, but it has a focus state](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3883-28384.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3883-28384&t=N4TXDzNBDXw8iRB3-4)

  

An inactive Button has styles that make the Button appear "muted". The style is the same for all Button variants.

An inactive Button is an accessible alternative to a disabled Button. They're intended to be used for buttons that are non-functional, but cannot be removed from the page.

Unlike a disabled Button, an inactive Button can respond to user input. For example, if a Button shows a tooltip when hovered or focused, or a Dialog when clicked.

If you need to use an inactive Button, it's best to have something else on the page that informs users about the issue that broke the Button's normal functionality. For example, showing a [global Banner](/product/ui-patterns/degraded-experiences/#global-system-notification) for service outages.

### [Ways an inactive Button should respond to user input](#ways-an-inactive-button-should-respond-to-user-input)

1.  **Show a Dialog on click:** When a user tries to activate an inactive the Button, open a [Dialog](/product/components/dialog/) that explains why the action cannot be completed and give them a path forward if possible. It is required to provide some kind of feedback when a user clicks a Button.
2.  **Show a tooltip on hover or focus:** Before a user tries to activate a non-functional control, a [Tooltip](/product/components/tooltip/) with additional context may be displayed on hover or focus. It is _not_ required to respond to hover and focus.

[Best practices](#best-practices)
---------------------------------

### [Primary variant](#primary-variant)

Only use one primary Button on a page, whenever possible, to indicate its emphasis relative to other actions.

### [General](#general)

Do

![A Button with no line breaks](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3883-28576.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3883-28576&t=N4TXDzNBDXw8iRB3-4)

Keep Button labels succinct with no line breaks.

Don’t

![A Button with a line break](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3883-28787.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3883-28787&t=N4TXDzNBDXw8iRB3-4)

Buttons should never contain line breaks and lose their Button shape.

Do

![A Button using sentance case](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3883-28804.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3883-28804&t=N4TXDzNBDXw8iRB3-4)

Use sentence case for labels.

Don’t

![A Button with text in all caps](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3883-28830.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3883-28830&t=N4TXDzNBDXw8iRB3-4)

Don't use all-caps or other text formats.

Do

![A Button showing :focus state](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3883-28840.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3883-28840&t=N4TXDzNBDXw8iRB3-4)

Show focus styles on keyboard :focus

Don’t

![A Button with the default :focus styles removed](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3883-28876.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3883-28876&t=OIceMocYMRq1FN7G-4)

Don't remove default Button :focus styles.

Do

![Primary Button placed at the end of the ButtonGroup](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3883-28843.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3883-28843&t=N4TXDzNBDXw8iRB3-4)

Do place primary buttons at the end of a ButtonGroup

Don’t

![Primary Button placed at the start of the ButtonGroup](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3883-28919.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3883-28919&t=OIceMocYMRq1FN7G-4)

Don't place primary buttons at the start of a ButtonGroup

Do

![A primary Button next to a secondary Button](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3883-28934.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3883-28934&t=OIceMocYMRq1FN7G-4)

Use a primary Button with a secondary Button

Don’t

![Multiple primary buttons placed together](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3883-28938.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3883-28938&t=OIceMocYMRq1FN7G-4)

Don't place multiple primary buttons together

### [Selections](#selections)

Buttons are commonly used to show a choice within a [SelectPanel](/product/components/select-panel/) or [ActionMenu](/product/components/action-menu/). In such instances, they are frequently paired with an internal or external label.

![Two examples of dropdown buttons are shown. The left one has a label 'Visibility: Everybody' and is marked as 'Internal label'. The right one has an external label 'Visibility' above the Button and a internal label 'Everybody', and is marked as 'External Label'.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3883-29009.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3883-29009&t=OIceMocYMRq1FN7G-4)

When dealing with multiple selections, it's essential to maintain clarity regarding the total selection at all times. We suggest showing the value directly within the Button. However, in scenarios where multiple items are selected, transitioning to a format such as `2 selected` is advisable.

Do

![Button with label 'Labels: 2 selected'](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3883-34344.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3883-34344&t=OIceMocYMRq1FN7G-4)

Use the '2 selected' format when multiple items are selected

Don’t

![Button with label 'Labels: feature-request,bu...'](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-3883-34388.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=3883-34388&t=OIceMocYMRq1FN7G-4)

Don't comma seperate multiple selections
