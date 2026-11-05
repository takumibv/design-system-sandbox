# get_component_examples

- args: `{"name":"DataTable"}`
- isError: false
- ms: 781
- chars: 91287

---

Here are some examples of how to use the `DataTable` component from the @primer/react package:

1.  [Product UI](/product/)
2.  [Components](/product/components/)
3.  [DataTable](/product/components/data-table/)

DataTable
=========

DataTable is a 2-dimensional data structure where each row is an item, and each column is a data point about the item.

Page navigation navigation
--------------------------

*   [Overview](/product/components/data-table/)
*   [Guidelines](/product/components/data-table/guidelines/)
*   [Accessibility](/product/components/data-table/accessibility/)

More items

React

experimental

[Storybook](https://primer.style/react/storybook/?path=/story/experimental-components-datatable--default)|[Source](https://github.com/primer/react/tree/main/packages/react/src/DataTable)|[Usage](https://primer-query.githubapp.com/?query=name%3A%22DataTable%22+package%3A%22%40primer%2Freact%22)

Figma

[View in Figma](https://www.figma.com/file/GCvY3Qv8czRgZgvl1dG6lp/?node-id=28591%3A24975)

[React examples](#react-examples)
---------------------------------

### [Default](#default)

Repositories
------------

Repository

Type

Updated

Dependabot

Code scanning

codeql-dca-worker

Internal

Nov 4, 2026

Alerts

Report secrets

aegir

Public

Nov 4, 2026

Alerts

Report secrets

strapi

Public

Nov 4, 2026

codeql-ci-nightlies

Public

Nov 4, 2026

Alerts

dependabot-updates

Public

Nov 3, 2026

tsx-create-react-app

Public

Oct 28, 2026

bootstrap

Public

Oct 7, 2026

Alerts

docker-templates

Public

Aug 12, 2026

Alerts

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {RelativeTime} from '@primer/react'
import {Table, DataTable} from '@primer/react/experimental'
export default function Default() {
  return (
    <Table.Container\>
      <Table.Title as\="h2" id\="repositories-default"\>
        Repositories
      </Table.Title\>
      <DataTable
        aria-labelledby="repositories-default"
        data={data}
        columns={\[
          {
            header: 'Repository',
            field: 'name',
            rowHeader: true,
          },
          {
            header: 'Type',
            field: 'type',
          },
          {
            header: 'Updated',
            field: 'updatedAt',
            renderCell: row \=> {
              return <RelativeTime date\={new Date(row.updatedAt)} />
            },
          },
          {
            header: 'Dependabot',
            field: 'securityFeatures.dependabot',
          },
          {
            header: 'Code scanning',
            field: 'securityFeatures.codeScanning',
          },
        \]}
      />
    </Table.Container\>
  )
}
const now \= Date.now()
const Second \= 1000
const Minute \= 60 \* Second
const Hour \= 60 \* Minute
const Day \= 24 \* Hour
const Week \= 7 \* Day
const Month \= 4 \* Week
const data: Array<{
  id: number
  name: string
  type: 'Public' | 'Internal'
  updatedAt: number
  securityFeatures: {
    dependabot: string
    codeScanning: string
  }
}\> \= \[
  {
    id: 1,
    name: 'codeql-dca-worker',
    type: 'Internal',
    updatedAt: now,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 2,
    name: 'aegir',
    type: 'Public',
    updatedAt: now \- 5 \* Minute,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 3,
    name: 'strapi',
    type: 'Public',
    updatedAt: now \- 1 \* Hour,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 4,
    name: 'codeql-ci-nightlies',
    type: 'Public',
    updatedAt: now \- 6 \* Hour,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: '',
    },
  },
  {
    id: 5,
    name: 'dependabot-updates',
    type: 'Public',
    updatedAt: now \- 1 \* Day,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 6,
    name: 'tsx-create-react-app',
    type: 'Public',
    updatedAt: now \- 1 \* Week,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 7,
    name: 'bootstrap',
    type: 'Public',
    updatedAt: now \- 1 \* Month,
    securityFeatures: {dependabot: 'Alerts', codeScanning: ''},
  },
  {
    id: 8,
    name: 'docker-templates',
    type: 'Public',
    updatedAt: now \- 3 \* Month,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: '',
    },
  },
\]

import React from 'react' import {RelativeTime} from '@primer/react' import {Table, DataTable} from '@primer/react/experimental' export default function Default() { return ( <Table.Container> <Table.Title as="h2" id="repositories-default"> Repositories </Table.Title> <DataTable aria-labelledby="repositories-default" data={data} columns={\[ { header: 'Repository', field: 'name', rowHeader: true, }, { header: 'Type', field: 'type', }, { header: 'Updated', field: 'updatedAt', renderCell: row => { return <RelativeTime date={new Date(row.updatedAt)} /> }, }, { header: 'Dependabot', field: 'securityFeatures.dependabot', }, { header: 'Code scanning', field: 'securityFeatures.codeScanning', }, \]} /> </Table.Container> ) } const now = Date.now() const Second = 1000 const Minute = 60 \* Second const Hour = 60 \* Minute const Day = 24 \* Hour const Week = 7 \* Day const Month = 4 \* Week const data: Array<{ id: number name: string type: 'Public' | 'Internal' updatedAt: number securityFeatures: { dependabot: string codeScanning: string } }> = \[ { id: 1, name: 'codeql-dca-worker', type: 'Internal', updatedAt: now, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 2, name: 'aegir', type: 'Public', updatedAt: now - 5 \* Minute, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 3, name: 'strapi', type: 'Public', updatedAt: now - 1 \* Hour, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 4, name: 'codeql-ci-nightlies', type: 'Public', updatedAt: now - 6 \* Hour, securityFeatures: { dependabot: 'Alerts', codeScanning: '', }, }, { id: 5, name: 'dependabot-updates', type: 'Public', updatedAt: now - 1 \* Day, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 6, name: 'tsx-create-react-app', type: 'Public', updatedAt: now - 1 \* Week, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 7, name: 'bootstrap', type: 'Public', updatedAt: now - 1 \* Month, securityFeatures: {dependabot: 'Alerts', codeScanning: ''}, }, { id: 8, name: 'docker-templates', type: 'Public', updatedAt: now - 3 \* Month, securityFeatures: { dependabot: 'Alerts', codeScanning: '', }, }, \] /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [With custom column widths](#with-custom-column-widths)

[Column sizing guidelines](/product/components/data-table/guidelines/#column-widths)

Repositories
------------

grow w/ 200px max

growCollapse w/ 100px min

auto

200px

undefined (defaults to grow)

codeql-dca-worker

Internal

Nov 4, 2026

Alerts

Report secrets

aegir

Public

Nov 4, 2026

Alerts

Report secrets

strapi

Public

Nov 4, 2026

codeql-ci-nightlies

Public

Nov 4, 2026

Alerts

dependabot-updates

Public

Nov 3, 2026

tsx-create-react-app

Public

Oct 28, 2026

bootstrap

Public

Oct 7, 2026

Alerts

docker-templates

Public

Aug 12, 2026

Alerts

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {RelativeTime} from '@primer/react'
import {Table, DataTable} from '@primer/react/experimental'
export default function ColumnWidths() {
  return (
    <Table.Container\>
      <Table.Title as\="h2" id\="repositories-colWidths"\>
        Repositories
      </Table.Title\>
      <DataTable
        aria-labelledby="repositories-colWidths"
        data={data}
        columns={\[
          {
            header: 'grow w/ 200px max',
            field: 'name',
            rowHeader: true,
            width: 'grow',
            maxWidth: '200px',
          },
          {
            header: 'growCollapse w/ 100px min',
            field: 'type',
            width: 'growCollapse',
            minWidth: '100px',
          },
          {
            header: 'auto',
            field: 'updatedAt',
            renderCell: row \=> {
              return <RelativeTime date\={new Date(row.updatedAt)} />
            },
            width: 'auto',
          },
          {
            header: '200px',
            field: 'securityFeatures.dependabot',
            width: '200px',
          },
          {
            header: 'undefined (defaults to grow)',
            field: 'securityFeatures.codeScanning',
          },
        \]}
      />
    </Table.Container\>
  )
}
const now \= Date.now()
const Second \= 1000
const Minute \= 60 \* Second
const Hour \= 60 \* Minute
const Day \= 24 \* Hour
const Week \= 7 \* Day
const Month \= 4 \* Week
const data: Array<{
  id: number
  name: string
  type: 'Public' | 'Internal'
  updatedAt: number
  securityFeatures: {
    dependabot: string
    codeScanning: string
  }
}\> \= \[
  {
    id: 1,
    name: 'codeql-dca-worker',
    type: 'Internal',
    updatedAt: now,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 2,
    name: 'aegir',
    type: 'Public',
    updatedAt: now \- 5 \* Minute,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 3,
    name: 'strapi',
    type: 'Public',
    updatedAt: now \- 1 \* Hour,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 4,
    name: 'codeql-ci-nightlies',
    type: 'Public',
    updatedAt: now \- 6 \* Hour,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: '',
    },
  },
  {
    id: 5,
    name: 'dependabot-updates',
    type: 'Public',
    updatedAt: now \- 1 \* Day,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 6,
    name: 'tsx-create-react-app',
    type: 'Public',
    updatedAt: now \- 1 \* Week,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 7,
    name: 'bootstrap',
    type: 'Public',
    updatedAt: now \- 1 \* Month,
    securityFeatures: {dependabot: 'Alerts', codeScanning: ''},
  },
  {
    id: 8,
    name: 'docker-templates',
    type: 'Public',
    updatedAt: now \- 3 \* Month,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: '',
    },
  },
\]

import React from 'react' import {RelativeTime} from '@primer/react' import {Table, DataTable} from '@primer/react/experimental' export default function ColumnWidths() { return ( <Table.Container> <Table.Title as="h2" id="repositories-colWidths"> Repositories </Table.Title> <DataTable aria-labelledby="repositories-colWidths" data={data} columns={\[ { header: 'grow w/ 200px max', field: 'name', rowHeader: true, width: 'grow', maxWidth: '200px', }, { header: 'growCollapse w/ 100px min', field: 'type', width: 'growCollapse', minWidth: '100px', }, { header: 'auto', field: 'updatedAt', renderCell: row => { return <RelativeTime date={new Date(row.updatedAt)} /> }, width: 'auto', }, { header: '200px', field: 'securityFeatures.dependabot', width: '200px', }, { header: 'undefined (defaults to grow)', field: 'securityFeatures.codeScanning', }, \]} /> </Table.Container> ) } const now = Date.now() const Second = 1000 const Minute = 60 \* Second const Hour = 60 \* Minute const Day = 24 \* Hour const Week = 7 \* Day const Month = 4 \* Week const data: Array<{ id: number name: string type: 'Public' | 'Internal' updatedAt: number securityFeatures: { dependabot: string codeScanning: string } }> = \[ { id: 1, name: 'codeql-dca-worker', type: 'Internal', updatedAt: now, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 2, name: 'aegir', type: 'Public', updatedAt: now - 5 \* Minute, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 3, name: 'strapi', type: 'Public', updatedAt: now - 1 \* Hour, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 4, name: 'codeql-ci-nightlies', type: 'Public', updatedAt: now - 6 \* Hour, securityFeatures: { dependabot: 'Alerts', codeScanning: '', }, }, { id: 5, name: 'dependabot-updates', type: 'Public', updatedAt: now - 1 \* Day, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 6, name: 'tsx-create-react-app', type: 'Public', updatedAt: now - 1 \* Week, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 7, name: 'bootstrap', type: 'Public', updatedAt: now - 1 \* Month, securityFeatures: {dependabot: 'Alerts', codeScanning: ''}, }, { id: 8, name: 'docker-templates', type: 'Public', updatedAt: now - 3 \* Month, securityFeatures: { dependabot: 'Alerts', codeScanning: '', }, }, \] /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Columns text alignment](#columns-text-alignment)

*   **Left (default):** Follows natural reading direction in right-to-left writing systems.
*   **Right-aligned** columns are used for numbers and other data that is best represented right-aligned.

In this example, there is a "Pull requests" column that is right-aligned to make it easier to visually scan and compare the numbers.

Repositories
------------

Repository

Pull requests

Type

Updated

codeql-dca-worker

12

Internal

Nov 4, 2026

aegir

34

Public

Nov 4, 2026

strapi

8

Public

Nov 4, 2026

codeql-ci-nightlies

1

Public

Nov 4, 2026

dependabot-updates

57

Public

Nov 3, 2026

tsx-create-react-app

35

Public

Oct 28, 2026

bootstrap

42

Public

Oct 7, 2026

docker-templates

3

Public

Aug 12, 2026

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {RelativeTime} from '@primer/react'
import {Table, DataTable} from '@primer/react/experimental'
export default function RightAlignedCol() {
  return (
    <Table.Container\>
      <Table.Title as\="h2" id\="repositories-rightAlignedCol"\>
        Repositories
      </Table.Title\>
      <DataTable
        aria-labelledby="repositories-rightAlignedCol"
        data={data}
        columns={\[
          {
            header: 'Repository',
            field: 'name',
            rowHeader: true,
          },
          {
            header: 'Pull requests',
            field: 'pullRequests',
            align: 'end',
          },
          {
            header: 'Type',
            field: 'type',
          },
          {
            header: 'Updated',
            field: 'updatedAt',
            renderCell: row \=> {
              return <RelativeTime date\={new Date(row.updatedAt)} />
            },
          },
        \]}
      />
    </Table.Container\>
  )
}
const now \= Date.now()
const Second \= 1000
const Minute \= 60 \* Second
const Hour \= 60 \* Minute
const Day \= 24 \* Hour
const Week \= 7 \* Day
const Month \= 4 \* Week
const data: Array<{
  id: number
  name: string
  pullRequests: number
  type: 'Public' | 'Internal'
  updatedAt: number
}\> \= \[
  {
    id: 1,
    name: 'codeql-dca-worker',
    pullRequests: 12,
    type: 'Internal',
    updatedAt: now,
  },
  {
    id: 2,
    name: 'aegir',
    pullRequests: 34,
    type: 'Public',
    updatedAt: now \- 5 \* Minute,
  },
  {
    id: 3,
    name: 'strapi',
    pullRequests: 8,
    type: 'Public',
    updatedAt: now \- 1 \* Hour,
  },
  {
    id: 4,
    name: 'codeql-ci-nightlies',
    pullRequests: 1,
    type: 'Public',
    updatedAt: now \- 6 \* Hour,
  },
  {
    id: 5,
    name: 'dependabot-updates',
    pullRequests: 57,
    type: 'Public',
    updatedAt: now \- 1 \* Day,
  },
  {
    id: 6,
    name: 'tsx-create-react-app',
    pullRequests: 35,
    type: 'Public',
    updatedAt: now \- 1 \* Week,
  },
  {
    id: 7,
    name: 'bootstrap',
    pullRequests: 42,
    type: 'Public',
    updatedAt: now \- 1 \* Month,
  },
  {
    id: 8,
    name: 'docker-templates',
    pullRequests: 3,
    type: 'Public',
    updatedAt: now \- 3 \* Month,
  },
\]

import React from 'react' import {RelativeTime} from '@primer/react' import {Table, DataTable} from '@primer/react/experimental' export default function RightAlignedCol() { return ( <Table.Container> <Table.Title as="h2" id="repositories-rightAlignedCol"> Repositories </Table.Title> <DataTable aria-labelledby="repositories-rightAlignedCol" data={data} columns={\[ { header: 'Repository', field: 'name', rowHeader: true, }, { header: 'Pull requests', field: 'pullRequests', align: 'end', }, { header: 'Type', field: 'type', }, { header: 'Updated', field: 'updatedAt', renderCell: row => { return <RelativeTime date={new Date(row.updatedAt)} /> }, }, \]} /> </Table.Container> ) } const now = Date.now() const Second = 1000 const Minute = 60 \* Second const Hour = 60 \* Minute const Day = 24 \* Hour const Week = 7 \* Day const Month = 4 \* Week const data: Array<{ id: number name: string pullRequests: number type: 'Public' | 'Internal' updatedAt: number }> = \[ { id: 1, name: 'codeql-dca-worker', pullRequests: 12, type: 'Internal', updatedAt: now, }, { id: 2, name: 'aegir', pullRequests: 34, type: 'Public', updatedAt: now - 5 \* Minute, }, { id: 3, name: 'strapi', pullRequests: 8, type: 'Public', updatedAt: now - 1 \* Hour, }, { id: 4, name: 'codeql-ci-nightlies', pullRequests: 1, type: 'Public', updatedAt: now - 6 \* Hour, }, { id: 5, name: 'dependabot-updates', pullRequests: 57, type: 'Public', updatedAt: now - 1 \* Day, }, { id: 6, name: 'tsx-create-react-app', pullRequests: 35, type: 'Public', updatedAt: now - 1 \* Week, }, { id: 7, name: 'bootstrap', pullRequests: 42, type: 'Public', updatedAt: now - 1 \* Month, }, { id: 8, name: 'docker-templates', pullRequests: 3, type: 'Public', updatedAt: now - 3 \* Month, }, \] /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Table cell density](#table-cell-density)

*   **Condensed:** Maximizes data visibility in a small area.
*   **Normal (default):** Balances data display with whitespace for clarity.
*   **Spacious:** Enhances readability for dense or complex content.

This example uses `'spacious'` table cell padding.

Repositories
------------

Repository

Type

Updated

Dependabot

Code scanning

codeql-dca-worker

Internal

Nov 4, 2026

Alerts

Report secrets

aegir

Public

Nov 4, 2026

Alerts

Report secrets

strapi

Public

Nov 4, 2026

codeql-ci-nightlies

Public

Nov 4, 2026

Alerts

dependabot-updates

Public

Nov 3, 2026

tsx-create-react-app

Public

Oct 28, 2026

bootstrap

Public

Oct 7, 2026

Alerts

docker-templates

Public

Aug 12, 2026

Alerts

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {RelativeTime} from '@primer/react'
import {Table, DataTable} from '@primer/react/experimental'
export default function Density() {
  return (
    <Table.Container\>
      <Table.Title as\="h2" id\="repositories-default"\>
        Repositories
      </Table.Title\>
      <DataTable
        aria-labelledby="repositories-default"
        cellPadding="spacious"
        data={data}
        columns={\[
          {
            header: 'Repository',
            field: 'name',
            rowHeader: true,
          },
          {
            header: 'Type',
            field: 'type',
          },
          {
            header: 'Updated',
            field: 'updatedAt',
            renderCell: row \=> {
              return <RelativeTime date\={new Date(row.updatedAt)} />
            },
          },
          {
            header: 'Dependabot',
            field: 'securityFeatures.dependabot',
          },
          {
            header: 'Code scanning',
            field: 'securityFeatures.codeScanning',
          },
        \]}
      />
    </Table.Container\>
  )
}
const now \= Date.now()
const Second \= 1000
const Minute \= 60 \* Second
const Hour \= 60 \* Minute
const Day \= 24 \* Hour
const Week \= 7 \* Day
const Month \= 4 \* Week
const data: Array<{
  id: number
  name: string
  type: 'Public' | 'Internal'
  updatedAt: number
  securityFeatures: {
    dependabot: string
    codeScanning: string
  }
}\> \= \[
  {
    id: 1,
    name: 'codeql-dca-worker',
    type: 'Internal',
    updatedAt: now,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 2,
    name: 'aegir',
    type: 'Public',
    updatedAt: now \- 5 \* Minute,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 3,
    name: 'strapi',
    type: 'Public',
    updatedAt: now \- 1 \* Hour,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 4,
    name: 'codeql-ci-nightlies',
    type: 'Public',
    updatedAt: now \- 6 \* Hour,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: '',
    },
  },
  {
    id: 5,
    name: 'dependabot-updates',
    type: 'Public',
    updatedAt: now \- 1 \* Day,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 6,
    name: 'tsx-create-react-app',
    type: 'Public',
    updatedAt: now \- 1 \* Week,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 7,
    name: 'bootstrap',
    type: 'Public',
    updatedAt: now \- 1 \* Month,
    securityFeatures: {dependabot: 'Alerts', codeScanning: ''},
  },
  {
    id: 8,
    name: 'docker-templates',
    type: 'Public',
    updatedAt: now \- 3 \* Month,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: '',
    },
  },
