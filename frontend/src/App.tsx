import {
  CssBaseline,
  ThemeProvider,
  responsiveFontSizes,
  Container,
  Box,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { routes as appRoutes } from "./routes";

function App() {
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
  });
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        minHeight="100vh"
        sx={{
          margin: 0,
          padding: 0,
          flexDirection: "column",
        }}
      >
        <Container disableGutters maxWidth={false}>
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
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
