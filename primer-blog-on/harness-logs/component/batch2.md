---
name: DataTable
description: "DataTable is a 2-dimensional data structure where each row is an item, and each column is a data point about the item."
import: "@primer/react/experimental"
docs: https://primer.style/product/components/data-table
a11y_docs: https://primer.style/product/components/data-table/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/DataTable
storybook: https://primer.style/react/storybook/?path=/story/components-data-table
---

# DataTable

DataTable is a 2-dimensional data structure where each row is an item, and each column is a data point about the item.

## Usage

```tsx
import { DataTable } from '@primer/react/experimental'
```

### Example

```tsx
() => (
  <Table.Container>
    <Table.Title as="h2" id="repositories">
      Repositories
    </Table.Title>
    <Table.Subtitle as="p" id="repositories-subtitle">
      A subtitle could appear here to give extra context to the data.
    </Table.Subtitle>
    <DataTable
      aria-labelledby="repositories"
      aria-describedby="repositories-subtitle"
      data={data}
      columns={[
        {
          header: 'Repository',
          field: 'name',
          rowHeader: true,
        },
        {
          header: 'Type',
          field: 'type',
          renderCell: (row) => {
            return <Label>{uppercase(row.type)}</Label>
          },
        },
        {
          header: 'Updated',
          field: 'updatedAt',
          renderCell: (row) => {
            return <RelativeTime date={new Date(row.updatedAt)} />
          },
        },
        {
          header: 'Dependabot',
          field: 'securityFeatures.dependabot',
          renderCell: (row) => {
            return row.securityFeatures.dependabot.length > 0 ? (
              <LabelGroup>
                {row.securityFeatures.dependabot.map((feature) => {
                  return <Label key={feature}>{uppercase(feature)}</Label>
                })}
              </LabelGroup>
            ) : null
          },
        },
        {
          header: 'Code scanning',
          field: 'securityFeatures.codeScanning',
          renderCell: (row) => {
            return row.securityFeatures.codeScanning.length > 0 ? (
              <LabelGroup>
                {row.securityFeatures.codeScanning.map((feature) => {
                  return <Label key={feature}>{uppercase(feature)}</Label>
                })}
              </LabelGroup>
            ) : null
          },
        },
      ]}
    />
  </Table.Container>
)
```

## Props

```yaml
DataTable:
  aria-describedby: { type: "string", description: "Provide an id to an element which uniquely describes this table" }
  aria-labelledby: { type: "string", description: "Provide an id to an element which uniquely labels this table" }
  data: { type: "Array<Data | DataTableRowGroup<Data>>", description: "Provide rows, row groups, or a mixture of both to render in the table, in display order." }
  columns: { type: "Array<Column<Data>>", description: "Provide the columns for the table and the fields in `data` to which they correspond" }
  getRowId: { type: "(row: Data) => DataTableRowId", description: "Provide a stable row ID. Defaults to row.id. DataTableRowId is an exported string | number type." }
  rowSelection: { type: "boolean", description: "Render row checkboxes and a select-all checkbox for the current page." }
  selectedRows: { type: "ReadonlySet<DataTableRowId>", description: "Control selection using stable IDs from `getRowId`. Missing or non-selectable IDs stay stored but do not count as select..." }
  defaultSelectedRows: { type: "ReadonlySet<DataTableRowId>", description: "Set the initial selection for an uncontrolled, static, single-page table." }
  onSelectionChange: { type: "({ selectedRows }: { selectedRows: Set<DataTableRowId> }) => void", description: "Receive a new selection set when a checkbox is toggled. Data changes alone do not trigger this callback." }
  isRowSelectable: { type: "(row: Data) => boolean", description: "Determine which rows can be selected and counted by select-all." }
  cellPadding: { type: "'condensed' | 'normal' | 'spacious'", description: "Specify the amount of space that should be available around the contents of a cell" }
  aria-describedby: { type: "string", description: "Provide an id to an element which uniquely describes this table" }
  aria-labelledby: { type: "string", description: "Provide an id to an element which uniquely labels this table" }
  initialSortColumn: { type: "string | number", description: "Provide the id or field of the column by which the table is sorted. When using this `prop`, the input data must be sorte..." }
  initialSortDirection: { type: "'ASC' | 'DESC'", description: "Provide the sort direction that the table should be sorted by on the currently sorted column" }
  externalSorting: { type: "boolean", default: "false", description: "Indicate whether the sorting of the table is managed externally. When `true`, the table will not sort the data internall..." }
  onToggleSort: { type: "(columnId: ObjectPaths<Data> | string | number, direction: 'ASC' | 'DESC') => void", description: "Fires every time the user clicks a sortable column header. It reports the column id that is now sorted and the direction..." }

Table:
  aria-describedby: { type: "string", description: "Provide an id to an element which uniquely describes this table" }
  aria-labelledby: { type: "string", description: "Provide an id to an element which uniquely labels this table" }
  children: { type: "React.ReactNode" }
  cellPadding: { type: "'condensed' | 'normal' | 'spacious'", description: "Specify the amount of space that should be available around the contents of a cell" }

Table.Head:
  children: { type: "React.ReactNode" }

Table.Actions:
  children: { type: "React.ReactNode" }

Table.Body:
  children: { type: "React.ReactNode" }

Table.Group:
  id: { type: "string | number", description: "A stable identifier exposed on both group sections as `data-group-id`. The group header's DOM id is generated separately..." }
  label: { type: "string", description: "The visible label for the group, shown in the group header and included in its accessible name along with the row count." }
  rowCount: { type: "number", description: "The number of member rows in the group. Combined with `label` to build the group header's accessible name, for example '..." }
  aria-label: { type: "string", description: "Override the group header's accessible name, for example to localize its row count description." }
  colSpan: { type: "number", description: "The number of columns spanned by the group header." }
  children: { type: "React.ReactNode", description: "The group's member rows, typically a list of `Table.Row` elements. When composing a grouped table directly, use each `Ta..." }

Table.Row:
  children: { type: "React.ReactNode" }

Table.Header:
  align: { type: "'end' | 'start'", description: "The horizontal alignment of the cell's content" }
  children: { type: "React.ReactNode" }

Table.SelectionHeader:
  selection: { type: "'all' | 'some' | 'none'", required: true, description: "Whether all, some, or none of the selectable rows are selected." }
  disabled: { type: "boolean", description: "Whether row selection is unavailable." }
  onToggleSelect: { type: "() => void", description: "Request toggling selection for all selectable rows." }
  checkboxRef: { type: "React.Ref<HTMLInputElement>", description: "Forward a ref to the native selection checkbox." }
  aria-label: { type: "string", default: "'Select rows'", description: "Provide the selection checkbox's accessible name." }
  aria-description: { type: "string", description: "Describe the select-all scope, for example 'Select all 10 rows'." }

Table.RowSelection:
  selected: { type: "boolean", required: true, description: "Whether the row is selected." }
  disabled: { type: "boolean", description: "Whether the row cannot be selected." }
  onToggleSelect: { type: "() => void", description: "Request toggling selection for the row." }
  checkboxRef: { type: "React.Ref<HTMLInputElement>", description: "Forward a ref to the native row checkbox." }
  aria-label: { type: "string", default: "'Select row'", description: "Name the row checkbox when `aria-labelledby` is not provided." }
  aria-labelledby: { type: "string", description: "Reference the row header IDs. The checkbox name adds 'Select' before their text." }

Table.Cell:
  align: { type: "'end' | 'start'", description: "The horizontal alignment of the cell's content" }
  children: { type: "React.ReactNode" }
  scope: { type: "'row'", description: "Provide the scope for a table cell, useful for defining a row header using `scope='row'`" }

No props documented.

Table.Container:
  children: { type: "React.ReactNode" }

No props documented.

Table.Title:
  children: { type: "React.ReactNode" }
  id: { type: "string", required: true, description: "Provide a unique id for the table subtitle. This should be used along with `aria-labelledby` on `DataTable`" }

Table.Subtitle:
  children: { type: "React.ReactNode" }
  id: { type: "string", required: true, description: "Provide a unique id for the table subtitle. This should be used along with `aria-describedby` on `DataTable`" }

