<!-- tool: get_component_usage_guidelines / args: {"name":"Banner"} / at: 2026-11-05T10:55:25.275Z / isError: false -->

Here are the usage guidelines for the `Banner` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [Banner](/product/components/banner/)
4.  [Guidelines](/product/components/banner/guidelines/)

Banner
======

Banner is used to highlight important information.

Page navigation navigation
--------------------------

*   [Overview](/product/components/banner/)
*   [Guidelines](/product/components/banner/guidelines/)
*   [Accessibility](/product/components/banner/accessibility/)

More items

Banner has two main uses:

1.  Highlight important information.
2.  Provide feedback after a user action.

### [Best Practices](#best-practices)

*   Use banners sparingly and only when necessary. Banners can disrupt the user experience and should only be used when and where relevant.
*   Keep the message concise and direct. Don't use heading styling or multiple type sizes in banners, rely on the default paragraph size and use the title when appropriate.
*   Do not display more than one banner (full-width or otherwise) on a single page at the same time. This prevents stacking issues, avoids confusing user experiences, and helps reduce [alert fatigue](https://www.nngroup.com/videos/alert-fatigue-user-interfaces/).

[Anatomy](#anatomy)
-------------------

![Anatomy of a Banner, including the message, title, icon, dismiss button, primary, and secondary action](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4792-6413.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4792-6413&t=zmey9LcwAIcwaM7N-4)

[Options](#options)
-------------------

### [Variant](#variant)

#### [Critical](#critical)

Use for critical errors or destructive actions. For example: form validation errors, and repo deletion confirmation

![Text within a box that has a light red outline and a lighter red background. There is a vibrant red stop icon with an exclamation point inside that comes before the text within the Banner.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4792-6619.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4792-6619&t=zmey9LcwAIcwaM7N-4)

#### [Warning](#warning)

Alerts users to potential issues. For example: connectivity problems or possibly hidden items due to active filters.

![Text within a box that has a yellow outline and a lighter yellow background. There is a dark yellow triangle icon with an exclamation point inside that comes before the text within the Banner.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4792-6630.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4792-6630&t=zmey9LcwAIcwaM7N-4)

#### [Success](#success)

Signals successful actions. For example, a successful issue transfer when the user is not brought to the new page.

Only use success messages if the success is not easily apparent in the UI.

![Text within a box that has a green outline and a lighter green background. There is a vibrant green circle icon with a check icon inside the circle that comes before the text within the Banner.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4792-6641.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4792-6641&t=zmey9LcwAIcwaM7N-4)

#### [Info](#info)

Provides non-critical context. For example, feature prompts or ongoing processes.

![Text within a box that has a light blue outline and a lighter blue background. There is a vibrant blue circle icon with the letter i inside that comes before the text within the Banner.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4792-6652.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4792-6652&t=zmey9LcwAIcwaM7N-4)

#### [Upsell](#upsell)

Informs users about a feature that can be enabled by upgrading their plan.

![Text within a box that has a light purple outline and a lighter purple background. There is a vibrant purple computer icon that comes before the text within the Banner.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4792-6663.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4792-6663&t=zmey9LcwAIcwaM7N-4)

### [Title](#title)

Use a title to concisely present the topic of the Banner when the message of the Banner is complex and too long to scan. Titles are required and act as a semantic page heading but can be visually hidden if the body text of the Banner is short and easily scannable.

Use the built-in accessibility annotations in the Figma components to define the heading level and text relevant to its context.

![Banner without title and Banner with title](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4792-6674.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4792-6674&t=zmey9LcwAIcwaM7N-4)

### [Dismissable](#dismissable)

#### [Dismiss button](#dismiss-button)

Banners with an `onDismiss` property automatically show a dismiss button. This should be used for Banners that inform about something that the user can not solve. For example issues with the organization they are part of or informational Banners. When it makes sense, the choice to dismiss the Banner should be stored and the Banner should not be shown again.

Use the following as a guideline:

*   If you're on a page in which you can do other tasks, and the Banner is not blocking / does not have to be addressed, then you should be able to have a close button.
*   If accidental closure of the Banner would leave the user confused or missing something critical, it should not have a close button.

![Banners with a dismiss button](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4792-6707.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4792-6707&t=zmey9LcwAIcwaM7N-4)

#### [Exception: Critical Banner](#exception-critical-banner)

Critical banners communicate an error which the user must resolve in order for the banner to disappear.

In certain cases, the banner may be dismissible when notifying the user of a failed action. If used to warn about destructive actions, the banner should also not be dismissible.

![a critical Banner with no actions and one with a single action](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4792-6746.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4792-6746&t=zmey9LcwAIcwaM7N-4)

### [Actions](#actions)

A maximum of 2 actions can be added to a Banner. Whenever possible it is recommended to only add a single action to better direct the users attention.

For Banners with a single action, you can choose between adding a primary or secondary action depending on how much attention you want to draw to the action.

For Banners with two actions, one of them must be primary and the other must be secondary. In this case, use the primary action for the recommended action. For example, the primary action enables a feature and the secondary action links more information.

![trailing actions on a Banner](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4792-6785.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4792-6785&t=zmey9LcwAIcwaM7N-4)

### [Icon](#icon)

Icons match the Banner [variant](#variant) and can't be disabled, but custom icons can be used for `info` and `upsell`.

![Three Banners with leading icons. Success Banner has its standard circle and check icon, upsell Banner has a custom computer icon, and the info Banner has a custom shield icon with a keyhole inside of the lock.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4792-6846.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4792-6846&t=zmey9LcwAIcwaM7N-4)

[Layouts](#layouts)
-------------------

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4792-6081.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4792-6081&t=zmey9LcwAIcwaM7N-4)

1.  Single-line Banners have actions and dismiss buttons on the same line.
2.  Banners with titles align dismiss buttons to the top right.
3.  Banners with a title but no dismiss button will have the actions aligned to the top right corner
4.  Complex Banners show actions left-aligned below the body text.

### [Responsive Design](#responsive-design)

![One Banner at full width, with all of the content in one row, the second Banner is shrunk to a smaller width, the icon, wrapped text, and dismiss button all in one row, with the action item in the second row.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-4792-6300.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=4792-6300&t=zmey9LcwAIcwaM7N-4)

Large screens adjust Banner layouts. Small screens always use stacked layouts.

### [Position](#position)

Place Banners near the relevant section or above the page headline for global relevance. In Dialogs, Banners appear below the header.

### [Flush](#flush)

Flush banners are designed specifically for use within confined spaces, such as dialogs, tables, cards, or boxes where available space is limited. **Never use flush banners at the top of a page or in layouts with significant empty space**, as this can create confusion with page-level or system-wide announcements and negatively impact the overall user experience.

Do

![Do: A banner sitting flush at the left, top and right edge within a dialog.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-5299-3779.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=5299-3779&t=LPQsqDGHur9GWYnX-4)

Use flush banners when placed within small dialogs, tables, cards or boxes where space is limited.

Don’t

![Don't: A banner sitting flush at the left, top and right edge at the top level of a page.](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-5299-3778.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=5299-3778&t=LPQsqDGHur9GWYnX-4)

Never use flush banners at the top of a page or when a lot of space is available.
