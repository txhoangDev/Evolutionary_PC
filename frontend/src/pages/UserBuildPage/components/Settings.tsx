import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Grid,
  Snackbar,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { getUserInfo, putUsername, changePassword } from "../../../http-common";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Settings: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [userError, setUserError] = React.useState(false);
  const [oldPass, setOldPass] = React.useState("");
  const [oldPassError, setOldPassError] = React.useState(false);
  const [newPass, setNewPass] = React.useState("");
  const [newPassError, setNewPassError] = React.useState(false);
  const [newPass2, setNewPass2] = React.useState("");
  const [newPass2Error, setNewPass2Error] = React.useState(false);
  const [alert, setAlert] = React.useState("");
  const [type, setType] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    getUserInfo().then((response) => {
      if (typeof response === "object") {
        if (response.username) {
          setUsername(response.username);
        }
      }
    });
  }, []);

  const changeProfile = () => {
    if (username.length > 100) {
      setUserError(true);
      setAlert("Username must not exceed 100 characters");
      setOpen(true);
    } else {
      putUsername(username).then((response) => {
        if (response === "Success") {
          setAlert("Username changed successfully");
          setType(false);
          setOpen(true);
        } else {
          setAlert("Oops...something went wrong");
          setOpen(true);
        }
      });
    }
  };

  const handleChangePassword = () => {
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        newPass
      )
    ) {
      setNewPassError(true);
      setOpen(true);
      setAlert(
        "Password just not meet criteria of 1 special character, 1 number, 1 uppercase, 1 lowercase, and 8 characters minimum"
      );
    } else if (newPass !== newPass2) {
      setNewPass2Error(true);
      setOpen(true);
      setAlert("Passwords do not match");
    } else if (oldPass === "") {
      setOldPassError(true);
      setOpen(true);
      setAlert("Must enter your current password");
    } else {
      changePassword(oldPass, newPass, newPass2).then((response) => {
        if (response === "old_password") {
          setAlert("Current password is incorrect");
          setOpen(true);
        } else if (response === "success") {
          setType(false);
          setAlert("Password was changed successfully");
          setOpen(true);
        } else {
          setAlert("Oops...something went wrong");
          setOpen(true);
        }
      });
    }
  };

  return (
    <Container maxWidth="xl">
      {open ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={() => {
            setOpen(false);
            setType(true);
          }}
        >
          <Alert
            onClose={() => {
              setOpen(false);
              setType(true);
            }}
            severity={type ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {alert}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
      <Typography variant="h3">Account Settings</Typography>
      <Box sx={{ p: 2, border: "1px solid black", mt: 2 }}>
        <Grid container spacing={2} direction="column">
          <Grid item container xs={12} md={6}>
            <Typography variant="h4">Edit Profile</Typography>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Box>
              <Typography variant="h6">Username</Typography>
              <TextField
                label=""
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUserError(false);
                }}
                error={userError}
              />
            </Box>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Button variant="contained" onClick={changeProfile}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ p: 2, border: "1px solid black", mt: 2 }}>
        <Grid container spacing={2} direction="column">
          <Grid item container xs={12} md={6}>
            <Typography variant="h4">Change Password</Typography>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Box>
              <Typography variant="h6">Current Password</Typography>
              <TextField
                label="Current Password"
                type="password"
                value={oldPass}
                error={oldPassError}
                onChange={(e) => {
                  setOldPass(e.target.value);
                  setOldPassError(false);
                }}
              />
            </Box>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Box>
              <Typography variant="h6">New Password</Typography>
              <TextField
                label="New Password"
                type="password"
                value={newPass}
                error={newPassError}
                onChange={(e) => {
                  setNewPass(e.target.value);
                  setNewPassError(false);
                }}
              />
            </Box>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Box>
              <Typography variant="h6">Confirm New Password</Typography>
              <TextField
                label="Confirm New Password"
                type="password"
                value={newPass2}
                error={newPass2Error}
                onChange={(e) => {
                  setNewPass2(e.target.value);
                  setNewPass2Error(false);
                }}
              />
            </Box>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Button variant="contained" onClick={handleChangePassword}>
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Settings;