Table.Skeleton:
  cellPadding: { type: "'condensed' | 'normal' | 'spacious'", default: "normal", description: "Specify the amount of space that should be available around the contents of a cell" }
  columns: { type: "Array<Column<Data>>", required: true }
  rows: { type: "number", default: "10", description: "Optionally specify the number of rows which should be included in the skeleton state of the component" }

Table.Pagination:
  aria-label: { type: "string", required: true, description: "Defines a string value that labels the current element. Provide a label for the navigation landmark rendered by this com..." }
  defaultPageIndex: { type: "string", description: "Provide an optional index to specify the default selected page" }
  id: { type: "string", description: "Optionally provide an `id` that is placed on the navigation landmark rendered by this component" }
  onChange: { type: "({ pageIndex }: { pageIndex: number }) => void", description: "Optionally provide a handler that is called whenever the pagination state is updated" }
  pageSize: { type: "number", default: "25", description: "Optionally specify the number of items within a page" }
  totalCount: { type: "number", required: true, description: "Specify the total number of items within the collection" }
  showPages: { type: "boolean | { narrow?: boolean; regular?: boolean; wide?: boolean; }", default: "{narrow: false}", description: "Whether to show the page numbers" }

Table.ErrorDialog:
  children: { type: "React.ReactNode", required: true, description: "The content of the dialog. This is usually a message explaining the error." }
  title: { type: "string", default: "'Error'", description: "The title of the dialog. This is usually a short description of the error." }
  onRetry: { type: "() => void", description: "Event handler called when the user clicks the retry button." }
  onDismiss: { type: "() => void", description: "Event handler called when the dialog is dismissed." }

Table.SortHeader:
  direction: { type: "'ASC' | 'DESC' | 'NONE'", required: true, description: "Specify the sort direction for the TableHeader" }
  onToggleSort: { type: "() => void", required: true, description: "Provide a handler that is called when the sortable TableHeader is interacted with via a click or keyboard interaction" }
  align: { type: "'end' | 'start'", description: "The horizontal alignment of the cell's content" }

Column options:
  align: { type: "'start' | 'end'", description: "The horizontal alignment of the column's content" }
  field: { type: "ObjectPaths<Data>", description: "Optionally provide a field to render for this column. This may be the key of the object or a string that accesses nested..." }
  header: { type: "string | (() => React.ReactNode)", required: true, description: "Provide the name of the column. This will be rendered as a table header within the table itself" }
  maxWidth: { type: "React.CSSProperties['maxWidth']", description: "The maximum width the column can grow to" }
  minWidth: { type: "React.CSSProperties['minWidth']", description: "The minimum width the column can grow to" }
  renderCell: { type: "(data: Data) => React.ReactNode", description: "Provide a custom component or render prop to render the data for this column in a row" }
  rowHeader: { type: "boolean", description: "Specify if the value of this column for a row should be treated as a row header" }
  sortBy: { type: "boolean | 'alphanumeric' | 'basic' | 'datetime' | (a: Data, b: Data) => number", description: "Specify if the table should sort by this column and, if applicable, a specific sort strategy or custom sort strategy" }
  width: { type: "'grow' | 'growCollapse' | 'auto' | React.CSSProperties['width']", default: "'grow'", description: "Controls the width of the column. - 'grow': Stretch to fill available space, and min width is the width of the widest ce..." }
```

## Examples

### Experimental Components Datatable Features: With Title

```tsx
() => (
  <Table.Container>
    <Table.Title as="h2" id="repositories">
      Repositories
    </Table.Title>
    <DataTable
      aria-labelledby="repositories"
      aria-describedby="repositories-subtitle"
      data={data}
      columns={[
        {
          header: 'Repository',
          field: 'name',
          rowHeader: true,
        },
        {
          header: 'Type',
          field: 'type',
          renderCell: (row) => {
            return <Label>{uppercase(row.type)}</Label>
          },
        },
        {
          header: 'Updated',
          field: 'updatedAt',
          renderCell: (row) => {
            return <RelativeTime date={new Date(row.updatedAt)} />
          },
        },
        {
          header: 'Dependabot',
          field: 'securityFeatures.dependabot',
          renderCell: (row) => {
            return row.securityFeatures.dependabot.length > 0 ? (
              <LabelGroup>
                {row.securityFeatures.dependabot.map((feature) => {
                  return <Label key={feature}>{uppercase(feature)}</Label>
                })}
              </LabelGroup>
            ) : null
          },
        },
        {
          header: 'Code scanning',
          field: 'securityFeatures.codeScanning',
          renderCell: (row) => {
            return row.securityFeatures.codeScanning.length > 0 ? (
              <LabelGroup>
                {row.securityFeatures.codeScanning.map((feature) => {
                  return <Label key={feature}>{uppercase(feature)}</Label>
                })}
              </LabelGroup>
            ) : null
          },
        },
      ]}
    />
  </Table.Container>
)
```

### Experimental Components Datatable Features: With Title And Subtitle

```tsx
() => (
  <Table.Container>
    <Table.Title as="h2" id="repositories">
      Repositories
    </Table.Title>
    <Table.Subtitle as="p" id="repositories-subtitle">
      A subtitle could appear here to give extra context to the data.
    </Table.Subtitle>
    <DataTable
      aria-labelledby="repositories"
      aria-describedby="repositories-subtitle"
      data={data}
      columns={[
        {
          header: 'Repository',
          field: 'name',
          rowHeader: true,
        },
        {
          header: 'Type',
          field: 'type',
          renderCell: (row) => {
            return <Label>{uppercase(row.type)}</Label>
          },
        },
        {
          header: 'Updated',
          field: 'updatedAt',
          renderCell: (row) => {
            return <RelativeTime date={new Date(row.updatedAt)} />
          },
        },
        {
          header: 'Dependabot',
          field: 'securityFeatures.dependabot',
          renderCell: (row) => {
            return row.securityFeatures.dependabot.length > 0 ? (
              <LabelGroup>
                {row.securityFeatures.dependabot.map((feature) => {
                  return <Label key={feature}>{uppercase(feature)}</Label>
                })}
              </LabelGroup>
            ) : null
          },
        },
        {
          header: 'Code scanning',
          field: 'securityFeatures.codeScanning',
          renderCell: (row) => {
            return row.securityFeatures.codeScanning.length > 0 ? (
              <LabelGroup>
                {row.securityFeatures.codeScanning.map((feature) => {
                  return <Label key={feature}>{uppercase(feature)}</Label>
                })}
              </LabelGroup>
            ) : null
          },
        },
      ]}
    />
  </Table.Container>
)
```

### Experimental Components Datatable Features: With Sorting

```tsx
() => {
  const rows = Array.from(data).sort((a, b) => {
    return b.updatedAt - a.updatedAt
  })
  return (
    <Table.Container>
      <Table.Title as="h2" id="repositories">
        Repositories
      </Table.Title>
      <Table.Subtitle as="p" id="repositories-subtitle">
        A subtitle could appear here to give extra context to the data.
      </Table.Subtitle>
      <DataTable
        aria-labelledby="repositories"
        aria-describedby="repositories-subtitle"
        data={rows}
        columns={[
          {
            header: 'Repository',
            field: 'name',
            rowHeader: true,
            sortBy: 'alphanumeric',
          },
          {
            header: 'Type',
            field: 'type',
            renderCell: (row) => {
              return <Label>{uppercase(row.type)}</Label>
            },
          },
          {
            header: 'Updated',
            field: 'updatedAt',
            sortBy: 'datetime',
            renderCell: (row) => {
              return <RelativeTime date={new Date(row.updatedAt)} />
            },
          },
          {
            header: 'Dependabot',
            field: 'securityFeatures.dependabot',
            renderCell: (row) => {
              return row.securityFeatures.dependabot.length > 0 ? (
                <LabelGroup>
                  {row.securityFeatures.dependabot.map((feature) => {
                    return <Label key={feature}>{uppercase(feature)}</Label>
                  })}
                </LabelGroup>
              ) : null
            },
          },
          {
            header: 'Code scanning',
            field: 'securityFeatures.codeScanning',
            renderCell: (row) => {
              return row.securityFeatures.codeScanning.length > 0 ? (
                <LabelGroup>
                  {row.securityFeatures.codeScanning.map((feature) => {
                    return <Label key={feature}>{uppercase(feature)}</Label>
                  })}
                </LabelGroup>
              ) : null
            },
          },
        ]}
        initialSortColumn="updatedAt"
        initialSortDirection="DESC"
      />
    </Table.Container>
  )
}
```
---
name: Banner
description: "Banner is used to highlight important information."
import: "@primer/react"
docs: https://primer.style/product/components/banner
a11y_docs: https://primer.style/product/components/banner/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Banner
storybook: https://primer.style/react/storybook/?path=/story/components-banner
---

# Banner

Banner is used to highlight important information.

## Usage

```tsx
import { Banner } from '@primer/react'
```

### Example

```tsx
() => {
  return (
    <Banner
      onDismiss={action('onDismiss')}
      title="Info"
      description={
        <>
          GitHub users are{' '}
          <Link inline href="#">
            now required
          </Link>{' '}
          to enable two-factor authentication as an additional security measure.
        </>
      }
      primaryAction={<Banner.PrimaryAction>Button</Banner.PrimaryAction>}
      secondaryAction={<Banner.SecondaryAction>Button</Banner.SecondaryAction>}
    />
  )
}
```

## Props

```yaml
Banner:
  aria-label: { type: "string", description: "Provide an optional label to override the default name for the Banner landmark region" }
  className: { type: "string", description: "Provide an optional className to add to the outermost element rendered by the Banner" }
  description: { type: "React.ReactNode", description: "Provide an optional description for the Banner. This should provide supplemental information about the Banner" }
  hideTitle: { type: "boolean", description: "Whether to hide the title visually." }
  icon: { type: "React.ReactNode", deprecated: true, description: "Provide a custom icon for the Banner. This is only available when `variant` is `info` or `upsell`" }
  leadingVisual: { type: "React.ReactNode", description: "Provide a custom leading visual for the Banner. This is only available when `variant` is `info` or `upsell`" }
  onDismiss: { type: "() => void", description: "Optionally provide a handler to be called when the banner is dismissed. Providing this prop will show a dismiss button" }
  primaryAction: { type: "React.ReactNode" }
  secondaryAction: { type: "React.ReactNode" }
  title: { type: "React.ReactNode", description: "The title for the Banner. This will be used as the accessible name and is required unless `Banner.Title` is used as a ch..." }
  variant: { type: "'critical' | 'info' | 'success' | 'upsell' | 'warning'", description: "Specify the type of the Banner" }
  layout: { type: "'default' | 'compact'", description: "Specify the layout of the Banner. Compact layout will reduce the padding." }
  actionsLayout: { type: "'default' | 'inline' | 'stacked'", description: "Override the responsive layout of the action buttons. 'inline' layout will display the buttons inline with the title and..." }
  flush: { type: "boolean", default: "false", description: "Full width banner specifically for use within confined spaces, such as dialogs, tables, cards, or boxes where available ..." }

