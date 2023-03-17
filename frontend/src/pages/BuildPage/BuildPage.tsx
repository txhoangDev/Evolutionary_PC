import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

import Main from "../../layouts/main/Main";
import BuildStepper from "./components/BuildStepper";
import MobileBuildStepper from "./components/MobileBuildStepper";
import { createNewBuild, getUser } from "../../http-common";

const Unauthorized = React.lazy(
  () => import("../ErrorPages/UnauthorizedPage/Unauthorized")
);

const steps = [
  "Budget",
  "CPU Configuration",
  "GPU Configuration",
  "RAM budget",
];

const BuildPage: React.FC = () => {
  const [budget, setBudget] = React.useState("");
  const [cpuBudget, setCpuBudget] = React.useState("");
  const [cpuBrand, setCpuBrand] = React.useState("None");
  const [gpuBudget, setGpuBudget] = React.useState("");
  const [gpuBrand, setGpuBrand] = React.useState("None");
  const [ramBudget, setRamBudget] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(true);
  const navigate = useNavigate();

  const isSm = useMediaQuery("(max-width: 600px)");

  React.useLayoutEffect(() => {
    getUser().then((response) => {
      if (!response) {
        setLoggedIn(false);
      }
    });
  }, []);

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
    result.then((response) => {
      if (response === 'Success') {
        navigate('/account');
      }
    });
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
        <Typography variant="body1">Default: no limit (leave blank)</Typography>
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
        <Typography variant="body1">Default: no limit (leave blank)</Typography>
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
        <Typography variant="h5">Enter your RAM budget</Typography>
        <Typography variant="body1">Default: no limit (leave blank)</Typography>
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

  return (
    <Box>
      {loggedIn ? (
        <Main>
          <Container>
            {isSm ? (
              <MobileBuildStepper
                handleBuild={handleBuild}
                validateInput={validateInput}
                steps={steps}
                content={content}
              />
            ) : (
              <BuildStepper
                handleBuild={handleBuild}
                validateInput={validateInput}
                steps={steps}
                content={content}
              />
            )}
          </Container>
        </Main>
      ) : (
        <Unauthorized />
      )}
    </Box>
  );
};

export default BuildPage;
