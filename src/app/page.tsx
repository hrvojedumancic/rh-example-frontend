import {
  Card,
  CardContent,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { patients } from "@/lib/patients";

const stats = [
  { label: "Total Patients", value: patients.length },
  {
    label: "Active Patients",
    value: patients.filter((p) => p.status === "Active").length,
  },
  {
    label: "Outstanding Balance",
    value: `$${patients.reduce((s, p) => s + p.balance, 0).toLocaleString()}`,
  },
  { label: "Appointments Today", value: 12 },
];

const activity = [
  "Payment received from Mary Johnson",
  "New patient registered: Emma Davis",
  "Appointment rescheduled: John Brown",
  "Invoice #1042 sent",
];

export default function Dashboard() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Second Practice Dashboard
      </Typography>
      <Grid container spacing={3}>
        {stats.map((s) => (
          <Grid key={s.label} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card data-testid="stat-card">
              <CardContent>
                <Typography color="text.secondary">{s.label}</Typography>
                <Typography variant="h4">{s.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Collection Goal
              </Typography>
              <Typography color="text.secondary">72% of $50,000</Typography>
              <LinearProgress
                variant="determinate"
                value={72}
                sx={{ mt: 2, height: 10, borderRadius: 5 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Activity</Typography>
              <List dense>
                {activity.map((a) => (
                  <ListItem key={a}>
                    <ListItemText primary={a} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