Banner.Title:
  as: { type: "'h2' | 'h3' | 'h4' | 'h5' | 'h6'" }

Banner.Description:
  className: { type: "string", description: "Class name(s) for custom styling." }

No props documented.

No props documented.
```

## Examples

### Features: Critical

```tsx
() => {
  return (
    <Banner
      title="Critical"
      description={
        <>
          GitHub users are{' '}
          <Link inline href="#">
            now required
          </Link>{' '}
          to enable two-factor authentication as an additional security measure.
        </>
      }
      variant="critical"
    />
  )
}
```

### Features: Info

```tsx
() => {
  return (
    <Banner
      title="Info"
      description={
        <>
          GitHub users are{' '}
          <Link inline href="#">
            now required
          </Link>{' '}
          to enable two-factor authentication as an additional security measure.
        </>
      }
      onDismiss={action('onDismiss')}
      variant="info"
    ></Banner>
  )
}
```

### Features: Success

```tsx
() => {
  return (
    <Banner
      title="Success"
      description={
        <>
          GitHub users are{' '}
          <Link inline href="#">
            now required
          </Link>{' '}
          to enable two-factor authentication as an additional security measure.
        </>
      }
      onDismiss={action('onDismiss')}
      variant="success"
    />
  )
}
```
---
name: Blankslate
description: "Blankslate is used as placeholder to tell users why content is missing."
import: "@primer/react/experimental"
docs: https://primer.style/product/components/blankslate
a11y_docs: https://primer.style/product/components/blankslate/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Blankslate
storybook: https://primer.style/react/storybook/?path=/story/components-blankslate
---

# Blankslate

Blankslate is used as placeholder to tell users why content is missing.

## Usage

```tsx
import { Blankslate } from '@primer/react/experimental'
```

### Example

```tsx
() => (
  <Blankslate>
    <Blankslate.Visual>
      <BookIcon size="medium" />
    </Blankslate.Visual>
    <Blankslate.Heading>Welcome to the mona wiki!</Blankslate.Heading>
    <Blankslate.Description>
      Wikis provide a place in your repository to lay out the roadmap of your
      project, show the current status, and document software better, together.
    </Blankslate.Description>
    <Blankslate.PrimaryAction href="#">
      Create the first page
    </Blankslate.PrimaryAction>
    <Blankslate.SecondaryAction href="#">
      Learn more about wikis
    </Blankslate.SecondaryAction>
  </Blankslate>
)
```

## Props

```yaml
Blankslate:
  border: { type: "boolean", description: "Add a border around this component" }
  narrow: { type: "boolean" }
  spacious: { type: "boolean" }
  className: { type: "string", description: "Class name(s) for custom styling." }
  size: { type: "'small' | 'medium' | 'large'", default: "'medium'", description: "The size of the componeont" }

No props documented.

