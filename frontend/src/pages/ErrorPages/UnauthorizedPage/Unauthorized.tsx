import React from "react";
import {
  Link,
  Box,
  useMediaQuery,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import four from "../../../assets/images/24.svg";

const Unauthorized: React.FC = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });
  return (
    <Box
      position={"relative"}
      minHeight={"calc(100vh - 247px)"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      height={1}
      marginTop={-12}
      paddingTop={12}
    >
      <Container>
        <Grid container>
          <Grid
            item
            container
            alignItems={"center"}
            justifyContent={"center"}
            xs={12}
            md={6}
          >
            <Box>
              <Typography
                variant="h1"
                component={"h1"}
                align={isMd ? "left" : "center"}
                sx={{ fontWeight: 700 }}
              >
                401
              </Typography>
              <Typography
                variant="h6"
                component="p"
                color="text.secondary"
                align={isMd ? "left" : "center"}
              >
                Oops! Looks like you're unauthorized.
                <br />
                <Link href="/login" underline="none">
                  Go to Login
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item container justifyContent={"center"} xs={12} md={6}>
            <Box
              component={"img"}
              src={four}
              width={"100vw"}
              height={"100vh"}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Unauthorized;
