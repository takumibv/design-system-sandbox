# get_component_usage_guidelines

- args: `{"name":"DataTable"}`
- isError: false
- ms: 354
- chars: 13596

---

Here are the usage guidelines for the `DataTable` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [DataTable](/product/components/data-table/)
4.  [Guidelines](/product/components/data-table/guidelines/)

DataTable
=========

DataTable is a 2-dimensional data structure where each row is an item, and each column is a data point about the item.

Page navigation navigation
--------------------------

*   [Overview](/product/components/data-table/)
*   [Guidelines](/product/components/data-table/guidelines/)
*   [Accessibility](/product/components/data-table/accessibility/)

More items

[Anatomy](#anatomy)
-------------------

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-113442.png&w=1920&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-113442&t=OIceMocYMRq1FN7G-4)

### [Table header](#table-header)

The table header shows contextual information about the table and render controls that affect the table.

*   **Title:** A concise label that describes the table and its contents
*   **Subtitle:** A brief description to adds more context for the table when the title alone is not enough
*   **Actions:** Controls that affect the entire table
*   **Filter:** An input used to filter table data to make it easier for the user to focus only on the rows relevant to their task. Even though the filter affects the entire table, it's not considered an "action".

### [Column headers](#column-headers)

A very short label that describes the data in the column.

Column headers are buttons that sort rows by the column data in ascending or descending order. Sort functionality may be disabled on a column-by-column basis.

The column that contains row actions does not have a visible column header.

### [Row headers](#row-headers)

A row header identifies the item being represented in the row. They are typically the first cell in the row, and are visually distinct from the other cells in the row.

### [Row actions](#row-actions)

Actions that affect the item represented in the row.

### [Data cells](#data-cells)

The data for each row that is described by its corresponding column header and optional row header.

### [Pagination footer](#pagination-footer)

The pagination footer shows the user where they are in relation to the total number of rows and provides controls for navigating all rows.

[Usage](#usage)
---------------

### [When to use a DataTable](#when-to-use-a-datatable)

*   To navigate a lot of information at once and to make it easy to compare data points between rows or columns
*   If the data is easy to understand when all data points are displayed in a flat hierarchy

### [When to use something else](#when-to-use-something-else)

#### [Use a list or something else](#use-a-list-or-something-else)

*   When there are columns where the cells will usually be empty
*   If the data is easier to understand with grouping and hierarchy (sections, headings, subheadings, etc.)
*   When rows and columns are only a means of layout
*   For data with longform content such as paragraphs or long lists

#### [Use a data grid](#use-a-data-grid)

*   If the primary purpose is to edit or otherwise interact with the cells (like a spreadsheet)
*   If rows or columns support some kind of user interaction

### [Best practices](#best-practices)

#### [Order rows intuitively](#order-rows-intuitively)

Data should be initially rendered in an intuitive order. For example, starting with the most recently created items.

By default, sort alphabetically by the first column's content. Rows will be re-ordered as the user updates the sort parameters

#### [Minimize the number of columns](#minimize-the-number-of-columns)

It's easier to scan many rows than it is to scan many columns. Consider swapping columns and rows when it's unlikely that there will ever be more rows than columns.

#### [Adapt column widths when necessary](#adapt-column-widths-when-necessary)

Use the column width options to appropriately size the columns depending on the content and the available horizontal space.

#### [Keep column headers short](#keep-column-headers-short)

Column headers are short labels used to define the kind of data that is shown in that column.

#### [Keep cell content concise](#keep-cell-content-concise)

Cells should represent data in the shortest possible format. This makes the table easier to scan, and preserves horizontal space.

#### [Don't use a single column to show multiple pieces of data](#dont-use-a-single-column-to-show-multiple-pieces-of-data)

The column header should accurately represent the data point rendered in the column's cells. It would also be unclear which data point is being used when sorting.

#### [Make numbers easier to compare](#make-numbers-easier-to-compare)

Right-align numeric values and use the `tabular-num` [font variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) when possible.

#### [Avoid wrapping or truncation of cell content as much as possible](#avoid-wrapping-or-truncation-of-cell-content-as-much-as-possible)

Ideally, the cell content is very short and the column will be wide enough to accommodate its content. In cases where it's not possible to fit the content, you may wrap or truncate the content.

Cells that are likely to contain long strings may choose to wrap the content. This is the preferred way to accommodate long content because it doesn't hide the content.

Content truncation is available as a last resort when column widths are set. The full content may be exposed in a tooltip.

#### [By default, leave empty cells blank](#by-default-leave-empty-cells-blank)

You may show a message to explain an absence of data. Just don't use a character like “x” or “-”. It creates a weird experience for assistive technologies like screen readers.

#### [Use “skeleton” placeholders to indicate loading content](#use-skeleton-placeholders-to-indicate-loading-content)

The placeholder should match the real content as closely as possible.Use the following properties to adjust the size and alignment of the placeholder:

*   column width
*   alignment
*   whether or not there is a leading visual

Don't worry about whether the text wraps. Ideally, the height of the cell will not change once the data is loaded. However, it wouldn't be possible to know how many lines of text the content wraps to.

#### [Use pagination to accommodate tables with a large dataset](#use-pagination-to-accommodate-tables-with-a-large-dataset)

By paginating, the user can focus on segments of a large dataset without being overwhelmed. Pagination also helps with performance by reducing the amount of data to be downloaded and the amount of content that needs to be rendered.

#### [Don't put too many or too few rows per page](#dont-put-too-many-or-too-few-rows-per-page)

If page length is too short, it would be annoying to browse the data in small segments. If page length is too long, users could get lost or overwhelmed.

The following factors influence what the ideal page length would be for your use-case:

*   Whether rows can be filtered
*   Number of columns
*   Visual complexity of the rendered cells
*   Amount of context needed when reviewing the data

These factors make it difficult to recommend an “ideal” page size for all use cases, but 20 rows is a good place to start.

#### [Communicate when the table has no data to show](#communicate-when-the-table-has-no-data-to-show)

Show a `Blankslate` component in place of the table

#### [Consider small screens](#consider-small-screens)

Some strategies for adapting the table for narrow viewports include:

*   Use the column width options
*   Remove less important columns
*   Scroll horizontally

### [Do's and Don'ts](#dos-and-donts)

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-113596.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-113596&t=OIceMocYMRq1FN7G-4)