Blankslate.Heading:
  as: { type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'" }

No props documented.

Blankslate.PrimaryAction:
  href: { type: "string", description: "Link to complete primary action. If defined, will render as an anchor instead of a button." }

Blankslate.SecondaryAction:
  href: { type: "string", description: "Link to complete secondary action" }
```

## Examples

### Experimental Components Blankslate Features: With Visual

```tsx
() => (
  <Blankslate>
    <Blankslate.Visual>
      <BookIcon size="medium" />
    </Blankslate.Visual>
    <Blankslate.Heading>Blankslate heading</Blankslate.Heading>
    <Blankslate.Description>
      Use it to provide information when no dynamic content exists.
    </Blankslate.Description>
  </Blankslate>
)
```

### Experimental Components Blankslate Features: With Primary Action As Link

```tsx
() => (
  <Blankslate>
    <Blankslate.Visual>
      <BookIcon size="medium" />
    </Blankslate.Visual>
    <Blankslate.Heading>Blankslate heading</Blankslate.Heading>
    <Blankslate.Description>
      Use it to provide information when no dynamic content exists.
    </Blankslate.Description>
    <Blankslate.PrimaryAction href="#">Primary action</Blankslate.PrimaryAction>
  </Blankslate>
)
```

### Experimental Components Blankslate Features: With Primary Action As Button

```tsx
() => {
  const [isOpen, setIsOpen] = React.useState(false)
  const onDialogClose = React.useCallback(() => setIsOpen(false), [])
  return (
    <>
      <Blankslate>
        <Blankslate.Visual>
          <BookIcon size="medium" />
        </Blankslate.Visual>
        <Blankslate.Heading>Blankslate heading</Blankslate.Heading>
        <Blankslate.Description>
          Use it to provide information when no dynamic content exists.
        </Blankslate.Description>
        <Blankslate.PrimaryAction onClick={() => setIsOpen(true)}>
          Primary action
        </Blankslate.PrimaryAction>
      </Blankslate>
      {isOpen ? (
        <ConfirmationDialog
          title="Delete universe?"
          onClose={onDialogClose}
          confirmButtonContent="Delete it!"
          confirmButtonType="danger"
        >
          Deleting the universe could have disastrous effects, including but not
          limited to destroying all life on Earth.
        </ConfirmationDialog>
      ) : null}
    </>
  )
}
```
---
name: Dialog
description: "Dialog is a floating surface used to display transient content such as confirmation actions, selection options, and more."
import: "@primer/react"
docs: https://primer.style/product/components/dialog
a11y_docs: https://primer.style/product/components/dialog/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Dialog
storybook: https://primer.style/react/storybook/?path=/story/components-dialog
---

# Dialog

Dialog is a floating surface used to display transient content such as confirmation actions, selection options, and more.

## Usage

```tsx
import { Dialog } from '@primer/react'
```

### Example

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])
  const onSecondDialogClose = useCallback(() => setSecondOpen(false), [])
  const openSecondDialog = useCallback(() => setSecondOpen(true), [])
  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        Show dialog
      </Button>
      {isOpen && (
        <Dialog
          title="My Dialog"
          onClose={onDialogClose}
          footerButtons={[
            {
              buttonType: 'default',
              content: 'Open Second Dialog',
              onClick: openSecondDialog,
            },
            {
              buttonType: 'danger',
              content: 'Delete the universe',
              onClick: onDialogClose,
            },
            {
              buttonType: 'primary',
              content: 'Proceed',
              onClick: openSecondDialog,
            },
          ]}
        >
          {lipsum}
          {secondOpen && (
            <Dialog
              title="Inner dialog!"
              onClose={onSecondDialogClose}
              width="small"
            >
              Hello world
            </Dialog>
          )}
        </Dialog>
      )}
    </>
  )
}
```

## Props

```yaml
Dialog:
  title: { type: "React.ReactNode", description: "Title of the Dialog. Also serves as the aria-label for this Dialog." }
  subtitle: { type: "React.ReactNode", description: "The Dialog's subtitle. Optional. Rendered below the title in smaller type with less contrast. Also serves as the aria-de..." }
  renderHeader: { type: "React.FunctionComponent<React.PropsWithChildren<DialogHeaderProps>>", description: "Provide a custom renderer for the dialog header. This content is rendered directly into the dialog body area, full bleed..." }
  renderBody: { type: "React.FunctionComponent<React.PropsWithChildren<DialogProps>>", description: "Provide a custom render function for the dialog body. This content is rendered directly into the dialog body area, full ..." }
  renderFooter: { type: "React.FunctionComponent<React.PropsWithChildren<DialogProps>>", description: "Provide a custom render function for the dialog footer. This content is rendered directly into the dialog footer area, f..." }
  footerButtons: { type: "DialogButtonProps[]", description: "Specifies the buttons to be rendered in the Dialog footer." }
  onClose: { type: "(gesture: 'close-button' | 'escape') => void", description: "This method is invoked when a gesture to close the dialog is used (either an Escape key press or clicking the 'X' in the..." }
  role: { type: "'dialog' | 'alertdialog'", description: "The ARIA role to assign to this dialog. See [dialog modal](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) a..." }
  width: { type: "'small' | 'medium' | 'large' | 'xlarge' | string | number", description: "The width of the dialog. small: 296px medium: 320px large: 480px xlarge: 640px Also accepts any valid CSS width value (e..." }
  height: { type: "'small' | 'large' | 'auto'", description: "The height of the dialog. small: 296x480 large: 480x640 auto: variable based on contents" }
  returnFocusRef: { type: "React.RefObject<HTMLElement>" }
  initialFocusRef: { type: "React.RefObject<HTMLElement>", description: "Focus this element when the Dialog opens" }
  position: { type: "'center' | 'left' | 'right' | { narrow: 'center' | 'left' | 'right' | 'bottom' | 'fullscreen', regular: 'center' | 'left' | 'right' | 'bottom' | 'fullscreen', wide: 'center' | 'left' | 'right' | 'bottom' | 'fullscreen' }", description: "The position of the dialog" }
  align: { type: "'top' | 'center' | 'bottom'", description: "The vertical alignment of the dialog. Only applies when position is 'center' (the default). 'top' positions the Dialog ~..." }
  className: { type: "string | undefined", description: "CSS string" }
  style: { type: "React.CSSProperties | undefined", description: "React CSS properties" }

No props documented.

Dialog.Buttons:
  buttons: { type: "DialogButtonProps[] (see table below)", required: true }

Dialog.CloseButton:
  onClose: { type: "() => void", required: true, description: "Callback for closing the Dialog" }

No props documented.

No props documented.

No props documented.

DialogButtonProps:
  buttonType: { type: "'default' | 'danger' | 'primary' | 'normal'", description: "The variant of Button to use" }
  content: { type: "React.ReactNode", required: true, description: "The Button's inner text" }
  autoFocus: { type: "boolean", description: "If true, and if this is the only button with autoFocus set to true, focus this button automatically when the dialog appe..." }
  ref: { type: "React.RefObject<HTMLButtonElement>", description: " A reference to the rendered Button’s DOM node, used together with `autoFocus` for `focusTrap`’s `initialFocus`." }
```

## Examples

### Features: With Custom Renderers

```tsx
({ width, height, subtitle }: DialogStoryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const onDialogClose = useCallback(() => setIsOpen(false), [])
  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Show dialog</Button>
      {isOpen && (
        <Dialog
          title="My Dialog"
          subtitle={subtitle ? 'This is a subtitle!' : undefined}
          width={width}
          height={height}
          renderHeader={CustomHeader}
          renderBody={CustomBody}
          renderFooter={CustomFooter}
          onClose={onDialogClose}
          footerButtons={[
            {
              buttonType: 'danger',
              content: 'Delete the universe',
              onClick: onDialogClose,
            },
            {
              buttonType: 'primary',
              content: 'Proceed',
            },
          ]}
        >
          {lipsum}
        </Dialog>
      )}
    </>
  )
}
```

### Features: Stress Test

```tsx
({ width, height, subtitle }: DialogStoryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])
  const onSecondDialogClose = useCallback(() => setSecondOpen(false), [])
  const openSecondDialog = useCallback(() => setSecondOpen(true), [])
  const manyButtons = new Array(7).fill(undefined).map((_, i) => ({
    content: `Button ${i}`,
  }))
  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        Show dialog
      </Button>
      {isOpen && (
        <Dialog
          title="This dialog has a really long title. So long, in fact, that it should cause wrapping, going to multiple lines!."
          subtitle={
            subtitle
              ? "It's not a common scenario, sure, but what if the subtitle is generated from a really long value? Do we just break the dialog? Or do we handle it because we are pros?"
              : undefined
          }
          onClose={onDialogClose}
          width={width}
          height={height}
          footerButtons={[
            ...manyButtons,
            {
              buttonType: 'danger',
              content: 'Delete the universe',
              onClick: onDialogClose,
            },
            {
              buttonType: 'primary',
              content: 'Proceed',
              onClick: openSecondDialog,
            },
          ]}
          position={{
            narrow: 'fullscreen',
            regular: 'center',
          }}
        >
          {lipsum}
          {secondOpen && (
            <Dialog
              title="Inner dialog!"
              onClose={onSecondDialogClose}
              width="small"
            >
              Hello world
            </Dialog>
          )}
        </Dialog>
      )}
    </>
  )
}
```

### Features: Repro Multistep Dialog With Conditional Footer

```tsx
({ width, height }: DialogStoryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const onDialogClose = useCallback(() => setIsOpen(false), [])
  const [step, setStep] = React.useState(1)
  const [inputText, setInputText] = React.useState('')
  const dialogRef = useRef<HTMLDivElement>(null)
  const renderFooterConditionally = () => {
    if (step === 1) return null
    return (
      <Dialog.Footer>
        <Button variant="primary">Submit</Button>
      </Dialog.Footer>
    )
  }
  React.useEffect(() => {
    // focus the close button when the step changes
    const focusTarget = dialogRef.current?.querySelector(
      'button[aria-label="Close"]',
    ) as HTMLButtonElement
    // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler
    if (step === 2) {
      focusTarget.focus()
    }
  }, [step])
  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Show dialog</Button>
      {isOpen && (
        <Dialog
          title={`Step ${step}`}
          width={width}
          height={height}
          renderFooter={renderFooterConditionally}
          onClose={onDialogClose}
          footerButtons={[
            {
              buttonType: 'primary',
              content: 'Proceed',
            },
          ]}
          ref={dialogRef}
        >
          {step === 1 ? (
            <Stack gap="spacious" direction="vertical">
              <Stack direction="horizontal" justify="space-between">
                Bug Report <Button onClick={() => setStep(2)}>Choose</Button>
              </Stack>
              <Stack direction="horizontal" justify="space-between">
                Feature request{' '}
                <Button onClick={() => setStep(2)}>Choose</Button>
              </Stack>
            </Stack>
          ) : (
            <div>
              <Stack gap="condensed" direction="vertical">
                <label htmlFor="description">Description</label>
                <TextInput
                  id="description"
                  placeholder="Write the description here"
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                />
              </Stack>
            </div>
          )}
        </Dialog>
      )}
    </>
  )
}
```
---
name: ConfirmationDialog
description: "ConfirmationDialog is a specialized dialog component used to confirm user actions. It provides a simple way to ask users to confirm or cancel potentially destructive or important actions."
import: "@primer/react"
docs: https://primer.style/product/components/confirmation-dialog
a11y_docs: https://primer.style/product/components/confirmation-dialog/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/ConfirmationDialog
storybook: https://primer.style/react/storybook/?path=/story/components-confirmation-dialog
---

# ConfirmationDialog

ConfirmationDialog is a specialized dialog component used to confirm user actions. It provides a simple way to ask users to confirm or cancel potentially destructive or important actions.

## Usage

```tsx
import { ConfirmationDialog } from '@primer/react'
```

### Example

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onDialogClose = useCallback(() => setIsOpen(false), [])
  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        Show dialog
      </Button>
      {isOpen && (
        <ConfirmationDialog
          title="Delete universe?"
          onClose={onDialogClose}
          confirmButtonContent="Delete it!"
          confirmButtonType="danger"
        >
          Deleting the universe could have disastrous effects, including but not
          limited to destroying all life on Earth.
        </ConfirmationDialog>
      )}
    </>
  )
}
```

## Props

```yaml
ConfirmationDialog:
  onClose: { type: "(gesture: 'confirm' | 'close-button' | 'cancel' | 'escape') => void", required: true, description: "This callback is invoked when a gesture to close the dialog is performed. The first argument indicates the gesture." }
  title: { type: "React.ReactNode", required: true, description: "The title of the ConfirmationDialog. This is usually a brief question." }
  cancelButtonContent: { type: "React.ReactNode", default: "Cancel", description: "The text to use for the cancel button." }
  confirmButtonContent: { type: "React.ReactNode", default: "OK", description: "The text to use for the confirm button." }
  confirmButtonType: { type: "'normal' | 'primary' | 'danger'", default: "normal", description: "The type of button to use for the confirm button." }
  overrideButtonFocus: { type: "'confirm' | 'cancel'", description: "The button that should be initially focused when the dialog is opened. By default, the initial button focus is the confi..." }
  className: { type: "string", description: "Additional class names to apply to the dialog." }
  width: { type: "'small' | 'medium' | 'large' | 'xlarge'", default: "medium", description: "The width of the dialog. small: 296px medium: 320px large: 480px xlarge: 640px" }
  height: { type: "'small' | 'large' | 'auto'", description: "The height of the dialog. small: 480px large: 640px auto: variable based on contents" }
