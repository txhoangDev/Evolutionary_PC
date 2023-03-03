import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
  Slide,
} from "@mui/material";
import { buildStepper } from "../../../http-common";

const BuildStepper: React.FC<buildStepper> = (props: buildStepper) => {
  const [checked, setChecked] = React.useState(true);
  const [direction, setDirection] = React.useState<
    "left" | "right" | "up" | "down" | undefined
  >("right");
  const containerRef = React.useRef(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return props.steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    setDirection("left");
    setChecked(false);
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? props.steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    setTimeout(function () {
      setDirection("right");
      setChecked(true);
    }, 300);
  };

  const handleBack = () => {
    setDirection("right");
    setChecked(false);
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    delete completed[activeStep];
    setTimeout(function () {
      setDirection("left");
      setChecked(true);
    }, 300);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {props.steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            {activeStep === index ? (
              <StepLabel color="inherit">{label}</StepLabel>
            ) : (
              <StepLabel color="inherit" />
            )}
          </Step>
        ))}
      </Stepper>
      <Container>
        {allStepsCompleted() ? (
          <Box>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleBack}>Back</Button>
              <Button onClick={props.handleBuild}>Build</Button>
            </Box>
          </Box>
        ) : (
          <Box ref={containerRef}>
            <Slide
              direction={direction}
              in={checked}
              mountOnEnter
              unmountOnExit
            >
              <Box>
                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                  Step {activeStep + 1}
                </Typography>
                <Container disableGutters maxWidth={false}>
                  {props.content[activeStep]}
                </Container>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    disabled={props.validateInput()}
                    onClick={handleNext}
                    sx={{ mr: 1 }}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </Slide>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BuildStepper;
