import React from "react";
import { Grid, Typography, useMediaQuery, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import gif from "../../../assets/images/temp.gif";

const About: React.FC = () => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <Grid container spacing={4}>
      <Grid item container xs={12} md={6}>
        <Box data-aos={isMd ? "fade-right" : "fade-up"}>
          <Typography variant="subtitle1">About Evolutionary PC</Typography>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Building from scratch
          </Typography>
          <Typography component="p" variant="body1">
            <br />
            Computers compose of different components that have different
            compatibility requirements.
          </Typography>
          <Typography component="a" variant="body1">
            <br />
            From the processor to the graphics card to the motherboard, our
            product will put you at ease when trying to build a computer from
            scratch. Our product will help you decide which cruical components
            you need with the best performance for your budget.
            <br />
          </Typography>
          <Typography component="a" variant="body1">
            <br />
            We want to help you get into the world of gaming.
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={6}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          component="img"
          loading="lazy"
          height={1}
          width={1}
          src={gif}
          alt="gpu"
          borderRadius={2}
          maxWidth={700}
          maxHeight={600}
          sx={{
            objectFit: "cover",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default About;