```

## Examples

### Features: Shorthand Hook

```tsx
() => {
  const confirm = useConfirm()
  const onButtonClick = useCallback(
    async (event: React.MouseEvent) => {
      if (
        (await confirm({
          title: 'Are you sure?',
          content: 'Do you really want to turn this button green?',
        })) &&
        event.target instanceof HTMLElement
      ) {
        event.target.style.color = 'var(--fgColor-success)'
        event.target.textContent = "I'm green!"
      }
    },
    [confirm],
  )
  return (
    <div className={classes.ButtonContainer}>
      <Button onClick={onButtonClick} className={classes.TurnGreenButton}>
        Turn me green!
      </Button>
      <Button onClick={onButtonClick} className={classes.TurnGreenButton}>
        Turn me green!
      </Button>
      <Button onClick={onButtonClick} className={classes.TurnGreenButton}>
        Turn me green!
      </Button>
      <Button onClick={onButtonClick} className={classes.TurnGreenButton}>
        Turn me green!
      </Button>
    </div>
  )
}
```

### Features: Shorthand Hook From Action Menu

```tsx
() => {
  const confirm = useConfirm()
  const [text, setText] = useState('open me')
  const onButtonClick = useCallback(async () => {
    if (
      await confirm({
        title: 'Are you sure?',
        content: 'Do you really want to do a trick?',
      })
    ) {
      setText('tada!')
    }
  }, [confirm])
  return (
    <div className={classes.ButtonContainer}>
      <ActionMenu>
        <ActionMenu.Button>{text}</ActionMenu.Button>
        <ActionMenu.Overlay>
          <ActionList>
            <ActionList.Item onSelect={onButtonClick}>
              Do a trick!
            </ActionList.Item>
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>
    </div>
  )
}
```

### Features: Loading States

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmLoading, setIsConfirmLoading] = useState(false)
  const [isCancelLoading, setIsCancelLoading] = useState(false)
  const handleConfirm = useCallback(() => {
    setIsConfirmLoading(true)
    // Simulate async operation
    setTimeout(() => {
      setIsConfirmLoading(false)
      setIsOpen(false)
    }, 2000)
  }, [])
  const handleCancel = useCallback(() => {
    setIsCancelLoading(true)
    // Simulate async operation
    setTimeout(() => {
      setIsCancelLoading(false)
      setIsOpen(false)
    }, 1500)
  }, [])
  const handleClose = useCallback(
    (gesture: 'confirm' | 'close-button' | 'cancel' | 'escape') => {
      if (gesture === 'confirm') {
        handleConfirm()
      } else if (gesture === 'cancel') {
        handleCancel()
      } else {
        setIsOpen(false)
      }
    },
    [handleConfirm, handleCancel],
  )
  return (
    <div className={classes.ButtonContainer}>
      <Button onClick={() => setIsOpen(true)}>Show Loading Dialog</Button>
      {isOpen && (
        <ConfirmationDialog
          title="Delete this file?"
          confirmButtonType="danger"
          confirmButtonContent="Delete"
          confirmButtonLoading={isConfirmLoading}
          cancelButtonLoading={isCancelLoading}
          onClose={handleClose}
        >
          This action cannot be undone. The file will be permanently deleted
          from your repository.
        </ConfirmationDialog>
      )}
    </div>
  )
}
```
---
name: PageHeader
description: "PageHeader determines the top-level headings of a UI."
import: "@primer/react"
docs: https://primer.style/product/components/page-header
a11y_docs: https://primer.style/product/components/page-header/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/PageHeader
storybook: https://primer.style/react/storybook/?path=/story/components-page-header
---

# PageHeader

PageHeader determines the top-level headings of a UI.

## Usage

```tsx
import { PageHeader } from '@primer/react'
```

### Example

```tsx
() => (
  <div className={classes.PaddingContainer}>
    <PageHeader role="banner" aria-label="Title">
      <PageHeader.TitleArea>
        <PageHeader.Title>Title</PageHeader.Title>
      </PageHeader.TitleArea>
    </PageHeader>
  </div>
)
```

## Props

```yaml
PageHeader:
  aria-label: { type: "string | undefined", description: "A unique label for the rendered landmark" }
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden. The component can be hidden for all viewport widths, or specified viewport widths. Some c..." }
  role: { type: "AriaRole", description: "The ARIA role to assign to the top-level node of this component." }
  as: { type: "React.ElementType", default: "'div'" }
  hasBorder: { type: "boolean", description: "Whether to render a border below the PageHeader. This border will NOT be rendered if the PageHeader has a `PageHeader.Na..." }

PageHeader.ContextArea:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.ParentLink:
  aria-label: { type: "string | undefined", description: "A unique label for the rendered landmark" }
  className: { type: "string | undefined", description: "CSS string" }
  href: { type: "string", description: "The URL to link to." }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "`{ narrow: false regular: true wide: true }`", description: "Whether the parent link is hidden." }

PageHeader.ContextBar:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.ContextAreaActions:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.TitleArea:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }
  variant: { type: "| 'subtitle' | 'medium' | 'large' | { narrow?: | 'subtitle' | 'medium' | 'large' regular?: | 'subtitle' | 'medium' | 'large' wide?: | 'subtitle' | 'medium' | 'large' }", default: "medium", description: "Default title (medium) is the most common page title size. Use for static titles in most situations. Large variant shoul..." }

PageHeader.LeadingAction:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.LeadingVisual:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.Title:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }
  as: { type: "React.ElementType", default: "'h2'" }

PageHeader.TrailingVisual:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.TrailingAction:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.Actions:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.Breadcrumbs:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.Description:
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }

