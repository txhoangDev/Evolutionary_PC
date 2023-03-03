import React from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import { userProps } from "../../../http-common";

const DesktopDrawer: React.FC<userProps> = (props: userProps) => {
  const [open, setOpen] = React.useState(false);
  const b = props.builds;

  const handleClick = () => {
    setOpen(!open);
  };

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
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <DeviceHubIcon />
          </ListItemIcon>
          <ListItemText primary="All Builds" />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {b.map((build) => (
              <ListItemButton
                sx={{ ml: 6 }}
                key={build.id}
                onClick={() => props.onChange(String(build.id))}
              >
                <ListItemText primary={build.id} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default DesktopDrawer;