\]

import React from 'react' import {RelativeTime} from '@primer/react' import {Table, DataTable} from '@primer/react/experimental' export default function Density() { return ( <Table.Container> <Table.Title as="h2" id="repositories-default"> Repositories </Table.Title> <DataTable aria-labelledby="repositories-default" cellPadding="spacious" data={data} columns={\[ { header: 'Repository', field: 'name', rowHeader: true, }, { header: 'Type', field: 'type', }, { header: 'Updated', field: 'updatedAt', renderCell: row => { return <RelativeTime date={new Date(row.updatedAt)} /> }, }, { header: 'Dependabot', field: 'securityFeatures.dependabot', }, { header: 'Code scanning', field: 'securityFeatures.codeScanning', }, \]} /> </Table.Container> ) } const now = Date.now() const Second = 1000 const Minute = 60 \* Second const Hour = 60 \* Minute const Day = 24 \* Hour const Week = 7 \* Day const Month = 4 \* Week const data: Array<{ id: number name: string type: 'Public' | 'Internal' updatedAt: number securityFeatures: { dependabot: string codeScanning: string } }> = \[ { id: 1, name: 'codeql-dca-worker', type: 'Internal', updatedAt: now, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 2, name: 'aegir', type: 'Public', updatedAt: now - 5 \* Minute, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 3, name: 'strapi', type: 'Public', updatedAt: now - 1 \* Hour, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 4, name: 'codeql-ci-nightlies', type: 'Public', updatedAt: now - 6 \* Hour, securityFeatures: { dependabot: 'Alerts', codeScanning: '', }, }, { id: 5, name: 'dependabot-updates', type: 'Public', updatedAt: now - 1 \* Day, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 6, name: 'tsx-create-react-app', type: 'Public', updatedAt: now - 1 \* Week, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 7, name: 'bootstrap', type: 'Public', updatedAt: now - 1 \* Month, securityFeatures: {dependabot: 'Alerts', codeScanning: ''}, }, { id: 8, name: 'docker-templates', type: 'Public', updatedAt: now - 3 \* Month, securityFeatures: { dependabot: 'Alerts', codeScanning: '', }, }, \] /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [Sort rows by column data](#sort-rows-by-column-data)

If a table is sortable, one column must be sorted by default. Clicking a sorted column toggles between ascending and descending; unsorted columns sort in ascending order on first click.

In this example, the rows are sortable by "Repository" and "Updated" column data.

Repositories
------------

Repository

Type

Updated

Dependabot

Code scanning

codeql-dca-worker

Internal

Nov 4, 2026

Alerts

Report secrets

aegir

Public

Nov 4, 2026

Alerts

Report secrets

strapi

Public

Nov 4, 2026

codeql-ci-nightlies

Public

Nov 4, 2026

Alerts

dependabot-updates

Public

Nov 3, 2026

tsx-create-react-app

Public

Oct 28, 2026

bootstrap

Public

Oct 7, 2026

Alerts

docker-templates

Public

Aug 12, 2026

Alerts

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {RelativeTime} from '@primer/react'
import {Table, DataTable} from '@primer/react/experimental'
export default function Sort() {
  return (
    <Table.Container\>
      <Table.Title as\="h2" id\="repositories-sort"\>
        Repositories
      </Table.Title\>
      <DataTable
        aria-labelledby="repositories-sort"
        data={Array.from(data).sort((a, b) \=> {
          return b.updatedAt \- a.updatedAt
        })}
        columns={\[
          {
            header: 'Repository',
            field: 'name',
            rowHeader: true,
            sortBy: 'alphanumeric',
          },
          {
            header: 'Type',
            field: 'type',
          },
          {
            header: 'Updated',
            field: 'updatedAt',
            renderCell: row \=> {
              return <RelativeTime date\={new Date(row.updatedAt)} />
            },
            sortBy: 'datetime',
          },
          {
            header: 'Dependabot',
            field: 'securityFeatures.dependabot',
          },
          {
            header: 'Code scanning',
            field: 'securityFeatures.codeScanning',
          },
        \]}
        initialSortColumn="updatedAt"
        initialSortDirection="DESC"
      />
    </Table.Container\>
  )
}
const now \= Date.now()
const Second \= 1000
const Minute \= 60 \* Second
const Hour \= 60 \* Minute
const Day \= 24 \* Hour
const Week \= 7 \* Day
const Month \= 4 \* Week
const data: Array<{
  id: number
  name: string
  type: 'Public' | 'Internal'
  updatedAt: number
  securityFeatures: {
    dependabot: string
    codeScanning: string
  }
}\> \= \[
  {
    id: 1,
    name: 'codeql-dca-worker',
    type: 'Internal',
    updatedAt: now,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 2,
    name: 'aegir',
    type: 'Public',
    updatedAt: now \- 5 \* Minute,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 3,
    name: 'strapi',
    type: 'Public',
    updatedAt: now \- 1 \* Hour,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 4,
    name: 'codeql-ci-nightlies',
    type: 'Public',
    updatedAt: now \- 6 \* Hour,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: '',
    },
  },
  {
    id: 5,
    name: 'dependabot-updates',
    type: 'Public',
    updatedAt: now \- 1 \* Day,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 6,
    name: 'tsx-create-react-app',
    type: 'Public',
    updatedAt: now \- 1 \* Week,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 7,
    name: 'bootstrap',
    type: 'Public',
    updatedAt: now \- 1 \* Month,
    securityFeatures: {dependabot: 'Alerts', codeScanning: ''},
  },
  {
    id: 8,
    name: 'docker-templates',
    type: 'Public',
    updatedAt: now \- 3 \* Month,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: '',
    },
  },
