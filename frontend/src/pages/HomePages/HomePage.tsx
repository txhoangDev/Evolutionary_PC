import React from "react";
import { Box, Typography, Grid, Fade, Button } from "@mui/material";
import bg from "../../assets/backgrounds/bg.svg";
import Main from "../../layouts/main/Main";

import white1 from "../../assets/images/white_pc1.png";
import white2 from "../../assets/images/white_pc2.png";
import white3 from "../../assets/images/white_pc3.png";
import white4 from "../../assets/images/white_pc4.png";
import white5 from "../../assets/images/white_pc5.png";

const images: string[] = [white1, white2, white3, white4, white5];

const HomePage: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const [image, setImage] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setImage((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => {
        return i === 4 ? 0 : i + 1;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Main>
      <Box
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 4 }}
            >
              <Typography variant="h4">Parts Selector</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                Evolutionary PC Builder
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              sx={{ mt: 2 }}
            >
              <Typography component="p" variant="h5">
                An application to pick all the best components for
                <br />
                your specific needs
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" sx={{ mt: 2 }} href="/signup">
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              sx={{ mt: 4, mb: 4 }}
            >
              <Fade in={image} timeout={1000}>
                <img src={images[index]} alt="computer" loading="lazy" />
              </Fade>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Main>
  );
};

export default HomePage;
