import React, { useState, MouseEvent } from "react";
import {
  AppBar,
  Container,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Link,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

// navbar component
const NavBar: React.FC = () => {
  let theme = createTheme({
    palette: {
      primary: {
        main: "#547793",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#F7F2EF",
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            "&": {
              position: "relative",
              color: "black",
              textDecoration: "none",
            },
            "&:hover": {
              color: "black",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              display: "block",
              width: "100%",
              height: "2px",
              bottom: "0",
              left: "0",
              backgroundColor: "black",
              transform: "scaleX(0)",
              transition: "transform 0.3s ease",
            },
            "&:hover::before": {
              transform: "scaleX(1)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        },
      },
    },
  });

  // used for when the nav bar needs to be clicked on for navigation
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "white",
          position: "sticky",
          top: 0,
          zIndex: 1030,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              color="primary"
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
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aira-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem key="About" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">About</Typography>
                </MenuItem>
                <MenuItem key="FAQ" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">FAQ</Typography>
                </MenuItem>
                <MenuItem key="Build" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Build</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              color="primary"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Evolutionary PC
            </Typography>
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "none", md: "flex" },
                textAlign: "center",
              }}
            >
              <Button
                key="About"
                onClick={handleCloseNavMenu}
                href="/about"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link>About</Link>
              </Button>
              <Button
                key="FAQ"
                onClick={handleCloseNavMenu}
                href="/faq"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link>FAQ</Link>
              </Button>
              <Button
                key="Build"
                onClick={handleCloseNavMenu}
                href="/build"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link>Build</Link>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
