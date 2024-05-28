# mui-expandable-table

A custom expandable table for @mui/material Table.

## Installation

- Run `npx jsr add @thecodeinfluencer/mui-expandable-table`

## Usage

```javascript
import ExpandableTable, {
  ETColumn,
} from "@/components/fragments/ExpandableTable";

export default function RatingsTable({ rows, loading }: any) {
  const columns: ETColumn[] = [
    {
      title: "Full Name",
      key: "firstName",
      render: ({ row }) => (
        <p>
          {row.firstName} {row.lastName}
        </p>
      ),
    },
    {
      title: "Role",
      key: "role",
      render: ({ value }) => <div className={value}>{value}</div>,
    },
  ];

  const extra: ETColumn[] = [{ title: "Email", key: "email" }];

  return (
    <ExpandableTable
      rows={rows}
      columns={columns}
      loading={loading}
      expanded={{ items: extra, grid: { xs: 12, xl: 6 } }}
    />
  );
}
```
