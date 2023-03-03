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
  ThemeProvider,
} from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { logout } from "../../http-common";
import { useNavigate } from "react-router-dom";

const Link = styled(Typography)({
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
});

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
  const [buttons, setButtons] = useState(<></>);
  const [menu, setMenu] = useState(<></>);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    setAnchorElNav(null);
    logout().then((response) => {
      if (response === "Success") {
        navigate("/Home");
      }
    });
  };

  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/api/getToken/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["message"] === null) {
          setButtons(
            <Box>
              <Button
                onClick={handleCloseNavMenu}
                href="/Login"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link>{"Log in"}</Link>
              </Button>
              <Button
                variant="contained"
                onClick={handleCloseNavMenu}
                href="/signup"
                sx={{ my: 2, display: "block", "&:hover": "#4a6cb5" }}
              >
                <Typography>Sign up</Typography>
              </Button>
            </Box>
          );
          setMenu(
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">About</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">FAQ</Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                component="a"
                href="/signup"
              >
                Sign Up
              </MenuItem>
              <MenuItem
                onClick={handleCloseNavMenu}
                component="a"
                href="/login"
              >
                Log in
              </MenuItem>
            </Menu>
          );
        } else {
          setButtons(
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{ my: 2, display: "block", "&.hover": "#4a6cb5" }}
            >
              Logout
            </Button>
          );
          setMenu(
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">About</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">FAQ</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          );
        }
      });
  }, []);

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
              <IconButton size="large" onClick={handleOpenNavMenu}>
                <MenuIcon />
              </IconButton>
              {menu}
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
                onClick={handleCloseNavMenu}
                href="/about"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  "& .MuiButton": { hover: "transparent" },
                }}
              >
                <Link>About</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                href="/faq"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link>{"FAQ"}</Link>
              </Button>
              {buttons}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
