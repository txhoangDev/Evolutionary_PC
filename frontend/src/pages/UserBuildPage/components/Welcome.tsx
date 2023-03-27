import React from "react";
import {
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  CardActions,
  Divider,
} from "@mui/material";

import { buildProps } from "../../../types";
import { getUserInfo } from "../../../http-common";

const Welcome: React.FC<buildProps> = (props: buildProps) => {
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    getUserInfo().then((response) => setUsername(response.username));
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} direction="column">
        <Grid item container xs={12} md={6}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Welcome Back {username}!
          </Typography>
        </Grid>
        {props.builds.map((build) => {
          let gpu_brand = build.gpu_brand === 'None' ? '' : build.gpu_brand;
          let cpu_brand = build.cpu_brand === 'None' ? '' : build.cpu_brand;
          return (
            <Grid item container xs={12} md={6} key={build.id}>
              <Card
                key={build.id}
                sx={{ maxWidth: 600, backgroundColor: "#E0E0E0" }}
                raised={true}
              >
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    Budget {build.budget}
                  </Typography>
                  <Divider />
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {build.cpu_brand === '' ? (
                      <>
                        CPU Brand: {cpu_brand}
                        <br />
                      </>
                    ) : (
                      <></>
                    )}
                    {Number(build.cpu_budget) !== 0 ? (
                      <>
                        CPU Budget: {build.cpu_budget}
                        <br />
                      </>
                    ) : (
                      <></>
                    )}
                    {build.gpu_brand === '' ? (
                      <>
                        GPU Brand: {gpu_brand}
                        <br />
                      </>
                    ) : (
                      <></>
                    )}
                    {Number(build.gpu_budget) !== 0 ? (
                      <>
                        GPU Budget: {build.gpu_budget}{" "}
                        <br />
                      </>
                    ) : (
                      <></>
                    )}
                    {Number(build.ram_budget) !== 0 ? (
                      <>
                        RAM Budget: {build.ram_budget}{" "}
                        <br />
                      </>
                    ) : (
                      <></>
                    )}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => props.onChange(String(build.id))}
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    onClick={() => props.onChange(String(build.id) + " DELETE")}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Welcome;