PageHeader.Navigation:
  aria-label: { type: "string", description: "The aria-label attribute for the navigaton component when it is rendered as a 'nav' element." }
  aria-labelledby: { type: "string", description: "The aria-labelledby attribute for the navigaton component when it is rendered as a 'nav' element." }
  as: { type: "div | nav", default: "'div'", description: "The HTML element used to render the navigation." }
  className: { type: "string | undefined", description: "CSS string" }
  hidden: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", default: "false", description: "Whether the content is hidden." }
```

## Examples

### Features: Has Large Title

```tsx
() => (
  <div className={classes.PaddingContainer}>
    <PageHeader role="banner" aria-label="Title">
      <PageHeader.TitleArea variant="large">
        <PageHeader.Title>Title</PageHeader.Title>
      </PageHeader.TitleArea>
    </PageHeader>
  </div>
)
```

### Features: With Leading And Trailing Visuals

```tsx
() => (
  <div className={classes.PaddingContainer}>
    <PageHeader role="banner" aria-label="Title">
      <PageHeader.TitleArea>
        <PageHeader.LeadingVisual>
          <GitPullRequestIcon />
        </PageHeader.LeadingVisual>
        <PageHeader.Title>Title</PageHeader.Title>
        <PageHeader.TrailingVisual>
          <Label>Beta</Label>
        </PageHeader.TrailingVisual>
      </PageHeader.TitleArea>
    </PageHeader>
  </div>
)
```

### Features: With Leading Visual Hidden On Regular Viewport

```tsx
() => (
  <div className={classes.PaddingContainer}>
    <PageHeader role="banner" aria-label="Title">
      <PageHeader.TitleArea>
        <PageHeader.LeadingVisual
          hidden={{
            regular: true,
          }}
        >
          <GitPullRequestIcon />
        </PageHeader.LeadingVisual>
        <PageHeader.Title>Title</PageHeader.Title>
        <PageHeader.TrailingVisual>
          <Label>Beta</Label>
        </PageHeader.TrailingVisual>
      </PageHeader.TitleArea>
    </PageHeader>
  </div>
)
```
---
name: UnderlineNav
description: "The UnderlineNav is used to display navigation in a horizontal tabbed format."
import: "@primer/react"
docs: https://primer.style/product/components/underline-nav
a11y_docs: https://primer.style/product/components/underline-nav/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/UnderlineNav
storybook: https://primer.style/react/storybook/?path=/story/components-underline-nav
---

# UnderlineNav

The UnderlineNav is used to display navigation in a horizontal tabbed format.

## Usage

```tsx
import { UnderlineNav } from '@primer/react'
```

### Example

```tsx
() => {
  const children = ['Code', 'Pull requests', 'Actions', 'Projects', 'Wiki']
  return (
    <UnderlineNav aria-label="Repository">
      {children.map((child: string, index: number) => (
        <UnderlineNavItem
          key={index}
          href="#"
          aria-current={index === 0 ? 'page' : undefined}
        >
          {child}
        </UnderlineNavItem>
      ))}
    </UnderlineNav>
  )
}
```

## Props

```yaml
UnderlineNav:
  aria-label: { type: "string", description: "A unique name for the rendered nav landmark. It will also be used to label the arrow buttons that control the scroll beh..." }
  children: { type: "UnderlineNav.Item[]", required: true }
  loadingCounters: { type: "boolean", default: "false", description: "Whether the navigation items are in loading state. Component waits for all the counters to finish loading to prevent mul..." }
  hideIconsBreakpoint: { type: "'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | null", default: "'medium'", description: "Controls the container width below which icons are hidden to save space. To keep icons visible in a narrow container, us..." }
  variant: { type: "'inset' | 'flush'", default: "'inset'", description: "`inset` children are offset horizontally from container edges. `flush` children are flush horizontally with container ed..." }

UnderlineNav.Item:
  aria-current: { type: "| 'page' | 'step' | 'location' | 'date' | 'time' | true | false", default: "false", description: "Set `aria-current` to `'page'` to indicate that the item represents the current page. Set `aria-current` to `'location'`..." }
  counter: { type: "number | string", description: "The number to display in the counter label." }
  href: { type: "string", description: "The URL that the item navigates to. Native anchor items default to `href='#'`. When a custom component is supplied with ..." }
  icon: { type: "Component", deprecated: true, description: "The leading icon comes before item label" }
  leadingVisual: { type: "React.ReactElement", description: "The leading visual comes before item label" }
  onSelect: { type: "(event) => void", description: "The handler that gets called when a nav link is selected. For example, a manual route binding can be done here(I.e. 'nav..." }
  as: { type: "React.ElementType", default: "'a'" }
```

## Examples

### Features: With Icons

```tsx
() => {
  return (
    <UnderlineNav aria-label="Repository with icons">
      <UnderlineNav.Item leadingVisual={<CodeIcon />}>Code</UnderlineNav.Item>
      <UnderlineNav.Item leadingVisual={<EyeIcon />} counter={6}>
        Issues
      </UnderlineNav.Item>
      <UnderlineNav.Item
        aria-current="page"
        leadingVisual={<GitPullRequestIcon />}
      >
        Pull Requests
      </UnderlineNav.Item>
      <UnderlineNav.Item leadingVisual={<CommentDiscussionIcon />} counter={7}>
        Discussions
      </UnderlineNav.Item>
      <UnderlineNav.Item leadingVisual={<ProjectIcon />}>
        Projects
      </UnderlineNav.Item>
    </UnderlineNav>
  )
}
```

### Features: With Counter Labels

```tsx
() => {
  return (
    <UnderlineNav aria-label="Repository with counters">
      <UnderlineNav.Item
        aria-current="page"
        leadingVisual={<CodeIcon />}
        counter="11K"
      >
        Code
      </UnderlineNav.Item>
      <UnderlineNav.Item leadingVisual={<IssueOpenedIcon />} counter={12}>
        Issues
      </UnderlineNav.Item>
    </UnderlineNav>
  )
}
```

### Features: Overflow Template

```tsx
({ initialSelectedIndex = 1 }: { initialSelectedIndex?: number }) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(
    initialSelectedIndex,
  )
  return (
    <UnderlineNav aria-label="Repository" hideIconsBreakpoint="medium">
      {items.map((item, index) => (
        <UnderlineNav.Item
          key={item.navigation}
          leadingVisual={item.icon}
          aria-current={index === selectedIndex ? 'page' : undefined}
          // Set so that navigation in interaction tests does not cause the
          // page to load the storybook iframe URL and instead keeps the test in
          // the local preview
          target="_self"
          onSelect={(event) => {
            event.preventDefault()
            setSelectedIndex(index)
          }}
          counter={item.counter}
          href={item.href}
        >
          {item.navigation}
        </UnderlineNav.Item>
      ))}
    </UnderlineNav>
  )
}
```
---
name: SegmentedControl
description: "SegmentedControl is used to pick one choice from a linear set of closely related choices, and immediately apply that selection."
import: "@primer/react"
docs: https://primer.style/product/components/segmented-control
a11y_docs: https://primer.style/product/components/segmented-control/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/SegmentedControl
storybook: https://primer.style/react/storybook/?path=/story/components-segmented-control
---

# SegmentedControl

SegmentedControl is used to pick one choice from a linear set of closely related choices, and immediately apply that selection.

## Usage

```tsx
import { SegmentedControl } from '@primer/react'
```

### Example

```tsx
() => (
  <SegmentedControl aria-label="File view">
    <SegmentedControl.Button defaultSelected>Preview</SegmentedControl.Button>
    <SegmentedControl.Button>Raw</SegmentedControl.Button>
    <SegmentedControl.Button>Blame</SegmentedControl.Button>
  </SegmentedControl>
)
```

## Props

```yaml
SegmentedControl:
  aria-label: { type: "string" }
  aria-labelledby: { type: "string" }
  aria-describedby: { type: "string" }
  fullWidth: { type: "| boolean | { narrow?: boolean regular?: boolean wide?: boolean }", description: "Whether the control fills the width of its parent" }
  onChange: { type: "(selectedIndex?: number) => void", description: "The handler that gets called when a segment is selected" }
  variant: { type: "| 'default' | 'subtle' | { narrow?: 'hideLabels' | 'dropdown' | 'default' | 'subtle' regular?: 'hideLabels' | 'dropdown' | 'default' | 'subtle' wide?: 'hideLabels' | 'dropdown' | 'default' | 'subtle' }", default: "'default'", description: "Configure the control's visual treatment or responsive behavior in tight spaces." }
  size: { type: "'small' | 'medium'", description: "The size of the buttons" }
  ref: { type: "React.RefObject<HTMLDivElement>" }

