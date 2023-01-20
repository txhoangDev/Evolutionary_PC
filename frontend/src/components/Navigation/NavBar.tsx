import React from "react";
import {
  AppBar,
  Container,
  Box,
  Toolbar,
  Button,
  Typography,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar: React.FC = () => {
  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  const list = () => (
    <Box
      sx={{ width: "100vh" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem key={"About"} disablePadding>
          <ListItemButton href="/About">
            <ListItemText primary={"About"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"FAQ"} disablePadding>
          <ListItemButton href="/faq">
            <ListItemText primary={"FAQ"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Build"} disablePadding>
          <ListItemButton href="/Build">
            <ListItemText primary={"Build"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "white",
        position: "sticky",
        top: 0,
        zIndex: 1030,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            color="primary.main"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Evolutionary PC
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Button
              sx={{
                "&:hover": { backgroundColor: "transparent" },
                color: "black",
              }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </Button>
            <SwipeableDrawer
              anchor="left"
              open={state}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              {list()}
            </SwipeableDrawer>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              color="#000000"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Evolutionary PC
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              textAlign: "center",
            }}
          >
            <Button
              key="About"
              href="/about"
              sx={{ my: 2, color: "white", display: "block", "&:hover": { backgroundColor: 'transparent'} }}
            >
              <Link>About</Link>
            </Button>
            <Button
              key="FAQ"
              href="/faq"
              sx={{ my: 2, color: "white", display: "block", "&:hover": { backgroundColor: 'transparent'} }}
            >
              <Link>FAQ</Link>
            </Button>
            <Button
              key="Build"
              href="/build"
              sx={{ my: 2, color: "white", display: "block", "&:hover": { backgroundColor: 'transparent'}  }}
            >
              <Link>Build</Link>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
