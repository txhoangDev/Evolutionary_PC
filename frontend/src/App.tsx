import React from "react";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import NavBar from "./components/Navigation/NavBar";
import Footer from './components/Footer/Footer';

function App() {

  // define theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#7241FF",
        contrastText: "#FFFFFF",
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
      <Footer />
    </ThemeProvider>
  );
}

export default App;