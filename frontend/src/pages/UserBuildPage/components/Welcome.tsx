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
import { userProps } from "../../../http-common";

const Welcome: React.FC<userProps> = (props: userProps) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} direction="column">
        <Grid item container xs={12} md={6}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Welcome Back Corgi!
          </Typography>
        </Grid>
        {props.builds.map((build) => {
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
                    CPU Brand:{" "}
                    {build.cpu_brand.length > 0
                      ? build.cpu_brand
                      : build.cpu.split(" ")[0]}
                    <br />
                    {Number(build.cpu_budget) !== 0 ? (
                      <>
                        CPU Budget: {build.cpu_budget}
                        <br />
                      </>
                    ) : (
                      <></>
                    )}
                    GPU Brand:{" "}
                    {build.gpu_brand.length > 0
                      ? build.gpu_brand
                      : build.gpu.split(" ")[0]}
                    {Number(build.gpu_budget) !== 0 ? (
                      <>
                        <br />
                        GPU Budget: {build.gpu_budget}{" "}
                      </>
                    ) : (
                      <></>
                    )}
                    {Number(build.ram_budget) !== 0 ? (
                      <>
                        <br />
                        RAM Budget: {build.ram_budget}{" "}
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
                    onClick={() => props.onChange(String(build.id) + ' DELETE')}
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
