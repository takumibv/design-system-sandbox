### Layout
### Typography
- When you need to display a title or paragraph contents in Articles/Blogs/Notes.
- When you need copyable/editable/ellipsis texts.
### Button
A button means an operation (or a series of operations). Clicking a button will trigger its corresponding business logic.
In Ant Design we provide 5 types of button.
- 🔵 Primary button: used for the main action, there can be at most one primary button in a section.
- ⚪️ Default button: used for a series of actions without priority.
- 😶 Dashed button: commonly used for adding more actions.
- 🔤 Text button: used for the most secondary action.
- 🔗 Link button: used for external links.
And 4 other properties additionally.
- 🔴 `danger`: used for actions of risk, like deletion or authorization.
- 👻 `ghost`: used in situations with complex background, home pages usually.
- 🚫 `disabled`: used when actions are not available.
- 🔃 `loading`: adds a loading spinner in button, avoids multiple submits too.
### Card
A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.
### Avatar
### Tag
- It can be used to tag by dimension or property.
- When categorizing.
### Badge
Badge normally appears in proximity to notifications or user avatars with eye-catching appeal, typically displaying unread messages count.
### Alert
- When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.
### Result
Use when important operations need to inform the user to process the results and the feedback is more complicated.
### Empty
- When there is no data provided, display for friendly tips.
- User tutorial to create something in fresh new situation.
### Spin
When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.
### Skeleton
- When a resource needs long time to load.
- When the component contains lots of information, such as List or Card.
- Only works when loading data for the first time.
- Could be replaced by Spin in any situation, but can provide a better user experience.
### Breadcrumb
- When the system has more than two layers in a hierarchy.
- When you need to inform the user of where they are.
- When the user may need to navigate back to a higher level.
### Table
- To display a collection of structured data.
- To sort, search, paginate, filter data.
### List
A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.
<!-- prettier-ignore -->
:::warning{title=Deprecated Notice}
List component has been deprecated. Will be removed in the next major version. Please use [Listy](/components/listy) instead. See [How do I migrate off List?](#faq-migrate-from-list).
:::
### Modal
When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use `Modal` to create a new floating layer over the current page to get user feedback or display information.
Additionally, if you need to show a simple confirmation dialog, you can use [`App.useApp`](/components/app/) hooks.
### Popconfirm
A simple and compact dialog used for asking for user confirmation.
The difference with the `confirm` modal dialog is that it's more lightweight than the static popped full-screen confirm modal.
### Form
### Input
- A user input in a form field is needed.
- A search input is required.
### Select
- A dropdown menu for displaying choices - an elegant alternative to the native `<select>` element.
- Utilizing [Radio](/components/radio/) is recommended when there are fewer total options (less than 5).
- You probably need [AutoComplete](/components/auto-complete/) if you're looking for an input box that can be typed or selected.
### Checkbox
- Used for selecting multiple values from several options.
- If you use only one checkbox, it is the same as using Switch to toggle between two states. The difference is that Switch will trigger the state change directly, but Checkbox just marks the state as changed and this needs to be submitted.
### Switch
- If you need to represent the switching between two states or on-off state.
- The difference between `Switch` and `Checkbox` is that `Switch` will trigger a state change directly when you toggle it, while `Checkbox` is generally used for state marking, which should work in conjunction with submit operation.
### Message
- To provide feedback such as success, warning, error etc.
- A message is displayed at top and center and will be dismissed automatically, as a non-interrupting light-weighted prompt.
### Notification
To display a notification message at any of the four corners of the viewport. Typically it can be used in the following cases:
- A notification with complex content.
- A notification providing a feedback based on the user interaction. Or it may show some details about upcoming steps the user may have to follow.
- A notification that is pushed by the application.
### App
- Provide reset styles based on `.ant-app` element.
- You could use static methods of `message/notification/Modal` from `useApp` without writing `contextHolder` manually.
### Flex
- Good for setting spacing between elements.
- Suitable for setting various horizontal and vertical alignments.
### Difference with Space component
- Space is used to set the spacing between inline elements. It will add a wrapper element for each child element for inline alignment. Suitable for equidistant arrangement of multiple child elements in rows and columns.
- Flex is used to set the layout of block-level elements. It does not add a wrapper element. Suitable for layout of child elements in vertical or horizontal direction, and provides more flexibility and control.
### Space
- Avoid components clinging together and set a unified space.
- Use Space.Compact when child form components are compactly connected and the border is collapsed (After version `antd@4.24.0` Supported).
### Difference with Flex component
- Space is used to set the spacing between inline elements. It will add a wrapper element for each child element for inline alignment. Suitable for equidistant arrangement of multiple child elements in rows and columns.
- Flex is used to set the layout of block-level elements. It does not add a wrapper element. Suitable for layout of child elements in vertical or horizontal direction, and provides more flexibility and control.
### Divider
- Divide sections of an article.
- Divide inline text and links such as the operation column of table.
### Statistic
- When want to highlight some data.
- When want to display statistic data with description.
### Grid
### ConfigProvider
### Descriptions
Commonly displayed on the details page.
```tsx | pure
// works when >= 5.8.0, recommended ✅
const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: <p>Zhou Maomao</p>,
  },
  {
    key: '2',
    label: 'Telephone',
    children: <p>1810000000</p>,
  },
### Segmented
- When displaying multiple options and user can select a single option;
- When switching the selected option, the content of the associated area changes.
