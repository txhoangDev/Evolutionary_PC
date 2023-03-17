import React from "react";
import {
  CssBaseline,
  Box,
  Typography,
  SwipeableDrawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Global } from "@emotion/react";
import { grey } from "@mui/material/colors";

import { drawerProps } from "../../../types";

const MoblieDrawer: React.FC<drawerProps> = (props: drawerProps) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: grey[100],
      }}
    >
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - 56px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={56}
        disableSwipeToOpen={false}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            position: "absolute",
            top: -56,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 6,
              backgroundColor: grey[700],
              borderRadius: 3,
              position: "absolute",
              top: 8,
              left: "calc(50% - 15px)",
            }}
          />
          <Typography sx={{ p: 2 }}>Menu</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#fff",
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
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
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default MoblieDrawer;
