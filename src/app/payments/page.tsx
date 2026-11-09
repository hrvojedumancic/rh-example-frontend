"use client";
import { useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";

const fields = [
  { id: "method", label: "Payment Method", options: ["Credit Card", "Debit Card", "ACH Transfer", "Cash", "Check"] },
  { id: "currency", label: "Currency", options: ["USD", "EUR", "GBP", "CAD", "AUD"] },
  { id: "plan", label: "Payment Plan", options: ["One-time", "Weekly", "Bi-weekly", "Monthly", "Quarterly"] },
  { id: "insurance", label: "Insurance Provider", options: ["Aetna", "Blue Cross", "Cigna", "UnitedHealthcare", "Self-pay"] },
  { id: "location", label: "Billing Location", options: ["New York", "Chicago", "Dallas", "Denver", "Seattle"] },
];

export default function PaymentsPage() {
  const [values, setValues] = useState<Record<string, string>>({});

  return (
    <>
      <Typography variant="h4" gutterBottom>Payments</Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {fields.map((f) => (
            <Grid key={f.id} size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel id={`${f.id}-label`}>{f.label}</InputLabel>
                <Select
                  labelId={`${f.id}-label`}
                  id={f.id}
                  data-testid={`select-${f.id}`}
                  label={f.label}
                  value={values[f.id] ?? ""}
                  onChange={(e) => setValues({ ...values, [f.id]: e.target.value })}
                >
                  {f.options.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" sx={{ mt: 3 }} disabled={Object.keys(values).length < fields.length}>
          Submit Payment
        </Button>
      </Paper>
    </>
  );
}
