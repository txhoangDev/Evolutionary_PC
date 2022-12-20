import React from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
function App() {

  // define theme
  const theme = createTheme({
    palette: {
      primary: {
        light: "#63b8ff",
        main: "#c6a6dc",
        dark: "#005db0",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#4db6ac",
        light: "#82e9de",
        dark: "#00867d",
        contrastText: "#000",
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            "&": {
              position: 'relative',
              color: 'white',
              textDecoration: 'none'
            },
            "&:hover": {
              color: 'white'
            },
            "&::before": {
              content: '""',
              position: "absolute",
              display: "block",
              width: "100%",
              height: "2px",
              bottom: '0',
              left: '0',
              backgroundColor: 'white',
              transform: 'scaleX(0)',
              transition: 'transform 0.3s ease'
            },
            "&:hover::before": {
              transform: 'scaleX(1)'
            }
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
        <Box height="100vh" display="flex" flexDirection="column">
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
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;