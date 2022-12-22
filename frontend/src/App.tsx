import React from "react";
import { Box, CssBaseline, ThemeProvider, Grid } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import NavBar from "./components/Navigation/NavBar";

function App() {

  // define theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#03B0FD",
        contrastText: "#000000",
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            "&": {
              position: 'relative',
              color: 'black',
              textDecoration: 'none'
            },
            "&:hover": {
              color: 'black'
            },
            "&::before": {
              content: '""',
              position: "absolute",
              display: "block",
              width: "100%",
              height: "2px",
              bottom: '0',
              left: '0',
              backgroundColor: 'black',
              transform: 'scaleX(0)',
              transition: 'transform 0.3s ease'
            },
            "&:hover::before": {
              transform: 'scaleX(1)'
            }
          }
        }
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
        <Box height="100vh" display="flex" flexDirection="column" sx={{ mt: 2 }}>
          <Router>
            <Routes>
              {appRoutes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </Router>
        </Box>
    </ThemeProvider>
  );
}

export default App;