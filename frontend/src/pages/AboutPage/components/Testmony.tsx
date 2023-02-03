import React from "react";
import {
  Grid,
  Box,
  useMediaQuery,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Testmony: React.FC = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const name: React.ReactElement = (
    <Typography
      variant="subtitle1"
      component="a"
      color="#547793"
      sx={{ fontWeight: 100 }}
    >
      Evolutionary PC
    </Typography>
  );

  return (
    <Box
      padding={{ xs: 2, sm: 4 }}
      borderRadius={2}
      bgcolor="#F7F2EF"
      data-aos={"fade-up"}
      sx={{
        mt: 4,
        width: "100%",
        height: "100%",
      }}
    >
      <Grid
        container
        spacing={isMd ? 4 : 2}
        direction="column"
        alignItems="center"
      >
        <Grid item xs={12} md={6} textAlign="center">
          <Typography variant="h3">Customer Testimonies</Typography>
          <Typography variant="h6" component="p">
            Don't just take our word for it. Take a look at our customer
            reviews!
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body1" component="p">
                    "This app has relieved so much stress when I was looking
                    into computers. I really wanted to be able to play Valorant
                    without my friends with good performance. This really helped
                    me out since I know nothing about computers."
                  </Typography>
                </CardContent>
                <Divider variant="middle" />
                <CardContent>
                  <Typography variant="subtitle1">Benny / {name}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body1" component="p">
                    "I'm not new to the computer building community, and I
                    struggled so much with trying to choose the best parts.
                    Using this app gave me less anxiety. It helped me feel
                    confident that my components will be the best parts I can
                    get on the market."
                  </Typography>
                </CardContent>
                <Divider variant="middle" />
                <CardContent>
                  <Typography variant="subtitle1">Nina / {name}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body1" component="p">
                    "I'm not a big gamer, but I use my computer a lot for
                    school. I wanted a new computer, so I decided to use this
                    app. It was so fast at picking parts that I was shocked! I
                    suck with technology, but this was so easy to use!"
                  </Typography>
                </CardContent>
                <Divider variant="middle" />
                <CardContent>
                  <Typography variant="subtitle1">Tiffany / {name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Testmony;
