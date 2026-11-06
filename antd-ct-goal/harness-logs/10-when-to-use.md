# antd info <C> --detail --format json の whenToUse 抜粋（antd 6.7.0 / CLI 6.7.0）

## Layout

(none)

## Menu

Navigation is an important part of any website, as a good navigation setup allows users to move around the site quickly and efficiently. Ant Design offers two navigation options: top and side. Top navigation provides all the categories and functions of the website. Side navigation provides the multi-level structure of the website.

More layouts with navigation: [Layout](/components/layout).

## Tabs

Ant Design has 3 types of Tabs for different situations.

- Card Tabs: for managing too many closeable views.
- Normal Tabs: for functional aspects of a page.
- [Radio.Button](/components/radio/#radio-demo-radiobutton): for secondary tabs.

## Segmented

- When displaying multiple options and user can select a single option;
- When switching the selected option, the content of the associated area changes.

## Card

A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.

## List

A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.

<!-- prettier-ignore -->
:::warning{title=Deprecated Notice}
List component has been deprecated. Will be removed in the next major version. Please use [Listy](/components/listy) instead. See [How do I migrate off List?](#faq-migrate-from-list).
:::

## Table

- To display a collection of structured data.
- To sort, search, paginate, filter data.

## Descriptions

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
  {
    key: '3',
    label: 'Live',
    children: <p>Hangzhou, Zhejiang</p>,
  },
  {
    key: '4',
    label: 'Remark',
    children: <p>empty</p>,
  },
  {
    key: '5',
    label: 'Address',
    children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
  },
];

<Descriptions title="User Info" items={items} />;

// works when <5.8.0 , deprecated when >=5.8.0 🙅🏻‍♀️

<Descriptions title="User Info">
  <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
  <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
  <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
  <Descriptions.Item label="Remark">empty</Descriptions.Item>
  <Descriptions.Item label="Address">
    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
  </Descriptions.Item>
</Descriptions>;
```

## Avatar

(none)

## Tag

- It can be used to tag by dimension or property.

- When categorizing.

## Badge

Badge normally appears in proximity to notifications or user avatars with eye-catching appeal, typically displaying unread messages count.

## Alert

- When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.

## Result

Use when important operations need to inform the user to process the results and the feedback is more complicated.

## Empty

- When there is no data provided, display for friendly tips.
- User tutorial to create something in fresh new situation.

## Skeleton

- When a resource needs long time to load.
- When the component contains lots of information, such as List or Card.
- Only works when loading data for the first time.
- Could be replaced by Spin in any situation, but can provide a better user experience.

## Spin

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

## Popconfirm

A simple and compact dialog used for asking for user confirmation.

The difference with the `confirm` modal dialog is that it's more lightweight than the static popped full-screen confirm modal.

## Modal

When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use `Modal` to create a new floating layer over the current page to get user feedback or display information.

Additionally, if you need to show a simple confirmation dialog, you can use [`App.useApp`](/components/app/) hooks.

## Message

- To provide feedback such as success, warning, error etc.
- A message is displayed at top and center and will be dismissed automatically, as a non-interrupting light-weighted prompt.

## Notification

To display a notification message at any of the four corners of the viewport. Typically it can be used in the following cases:

- A notification with complex content.
- A notification providing a feedback based on the user interaction. Or it may show some details about upcoming steps the user may have to follow.
- A notification that is pushed by the application.

## Form

(none)

## Select

- A dropdown menu for displaying choices - an elegant alternative to the native `<select>` element.
- Utilizing [Radio](/components/radio/) is recommended when there are fewer total options (less than 5).
- You probably need [AutoComplete](/components/auto-complete/) if you're looking for an input box that can be typed or selected.

## Switch

- If you need to represent the switching between two states or on-off state.
- The difference between `Switch` and `Checkbox` is that `Switch` will trigger a state change directly when you toggle it, while `Checkbox` is generally used for state marking, which should work in conjunction with submit operation.

## Radio

- Used to select a single state from multiple options.
- The difference from Select is that Radio is visible to the user and can facilitate the comparison of choice, which means there shouldn't be too many of them.

```tsx
// When use Radio.Group, recommended ✅
return (
  <Radio.Group
    value={value}
    options={[
      { value: 1, label: 'A' },
      { value: 2, label: 'B' },
      { value: 3, label: 'C' },
    ]}
  />
);

// Not recommended 🙅🏼‍♀️
return (
  <Radio.Group value={value}>
    <Radio value={1}>A</Radio>
    <Radio value={2}>B</Radio>
    <Radio value={3}>C</Radio>
  </Radio.Group>
);
```

## Input

- A user input in a form field is needed.
- A search input is required.

## Drawer

A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. It contains a set of information or actions. Since the user can interact with the Drawer without leaving the current page, tasks can be achieved more efficiently within the same context.

- Use a Form to create or edit a set of information.
- Processing subtasks. When subtasks are too heavy for a Popover and we still want to keep the subtasks in the context of the main task, Drawer comes very handy.
- When the same Form is needed in multiple places.

> Notes for developers
>
> Since the `5.17.0`, we provided the `loading` prop by the Spin. However, since the `5.18.0` version, we have fixed this design error and replaced the Spin with the Skeleton, and also modified the type of `loading` prop, which can only accept `boolean` type.

## Dropdown

When there are more than a few options to choose from, you can wrap them in a `Dropdown`. By hovering or clicking on the trigger, a dropdown menu will appear, which allows you to choose an option and execute the relevant action.

## Steps

When a given task is complicated or has a certain sequence in the series of subtasks, we can decompose it into several steps to make things easier.

## Timeline

- When a series of information needs to be ordered by time (ascending or descending).
- When you need a timeline to make a visual connection.

## Statistic

- When want to highlight some data.
- When want to display statistic data with description.

## Typography

- When you need to display a title or paragraph contents in Articles/Blogs/Notes.
- When you need copyable/editable/ellipsis texts.

## Flex

- Good for setting spacing between elements.
- Suitable for setting various horizontal and vertical alignments.

### Difference with Space component

- Space is used to set the spacing between inline elements. It will add a wrapper element for each child element for inline alignment. Suitable for equidistant arrangement of multiple child elements in rows and columns.
- Flex is used to set the layout of block-level elements. It does not add a wrapper element. Suitable for layout of child elements in vertical or horizontal direction, and provides more flexibility and control.

## Space

- Avoid components clinging together and set a unified space.
- Use Space.Compact when child form components are compactly connected and the border is collapsed (After version `antd@4.24.0` Supported).

### Difference with Flex component

- Space is used to set the spacing between inline elements. It will add a wrapper element for each child element for inline alignment. Suitable for equidistant arrangement of multiple child elements in rows and columns.
- Flex is used to set the layout of block-level elements. It does not add a wrapper element. Suitable for layout of child elements in vertical or horizontal direction, and provides more flexibility and control.

## Collapse

- Can be used to group or hide complex regions to keep the page clean.
- `Accordion` is a special kind of `Collapse`, which allows only one panel to be expanded at a time.

## Divider

- Divide sections of an article.
- Divide inline text and links such as the operation column of table.

## Tooltip

- The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.
- To provide an explanation of a `button/text/operation`. It's often used instead of the HTML `title` attribute.

## Popover

A simple popup menu to provide extra information or operations.

Comparing with `Tooltip`, besides information `Popover` card can also provide action elements like links and buttons.

## App

- Provide reset styles based on `.ant-app` element.
- You could use static methods of `message/notification/Modal` from `useApp` without writing `contextHolder` manually.

## Tour

Use when you want to guide users through a product.

## Breadcrumb

- When the system has more than two layers in a hierarchy.
- When you need to inform the user of where they are.
- When the user may need to navigate back to a higher level.

## Button

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

## Grid

(none)