SegmentedControl.Button:
  leadingVisual: { type: "Component", description: "The leading visual comes before item label" }
  leadingIcon: { type: "Component", deprecated: true, description: "Deprecated: use `leadingVisual` instead. The leading icon comes before item label." }
  selected: { type: "boolean", description: "Whether the segment is selected. This is used for controlled SegmentedControls, and needs to be updated using the onChan..." }
  defaultSelected: { type: "boolean", description: "Whether the segment is selected. This is used for uncontrolled SegmentedControls to pick one SegmentedControlButton that..." }
  count: { type: "number | string", description: "The number to display in the counter label." }
  ref: { type: "React.RefObject<HTMLButtonElement>" }

SegmentedControl.IconButton:
  aria-label: { type: "string", required: true }
  icon: { type: "Component", required: true, description: "The icon that represents the segmented control item" }
  selected: { type: "boolean", description: "Whether the segment is selected. This is used for controlled SegmentedControls, and needs to be updated using the onChan..." }
  size: { type: "'small' | 'medium'", description: "The size of the buttons" }
  defaultSelected: { type: "boolean", description: "Whether the segment is selected. This is used for uncontrolled SegmentedControls to pick one SegmentedControlButton that..." }
  ref: { type: "React.RefObject<HTMLButtonElement>" }
  tooltipDirection: { type: "'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw'" }
  description: { type: "string", description: "If `description` is provided, we will use a Tooltip to describe the button. Then `aria-label` is used to label the butto..." }

SegmentedControl.Divider:
  className: { type: "string" }
  style: { type: "React.CSSProperties" }

SegmentedControl.Action:
  label: { type: "string", required: true, description: "Accessible label for the action icon button." }
  icon: { type: "Component", required: true, description: "The icon rendered by the action button." }
  onClick: { type: "() => void", description: "The handler that gets called when the action button is clicked." }
  disabled: { type: "boolean", description: "Whether the action is disabled." }
  loading: { type: "boolean", description: "Whether the action is in a loading state." }
```

## Examples

### Features: With Icons

```tsx
() => (
  <SegmentedControl aria-label="File view">
    <SegmentedControl.Button
      defaultSelected
      aria-label={'Preview'}
      leadingVisual={EyeIcon}
    >
      Preview
    </SegmentedControl.Button>
    <SegmentedControl.Button aria-label={'Raw'} leadingVisual={FileCodeIcon}>
      Raw
    </SegmentedControl.Button>
    <SegmentedControl.Button aria-label={'Blame'} leadingVisual={PeopleIcon}>
      Blame
    </SegmentedControl.Button>
  </SegmentedControl>
)
```

### Features: Controlled

```tsx
() => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const handleChange = (i: number) => {
    setSelectedIndex(i)
  }
  return (
    <SegmentedControl aria-label="File view" onChange={handleChange}>
      <SegmentedControl.Button selected={selectedIndex === 0}>
        Preview
      </SegmentedControl.Button>
      <SegmentedControl.Button selected={selectedIndex === 1}>
        Raw
      </SegmentedControl.Button>
      <SegmentedControl.Button selected={selectedIndex === 2}>
        Blame
      </SegmentedControl.Button>
    </SegmentedControl>
  )
}
```

### Features: Variant Narrow Hide Labels

```tsx
() => (
  <SegmentedControl
    aria-label="File view"
    variant={{
      narrow: 'hideLabels',
      regular: 'default',
      wide: 'default',
    }}
  >
    <SegmentedControl.Button
      defaultSelected
      aria-label={'Preview'}
      leadingVisual={EyeIcon}
    >
      Preview
    </SegmentedControl.Button>
    <SegmentedControl.Button aria-label={'Raw'} leadingVisual={FileCodeIcon}>
      Raw
    </SegmentedControl.Button>
    <SegmentedControl.Button aria-label={'Blame'} leadingVisual={PeopleIcon}>
      Blame
    </SegmentedControl.Button>
  </SegmentedControl>
)
```
---
name: Token
description: "Token is a compact representation of an object, and is typically used to show a collection of related metadata."
import: "@primer/react"
docs: https://primer.style/product/components/token
a11y_docs: https://primer.style/product/components/token/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/Token
storybook: https://primer.style/react/storybook/?path=/story/components-token
---

# Token

Token is a compact representation of an object, and is typically used to show a collection of related metadata.

## Usage

```tsx
import { Token } from '@primer/react'
```

### Example

```tsx
() => <Token text="token" />
```

## Props

```yaml
Token:
  leadingVisual: { type: "React.ComponentType<React.PropsWithChildren<any>>", description: "A function that renders a component before the token text" }
  text: { type: "string", required: true, description: "The text label inside the token" }
  as: { type: "'button' | 'a' | 'span'", default: "'span'" }
  onRemove: { type: "() => void", description: "The function that gets called when a user clicks the remove button, or keys `Backspace` or `Delete` when focused on the ..." }
  hideRemoveButton: { type: "boolean", description: "Whether the remove button should be rendered in the token" }
  isSelected: { type: "boolean", description: "Whether the token is selected" }
  id: { type: "number | string", description: "A unique identifier that can be associated with the token" }
  size: { type: "'small' | 'medium' | 'large' | 'xlarge'", description: "Which size the token will be rendered at" }

IssueLabelToken:
  fillColor: { type: "string", description: "The color that corresponds to the label" }
  text: { type: "string", required: true, description: "The text label inside the token" }
  as: { type: "'button' | 'a' | 'span'", default: "'span'" }
  onRemove: { type: "() => void", description: "The function that gets called when a user clicks the remove button, or keys `Backspace` or `Delete` when focused on the ..." }
  hideRemoveButton: { type: "boolean", description: "Whether the remove button should be rendered in the token" }
  isSelected: { type: "boolean", description: "Whether the token is selected" }
  id: { type: "number | string", description: "A unique identifier that can be associated with the token" }
  size: { type: "'small' | 'medium' | 'large' | 'xlarge'", description: "Which size the token will be rendered at" }
```

## Examples

### Features: Interactive Token

```tsx
() => {
  return (
    <div className={classes.TokenRow}>
      <Token
        as="a"
        href="/?path=/story/components-token-features--issue-label-token-custom-colors"
        text="Link"
      />
      <Token as="button" onClick={action('clicked')} text="Button" />
    </div>
  )
}
```

### Features: Token With Leading Visual

```tsx
() => {
  return <Token text="token" leadingVisual={GitBranchIcon} />
}
```

### Features: Token With On Remove Fn

```tsx
({ ...args }) => {
  return (
    <div className={classes.TokenRow}>
      <Token text="token" onRemove={action('remove me')} {...args} />
      <Token
        as="a"
        href="/?path=/story/components-token-features--issue-label-token-custom-colors"
        onRemove={action('remove me')}
        text="Link"
        {...args}
      />
      <Token
        as="button"
        onClick={action('clicked')}
        onRemove={action('remove me')}
        text="Button"
        {...args}
      />
    </div>
  )
}
```
---
name: FormControl
description: "FormControl displays a labelled input and, optionally, associated validation text and/or hint text."
import: "@primer/react"
docs: https://primer.style/product/components/form-control
a11y_docs: https://primer.style/product/components/form-control/accessibility
source: https://github.com/primer/react/tree/main/packages/react/src/FormControl
storybook: https://primer.style/react/storybook/?path=/story/components-form-control
---

# FormControl

FormControl displays a labelled input and, optionally, associated validation text and/or hint text.

## Usage

```tsx
import { FormControl } from '@primer/react'
```

### Example

```tsx
() => (
  <FormControl required={true}>
    <FormControl.Label>Form Input Label</FormControl.Label>
    <FormControl.Caption>This is a caption</FormControl.Caption>
    <Checkbox />
  </FormControl>
)
```

## Props

```yaml
FormControl:
  children: { type: "FormControl.Label | FormControl.Caption | FormControl.Validation | Autocomplete | TextInput | TextInputWithTokens | Select", required: true }
  disabled: { type: "boolean", default: "false", description: "Whether the control allows user input" }
  id: { type: "string", default: "a generated string", description: "The unique identifier for this control. Used to associate the label, validation text, and caption text" }
  required: { type: "boolean", default: "false", description: "If true, the user must specify a value for the input before the owning form can be submitted" }
  id: { type: "string", description: "The unique identifier for this control. Used to associate the label, validation text, and caption text" }
  layout: { type: "'vertical' | 'horizontal'", default: "vertical", description: "The direction the content flows. Vertical layout is used by default, and horizontal layout is used for checkbox and radi..." }
  className: { type: "string", description: "Class name(s) for custom styling." }
  ref: { type: "React.RefObject<HTMLDivElement>" }

