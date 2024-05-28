import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import {
  Card,
  Collapse,
  Grid,
  LinearProgress,
  ListItemText,
  RegularBreakpoints,
  Stack,
  TablePagination,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { Fragment, ReactElement, SetStateAction, useState } from "react";

export type ETColumn = {
  title: string;
  key: string;
  render?: ({ row, value }: any) => ReactElement;
};

type TableProps = {
  rows: any[];
  columns: ETColumn[];
  loading?: boolean;
  expanded?: { items: ETColumn[]; grid?: RegularBreakpoints };
};

function Row({ row, columns, expanded }: any) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <Stack direction="row" alignItems="center">
            {expanded?.items?.length > 0 ? (
              <>
                {!open ? (
                  <AddCircleOutline
                    onClick={() => setOpen(true)}
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                ) : (
                  <RemoveCircleOutline
                    onClick={() => setOpen(false)}
                    sx={{ mr: 1 }}
                  />
                )}
              </>
            ) : null}
            <Typography>{row[columns[0]?.key]}</Typography>
          </Stack>
        </TableCell>
        {columns
          ?.slice(1, columns?.length)
          ?.map(({ key, render }: ETColumn) => (
            <TableCell key={key}>
              {render ? (
                render({ value: row[key], row })
              ) : (
                <Typography>{row[key]}</Typography>
              )}
            </TableCell>
          ))}
      </TableRow>
      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={columns?.length}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Card sx={{ p: 1, borderRadius: 0 }} variant="outlined">
              <Grid container spacing={3}>
                {expanded?.items?.map(({ key, title }: ETColumn) => (
                  <Grid key={key} item {...expanded?.grid}>
                    <ListItemText primary={title} secondary={row[key] || "-"} />
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function ExpandableTable({
  rows,
  columns,
  loading,
  expanded,
}: Readonly<TableProps>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_: any, newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns?.map(column => (
              <TableCell key={column?.key} sx={{ fontWeight: "bold", py: 2 }}>
                <Typography noWrap>{column?.title}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns?.length} sx={{ p: 0 }}>
                <LinearProgress />
              </TableCell>
            </TableRow>
          ) : null}
          {rows
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((row: any) => (
              <Row
                key={row.id}
                row={row}
                columns={columns}
                expanded={expanded}
              />
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={rows?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