\]

import React from 'react' import {RelativeTime} from '@primer/react' import {Table, DataTable} from '@primer/react/experimental' export default function Sort() { return ( <Table.Container> <Table.Title as="h2" id="repositories-sort"> Repositories </Table.Title> <DataTable aria-labelledby="repositories-sort" data={Array.from(data).sort((a, b) => { return b.updatedAt - a.updatedAt })} columns={\[ { header: 'Repository', field: 'name', rowHeader: true, sortBy: 'alphanumeric', }, { header: 'Type', field: 'type', }, { header: 'Updated', field: 'updatedAt', renderCell: row => { return <RelativeTime date={new Date(row.updatedAt)} /> }, sortBy: 'datetime', }, { header: 'Dependabot', field: 'securityFeatures.dependabot', }, { header: 'Code scanning', field: 'securityFeatures.codeScanning', }, \]} initialSortColumn="updatedAt" initialSortDirection="DESC" /> </Table.Container> ) } const now = Date.now() const Second = 1000 const Minute = 60 \* Second const Hour = 60 \* Minute const Day = 24 \* Hour const Week = 7 \* Day const Month = 4 \* Week const data: Array<{ id: number name: string type: 'Public' | 'Internal' updatedAt: number securityFeatures: { dependabot: string codeScanning: string } }> = \[ { id: 1, name: 'codeql-dca-worker', type: 'Internal', updatedAt: now, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 2, name: 'aegir', type: 'Public', updatedAt: now - 5 \* Minute, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 3, name: 'strapi', type: 'Public', updatedAt: now - 1 \* Hour, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 4, name: 'codeql-ci-nightlies', type: 'Public', updatedAt: now - 6 \* Hour, securityFeatures: { dependabot: 'Alerts', codeScanning: '', }, }, { id: 5, name: 'dependabot-updates', type: 'Public', updatedAt: now - 1 \* Day, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 6, name: 'tsx-create-react-app', type: 'Public', updatedAt: now - 1 \* Week, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 7, name: 'bootstrap', type: 'Public', updatedAt: now - 1 \* Month, securityFeatures: {dependabot: 'Alerts', codeScanning: ''}, }, { id: 8, name: 'docker-templates', type: 'Public', updatedAt: now - 3 \* Month, securityFeatures: { dependabot: 'Alerts', codeScanning: '', }, }, \] /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [With title and subtitle](#with-title-and-subtitle)

[Table header guidelines](/product/components/data-table/guidelines/#table-header)

Repositories
------------

A subtitle could appear here to give extra context to the data.

Repository

Type

Updated

Dependabot

Code scanning

codeql-dca-worker

Internal

Nov 4, 2026

Alerts

Report secrets

aegir

Public

Nov 4, 2026

Alerts

Report secrets

strapi

Public

Nov 4, 2026

codeql-ci-nightlies

Public

Nov 4, 2026

Alerts

dependabot-updates

Public

Nov 3, 2026

tsx-create-react-app

Public

Oct 28, 2026

bootstrap

Public

Oct 7, 2026

Alerts

docker-templates

Public

Aug 12, 2026

Alerts

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {RelativeTime} from '@primer/react'
import {Table, DataTable} from '@primer/react/experimental'
export default function TitleSubtitle() {
  return (
    <Table.Container\>
      <Table.Title as\="h2" id\="repositories-titleSubtitle"\>
        Repositories
      </Table.Title\>
      <Table.Subtitle as\="p" id\="repositories-subtitle-titleSubtitle"\>
        A subtitle could appear here to give extra context to the data.
      </Table.Subtitle\>
      <DataTable
        aria-labelledby="repositories-titleSubtitle"
        aria-describedby="repositories-subtitle-titleSubtitle"
        data={data}
        columns={\[
          {
            header: 'Repository',
            field: 'name',
            rowHeader: true,
          },
          {
            header: 'Type',
            field: 'type',
          },
          {
            header: 'Updated',
            field: 'updatedAt',
            renderCell: row \=> {
              return <RelativeTime date\={new Date(row.updatedAt)} />
            },
          },
          {
            header: 'Dependabot',
            field: 'securityFeatures.dependabot',
          },
          {
            header: 'Code scanning',
            field: 'securityFeatures.codeScanning',
          },
        \]}
      />
    </Table.Container\>
  )
}
const now \= Date.now()
const Second \= 1000
const Minute \= 60 \* Second
const Hour \= 60 \* Minute
const Day \= 24 \* Hour
const Week \= 7 \* Day
const Month \= 4 \* Week
const data: Array<{
  id: number
  name: string
  type: 'Public' | 'Internal'
  updatedAt: number
  securityFeatures: {
    dependabot: string
    codeScanning: string
  }
}\> \= \[
  {
    id: 1,
    name: 'codeql-dca-worker',
    type: 'Internal',
    updatedAt: now,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 2,
    name: 'aegir',
    type: 'Public',
    updatedAt: now \- 5 \* Minute,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 3,
    name: 'strapi',
    type: 'Public',
    updatedAt: now \- 1 \* Hour,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 4,
    name: 'codeql-ci-nightlies',
    type: 'Public',
    updatedAt: now \- 6 \* Hour,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: '',
    },
  },
  {
    id: 5,
    name: 'dependabot-updates',
    type: 'Public',
    updatedAt: now \- 1 \* Day,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 6,
    name: 'tsx-create-react-app',
    type: 'Public',
    updatedAt: now \- 1 \* Week,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 7,
    name: 'bootstrap',
    type: 'Public',
    updatedAt: now \- 1 \* Month,
    securityFeatures: {dependabot: 'Alerts', codeScanning: ''},
  },
  {
    id: 8,
    name: 'docker-templates',
    type: 'Public',
    updatedAt: now \- 3 \* Month,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: '',
    },
  },
\]

