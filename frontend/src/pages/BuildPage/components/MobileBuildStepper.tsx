import React from "react";
import { Box, Paper, Typography, MobileStepper, Button } from "@mui/material";

import { buildStepper } from "../../../types";

const MobileBuildStepper: React.FC<buildStepper> = (props: buildStepper) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (props.handleValidate(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
        }}
      >
        <Typography>{props.steps[activeStep]}</Typography>
      </Paper>
      <Box sx={{ height: "100%", width: "100%", p: 2 }}>
        {props.content[activeStep]}
      </Box>
      <MobileStepper
        variant="text"
        steps={props.steps.length}
        position="static"
        activeStep={activeStep}
        nextButton={
          activeStep === props.steps.length - 1 ? (
            <Button size="small" onClick={() => {
              if (props.handleValidate(activeStep)) {
                props.handleBuild();
              }
            }}>
              Build
            </Button>
          ) : (
            <Button size="small" onClick={handleNext}>
              next
            </Button>
          )
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default MobileBuildStepper;
