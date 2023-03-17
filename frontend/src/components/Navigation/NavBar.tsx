import React, { MouseEvent } from "react";
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
import { useNavigate } from "react-router-dom";

import { logout, getUser } from "../../http-common";
import { State, Action } from "../../types";

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

const initialState: State = {
  logoutButton: <></>,
  loginButton: <></>,
  signupButton: <></>,
  menu: <></>,
  anchorElNav: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_LOGOUT_BUTTON":
      return { ...state, logoutButton: action.payload };
    case "SET_LOGIN_BUTTON":
      return { ...state, loginButton: action.payload };
    case "SET_SIGNUP_BUTTON":
      return { ...state, signupButton: action.payload };
    case "SET_MENU":
      return { ...state, menu: action.payload };
    case "SET_ANCHORELNAV":
      return { ...state, anchorElNav: action.payload };
    case "RESET_STATE":
      return initialState;
    default:
      throw new Error(`Invalid action type: ${action}`);
  }
};

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

  const navigate = useNavigate();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    dispatch({ type: "SET_ANCHORELNAV", payload: event.currentTarget });
  };

  const handleCloseNavMenu = () => {
    dispatch({ type: "SET_ANCHORELNAV", payload: null });
  };

  const handleLogout = React.useCallback(() => {
    dispatch({ type: "SET_ANCHORELNAV", payload: null });
    logout().then((response) => {
      if (response === "Success") {
        navigate("/Home");
      }
    });
  }, [dispatch, navigate]);

  React.useEffect(() => {
    const res = getUser();
    res.then((response) => {
      if (response) {
        dispatch({
          type: "SET_LOGOUT_BUTTON",
          payload: (
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{ my: 2, display: "block", "&.hover": "#4a6cb5" }}
            >
              Logout
            </Button>
          ),
        });
        dispatch({
          type: "SET_MENU",
          payload: (
            <Menu
              id="menu-appbar"
              anchorEl={state.anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(state.anchorElNav)}
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
          ),
        });
      } else {
        dispatch({
          type: "SET_LOGIN_BUTTON",
          payload: (
            <Button
              onClick={handleCloseNavMenu}
              href="/Login"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link>Log in</Link>
            </Button>
          ),
        });
        dispatch({
          type: "SET_SIGNUP_BUTTON",
          payload: (
            <Button
              variant="contained"
              onClick={handleCloseNavMenu}
              href="/signup"
              sx={{ my: 2, display: "block", "&:hover": "#4a6cb5" }}
            >
              <Typography>Sign up</Typography>
            </Button>
          ),
        });
        dispatch({
          type: "SET_MENU",
          payload: (
            <Menu
              id="menu-appbar"
              anchorEl={state.anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(state.anchorElNav)}
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
          ),
        });
      }
    });
  }, [state.anchorElNav, handleLogout]);

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
              {state.menu}
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
              {state.loginButton}
              {state.signupButton}
              {state.logoutButton}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
