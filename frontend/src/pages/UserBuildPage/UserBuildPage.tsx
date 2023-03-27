import React from "react";
import { Build } from "../../types";
import { Container, Box, Toolbar, CssBaseline, Snackbar } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";

import { getUserBuilds, logout, deleteBuild, getUser } from "../../http-common";
import BuildDetail from "./components/BuildDetail";
import DesktopDrawer from "./components/DesktopDrawer";
import MoblieDrawer from "./components/MoblieDrawer";
import Welcome from "./components/Welcome";
import Settings from "./components/Settings";

const Unauthorized = React.lazy(
  () => import("../ErrorPages/UnauthorizedPage/Unauthorized")
);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

const UserBuildPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [builds, setBuilds] = React.useState<Build[]>([]);
  const [authorized, setAuthorized] = React.useState<boolean>(false);
  const [component, setComponent] = React.useState<React.ReactElement>(<></>);
  const navigate = useNavigate();

  const isSm = useMediaQuery("(max-width: 600px)");

  const handleDrawerChange = React.useCallback(
    (type: string) => {
      if (type === "Dashboard") {
        setComponent(<Welcome builds={builds} onChange={handleDrawerChange} />);
      } else if (type === "Settings") {
        setComponent(<Settings />);
      } else {
        if (!type.includes(" DELETE")) {
          setComponent(<BuildDetail id={Number(type)} />);
        } else {
          deleteBuild(type.split(" ")[0]).then((result) => {
              if (result === "Success") {
                getUserBuilds().then((response) => {
                  if (typeof response === "object") {
                    setBuilds(response);
                  } else {
                    setOpen(true);
                    setMessage("Uh oh, something went wrong");
                  }
                });
              } else {
                setMessage("Unable to delete build.");
                setOpen(true);
              }
            })
            .catch((err) => {
              setMessage("Unable to delete build.");
            });
        }
      }
    },
    [builds]
  );

  React.useLayoutEffect(() => {
    const user = getUser();
    user.then((response) => {
      if (response) {
        setAuthorized(true);
        getUserBuilds().then((response) => {
          if (typeof response === "object") {
            setBuilds(response);
            if (response.length === 0) {
              setInfo(true);
            }
          }
        });
      }
    });
  }, []);

  React.useMemo(async () => {
    setComponent(<Welcome builds={builds} onChange={handleDrawerChange} />);
  }, [builds, handleDrawerChange]);

  const Logout = () => {
    logout().then((response) => {
      if (response === "Success") {
        navigate("/Home");
      } else {
        setOpen(true);
        setMessage("Unable to logout");
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    setInfo(false);
  };

  return (
    <Container disableGutters maxWidth={false}>
      {authorized ? (
        <Box sx={{ display: isSm ? "" : "flex" }}>
          <CssBaseline />
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            TransitionComponent={TransitionDown}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
          <Snackbar
            open={info}
            autoHideDuration={6000}
            onClose={handleClose}
            TransitionComponent={TransitionDown}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
              You currently have no builds
            </Alert>
          </Snackbar>
          {isSm ? (
            <MoblieDrawer onChange={handleDrawerChange} logout={Logout} />
          ) : (
            <DesktopDrawer onChange={handleDrawerChange} logout={Logout} />
          )}
          <Box>
            {isSm ? <></> : <Toolbar />}
            {component}
          </Box>
        </Box>
      ) : (
        <Unauthorized />
      )}
    </Container>
  );
};

export default UserBuildPage;