import React from 'react' import {RelativeTime} from '@primer/react' import {Table, DataTable} from '@primer/react/experimental' export default function TitleSubtitle() { return ( <Table.Container> <Table.Title as="h2" id="repositories-titleSubtitle"> Repositories </Table.Title> <Table.Subtitle as="p" id="repositories-subtitle-titleSubtitle"> A subtitle could appear here to give extra context to the data. </Table.Subtitle> <DataTable aria-labelledby="repositories-titleSubtitle" aria-describedby="repositories-subtitle-titleSubtitle" data={data} columns={\[ { header: 'Repository', field: 'name', rowHeader: true, }, { header: 'Type', field: 'type', }, { header: 'Updated', field: 'updatedAt', renderCell: row => { return <RelativeTime date={new Date(row.updatedAt)} /> }, }, { header: 'Dependabot', field: 'securityFeatures.dependabot', }, { header: 'Code scanning', field: 'securityFeatures.codeScanning', }, \]} /> </Table.Container> ) } const now = Date.now() const Second = 1000 const Minute = 60 \* Second const Hour = 60 \* Minute const Day = 24 \* Hour const Week = 7 \* Day const Month = 4 \* Week const data: Array<{ id: number name: string type: 'Public' | 'Internal' updatedAt: number securityFeatures: { dependabot: string codeScanning: string } }> = \[ { id: 1, name: 'codeql-dca-worker', type: 'Internal', updatedAt: now, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 2, name: 'aegir', type: 'Public', updatedAt: now - 5 \* Minute, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 3, name: 'strapi', type: 'Public', updatedAt: now - 1 \* Hour, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 4, name: 'codeql-ci-nightlies', type: 'Public', updatedAt: now - 6 \* Hour, securityFeatures: { dependabot: 'Alerts', codeScanning: '', }, }, { id: 5, name: 'dependabot-updates', type: 'Public', updatedAt: now - 1 \* Day, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 6, name: 'tsx-create-react-app', type: 'Public', updatedAt: now - 1 \* Week, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 7, name: 'bootstrap', type: 'Public', updatedAt: now - 1 \* Month, securityFeatures: {dependabot: 'Alerts', codeScanning: ''}, }, { id: 8, name: 'docker-templates', type: 'Public', updatedAt: now - 3 \* Month, securityFeatures: { dependabot: 'Alerts', codeScanning: '', }, }, \] /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [With table action](#with-table-action)

[Table header guidelines](/product/components/data-table/guidelines/#table-header)

Repositories
------------

Action

A subtitle could appear here to give extra context to the data.

Repository

Type

Updated

Dependabot

Code scanning

codeql-dca-worker

Internal

Nov 4, 2026

Alerts

Report secrets

aegir

Public

Nov 4, 2026

Alerts

Report secrets

strapi

Public

Nov 4, 2026

codeql-ci-nightlies

Public

Nov 4, 2026

Alerts

dependabot-updates

Public

Nov 3, 2026

tsx-create-react-app

Public

Oct 28, 2026

bootstrap

Public

Oct 7, 2026

Alerts

docker-templates

Public

Aug 12, 2026

Alerts

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {Button, RelativeTime} from '@primer/react'
import {Table, DataTable} from '@primer/react/experimental'
export default function HeaderAction() {
  return (
    <Table.Container\>
      <Table.Title as\="h2" id\="repositories-headerAction"\>
        Repositories
      </Table.Title\>
      <Table.Actions\>
        <Button\>Action</Button\>
      </Table.Actions\>
      <Table.Divider />
      <Table.Subtitle as\="p" id\="repositories-subtitle-headerAction"\>
        A subtitle could appear here to give extra context to the data.
      </Table.Subtitle\>
      <DataTable
        aria-labelledby="repositories-default-headerAction"
        aria-describedby="repositories-subtitle-headerAction"
        data={data}
        columns={\[
          {
            header: 'Repository',
            field: 'name',
            rowHeader: true,
          },
          {
            header: 'Type',
            field: 'type',
          },
          {
            header: 'Updated',
            field: 'updatedAt',
            renderCell: row \=> {
              return <RelativeTime date\={new Date(row.updatedAt)} />
            },
          },
          {
            header: 'Dependabot',
            field: 'securityFeatures.dependabot',
          },
          {
            header: 'Code scanning',
            field: 'securityFeatures.codeScanning',
          },
        \]}
      />
    </Table.Container\>
  )
}
const now \= Date.now()
const Second \= 1000
const Minute \= 60 \* Second
const Hour \= 60 \* Minute
const Day \= 24 \* Hour
const Week \= 7 \* Day
const Month \= 4 \* Week
const data: Array<{
  id: number
  name: string
  type: 'Public' | 'Internal'
  updatedAt: number
  securityFeatures: {
    dependabot: string
    codeScanning: string
  }
}\> \= \[
  {
    id: 1,
    name: 'codeql-dca-worker',
    type: 'Internal',
    updatedAt: now,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 2,
    name: 'aegir',
    type: 'Public',
    updatedAt: now \- 5 \* Minute,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 3,
    name: 'strapi',
    type: 'Public',
    updatedAt: now \- 1 \* Hour,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 4,
    name: 'codeql-ci-nightlies',
    type: 'Public',
    updatedAt: now \- 6 \* Hour,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: '',
    },
  },
  {
    id: 5,
    name: 'dependabot-updates',
    type: 'Public',
    updatedAt: now \- 1 \* Day,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 6,
    name: 'tsx-create-react-app',
    type: 'Public',
    updatedAt: now \- 1 \* Week,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 7,
    name: 'bootstrap',
    type: 'Public',
    updatedAt: now \- 1 \* Month,
    securityFeatures: {dependabot: 'Alerts', codeScanning: ''},
  },
  {
    id: 8,
    name: 'docker-templates',
    type: 'Public',
    updatedAt: now \- 3 \* Month,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: '',
    },
  },
\]

