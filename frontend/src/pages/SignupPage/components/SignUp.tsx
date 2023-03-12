import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Link,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import signup from "../../../assets/images/signup.png";
import { register } from "../../../http-common";

const loginLink = <Link href="/Login">Login</Link>;

const SignUp: React.FC = () => {
  const [alert, setAlert] = React.useState(<></>);
  const [username, setUsername] = React.useState("");
  const [userError, setUserError] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passError, setPassError] = React.useState(false);
  const [password2, setPassword2] = React.useState("");
  const [pass2Error, setPass2Error] = React.useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePass2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
  };

  const handleSignUp = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError(true);
      setAlert(
        <Alert severity="error">
          <AlertTitle>Email Error</AlertTitle>Email is not in correct format (example@company.com)
        </Alert>
      );
    } else if (username.length > 100) {
      setUserError(true);
      setAlert(
        <Alert severity="error">
          <AlertTitle>Username Error</AlertTitle>Username cannot exceed 100
          characters
        </Alert>
      );
    } else if (username.length === 0) {
      setUserError(true);
      setAlert(
        <Alert severity="error">
          <AlertTitle>Username Error</AlertTitle>Username is required
        </Alert>
      );
    } else if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password) === false) {
      setPassError(true);
      setAlert(
        <Alert severity="error">
          <AlertTitle>Password Error</AlertTitle>Password requirements <br />•
          At least 8 characters <br />• At least 1 number <br />• At least 1
          uppercase letter <br />• At least 1 special character (@, $, !, %, *,
          #, ?, &){" "}
        </Alert>
      );
    } else if (password2 !== password) {
      setPass2Error(true);
      setAlert(
        <Alert severity="error">
          <AlertTitle>Password Error</AlertTitle>Passwords must match
        </Alert>
      );
    } else {
      const result = register(username, email, password, password2);
      result.then((response) => {
        if (response === 'success') {
          setUsername("");
          setPassword("");
          setPassword2("");
          setEmail("");
          setAlert(
            <Alert severity="success">
              <AlertTitle>Email Verification</AlertTitle>Before you can use our
              service, please verify your email.
            </Alert>
          );
        } else {
          setAlert(
            <Alert severity="error">
              <AlertTitle>Registration Error</AlertTitle>Something went wrong. Please try again.
            </Alert>
          )
        }
      });
    }
  };

  return (
    <Container>
      <Grid
        container
        spacing={2}
        direction="column"
        sx={{
          mt: 1,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            loading="lazy"
            src={signup}
            alt="shiba"
            maxWidth={"50%"}
            maxHeight={"auto"}
            sx={{
              mt: 4,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Welcome!
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Create your account here</Typography>
          {alert}
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12} md={6}>
              <Box maxWidth="400px">
                <TextField
                  required
                  error={userError}
                  value={username}
                  onChange={handleUsernameChange}
                  label="Username"
                  variant="filled"
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box maxWidth="400px">
                <TextField
                  required
                  error={emailError}
                  value={email}
                  onChange={handleEmailChange}
                  label="Email"
                  variant="filled"
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                maxWidth="400px"
                component="form"
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  error={passError}
                  value={password}
                  onChange={handlePasswordChange}
                  label="Password"
                  variant="filled"
                  type="password"
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                maxWidth="400px"
                component="form"
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  error={pass2Error}
                  value={password2}
                  onChange={handlePass2Change}
                  label="Confirm Password"
                  variant="filled"
                  type="password"
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box width="400px">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                Already have an account? {loginLink}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
