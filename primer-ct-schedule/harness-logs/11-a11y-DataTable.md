# get_component_accessibility_guidelines

- args: `{"name":"DataTable"}`
- isError: false
- ms: 343
- chars: 15872

---

Here are the accessibility guidelines for the `DataTable` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [DataTable](/product/components/data-table/)
4.  [Accessibility](/product/components/data-table/accessibility/)

DataTable
=========

DataTable is a 2-dimensional data structure where each row is an item, and each column is a data point about the item.

Page navigation navigation
--------------------------

*   [Overview](/product/components/data-table/)
*   [Guidelines](/product/components/data-table/guidelines/)
*   [Accessibility](/product/components/data-table/accessibility/)

More items

[Labeling and describing the table](#labeling-and-describing-the-table)
-----------------------------------------------------------------------

The table must have a title, and can optionally have a subtitle to describe more context. If you encounter a case where there is enough context that the table doesn’t need a visible label, you may hide it so it’s only accessible to assistive technologies.

If you use the table header, the table's title and subtitle will automatically be associated with the table for assistive technologies.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-115048.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-115048&t=OIceMocYMRq1FN7G-4)

If your table's title exists somewhere else on the page (for example, in the PageHeader), then you must manually associate that contextual information with the table using ARIA.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-116228.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-116228&t=OIceMocYMRq1FN7G-4)

[Labeling actions](#labeling-actions)
-------------------------------------

The row header string will be prepended to the ARIA text of action buttons. For example, Download "`{row header}`", "Actions: `{row header}`"

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-114793.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-114793&t=OIceMocYMRq1FN7G-4)

To handle cases where the row header can be very long, we should give consumers the option to specify a shorter string to identify the rows. For example, if an issue title is used as the row header, we could use the issue number instead of the full issue title.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-114886.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-114886&t=OIceMocYMRq1FN7G-4)