FormControl.Label:
  visuallyHidden: { type: "boolean", default: "false", description: "Whether the label should be visually hidden" }
  as: { type: "'label' | 'legend' | 'span'", default: "'label'", description: "The label element can be changed to a 'legend' when it's being used to label a fieldset, or a 'span' when it's being use..." }
  requiredText: { type: "string", default: "'*'", description: "The text to display when the field is required" }
  requiredIndicator: { type: "boolean", default: "true", description: "Whether to show or hide the required text in the accessibility tree, the required text is still shown visually." }
  htmlFor: { type: "string", description: "This prop may be used to override the `htmlFor` set from FormControl's React Context. The unique identifier for the asso..." }
  id: { type: "string", description: "When `as` prop is 'label', it may be used to override the `htmlFor` given to the `<label>` element by FormControl's Reac..." }
  className: { type: "string", description: "Class name(s) for custom styling." }

FormControl.Caption:
  id: { type: "string", description: "Custom ID to override the ID set by FormControl's React Context" }
  children: { type: "React.ReactNode", description: "The content (usually just text) that is rendered to give contextual info about the field" }

FormControl.Validation:
  children: { type: "React.ReactNode", description: "The content (usually just text) that is rendered to give contextual info about the validation result for the field" }
  variant: { type: "'error' | 'success'", required: true, description: "Changes the visual style to match the validation status" }
  id: { type: "string", description: "May be used to override the ID assigned by FormControl's React Context" }

FormControl.LeadingVisual:
  children: { type: "React.ReactNode", description: "The visual to render before the choice input's label" }
```

## Examples

### Features: With Complex Inputs

```tsx
() => {
  const [tokens, setTokens] = useState([...mockTokens])
  const onTokenRemove = (tokenId: string | number) => {
    setTokens(
      tokens.filter((token: { id: string | number }) => token.id !== tokenId),
    )
  }
  return (
    <div className={classes.GridContainer}>
      <FormControl>
        <FormControl.Label id="form-label">
          TextInputWithTokens
        </FormControl.Label>
        <TextInputWithTokens onTokenRemove={onTokenRemove} tokens={tokens} />
      </FormControl>
      <FormControl>
        <FormControl.Label id="autocomplete-label">
          Autocomplete
        </FormControl.Label>
        <Autocomplete>
          <Autocomplete.Input block />
          <Autocomplete.Overlay>
            <Autocomplete.Menu
              aria-labelledby="autocomplete-label"
              items={[
                {
                  text: 'css',
                  id: '0',
                },
                {
                  text: 'css-in-js',
                  id: '1',
                },
                {
                  text: 'styled-system',
                  id: '2',
                },
                {
                  text: 'javascript',
                  id: '3',
                },
                {
                  text: 'typescript',
                  id: '4',
                },
                {
                  text: 'react',
                  id: '5',
                },
                {
                  text: 'design-systems',
                  id: '6',
                },
              ]}
              selectedItemIds={[]}
            />
          </Autocomplete.Overlay>
        </Autocomplete>
      </FormControl>
      <FormControl>
        <FormControl.Label>Select</FormControl.Label>
        <Select>
          <Select.Option value="figma">Figma</Select.Option>
          <Select.Option value="css">Primer CSS</Select.Option>
          <Select.Option value="prc">Primer React components</Select.Option>
          <Select.Option value="pvc">Primer ViewComponents</Select.Option>
        </Select>
      </FormControl>
      <FormControl>
        <FormControl.Label>Textarea</FormControl.Label>
        <Textarea />
      </FormControl>
    </div>
  )
}
```

### Features: With Custom Input

```tsx
() => {
  const [value, setValue] = React.useState('mona lisa')
  const [validationResult, setValidationResult] = React.useState('')
  const doesValueContainSpaces = (inputValue: string) => /\s/g.test(inputValue)
  const handleInputChange = (e: {
    currentTarget: {
      value: React.SetStateAction<string>
    }
  }) => {
    setValue(e.currentTarget.value)
  }
  React.useEffect(() => {
    if (doesValueContainSpaces(value)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect, react-you-might-not-need-an-effect/no-chain-state-updates
      setValidationResult('noSpaces')
      // eslint-disable-next-line react-you-might-not-need-an-effect/no-event-handler
    } else if (value) {
      // eslint-disable-next-line react-you-might-not-need-an-effect/no-chain-state-updates
      setValidationResult('validName')
    }
  }, [value])
  return (
    <div className={classes.GridContainer}>
      <FormControl>
        <FormControl.Label htmlFor="custom-input">
          GitHub handle
        </FormControl.Label>
        <CustomTextInput
          id="custom-input"
          aria-describedby="custom-input-validation custom-input-caption"
          aria-invalid={validationResult === 'noSpaces'}
          onChange={handleInputChange}
        />
        {validationResult === 'noSpaces' && (
          <FormControl.Validation id="custom-input-validation" variant="error">
            GitHub handles cannot contain spaces
          </FormControl.Validation>
        )}
        {validationResult === 'validName' && (
          <FormControl.Validation
            id="custom-input-validation"
            variant="success"
          >
            Valid name
          </FormControl.Validation>
        )}
        <FormControl.Caption id="custom-input-caption">
          With or without &quot;@&quot;. For example &quot;monalisa&quot; or
          &quot;@monalisa&quot;
        </FormControl.Caption>
      </FormControl>

      <CheckboxGroup>
        <CheckboxGroup.Label>Checkboxes</CheckboxGroup.Label>
        <FormControl layout="horizontal">
          <CustomCheckboxInput
            id="custom-checkbox-one"
            aria-describedby="custom-checkbox-one-caption"
            value="checkOne"
          />
          <FormControl.Label htmlFor="custom-checkbox-one">
            Checkbox one
          </FormControl.Label>
          <FormControl.Caption id="custom-checkbox-one-caption">
            Hint text for checkbox one
          </FormControl.Caption>
        </FormControl>
        <FormControl layout="horizontal">
          <CustomCheckboxInput
            id="custom-checkbox-two"
            aria-describedby="custom-checkbox-two-caption"
            value="checkTwo"
          />
          <FormControl.Label htmlFor="custom-checkbox-two">
            Checkbox two
          </FormControl.Label>
          <FormControl.Caption id="custom-checkbox-two-caption">
            Hint text for checkbox two
          </FormControl.Caption>
        </FormControl>
      </CheckboxGroup>
    </div>
  )
}
```

### Features: With Checkbox And Radio Inputs

```tsx
() => {
  return (
    <div className={classes.GapContainer}>
      <CheckboxGroup>
        <CheckboxGroup.Label>Checkboxes</CheckboxGroup.Label>
        <FormControl>
          <Checkbox value="checkOne" />
          <FormControl.Label>Checkbox one</FormControl.Label>
        </FormControl>
        <FormControl>
          <Checkbox value="checkTwo" />
          <FormControl.Label>Checkbox two</FormControl.Label>
        </FormControl>
        <FormControl>
          <Checkbox value="checkThree" />
          <FormControl.Label>Checkbox three</FormControl.Label>
        </FormControl>
      </CheckboxGroup>

      <RadioGroup name={''}>
        <RadioGroup.Label>Radios</RadioGroup.Label>
        <FormControl>
          <Radio name="radioChoices" value="radioOne" />
          <FormControl.Label>Radio one</FormControl.Label>
        </FormControl>
        <FormControl>
          <Radio name="radioChoices" value="radioTwo" />
          <FormControl.Label>Radio two</FormControl.Label>
        </FormControl>
        <FormControl>
          <Radio name="radioChoices" value="radioThree" />
          <FormControl.Label>Radio three</FormControl.Label>
        </FormControl>
      </RadioGroup>
    </div>
  )
}
```