Use a DataTable for data in a flat hierarchical structure

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-115717.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-115717&t=OIceMocYMRq1FN7G-4)

Don't use a DataTable for information that has hierarchical relationships

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-113725.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-113725&t=OIceMocYMRq1FN7G-4)

Restrict the data in a column to represent one type of data

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-5207-2295.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=5207-2295&t=Cg5Bn6Vn7YN7ebq0-4)

Don't group data in a column cell that isn't described by the column header

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-113854.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-113854&t=OIceMocYMRq1FN7G-4)

Leave the cell blank (preferred) or show text that explains the absence

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-115937.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-115937&t=OIceMocYMRq1FN7G-4)

Don't show a character, icon, or emoji to indicate a cell is empty

Do

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-113945.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-113945&t=OIceMocYMRq1FN7G-4)

Allow the title in the page header to act as a table title when appropriate

Don’t

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-5207-2930.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=5207-2930&t=Cg5Bn6Vn7YN7ebq0-4)

Don't repeat or rephrase the title in the page header as the table title

[Column widths](#column-widths)
-------------------------------

### [Grow (default)](#grow-default)

Stretch to fill available space, and min width is the width of the widest cell in the column. This is the same behavior as a CSS grid column with the value `minmax(auto, 1fr)`.

May have a min and max width constraint.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-114185.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-114185&t=OIceMocYMRq1FN7G-4)

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-115465.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-115465&t=OIceMocYMRq1FN7G-4)

### [Grow or collapse](#grow-or-collapse)

Stretch to fill available space in the parent **or shrink** to fit in the available space in the parent.

May have a min and max width constraint. Without a min width constraint, the column could collapse to a width of 0px.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-114269.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-114269&t=OIceMocYMRq1FN7G-4)

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-115549.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-115549&t=OIceMocYMRq1FN7G-4)

### [Auto](#auto)

The column is the width of its widest cell. Not intended for use with columns whose content length varies a lot because a layout shift will occur when the content changes.

May have a min and max width constraint.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-114353.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-114353&t=OIceMocYMRq1FN7G-4)

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-115633.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-115633&t=OIceMocYMRq1FN7G-4)

### [Explicit width](#explicit-width)

Will be exactly that width and will not grow or shrink to fill the parent.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-114437.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-114437&t=OIceMocYMRq1FN7G-4)

### [Action column](#action-column)

The action column would not accept a width. Its min-width would be the width of the actions.

### [Filling available space](#filling-available-space)

If all columns have width constraints set and the row doesn't fill the table container, the difference is added to the width of the last column.

[Filtering](#filtering)
-----------------------

A [filter input (internal)](https://ui.githubapp.com/storybook/?path=/story/reusable-features-filter-examples--default) is used to write a query and only show rows that match that query.

![](/_next/image/?url=%2Fimages%2Ffigma%2FYlBTqHTbdRwYQt0bfIHvGw-1440-114957.png&w=1080&q=75)

[Edit in Figma](https://www.figma.com/design/YlBTqHTbdRwYQt0bfIHvGw/Interface-guidelines?node-id=1440-114957&t=OIceMocYMRq1FN7G-4)
