import React from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { drawerProps } from "../../../types";

const DesktopDrawer: React.FC<drawerProps> = (props: drawerProps) => {
  return (
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
  );
};

export default DesktopDrawer;