[Pagination buttons](#pagination-buttons)
-----------------------------------------

The pagination control for a DataTable uses `button` elements, and not `a` elements. This is because activating the pagination control requests data, and does not have a corresponding URL to link to.

[Loading and sorting content](#loading-and-sorting-content)
-----------------------------------------------------------

It is important to ensure parity between what can be seen visually when a table is loading or sorting content and what is announced to assistive technology. This is provided by the DataTable component automatically, but must be considered if a custom loading solution is otherwise utilized. For loading content via a custom loading method, this also includes the initial loading period. An announcement should not be made if content is retrieved before 750ms.

[Accessibility and usability expectations](#accessibility-and-usability-expectations)
-------------------------------------------------------------------------------------

### [Presentation](#presentation)

#### [Cognition](#cognition)

*   The table headers and column or row headings must clearly convey the data contained in the table
*   Any active sorting should be clear, and allow people to easily understand how the data is being manipulated
*   The table's data should make it easy to navigate lots of information at once, and to compare data
*   Multiple pieces of data must be separated out between different cells
*   Numbers should be easy to compare, which can be achieved using sorting, as well as numeric font variants
*   Tables with large datasets should use pagination to help reduce the amount of data available at once

#### [Vision](#vision)

*   Should be an easy way to differentiate between rows
*   For all content in the `DataTable` component, it must have a color contrast ratio of at least 4.5:1
*   If using icons, for example to label row actions controls, they must have a color contrast ratio of at least 3:1 against the background color

#### [Mobility](#mobility)

*   Use pagination to reduce the number of rows rendered, helping reduce scroll effort
*   Buttons (e.g. for pagination and sorting) should have sufficient target size and spacing, and be sized with a target area of at least 24 by 24 CSS pixels
*   Focus must not move to content that is not visible, such as paginated rows or hidden multiple row actions

### [Adaptability](#adaptability)

*   Titles can be hidden visually but must be accessible to assistive technology
*   `DataTables` should adapt to smaller screens by using column width options, using functionality such as horizontal scrolling, to ensure that all of the content is still available
*   Make sure that component can be increased up to 200%, and any content remain visible, and is not clipped or hidden
*   When adding additional text spacing, make sure that the component's content can still be read in its entirety, and that the it is not clipped or hidden

### [Interaction](#interaction)

#### [Keyboard](#keyboard)

*   Ensure that all interactive controls in the table receive focus, and can be activated using only a keyboard
*   For the multiple row actions, there should be an easy way to dismiss the dropdown menus, as well as their associated tooltips and return to the trigger control, for example, using the "Escape" key
*   When viewing the component at narrow viewport widths, if horizontal scrolling is used to keep all content available, the table itself should receive focus, so that it can be scrolled using the arrow keys

### [Engineering for AT Compatibility](#engineering-for-at-compatibility)

#### [Screen reader](#screen-reader)

*   Appropriate roles for each part of the `DataTable` must be used:
    *   A `DataTable`'s table must have a role of `table`
    *   Each group of rows (e.g. the column headers or the main body of rows) must have a role of `rowgroup`
    *   Each row must have a role of `row`
    *   Each column header must have a role of `columnheader`
    *   Any row headers must have a role of `rowheader`
    *   Each data cell must have a role of `cell`
*   Each `DataTable` must have an accessible name to describe the data that is represented
*   For sortable columns, the `aria-sort` attribute must be applied to programmatically convey that the content can be sorted
*   Any subtitles should be programmatically related to the table using the `aria-describedby` attribute, to ensure that people using a screen reader can easily access additional context
*   When including actions for each row, the accessible name for the repeated controls must include sufficient context, so that people can easily determine which row/item the actions related to (e.g.)
*   When using pagination, the component must have an accessible name to provide context as to what the controls relate to
*   Pagination results must programmatically convey which page is currently active. This can be achieved using the `aria-current="true"` attribute
*   When navigating to a different page using the pagination controls, an ARIA live region must be used to inform people of the new data that has been displayed

#### [Speech recognition](#speech-recognition)

*   Ensure all actionable elements like buttons and filters have descriptive, visible labels that match or are included in their accessible names

[Built-in accessibility features](#built-in-accessibility-features)
-------------------------------------------------------------------

This component is rendered as a table, with the required row groupings, header, and cell roles provided automatically, using the HTML 5 table elements. Similarly, the required ARIA attributes, including `aria-sort` and `aria-current` attributes are also applied automatically, depending on the sort applied to the data, and the current item of the pagination component.

The `<DataTable>` itself is rendered as a `<table>` element, with the `columns` prop used to generate the column headers, which are marked up as `<th>` elements, which have an implicit role of `columnheader`.

Data provided using the `data` prop is then rendered inside of the table's `<tbody>` element, automatically populated in to rows, with each item of data marked up in a `<td>` element, which has an implicit role of `cell`.

This automated structure provides people with the semantics needed to understand the structure of the table. Using the HTML elements and their implicit roles also allows people using screen readers to use shortcuts to quickly navigate between content in the table.

### [`sortBy` attribute](#sortby-attribute)

When using the `columns` prop to populate the table's columns, the `sortBy` item can be used to automatically provide sorting for that column. Regardless of the sort used, the column will automatically be wrapped with a `<button>` element, which receives focus and can be used with a keyboard alone. When interacted with, the data will be sorted by that column, with an `aria-sort` attribute provided, to programmatically convey the way in which the data has been arranged.

### [Pagination component](#pagination-component)

When using the `<DataTable>` component's paginated rows, the relevant component is rendered, with `<button>` elements automatically provided for the "Previous", "Next", and page number controls. Each of the controls are supplemented with additional context in their accessible names, to help improve the usability of the pattern. As an example, each of the visible page number controls (e.g. "1", "2", etc.), are supplemented with the word "page", so that someone using a screen reader will hear, "Page 1, button".

Alongside this, the `aria-current` attribute is applied to the currently active pagination control. This allows people to understand which page they are currently on. When someone changes page, the results displayed information (e.g. "111-120 of 1000") is announced using an ARIA live region, to communicate the data that has been displayed on-screen.

[Implementation requirements](#implementation-requirements)
-----------------------------------------------------------

### [Providing accessible names](#providing-accessible-names)

It's important that the `<DataTable>` is provided with a succinct accessible name, to describe the data presented. This is because people using a screen reader will hear this name when navigating to the table, and will be able to use it to understand whether the data is relevant, before having to navigate through the table.

To provide an accessible name for the table, the best way to do this, is inside a `<Table.Container>`, to provide a `<Table.Title>`, containing the heading describing the table's data. This will be presented visibly as a heading above the table. This element should be given an `id` attribute, which can then be referenced from the `<DataTable>` component's `aria-labelledby` prop. Doing so uses the heading as the accessible name for the rendered table, as it creates a programmatic link between the elements.

### [Accessible names for actions](#accessible-names-for-actions)

Accessible names also need to be provided for actions in the table. When using a table action, single row action, or multiple row actions, ensure that these controls have accessible names, particularly if they are labelled using only icons. In these cases, the accessible name can be provided using the `aria-label` prop.

It is important that the accessible name is specific to each row. This is because people should hear context for the control they are interacting with As an example, if you provide a delete action for each row, make sure that the accessible name for that delete action includes some row specific information, like "Delete test repository" instead of just "Delete". This way, people will be able to understand the data to which the action relates to.

The following code snippet contains an example of rendering an icon button, using the row's name to provide additional context in the control's accessible name.

    renderCell: row => {
      return (
        <IconButton
          aria-label={`Download: ${row.name}`}
          title={`Download: ${row.name}`}
          icon={DownloadIcon}
          variant="invisible"
          onClick={() => {
            alert(`Fake downloading ${row.name}`)
          }}
        />
      )
    }
    

### [Using row headers](#using-row-headers)

Another important part of the `DataTable` component's semantic structure is the `rowheader`. When data has a unique value, to which other data in the same row relates to, this should be marked as a `rowheader`. Doing this can help people using assistive technologies to better understand the relationship between the data.

To set a column's data as the row header, when providing the column structure, set `rowHeader: true`, as demonstrated in the following example:

    <DataTable
      aria-labelledby="repositories-default"
      data={data}
      columns={[
        {
          header: 'Repository',
          field: 'name',
          rowHeader: true,
        }
        …
    

### [Maintaining the page's hierarchy with the table title](#maintaining-the-pages-hierarchy-with-the-table-title)

When providing a `<Table.Title>` to label the table, ensure that when rendered, this heading will maintain the hierarchy of the page.

It's important that heading levels aren't skipped, and are provided in a linear way, to convey the structure of the page.

To do this, use the `as` prop on the component to set the HTML heading element that the table's title should be rendered as.

[How to test the component](#how-to-test-the-component)
-------------------------------------------------------

### [Integration tests](#integration-tests)

*   When viewing the component at narrow viewports, all content must remain available and not be completely hidden or lost
*   The heading structure must not skip any levels, and must convey the hierarchy of content in the page

### [Component tests](#component-tests)

*   The `DataTable` component is exposed as a table element (`<table>`) with a role of table, and an appropriate accessible name
*   The column headers are grouped in a container which has a role of `rowgroup`
*   Each row has a role of `row`
*   Each column header has a role of `columnheader`
*   Row headers have a role of `rowheader`
*   Each data cell has a role of `cell`
*   All interactive controls have an accessible name
*   Sortable columns' column headers are marked up as a `<button>`, and when the sort is applied, have an `aria-sort` attribute with either an `ascending` or `descending` value
*   The selected pagination page control has an `aria-current="true"` attribute
*   Each interactive control meets the minimum target size requirement of 24 by 24 CSS pixels
*   All interactive controls receive focus
*   All content has a color contrast ratio of at least 4.5:1
*   At smaller viewports, such as 320 by 256 CSS pixels, when the table uses horizontal scrolling, it has a wrapper which can receive focus, and also has an accessible name
