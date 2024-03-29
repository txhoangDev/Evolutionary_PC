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
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import robot from "../../../assets/images/robot.png";
import { login } from "../../../http-common";

const signUp = <Link href="/Signup">Sign up</Link>;

const Input: React.FC = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState(<></>);
  const [username, setUsername] = React.useState("");
  const [userError, setUserError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passError, setPassError] = React.useState(false);
  const [remember, setRemember] = React.useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRemember = () => {
    setRemember(!remember);
  }

  const handleLogin = () => {
    if (username.length === 0) {
      setUserError(true);
      setAlert(
        <Alert severity="error">
          <AlertTitle>Username Error</AlertTitle>Username is required
        </Alert>
      );
    } else if (password.length === 0) {
      setPassError(true);
      setAlert(
        <Alert severity="error">
          <AlertTitle>Password Error</AlertTitle>Password is required
        </Alert>
      );
    } else {
      const result = login(username, password, remember);
      result.then((response) => {
        if (response === "error") {
          setAlert(
            <Alert severity="error">
              <AlertTitle>ERROR</AlertTitle>Username and Password combination
              doesn't match
            </Alert>
          );
        } else {
          navigate("/account");
        }
      });
    }
  };

  return (
    <Container disableGutters maxWidth={false}>
      <Box
        component="img"
        loading="lazy"
        src={robot}
        alt="robot"
        borderRadius={2}
        maxWidth={"20%"}
        maxHeight={"auto"}
        sx={{
          objectFit: "cover",
          backgroundColor: "rgba(247, 242, 239, 0.3)",
          mt: 5,
        }}
      />
      <Typography variant="h2" sx={{ fontWeight: 700 }}>
        Welcome Back!
      </Typography>
      <Typography variant="h6">Enter your login credentials</Typography>
      {alert}
      <Grid container spacing={2} direction="column" sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Box maxWidth="400px" sx={{ mr: 2 }}>
            <TextField
              required
              error={userError}
              onChange={handleUsernameChange}
              label="Username"
              variant="filled"
              fullWidth
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box maxWidth="400px" sx={{ mr: 2 }}>
            <TextField
              required
              error={passError}
              onChange={handlePasswordChange}
              label="Password"
              variant="filled"
              type="password"
              fullWidth
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel control={<Checkbox checked={remember} onClick={handleRemember} /> } label="Remember Me?" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Link href="/account/forgot">Forgot Password?</Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box width="400px" sx={{ mr: 2 }}>
            <Button variant="contained" fullWidth onClick={handleLogin}>
              Login
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">
            Don't have an account? {signUp}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Input;
