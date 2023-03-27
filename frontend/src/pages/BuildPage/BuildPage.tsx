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
  Snackbar
} from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

import Main from "../../layouts/main/Main";
import BuildStepper from "./components/BuildStepper";
import MobileBuildStepper from "./components/MobileBuildStepper";
import { createNewBuild, getUser, getPrices } from "../../http-common";

const Unauthorized = React.lazy(
  () => import("../ErrorPages/UnauthorizedPage/Unauthorized")
);

const steps = [
  "Budget",
  "CPU Configuration",
  "GPU Configuration",
  "RAM budget",
];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled"{...props} />;
});

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

const BuildPage: React.FC = () => {
  const [budget, setBudget] = React.useState("");
  const [cpuBudget, setCpuBudget] = React.useState("");
  const [cpuBrand, setCpuBrand] = React.useState("None");
  const [gpuBudget, setGpuBudget] = React.useState("");
  const [gpuBrand, setGpuBrand] = React.useState("None");
  const [ramBudget, setRamBudget] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [prices, setPrices] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const isSm = useMediaQuery("(max-width: 600px)");

  React.useLayoutEffect(() => {
    getUser().then((response) => {
      if (response) {
        setLoggedIn(true);
      }
    });
    getPrices().then((response) => {
      if (response !== 'Error') {
        setPrices(response);
        console.log(response);
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

  const handleValidate = (step: number) => {
    if (step === 0 && Number(budget) < 500) {
      setOpen(true);
      setMessage('Budget is too low for a computer.');
      return false;
    } else if (step === 1) {
      if (typeof cpuBudget === 'string') {
        return true;
      } else if (Number(cpuBudget) >= Number(budget) * 0.7) {
        setOpen(true);
        setMessage('CPU budget is too high');
        return false;
      } else if (Number(cpuBudget) < prices[0]) {
        setOpen(true);
        setMessage('CPU budget is too low');
        return false;
      } else if ((Number(budget) * 0.7) - Number(cpuBudget) < prices[1] + prices[2]) {
        setOpen(true);
        setMessage('CPU budget is too high');
        return false;
      }
    } else if (step === 2) {
      if (typeof gpuBudget === 'string') {
        return true;
      } else if (Number(gpuBudget) + Number(cpuBudget) >= Number(budget) * 0.7) {
        setOpen(true);
        setMessage('GPU budget is too high');
        return false;
      } else if (Number(gpuBudget) < prices[1]) {
        setOpen(true);
        setMessage('GPU budget is too low');
        return false;
      } else if ((Number(budget) * 0.7) - Number(gpuBudget) - Number(cpuBudget) < prices[2]) {
        setOpen(true);
        setMessage('GPU budget is too high');
        return false;
      }
    }
    return true;
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
  }

    setOpen(false);
  }

  const handleBuild = () => {
    if (Number(ramBudget) + Number(gpuBudget) + Number(cpuBudget) > Number(budget) * 0.7 && typeof ramBudget !== 'string') {
      setOpen(true);
      setMessage('RAM budget is too high');
    } else if (Number(ramBudget) < prices[2] && typeof ramBudget !== 'string') {
      setOpen(true);
      setMessage('RAM budget is too low');
    } else if ((Number(budget) * 0.7) - Number(ramBudget) - Number(gpuBudget) - Number(cpuBudget) < 0 && typeof ramBudget !== 'string') {
      setOpen(true);
      setMessage('RAM budget is too high');
    } else {
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
        console.log(response)
        if (response === 'Success') {
          navigate('/account');
        }
      });
    }
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
        />
      </Grid>
    </Grid>,
  ];

  return (
    <Box>
      {loggedIn ? (
        <Main>
          <Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} TransitionComponent={TransitionDown} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
            {isSm ? (
              <MobileBuildStepper
                handleBuild={handleBuild}
                validateInput={validateInput}
                steps={steps}
                content={content}
                handleValidate={handleValidate}
              />
            ) : (
              <BuildStepper
                handleBuild={handleBuild}
                validateInput={validateInput}
                steps={steps}
                content={content}
                handleValidate={handleValidate}
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
