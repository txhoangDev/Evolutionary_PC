import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword, changeResetPassword } from "../../../http-common";

const Input: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [alert, setAlert] = React.useState(<></>);
  const [error, setError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passError, setPassError] = React.useState(false);
  const [confirmPass, setConfirmPass] = React.useState("");
  const [confirmError, setConfirmError] = React.useState(false);
  const { uid } = useParams<{ uid?: string }>();
  const { token } = useParams<{ token?: string }>();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(false);
    setAlert(<></>);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPassError(false);
    setAlert(<></>);
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(e.target.value);
    setConfirmError(false);
    setAlert(<></>);
  }

  const handleNext = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(true);
      setAlert(
        <Alert severity="error" sx={{ ml: 2 }}>
          <AlertTitle>Email Error</AlertTitle>Email is not in correct format
          (example@company.com)
        </Alert>
      );
    } else {
      resetPassword(email).then((response) => {
        if (response === 'Success') {
          setAlert(
            <Alert severity="success" sx={{ ml: 2 }}>
              <AlertTitle>Email Sent</AlertTitle>An email has been sent to {email} with instructions on how to recover your account
            </Alert>
          );
        } else {
          setAlert(
            <Alert severity="error" sx={{ ml: 2 }}>
              <AlertTitle>Something went wrong...</AlertTitle>
            </Alert>
          )
        }
      });
    }
  };

  const handleResetPassword = () => {
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
      setPassError(true);
    } else if (confirmPass !== password) {
      setConfirmError(true);
    } else if (uid && token) {
      changeResetPassword(uid, token, password, confirmPass).then((response) => {
        if (response === 'Success') {
          setAlert(
            <Alert severity="success" sx={{ ml: 2 }}>
              <AlertTitle>Reset Successful</AlertTitle>Your password has been changed!
            </Alert>
          );
          setTimeout(function() {
            navigate('/login');
          }, 2000);
        } else {
          setAlert(
            <Alert severity="error" sx={{ ml: 2 }}>
              <AlertTitle>Something went wrong...</AlertTitle>
            </Alert>
          );
        }
      });
    }
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {uid && token ? (
        <Grid container spacing={2} direction="column" sx={{ mt: 1 }}>
          <Grid item container xs={12} md={6}>
            {alert}
          </Grid>
          <Grid item container xs={12} md={6}>
            <Typography variant="h2" sx={{ fontWeight: 700, ml: 2 }}>
              Reset Password
            </Typography>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Typography variant="h5" sx={{ ml: 2 }}>
              Enter your new password
            </Typography>
          </Grid>
          <Grid item container xs={12} md={9}>
            <Box sx={{ ml: 2, width: '45%' }}>
              <TextField
                required
                error={passError}
                onChange={handlePasswordChange}
                label="New Password"
                variant="filled"
                fullWidth
                type="password"
              />
            </Box>
          </Grid>
          <Grid item container xs={12} md={9}>
            <Box sx={{ ml: 2, width: '45%' }}>
              <TextField
                required
                error={confirmError}
                onChange={handleConfirmPasswordChange}
                label="Confirm Password"
                variant="filled"
                fullWidth
                type="password"
              />
            </Box>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Button variant="contained" sx={{ ml: 2 }} onClick={handleResetPassword}>
              Reset Password
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} direction="column" sx={{ mt: 1 }}>
          <Grid item container xs={12} md={6}>
            {alert}
          </Grid>
          <Grid item container xs={12} md={6}>
            <Typography variant="h2" sx={{ fontWeight: 700, ml: 2 }}>
              Forgot Password?
            </Typography>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Typography variant="h5" sx={{ ml: 2 }}>
              Enter the email address of your account.
            </Typography>
          </Grid>
          <Grid item container xs={12} md={9}>
            <Box sx={{ ml: 2, width: '45%' }}>
              <TextField
                required
                error={error}
                onChange={handleEmailChange}
                label="Email Address"
                variant="filled"
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Button variant="contained" sx={{ ml: 2 }} onClick={handleNext}>
              Reset Password
            </Button>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Button variant="text" sx={{ ml: 2 }} href="/login">
              Back to Login
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Input;
