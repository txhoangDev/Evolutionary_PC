import React from "react";
import { getUserBuilds, Build } from "../../http-common";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Button,
  CssBaseline,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import BuildDetail from "./components/BuildDetail";
import DesktopDrawer from "./components/DesktopDrawer";
import MoblieDrawer from "./components/MoblieDrawer";
import Welcome from "./components/Welcome";
import Settings from "./components/Settings";
import { logout, deleteBuild, getUser } from "../../http-common";
import { useNavigate } from "react-router";

const Unauthorized = React.lazy(
  () => import("../ErrorPages/UnauthorizedPage/Unauthorized")
);

const UserBuildPage: React.FC = () => {
  const [builds, setBuilds] = React.useState<Build[]>([]);
  const [authorized, setAuthorized] = React.useState<boolean>(true);
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
        if (type.length === 1) {
          setComponent(<BuildDetail id={Number(type)} />);
        } else {
          const res = deleteBuild(type.split(" ")[0]);
          res.then((result) => {
            if (result === "Success") {
              const result = getUserBuilds();
              result.then(function (res) {
                setBuilds(res);
              });
            }
          });
        }
      }
    },
    [builds]
  );

  React.useEffect(() => {
    const user = getUser();
    user.then((response) => {
      if (!response) {
        setAuthorized(false);
      }
    });
  }, []);

  React.useMemo(() => {
    setComponent(<Welcome builds={builds} onChange={handleDrawerChange} />);
  }, [builds, handleDrawerChange]);

  const Logout = () => {
    const result = logout();
    result.then(
      function (res) {
        navigate("/Home");
      },
      function (err) {
        console.log(err);
      }
    );
  };

  return (
    <Container disableGutters maxWidth={false}>
      {authorized ? (
        <Box sx={{ display: isSm ? "" : "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Button href="/" variant="text" sx={{ color: "white" }}>
                Evolutionary PC
              </Button>
              <Button variant="text" sx={{ color: "white" }} onClick={Logout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          {isSm ? (
            <MoblieDrawer onChange={handleDrawerChange} />
          ) : (
            <DesktopDrawer onChange={handleDrawerChange} />
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
