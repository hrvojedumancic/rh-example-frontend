"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppBar, Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";

const drawerWidth = 220;
const nav = [
  { href: "/", label: "Dashboard", icon: <DashboardIcon /> },
  { href: "/patients", label: "Patients", icon: <PeopleIcon /> },
  { href: "/payments", label: "Payments", icon: <PaymentIcon /> },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>MediCore Enterprise</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: drawerWidth, "& .MuiDrawer-paper": { width: drawerWidth } }}>
        <Toolbar />
        <List>
          {nav.map((n) => (
            <ListItemButton key={n.href} component={Link} href={n.href} selected={pathname === n.href} data-testid={`nav-${n.label.toLowerCase()}`}>
              <ListItemIcon>{n.icon}</ListItemIcon>
              <ListItemText primary={n.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
