import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { createNewBuild } from "../../http-common";
import { useNavigate } from "react-router-dom";

const steps = [
  "Budget",
  "CPU Configuration",
  "GPU Configuration",
  "RAM budget",
];
  
const Build: React.FC = () => {
  const [budget, setBudget] = useState("");
  const [cpuBudget, setCpuBudget] = useState("");
  const [cpuBrand, setCpuBrand] = useState("None");
  const [gpuBudget, setGpuBudget] = useState("");
  const [gpuBrand, setGpuBrand] = useState("None");
  const [ramBudget, setRamBudget] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const navigate = useNavigate();

  const validateInput = () => {
    if (validateBudget(budget)) {
      return false;
    } else {
      return true;
    }
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(event.target.value);
  };

  const validateBudget = (b: string) => {
    const re = /^\d+$/;
    return re.test(b);
  };

  const handleCpuBudgetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCpuBudget(event.target.value);
  };

  const handleCpuBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpuBrand((event.target as HTMLInputElement).value);
  };

  const handleGpuBudgetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGpuBudget(event.target.value);
  };

  const handleGpuBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGpuBrand((event.target as HTMLInputElement).value);
  };

  const handleRamBudgetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRamBudget(event.target.value);
  };

  const content = [
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item xs={12} md={6} textAlign="center">
        <Typography variant="h5">
          Enter your budget for your computer build
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Budget"
          onChange={handleBudgetChange}
          variant="outlined"
          required
          value={budget}
        />
      </Grid>
    </Grid>,
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item xs={12} md={6} textAlign="center">
        <Typography variant="h5">Enter your CPU budget</Typography>
        <Typography variant="body1">
          Default: no limit is placed on CPU price
        </Typography>
        <Typography variant="body1">Leave blank for default</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="CPU Budget"
          onChange={handleCpuBudgetChange}
          variant="outlined"
          value={cpuBudget}
        />
      </Grid>
      <Grid item xs={12} md={6} textAlign="center">
        <Typography variant="h5">Choose a brand preference</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl>
          <FormLabel>Brand</FormLabel>
          <RadioGroup row value={cpuBrand} onChange={handleCpuBrandChange}>
            <FormControlLabel value="Intel" control={<Radio />} label="Intel" />
            <FormControlLabel value="AMD" control={<Radio />} label="AMD" />
            <FormControlLabel
              value="None"
              control={<Radio />}
              label="No Preference"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>,
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item xs={12} md={6} textAlign="center">
        <Typography variant="h5">Enter your GPU budget</Typography>
        <Typography variant="body1">
          Default: no limit is placed on GPU price
        </Typography>
        <Typography variant="body1">Leave blank for default</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="GPU Budget"
          onChange={handleGpuBudgetChange}
          variant="outlined"
          value={gpuBudget}
        />
      </Grid>
      <Grid item xs={12} md={6} textAlign="center">
        <Typography variant="h5">Choose a brand preference</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl>
          <FormLabel>Brand</FormLabel>
          <RadioGroup row value={gpuBrand} onChange={handleGpuBrandChange}>
            <FormControlLabel
              value="GeForce"
              control={<Radio />}
              label="NVIDIA"
            />
            <FormControlLabel value="AMD" control={<Radio />} label="AMD" />
            <FormControlLabel
              value="None"
              control={<Radio />}
              label="No Preference"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>,
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item xs={12} md={6} textAlign="center">
        <Typography variant="h5">Enter your CPU budget</Typography>
        <Typography variant="body1">
          Default: no limit is placed on CPU price
        </Typography>
        <Typography variant="body1">Leave blank for default</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="RAM Budget"
          onChange={handleRamBudgetChange}
          variant="outlined"
          value={ramBudget}
        />
      </Grid>
    </Grid>,
  ];

  const totalSteps = () => {
    return steps.length;
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
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleBuild = () => {
    let cBudget: number = 0;
    let gBudget: number = 0;
    let rBudget: number = 0;
    if (cpuBudget !== "") {
      cBudget = Number(cpuBudget);
    }
    if (gpuBudget !== "") {
      gBudget = Number(gpuBudget);
    }
    if (ramBudget !== "") {
      rBudget = Number(ramBudget);
    }
    const result = createNewBuild(
      Number(budget),
      cpuBrand,
      cBudget,
      gpuBrand,
      gBudget,
      rBudget
    );
    result.then(
      function (res) {
        navigate(`/final/${res}`);
      },
      function (err) {
        console.log(err);
      }
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        <Step key="Budget" completed={completed[0]}>
          <StepLabel color="inherit">Budget</StepLabel>
        </Step>
        <Step key="CPU Configuration" completed={completed[1]}>
          <StepLabel color="inherit">CPU Configuration</StepLabel>
        </Step>
        <Step key="GPU Configuration" completed={completed[2]}>
          <StepLabel color="inherit">GPU Configuration</StepLabel>
        </Step>
        <Step key="RAM Configuration" completed={completed[3]}>
          <StepLabel color="inherit">RAM Configuration</StepLabel>
        </Step>
      </Stepper>
      <Container>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleBuild}>Build</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Step {activeStep + 1}
            </Typography>
            <Container disableGutters maxWidth={false}>
              {content[activeStep]}
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
                disabled={validateInput()}
                onClick={handleNext}
                sx={{ mr: 1 }}
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Container>
    </Box>
  );
};

export default Build;
