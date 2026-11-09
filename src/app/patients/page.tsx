"use client";
import { useState } from "react";
import { Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { patients as initial, Patient } from "@/lib/patients";

type Key = keyof Patient;
const columns: { key: Key; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status" },
  { key: "balance", label: "Balance" },
];
const statusColor = { Active: "success", Inactive: "default", Pending: "warning" } as const;

export default function PatientsPage() {
  const [rows, setRows] = useState(initial);
  const [orderBy, setOrderBy] = useState<Key>("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const sorted = [...rows].sort((a, b) => {
    const r = a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
    return order === "asc" ? r : -r;
  });
  const visible = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const sortBy = (key: Key) => {
    setOrder(orderBy === key && order === "asc" ? "desc" : "asc");
    setOrderBy(key);
  };
  const remove = (id: number) => {
    const next = rows.filter((r) => r.id !== id);
    setRows(next);
    if (page > 0 && page * rowsPerPage >= next.length) setPage(page - 1);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Patients</Typography>
      <Paper>
        <TableContainer>
          <Table data-testid="patients-table">
            <TableHead>
              <TableRow>
                {columns.map((c) => (
                  <TableCell key={c.key} sortDirection={orderBy === c.key ? order : false}>
                    <TableSortLabel active={orderBy === c.key} direction={orderBy === c.key ? order : "asc"} onClick={() => sortBy(c.key)}>
                      {c.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visible.map((p) => (
                <TableRow key={p.id} hover data-testid="patient-row">
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell><Chip size="small" label={p.status} color={statusColor[p.status]} /></TableCell>
                  <TableCell>${p.balance.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label={`delete ${p.name}`} color="error" onClick={() => remove(p.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
          onPageChange={(_, p) => setPage(p)}
        />
      </Paper>
    </>
  );
}
