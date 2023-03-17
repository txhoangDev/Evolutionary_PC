import React from "react";
import { Box } from "@mui/material";

import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/Footer/Footer";

const Main: React.FC = ({ children }) => {
  return (
    <Box>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </Box>
  );
};

export default Main;
