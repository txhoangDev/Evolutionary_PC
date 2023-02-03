import React from "react";
import { Grid, Box, useMediaQuery, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Build: React.FC = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <Box
      padding={{ xs: 2, sm: 4 }}
      borderRadius={2}
      bgcolor="#547793"
      data-aos={"fade-up"}
      sx={{
        mt: 4,
        width: "100%",
        height: "100%",
      }}
    >
      <Grid container spacing={isMd ? 4 : 2} alignItems="center">
        <Grid item xs={6} md={8}>
          <Typography variant="h4" color="white">
            What are you waiting for? Start today!
          </Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button href="/build" variant="contained" color="secondary">
            Get Started
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Build;
