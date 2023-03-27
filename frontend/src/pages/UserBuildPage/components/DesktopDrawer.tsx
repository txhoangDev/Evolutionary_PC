import React from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemText,
  Box,
  AppBar,
  Button,
} from "@mui/material";

import { drawerProps } from "../../../types";

const DesktopDrawer: React.FC<drawerProps> = (props: drawerProps) => {
  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button href="/" variant="text" sx={{ color: "white" }}>
            Evolutionary PC
          </Button>
          <Button variant="text" sx={{ color: "white" }} onClick={props.logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          <ListItemButton onClick={() => props.onChange("Dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton href="/build">
            <ListItemText primary="New Build" />
          </ListItemButton>
          <ListItemButton onClick={() => props.onChange("Settings")}>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
};

export default DesktopDrawer;
