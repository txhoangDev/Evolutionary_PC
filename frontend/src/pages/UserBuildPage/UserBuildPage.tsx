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
import BuildDetail from './components/BuildDetail';
import DesktopDrawer from "./components/DesktopDrawer";
import MoblieDrawer from "./components/MoblieDrawer";
import Welcome from './components/Welcome';
import { logout, deleteBuild } from "../../http-common";
import { useNavigate } from "react-router";

const NotFound = React.lazy(() => import("../ErrorPages/NotFoundPage/NotFoundPage"));

const UserBuildPage: React.FC = () => {
  const [builds, setBuilds] = React.useState<Build[]>([]);
  const [error, setError] = React.useState<boolean>(false);
  const [component, setComponent] = React.useState<React.ReactElement>(<></>);
  const navigate = useNavigate();

  const isSm = useMediaQuery('(max-width: 600px)');

  const handleDrawerChange = React.useCallback((type: string) => {
    if (type === "Dashboard") {
      setComponent(<Welcome builds={builds} onChange={handleDrawerChange} />);
    }
    else if (type === "Settings") {
      setComponent(<>Settings</>);
    }
    else {
      if(type.length == 1) {
        setComponent(<BuildDetail id={Number(type)} />);
      } else {
        const res = deleteBuild(type.split(" ")[0]);
        res.then((result) => {
          if (result === 'Success') {
            const result = getUserBuilds();
            result.then(
              function(res) {
                setBuilds(res);
              },
              function(err) {
                setError(true);
              }
            )
          }
        })
      }
    }
  }, [builds]);

  React.useEffect(() => {
    const result = getUserBuilds();
    result.then(
      function (res) {
        setBuilds(res);
      },
      function (err) {
        setError(true);
      }
    );
  }, []);

  React.useMemo(() => {
      setComponent(<Welcome builds={builds} onChange={handleDrawerChange} />);
  }, [builds, handleDrawerChange]);

  const Logout = () => {
    const result = logout();
    result.then(
      function(res) {
        navigate('/Home');
      },
      function(err){
        console.log(err);
      }
    )
  }

  return (
    <Container disableGutters maxWidth={false}>
      {error ? (
        <NotFound />
      ) : (
        <Box sx={{ display: isSm ? '' : 'flex' }}>
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
          { isSm ? (<MoblieDrawer builds={builds} onChange={handleDrawerChange} />) : (
            <DesktopDrawer builds={builds} onChange={handleDrawerChange} />
          )}
          <Box>
            {isSm ? <></> : <Toolbar />}
            {component}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default UserBuildPage;