import React from 'react' import {Button, RelativeTime} from '@primer/react' import {Table, DataTable} from '@primer/react/experimental' export default function HeaderAction() { return ( <Table.Container> <Table.Title as="h2" id="repositories-headerAction"> Repositories </Table.Title> <Table.Actions> <Button>Action</Button> </Table.Actions> <Table.Divider /> <Table.Subtitle as="p" id="repositories-subtitle-headerAction"> A subtitle could appear here to give extra context to the data. </Table.Subtitle> <DataTable aria-labelledby="repositories-default-headerAction" aria-describedby="repositories-subtitle-headerAction" data={data} columns={\[ { header: 'Repository', field: 'name', rowHeader: true, }, { header: 'Type', field: 'type', }, { header: 'Updated', field: 'updatedAt', renderCell: row => { return <RelativeTime date={new Date(row.updatedAt)} /> }, }, { header: 'Dependabot', field: 'securityFeatures.dependabot', }, { header: 'Code scanning', field: 'securityFeatures.codeScanning', }, \]} /> </Table.Container> ) } const now = Date.now() const Second = 1000 const Minute = 60 \* Second const Hour = 60 \* Minute const Day = 24 \* Hour const Week = 7 \* Day const Month = 4 \* Week const data: Array<{ id: number name: string type: 'Public' | 'Internal' updatedAt: number securityFeatures: { dependabot: string codeScanning: string } }> = \[ { id: 1, name: 'codeql-dca-worker', type: 'Internal', updatedAt: now, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 2, name: 'aegir', type: 'Public', updatedAt: now - 5 \* Minute, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 3, name: 'strapi', type: 'Public', updatedAt: now - 1 \* Hour, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 4, name: 'codeql-ci-nightlies', type: 'Public', updatedAt: now - 6 \* Hour, securityFeatures: { dependabot: 'Alerts', codeScanning: '', }, }, { id: 5, name: 'dependabot-updates', type: 'Public', updatedAt: now - 1 \* Day, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 6, name: 'tsx-create-react-app', type: 'Public', updatedAt: now - 1 \* Week, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 7, name: 'bootstrap', type: 'Public', updatedAt: now - 1 \* Month, securityFeatures: {dependabot: 'Alerts', codeScanning: ''}, }, { id: 8, name: 'docker-templates', type: 'Public', updatedAt: now - 3 \* Month, securityFeatures: { dependabot: 'Alerts', codeScanning: '', }, }, \] /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [With single row action](#with-single-row-action)

Actions that affect the item represented in the row are placed in the last column, and they don't require a visible column header.

Repositories
------------

Repository

Type

Updated

Dependabot

Code scanning

Actions

codeql-dca-worker

Internal

Nov 4, 2026

Alerts

Report secrets

Download: codeql-dca-worker

aegir

Public

Nov 4, 2026

Alerts

Report secrets

Download: aegir

strapi

Public

Nov 4, 2026

Download: strapi

codeql-ci-nightlies

Public

Nov 4, 2026

Alerts

Download: codeql-ci-nightlies

dependabot-updates

Public

Nov 3, 2026

Download: dependabot-updates

tsx-create-react-app

Public

Oct 28, 2026

Download: tsx-create-react-app

bootstrap

Public

Oct 7, 2026

Alerts

Download: bootstrap

docker-templates

Public

Aug 12, 2026

Alerts

Download: docker-templates

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {IconButton, RelativeTime} from '@primer/react'
import {Table, DataTable} from '@primer/react/experimental'
import {DownloadIcon} from '@primer/octicons-react'
export default function RowAction() {
  return (
    <Table.Container\>
      <Table.Title as\="h2" id\="repositories-rowAction"\>
        Repositories
      </Table.Title\>
      <DataTable
        aria-labelledby="repositories-rowAction"
        data={data}
        columns={\[
          {
            header: 'Repository',
            field: 'name',
            rowHeader: true,
          },
          {
            header: 'Type',
            field: 'type',
          },
          {
            header: 'Updated',
            field: 'updatedAt',
            renderCell: row \=> {
              return <RelativeTime date\={new Date(row.updatedAt)} />
            },
          },
          {
            header: 'Dependabot',
            field: 'securityFeatures.dependabot',
          },
          {
            header: 'Code scanning',
            field: 'securityFeatures.codeScanning',
          },
          {
            id: 'actions',
            // The header is styled to be visually hidden, but still accessible to screen readers
            header: () \=> (
              <span
                style\={{
                  clipPath: 'inset(50%)',
                  height: '1px',
                  overflow: 'hidden',
                  position: 'absolute',
                  whiteSpace: 'nowrap',
                  width: '1px',
                }}
              \>
                Actions
              </span\>
            ),
            renderCell: row \=> {
              return (
                <IconButton
                  aria-label\={\`Download: ${row.name}\`}
                  title\={\`Download: ${row.name}\`}
                  icon\={DownloadIcon}
                  variant\="invisible"
                  onClick\={() \=> {
                    alert(\`Fake downloading ${row.name}\`)
                  }}
                />
              )
            },
          },
        \]}
      />
    </Table.Container\>
  )
}
const now \= Date.now()
const Second \= 1000
const Minute \= 60 \* Second
const Hour \= 60 \* Minute
const Day \= 24 \* Hour
const Week \= 7 \* Day
const Month \= 4 \* Week
const data: Array<{
  id: number
  name: string
  type: 'Public' | 'Internal'
  updatedAt: number
  securityFeatures: {
    dependabot: string
    codeScanning: string
  }
}\> \= \[
  {
    id: 1,
    name: 'codeql-dca-worker',
    type: 'Internal',
    updatedAt: now,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 2,
    name: 'aegir',
    type: 'Public',
    updatedAt: now \- 5 \* Minute,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 3,
    name: 'strapi',
    type: 'Public',
    updatedAt: now \- 1 \* Hour,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 4,
    name: 'codeql-ci-nightlies',
    type: 'Public',
    updatedAt: now \- 6 \* Hour,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: '',
    },
  },
  {
    id: 5,
    name: 'dependabot-updates',
    type: 'Public',
    updatedAt: now \- 1 \* Day,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 6,
    name: 'tsx-create-react-app',
    type: 'Public',
    updatedAt: now \- 1 \* Week,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
  {
    id: 7,
    name: 'bootstrap',
    type: 'Public',
    updatedAt: now \- 1 \* Month,
    securityFeatures: {dependabot: 'Alerts', codeScanning: ''},
  },
  {
    id: 8,
    name: 'docker-templates',
    type: 'Public',
    updatedAt: now \- 3 \* Month,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: '',
    },
  },
\]

import React from 'react' import {IconButton, RelativeTime} from '@primer/react' import {Table, DataTable} from '@primer/react/experimental' import {DownloadIcon} from '@primer/octicons-react' export default function RowAction() { return ( <Table.Container> <Table.Title as="h2" id="repositories-rowAction"> Repositories </Table.Title> <DataTable aria-labelledby="repositories-rowAction" data={data} columns={\[ { header: 'Repository', field: 'name', rowHeader: true, }, { header: 'Type', field: 'type', }, { header: 'Updated', field: 'updatedAt', renderCell: row => { return <RelativeTime date={new Date(row.updatedAt)} /> }, }, { header: 'Dependabot', field: 'securityFeatures.dependabot', }, { header: 'Code scanning', field: 'securityFeatures.codeScanning', }, { id: 'actions', // The header is styled to be visually hidden, but still accessible to screen readers header: () => ( <span style={{ clipPath: 'inset(50%)', height: '1px', overflow: 'hidden', position: 'absolute', whiteSpace: 'nowrap', width: '1px', }} > Actions </span> ), renderCell: row => { return ( <IconButton aria-label={\`Download: ${row.name}\`} title={\`Download: ${row.name}\`} icon={DownloadIcon} variant="invisible" onClick={() => { alert(\`Fake downloading ${row.name}\`) }} /> ) }, }, \]} /> </Table.Container> ) } const now = Date.now() const Second = 1000 const Minute = 60 \* Second const Hour = 60 \* Minute const Day = 24 \* Hour const Week = 7 \* Day const Month = 4 \* Week const data: Array<{ id: number name: string type: 'Public' | 'Internal' updatedAt: number securityFeatures: { dependabot: string codeScanning: string } }> = \[ { id: 1, name: 'codeql-dca-worker', type: 'Internal', updatedAt: now, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 2, name: 'aegir', type: 'Public', updatedAt: now - 5 \* Minute, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 3, name: 'strapi', type: 'Public', updatedAt: now - 1 \* Hour, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 4, name: 'codeql-ci-nightlies', type: 'Public', updatedAt: now - 6 \* Hour, securityFeatures: { dependabot: 'Alerts', codeScanning: '', }, }, { id: 5, name: 'dependabot-updates', type: 'Public', updatedAt: now - 1 \* Day, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 6, name: 'tsx-create-react-app', type: 'Public', updatedAt: now - 1 \* Week, securityFeatures: { dependabot: '', codeScanning: '', }, }, { id: 7, name: 'bootstrap', type: 'Public', updatedAt: now - 1 \* Month, securityFeatures: {dependabot: 'Alerts', codeScanning: ''}, }, { id: 8, name: 'docker-templates', type: 'Public', updatedAt: now - 3 \* Month, securityFeatures: { dependabot: 'Alerts', codeScanning: '', }, }, \] /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [With multiple row actions](#with-multiple-row-actions)

If you have multiple actions for a row, start by pulling them into a dropdown menu.

If one of the actions is heavily used, pull it out for easier access. Do not pull out more than 1 action.

Row actions in a dropdown
-------------------------

Repository

Type

Updated

Dependabot

Code scanning

Actions

codeql-dca-worker

Internal

Nov 4, 2026

Alerts

Report secrets

Actions: codeql-dca-worker

aegir

Public

Nov 4, 2026

Alerts

Report secrets

Actions: aegir

strapi

Public

Nov 4, 2026

Actions: strapi

Row actions inline
------------------

Repository

Type

Updated

Dependabot

Code scanning

Actions

codeql-dca-worker

Internal

Nov 4, 2026

Alerts

Report secrets

Edit: codeql-dca-workerDelete: codeql-dca-worker

aegir

Public

Nov 4, 2026

Alerts

Report secrets

Edit: aegirDelete: aegir

strapi

Public

Nov 4, 2026

Edit: strapiDelete: strapi

Row actions overflowing
-----------------------

Repository

Type

Updated

Dependabot

Code scanning

Actions

codeql-dca-worker

Internal

Nov 4, 2026

Alerts

Report secrets

Edit: codeql-dca-workerActions: codeql-dca-worker

aegir

Public

Nov 4, 2026

Alerts

Report secrets

Edit: aegirActions: aegir

strapi

Public

Nov 4, 2026

Edit: strapiActions: strapi

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {ActionList, ActionMenu, IconButton, RelativeTime, Stack} from '@primer/react'
import {Table, DataTable} from '@primer/react/experimental'
import {KebabHorizontalIcon, PencilIcon, TrashIcon} from '@primer/octicons-react'
export default function RowAction() {
  return (
    <Stack\>
      {/\*-------------------------------------------------------
      Row actions in a dropdown ------------------------------
    -------------------------------------------------------\*/}
      <Table.Container\>
        <Table.Title as\="h2" id\="rowActionsDropdown"\>
          Row actions in a dropdown
        </Table.Title\>
        <DataTable
          aria-labelledby="rowActionsDropdown"
          data={data}
          columns={\[
            {
              header: 'Repository',
              field: 'name',
              rowHeader: true,
            },
            {
              header: 'Type',
              field: 'type',
            },
            {
              header: 'Updated',
              field: 'updatedAt',
              renderCell: row \=> {
                return <RelativeTime date\={new Date(row.updatedAt)} />
              },
            },
            {
              header: 'Dependabot',
              field: 'securityFeatures.dependabot',
            },
            {
              header: 'Code scanning',
              field: 'securityFeatures.codeScanning',
            },
            {
              id: 'actions',
              // The header is styled to be visually hidden, but still accessible to screen readers
              header: () \=> (
                <span
                  style\={{
                    clipPath: 'inset(50%)',
                    height: '1px',
                    overflow: 'hidden',
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    width: '1px',
                  }}
                \>
                  Actions
                </span\>
              ),
              renderCell: row \=> {
                return (
                  <\>
                    <ActionMenu\>
                      <ActionMenu.Anchor\>
                        <IconButton
                          aria-label\={\`Actions: ${row.name}\`}
                          title\={\`Actions: ${row.name}\`}
                          icon\={KebabHorizontalIcon}
                          variant\="invisible"
                        />
                      </ActionMenu.Anchor\>
                      <ActionMenu.Overlay\>
                        <ActionList\>
                          <ActionList.Item\>Edit row</ActionList.Item\>
                          <ActionList.Item\>Copy row</ActionList.Item\>
                          <ActionList.Item\>Export row as CSV</ActionList.Item\>
                          <ActionList.Divider />
                          <ActionList.Item variant\="danger"\>Delete row</ActionList.Item\>
                        </ActionList\>
                      </ActionMenu.Overlay\>
                    </ActionMenu\>
                  </\>
                )
              },
            },
          \]}
        />
      </Table.Container\>
      {/\*-------------------------------------------------------
      Row actions inline -------------------------------------
    -------------------------------------------------------\*/}
      <Table.Container\>
        <Table.Title as\="h2" id\="rowActionsInline"\>
          Row actions inline
        </Table.Title\>
        <DataTable
          aria-labelledby="rowActionsInline"
          data={data}
          columns={\[
            {
              header: 'Repository',
              field: 'name',
              rowHeader: true,
            },
            {
              header: 'Type',
              field: 'type',
            },
            {
              header: 'Updated',
              field: 'updatedAt',
              renderCell: row \=> {
                return <RelativeTime date\={new Date(row.updatedAt)} />
              },
            },
            {
              header: 'Dependabot',
              field: 'securityFeatures.dependabot',
            },
            {
              header: 'Code scanning',
              field: 'securityFeatures.codeScanning',
            },
            {
              id: 'actions',
              // The header is styled to be visually hidden, but still accessible to screen readers
              header: () \=> (
                <span
                  style\={{
                    clipPath: 'inset(50%)',
                    height: '1px',
                    overflow: 'hidden',
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    width: '1px',
                  }}
                \>
                  Actions
                </span\>
              ),
              renderCell: row \=> {
                return (
                  <\>
                    <IconButton
                      aria-label\={\`Edit: ${row.name}\`}
                      title\={\`Edit: ${row.name}\`}
                      icon\={PencilIcon}
                      variant\="invisible"
                    />
                    <IconButton
                      aria-label\={\`Delete: ${row.name}\`}
                      title\={\`Delete: ${row.name}\`}
                      icon\={TrashIcon}
                      variant\="invisible"
                    />
                  </\>
                )
              },
            },
          \]}
        />
      </Table.Container\>
      {/\*-------------------------------------------------------
      Row actions overflowing --------------------------------
    -------------------------------------------------------\*/}
      <Table.Container\>
        <Table.Title as\="h2" id\="rowActionsOverflow"\>
          Row actions overflowing
        </Table.Title\>
        <DataTable
          aria-labelledby="rowActionsOverflow"
          data={data}
          columns={\[
            {
              header: 'Repository',
              field: 'name',
              rowHeader: true,
            },
            {
              header: 'Type',
              field: 'type',
            },
            {
              header: 'Updated',
              field: 'updatedAt',
              renderCell: row \=> {
                return <RelativeTime date\={new Date(row.updatedAt)} />
              },
            },
            {
              header: 'Dependabot',
              field: 'securityFeatures.dependabot',
            },
            {
              header: 'Code scanning',
              field: 'securityFeatures.codeScanning',
            },
            {
              id: 'actions',
              // The header is styled to be visually hidden, but still accessible to screen readers
              header: () \=> (
                <span
                  style\={{
                    clipPath: 'inset(50%)',
                    height: '1px',
                    overflow: 'hidden',
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    width: '1px',
                  }}
                \>
                  Actions
                </span\>
              ),
              renderCell: row \=> {
                return (
                  <\>
                    <IconButton
                      aria-label\={\`Edit: ${row.name}\`}
                      title\={\`Edit: ${row.name}\`}
                      icon\={PencilIcon}
                      variant\="invisible"
                    />
                    <ActionMenu\>
                      <ActionMenu.Anchor\>
                        <IconButton
                          aria-label\={\`Actions: ${row.name}\`}
                          title\={\`Actions: ${row.name}\`}
                          icon\={KebabHorizontalIcon}
                          variant\="invisible"
                        />
                      </ActionMenu.Anchor\>
                      <ActionMenu.Overlay\>
                        <ActionList\>
                          <ActionList.Item\>Copy row</ActionList.Item\>
                          <ActionList.Item\>Export row as CSV</ActionList.Item\>
                          <ActionList.Divider />
                          <ActionList.Item variant\="danger"\>Delete row</ActionList.Item\>
                        </ActionList\>
                      </ActionMenu.Overlay\>
                    </ActionMenu\>
                  </\>
                )
              },
            },
          \]}
        />
      </Table.Container\>
    </Stack\>
  )
}
const now \= Date.now()
const Second \= 1000
const Minute \= 60 \* Second
const Hour \= 60 \* Minute
const data: Array<{
  id: number
  name: string
  type: 'Public' | 'Internal'
  updatedAt: number
  securityFeatures: {
    dependabot: string
    codeScanning: string
  }
}\> \= \[
  {
    id: 1,
    name: 'codeql-dca-worker',
    type: 'Internal',
    updatedAt: now,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 2,
    name: 'aegir',
    type: 'Public',
    updatedAt: now \- 5 \* Minute,
    securityFeatures: {
      dependabot: 'Alerts',
      codeScanning: 'Report secrets',
    },
  },
  {
    id: 3,
    name: 'strapi',
    type: 'Public',
    updatedAt: now \- 1 \* Hour,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  },
\]

import React from 'react' import {ActionList, ActionMenu, IconButton, RelativeTime, Stack} from '@primer/react' import {Table, DataTable} from '@primer/react/experimental' import {KebabHorizontalIcon, PencilIcon, TrashIcon} from '@primer/octicons-react' export default function RowAction() { return ( <Stack> {/\*------------------------------------------------------- Row actions in a dropdown ------------------------------ -------------------------------------------------------\*/} <Table.Container> <Table.Title as="h2" id="rowActionsDropdown"> Row actions in a dropdown </Table.Title> <DataTable aria-labelledby="rowActionsDropdown" data={data} columns={\[ { header: 'Repository', field: 'name', rowHeader: true, }, { header: 'Type', field: 'type', }, { header: 'Updated', field: 'updatedAt', renderCell: row => { return <RelativeTime date={new Date(row.updatedAt)} /> }, }, { header: 'Dependabot', field: 'securityFeatures.dependabot', }, { header: 'Code scanning', field: 'securityFeatures.codeScanning', }, { id: 'actions', // The header is styled to be visually hidden, but still accessible to screen readers header: () => ( <span style={{ clipPath: 'inset(50%)', height: '1px', overflow: 'hidden', position: 'absolute', whiteSpace: 'nowrap', width: '1px', }} > Actions </span> ), renderCell: row => { return ( <> <ActionMenu> <ActionMenu.Anchor> <IconButton aria-label={\`Actions: ${row.name}\`} title={\`Actions: ${row.name}\`} icon={KebabHorizontalIcon} variant="invisible" /> </ActionMenu.Anchor> <ActionMenu.Overlay> <ActionList> <ActionList.Item>Edit row</ActionList.Item> <ActionList.Item>Copy row</ActionList.Item> <ActionList.Item>Export row as CSV</ActionList.Item> <ActionList.Divider /> <ActionList.Item variant="danger">Delete row</ActionList.Item> </ActionList> </ActionMenu.Overlay> </ActionMenu> </> ) }, }, \]} /> </Table.Container> {/\*------------------------------------------------------- Row actions inline ------------------------------------- -------------------------------------------------------\*/} <Table.Container> <Table.Title as="h2" id="rowActionsInline"> Row actions inline </Table.Title> <DataTable aria-labelledby="rowActionsInline" data={data} columns={\[ { header: 'Repository', field: 'name', rowHeader: true, }, { header: 'Type', field: 'type', }, { header: 'Updated', field: 'updatedAt', renderCell: row => { return <RelativeTime date={new Date(row.updatedAt)} /> }, }, { header: 'Dependabot', field: 'securityFeatures.dependabot', }, { header: 'Code scanning', field: 'securityFeatures.codeScanning', }, { id: 'actions', // The header is styled to be visually hidden, but still accessible to screen readers header: () => ( <span style={{ clipPath: 'inset(50%)', height: '1px', overflow: 'hidden', position: 'absolute', whiteSpace: 'nowrap', width: '1px', }} > Actions </span> ), renderCell: row => { return ( <> <IconButton aria-label={\`Edit: ${row.name}\`} title={\`Edit: ${row.name}\`} icon={PencilIcon} variant="invisible" /> <IconButton aria-label={\`Delete: ${row.name}\`} title={\`Delete: ${row.name}\`} icon={TrashIcon} variant="invisible" /> </> ) }, }, \]} /> </Table.Container> {/\*------------------------------------------------------- Row actions overflowing -------------------------------- -------------------------------------------------------\*/} <Table.Container> <Table.Title as="h2" id="rowActionsOverflow"> Row actions overflowing </Table.Title> <DataTable aria-labelledby="rowActionsOverflow" data={data} columns={\[ { header: 'Repository', field: 'name', rowHeader: true, }, { header: 'Type', field: 'type', }, { header: 'Updated', field: 'updatedAt', renderCell: row => { return <RelativeTime date={new Date(row.updatedAt)} /> }, }, { header: 'Dependabot', field: 'securityFeatures.dependabot', }, { header: 'Code scanning', field: 'securityFeatures.codeScanning', }, { id: 'actions', // The header is styled to be visually hidden, but still accessible to screen readers header: () => ( <span style={{ clipPath: 'inset(50%)', height: '1px', overflow: 'hidden', position: 'absolute', whiteSpace: 'nowrap', width: '1px', }} > Actions </span> ), renderCell: row => { return ( <> <IconButton aria-label={\`Edit: ${row.name}\`} title={\`Edit: ${row.name}\`} icon={PencilIcon} variant="invisible" /> <ActionMenu> <ActionMenu.Anchor> <IconButton aria-label={\`Actions: ${row.name}\`} title={\`Actions: ${row.name}\`} icon={KebabHorizontalIcon} variant="invisible" /> </ActionMenu.Anchor> <ActionMenu.Overlay> <ActionList> <ActionList.Item>Copy row</ActionList.Item> <ActionList.Item>Export row as CSV</ActionList.Item> <ActionList.Divider /> <ActionList.Item variant="danger">Delete row</ActionList.Item> </ActionList> </ActionMenu.Overlay> </ActionMenu> </> ) }, }, \]} /> </Table.Container> </Stack> ) } const now = Date.now() const Second = 1000 const Minute = 60 \* Second const Hour = 60 \* Minute const data: Array<{ id: number name: string type: 'Public' | 'Internal' updatedAt: number securityFeatures: { dependabot: string codeScanning: string } }> = \[ { id: 1, name: 'codeql-dca-worker', type: 'Internal', updatedAt: now, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 2, name: 'aegir', type: 'Public', updatedAt: now - 5 \* Minute, securityFeatures: { dependabot: 'Alerts', codeScanning: 'Report secrets', }, }, { id: 3, name: 'strapi', type: 'Public', updatedAt: now - 1 \* Hour, securityFeatures: { dependabot: '', codeScanning: '', }, }, \] /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [With paginated rows](#with-paginated-rows)

The pagination footer shows the user where they are in relation to the total number of rows and provides controls for navigating all rows.

[Guidelines on when to paginate rows](/product/components/data-table/guidelines/#use-pagination-to-accommodate-tables-with-a-large-dataset)

Repositories
------------

Repository

Type

Updated

Dependabot

Code scanning

Repository 1

Internal

Nov 4, 2026

Repository 2

Public

Nov 3, 2026

Repository 3

Public

Nov 2, 2026

Repository 4

Internal

Nov 1, 2026

Repository 5

Public

Oct 31, 2026

Repository 6

Public

Oct 30, 2026

Repository 7

Internal

Oct 29, 2026

Repository 8

Public

Oct 28, 2026

Repository 9

Public

Oct 27, 2026

Repository 10

Internal

Oct 26, 2026

Showing 1 through 10 of 1000

1 through ‒10 of 1000

1.  Previous page
2.  Page 1
3.  Page 2
4.  Page 3
5.  Page 4
6.  Page 5
7.  Page 6
8.  Page 7…
9.  …
10.  Page 100
11.  Next page

Copy

Reset

Open in StackBlitz

code editor

import React from 'react'
import {RelativeTime} from '@primer/react'
import {Table, DataTable} from '@primer/react/experimental'
export default function Pagination() {
  const pageSize \= 10
  const \[pageIndex, setPageIndex\] \= React.useState(0)
  const start \= pageIndex \* pageSize
  const end \= start + pageSize
  const rows \= repos.slice(start, end)
  return (
    <Table.Container\>
      <Table.Title as\="h2" id\="repositories-pagination"\>
        Repositories
      </Table.Title\>
      <DataTable
        aria-labelledby="repositories-pagination"
        data={rows}
        columns={\[
          {
            header: 'Repository',
            field: 'name',
            rowHeader: true,
          },
          {
            header: 'Type',
            field: 'type',
          },
          {
            header: 'Updated',
            field: 'updatedAt',
            renderCell: row \=> {
              return <RelativeTime date\={new Date(row.updatedAt)} />
            },
          },
          {
            header: 'Dependabot',
            field: 'securityFeatures.dependabot',
          },
          {
            header: 'Code scanning',
            field: 'securityFeatures.codeScanning',
          },
        \]}
      />
      <Table.Pagination
        aria-label\="Pagination for Repositories"
        pageSize\={pageSize}
        totalCount\={repos.length}
        onChange\={({pageIndex}) \=> {
          setPageIndex(pageIndex)
        }}
      />
    </Table.Container\>
  )
}
const now \= Date.now()
export const repos: Array<{
  id: number
  name: string
  type: 'Public' | 'Internal'
  updatedAt: number
  securityFeatures: {
    dependabot: string
    codeScanning: string
  }
}\> \= \[\]
for (let i \= 0; i < 1000; i++) {
  repos.push({
    id: i,
    name: \`Repository ${i + 1}\`,
    type: i % 3 \=== 0 ? 'Internal' : 'Public',
    updatedAt: now \- 1000 \* 60 \* 60 \* 24 \* i,
    securityFeatures: {
      dependabot: '',
      codeScanning: '',
    },
  })
}

import React from 'react' import {RelativeTime} from '@primer/react' import {Table, DataTable} from '@primer/react/experimental' export default function Pagination() { const pageSize = 10 const \[pageIndex, setPageIndex\] = React.useState(0) const start = pageIndex \* pageSize const end = start + pageSize const rows = repos.slice(start, end) return ( <Table.Container> <Table.Title as="h2" id="repositories-pagination"> Repositories </Table.Title> <DataTable aria-labelledby="repositories-pagination" data={rows} columns={\[ { header: 'Repository', field: 'name', rowHeader: true, }, { header: 'Type', field: 'type', }, { header: 'Updated', field: 'updatedAt', renderCell: row => { return <RelativeTime date={new Date(row.updatedAt)} /> }, }, { header: 'Dependabot', field: 'securityFeatures.dependabot', }, { header: 'Code scanning', field: 'securityFeatures.codeScanning', }, \]} /> <Table.Pagination aria-label="Pagination for Repositories" pageSize={pageSize} totalCount={repos.length} onChange={({pageIndex}) => { setPageIndex(pageIndex) }} /> </Table.Container> ) } const now = Date.now() export const repos: Array<{ id: number name: string type: 'Public' | 'Internal' updatedAt: number securityFeatures: { dependabot: string codeScanning: string } }> = \[\] for (let i = 0; i < 1000; i++) { repos.push({ id: i, name: \`Repository ${i + 1}\`, type: i % 3 === 0 ? 'Internal' : 'Public', updatedAt: now - 1000 \* 60 \* 60 \* 24 \* i, securityFeatures: { dependabot: '', codeScanning: '', }, }) } /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [In a loading state](#in-a-loading-state)

DataTables use "skeleton" loading states to indicate loading content.

[Table loading state guidance](/product/components/data-table/guidelines/#use-skeleton-placeholders-to-indicate-loading-content)

Repositories
------------

Repository

Type

Updated

Dependabot

Code scanning

Loading

Loading

Loading

Loading

Loading

Copy

Reset

Open in StackBlitz

code editor

<Table.Container\>
  <Table.Title as\="h2" id\="repositories-loading"\>
    Repositories
  </Table.Title\>
  <Table.Skeleton
    aria-labelledby\="repositories-loading"
    rows\={10}
    columns\={\[
      {
        header: 'Repository',
        id: 'name',
      },
      {
        header: 'Type',
        id: 'type',
      },
      {
        header: 'Updated',
        id: 'updatedAt',
      },
      {
        header: 'Dependabot',
        id: 'securityFeatures.dependabot',
      },
      {
        header: 'Code scanning',
        id: 'securityFeatures.codeScanning',
      },
    \]}
  />
</Table.Container\>

<Table.Container> <Table.Title as="h2" id="repositories-loading"> Repositories </Table.Title> <Table.Skeleton aria-labelledby="repositories-loading" rows={10} columns={\[ { header: 'Repository', id: 'name', }, { header: 'Type', id: 'type', }, { header: 'Updated', id: 'updatedAt', }, { header: 'Dependabot', id: 'securityFeatures.dependabot', }, { header: 'Code scanning', id: 'securityFeatures.codeScanning', }, \]} /> </Table.Container> /\*\* \* Reset the text fill color so that placeholder is visible \*/ .npm\_\_react-simple-code-editor\_\_textarea:empty { -webkit-text-fill-color: inherit !important; } /\*\* \* Hack to apply on some CSS on IE10 and IE11 \*/ @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { /\*\* \* IE doesn't support '-webkit-text-fill-color' \* So we use 'color: transparent' to make the text transparent on IE \* Unlike other browsers, it doesn't affect caret color in IE \*/ .npm\_\_react-simple-code-editor\_\_textarea { color: transparent !important; } .npm\_\_react-simple-code-editor\_\_textarea::selection { background-color: #accef7 !important; color: transparent !important; } }

Show full code

### [More code examples](#more-code-examples)

The previous examples are a curated subset of the full capabilities of the `DataTable` component. For more examples, see the [DataTable Storybook stories](https://primer.style/react/storybook/?path=/story/experimental-components-datatable--default).

[Props](#props)
---------------

### [DataTable](#DataTable)

Name

Default

Description

aria-describedby

`string`

Provide an id to an element which uniquely describes this table

aria-labelledby

`string`

Provide an id to an element which uniquely labels this table

data

`Array<Data | DataTableRowGroup<Data>>`

Provide rows, row groups, or a mixture of both to render in the table, in display order.

columns

`Array<Column<Data>>`

Provide the columns for the table and the fields in `data` to which they correspond

getRowId

`(row: Data) => DataTableRowId`

Provide a stable row ID. Defaults to row.id. DataTableRowId is an exported string | number type.

rowSelection

`boolean`

Render row checkboxes and a select-all checkbox for the current page.

selectedRows

`ReadonlySet<DataTableRowId>`

Control selection using stable IDs from `getRowId`. Missing or non-selectable IDs stay stored but do not count as selected.

defaultSelectedRows

`ReadonlySet<DataTableRowId>`

Set the initial selection for an uncontrolled, static, single-page table.

onSelectionChange

`({ selectedRows }: { selectedRows: Set<DataTableRowId> }) => void`

Receive a new selection set when a checkbox is toggled. Data changes alone do not trigger this callback.

isRowSelectable

`(row: Data) => boolean`

Determine which rows can be selected and counted by select-all.

cellPadding

`'condensed' | 'normal' | 'spacious'`

Specify the amount of space that should be available around the contents of a cell

aria-describedby

`string`

Provide an id to an element which uniquely describes this table

aria-labelledby

`string`

Provide an id to an element which uniquely labels this table

initialSortColumn

`string | number`

Provide the id or field of the column by which the table is sorted. When using this `prop`, the input data must be sorted by this column in ascending order

initialSortDirection

`'ASC' | 'DESC'`

Provide the sort direction that the table should be sorted by on the currently sorted column

externalSorting

`false`

`boolean`

Indicate whether the sorting of the table is managed externally. When `true`, the table will not sort the data internally when a column header is clicked. The `onToggleSort` callback will still be invoked when a column header is clicked.

onToggleSort

`(columnId: ObjectPaths<Data> | string | number, direction: 'ASC' | 'DESC') => void`

Fires every time the user clicks a sortable column header. It reports the column id that is now sorted and the direction after the toggle (never 'NONE').

### [Table](#Table)

Name

Default

Description

aria-describedby

`string`

Provide an id to an element which uniquely describes this table

aria-labelledby

`string`

Provide an id to an element which uniquely labels this table

children

`React.ReactNode`

cellPadding

`'condensed' | 'normal' | 'spacious'`

Specify the amount of space that should be available around the contents of a cell

### [Table.Head](#Table.Head)

Name

Default

Description

children

`React.ReactNode`

### [Table.Actions](#Table.Actions)

Name

Default

Description

children

`React.ReactNode`

### [Table.Body](#Table.Body)

Name

Default

Description

children

`React.ReactNode`

### [Table.Group](#Table.Group)

Name

Default

Description

id

`string | number`

A stable identifier exposed on both group sections as `data-group-id`. The group header's DOM id is generated separately so it is safe for use in `headers`.

label

`string`

The visible label for the group, shown in the group header and included in its accessible name along with the row count.

rowCount

`number`

The number of member rows in the group. Combined with `label` to build the group header's accessible name, for example "Admins, 2 rows".

aria-label

`string`

Override the group header's accessible name, for example to localize its row count description.

colSpan

`number`

The number of columns spanned by the group header.

children

`React.ReactNode`

The group's member rows, typically a list of `Table.Row` elements. When composing a grouped table directly, use each `Table.Cell`'s native `headers` prop to reference the corresponding `Table.Header` id. The group header association is added automatically.

### [Table.Row](#Table.Row)

Name

Default

Description

children

`React.ReactNode`

### [Table.Header](#Table.Header)

Name

Default

Description

align

`'end' | 'start'`

The horizontal alignment of the cell's content

children

`React.ReactNode`

### [Table.SelectionHeader](#Table.SelectionHeader)

Name

Default

Description

selection Required

`'all' | 'some' | 'none'`

Whether all, some, or none of the selectable rows are selected.

disabled

`boolean`

Whether row selection is unavailable.

onToggleSelect

`() => void`

Request toggling selection for all selectable rows.

checkboxRef

`React.Ref<HTMLInputElement>`

Forward a ref to the native selection checkbox.

aria-label

`'Select rows'`

`string`

Provide the selection checkbox's accessible name.

aria-description

`string`

Describe the select-all scope, for example "Select all 10 rows".

### [Table.RowSelection](#Table.RowSelection)

Name

Default

Description

selected Required

`boolean`

Whether the row is selected.

disabled

`boolean`

Whether the row cannot be selected.

onToggleSelect

`() => void`

Request toggling selection for the row.

checkboxRef

`React.Ref<HTMLInputElement>`

Forward a ref to the native row checkbox.

aria-label

`'Select row'`

`string`

Name the row checkbox when `aria-labelledby` is not provided.

aria-labelledby

`string`

Reference the row header IDs. The checkbox name adds "Select" before their text.

### [Table.Cell](#Table.Cell)

Name

Default

Description

align

`'end' | 'start'`

The horizontal alignment of the cell's content

children

`React.ReactNode`

scope

`'row'`

Provide the scope for a table cell, useful for defining a row header using `scope="row"`

### [Table.CellPlaceholder](#Table.CellPlaceholder)

No props documented

### [Table.Container](#Table.Container)

Name

Default

Description

children

`React.ReactNode`

### [Table.Divider](#Table.Divider)

No props documented

### [Table.Title](#Table.Title)

Name

Default

Description

children

`React.ReactNode`

id Required

`string`

Provide a unique id for the table subtitle. This should be used along with `aria-labelledby` on `DataTable`

### [Table.Subtitle](#Table.Subtitle)

Name

Default

Description

children

`React.ReactNode`

id Required

`string`

Provide a unique id for the table subtitle. This should be used along with `aria-describedby` on `DataTable`

### [Table.Skeleton](#Table.Skeleton)

Name

Default

Description

cellPadding

`normal`

`'condensed' | 'normal' | 'spacious'`

Specify the amount of space that should be available around the contents of a cell

columns Required

`Array<Column<Data>>`

rows

`10`

`number`

Optionally specify the number of rows which should be included in the skeleton state of the component

### [Table.Pagination](#Table.Pagination)

Name

Default

Description

aria-label Required

`string`

Defines a string value that labels the current element. Provide a label for the navigation landmark rendered by this component @see aria-labelledby.

defaultPageIndex

`string`

Provide an optional index to specify the default selected page

id

`string`

Optionally provide an `id` that is placed on the navigation landmark rendered by this component

onChange

`({ pageIndex }: { pageIndex: number }) => void`

Optionally provide a handler that is called whenever the pagination state is updated

pageSize

`25`

`number`

Optionally specify the number of items within a page

totalCount Required

`number`

Specify the total number of items within the collection

showPages

`{narrow: false}`

`boolean | { narrow?: boolean; regular?: boolean; wide?: boolean; }`

Whether to show the page numbers

### [Table.ErrorDialog](#Table.ErrorDialog)

Name

Default

Description

children Required

`React.ReactNode`

The content of the dialog. This is usually a message explaining the error.

title

`'Error'`

`string`

The title of the dialog. This is usually a short description of the error.

onRetry

`() => void`

Event handler called when the user clicks the retry button.

onDismiss

`() => void`

Event handler called when the dialog is dismissed.

### [Table.SortHeader](#Table.SortHeader)

Name

Default

Description

direction Required

`'ASC' | 'DESC' | 'NONE'`

Specify the sort direction for the TableHeader

onToggleSort Required

`() => void`

Provide a handler that is called when the sortable TableHeader is interacted with via a click or keyboard interaction

align

`'end' | 'start'`

The horizontal alignment of the cell's content

### [Column options](#Column-options)

Name

Default

Description

align

`'start' | 'end'`

The horizontal alignment of the column's content

field

`ObjectPaths<Data>`

Optionally provide a field to render for this column. This may be the key of the object or a string that accesses nested objects through `.`. For example: `field: a.b.c` Alternatively, you may provide a `renderCell` for this column to render the field in a row

header Required

`string | (() => React.ReactNode)`

Provide the name of the column. This will be rendered as a table header within the table itself

maxWidth

`React.CSSProperties['maxWidth']`

The maximum width the column can grow to

minWidth

`React.CSSProperties['minWidth']`

The minimum width the column can grow to

renderCell

`(data: Data) => React.ReactNode`

Provide a custom component or render prop to render the data for this column in a row

rowHeader

`boolean`

Specify if the value of this column for a row should be treated as a row header

sortBy

`boolean | 'alphanumeric' | 'basic' | 'datetime' | (a: Data, b: Data) => number`

Specify if the table should sort by this column and, if applicable, a specific sort strategy or custom sort strategy

width

`'grow'`

`'grow' | 'growCollapse' | 'auto' | React.CSSProperties['width']`

Controls the width of the column.

*   'grow': Stretch to fill available space, and min width is the width of the widest cell in the column
*   'growCollapse': Stretch to fill available space or shrink to fit in the available space. Allows the column to shrink smaller than the cell content's width.
*   'auto': The column is the width of it’s widest cell. Not intended for use with columns who’s content length varies a lot because a layout shift will occur when the content changes
*   explicit width: Will be exactly that width and will not grow or shrink to fill the parent
