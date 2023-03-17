import React from "react";
import { Container, Box } from "@mui/material";

import About from "./components/About";
import Workings from "./components/Workings";
import Technology from "./components/Technology";
import Testmony from "./components/Testmony";
import Build from "./components/Build";
import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/Footer/Footer";

const AboutPage: React.FC = () => {
  return (
    <Box>
      <NavBar />
      <Container>
        <Container>
          <About />
        </Container>
        <Container>
          <Workings />
        </Container>
        <Container>
          <Technology />
        </Container>
        <Container>
          <Testmony />
        </Container>
        <Container>
          <Build />
        </Container>
      </Container>
      <Footer />
    </Box>
  );
};

export default AboutPage;
