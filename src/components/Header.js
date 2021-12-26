import React, { useEffect } from "react";
import { Badge, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Menu from "@mui/icons-material/Menu";
import Controls from "./controllers/Controls";
import { useGlobalContext } from "../context/provider/context";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useProjectContext } from "../context/provider/projectContext";
import Button from "./controllers/Button";
import isAuthenticated from "../context/actions/auth/isAuthenticated";
import { getAllProjects } from "../context/actions/project/api";
import { useAuthContext } from "../context/provider/authContext";
import { getUserDetail } from "../context/actions/auth/api";
import { getUserDetailFromToken } from "../helper/token";
const drawerWidth = 240;
const useStyles = makeStyles({
  headerRight: {
    flex: "1",
  },
  input: {
    padding: "10px 14px",
  },
  paragraph: {
    lineHeight: "2.5",
    textAlign: "center",
  },
  nospace: {
    flex: "1",
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
export default function Header(props) {
  const { open, handleDrawerOpen } = props;
  const { projectState, projectList, setProjectList } = useGlobalContext();
  const { starProject, setStarProject } = useProjectContext();
  const classes = useStyles();
  const {
    authState: { loggedIn },
    authDispatch,
  } = useAuthContext();
  const cars = ["tset", "asdad"];
  let getProjectList = [];
  const { data: user, isSuccess: userDetails } = useQuery(
    isAuthenticated() && [
      "users",
      getUserDetailFromToken(localStorage.getItem("token")).Username,
    ],
    getUserDetail
  );

  let userId = user?.data.users_id;
  const {
    data: projects,
    error,
    isLoading,
    isError,
  } = useQuery(["project", userId], () => getAllProjects(userId), {
    enabled: !!user,
  });

  const history = useHistory();
  const handleUserLogout = () => {
    localStorage.removeItem("token");
    history.push("/auth/login");
  };
  useEffect(() => {
    if (projects) {
      const temp = projects.map((item) => {
        return item.Name;
      });
      setProjectList(temp);
    }
    localStorage.setItem("starProject", starProject);
  }, [projects, starProject]);

  return (
    <AppBar position="fixed" open={open} style={{ background: "#795cec" }}>
      <Toolbar>
        <Grid
          container
          className={classes.root}
          align="center"
          justify="center"
          alignItems="center"
        >
          <Grid
            item
            container
            md={4}
            align="center"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h5" style={{ marginLeft: "20px" }}>
                QA-Stack
              </Typography>
            </Grid>
          </Grid>

          <Grid item className={classes.nospace} md={4}></Grid>
          <Grid
            item
            container
            md={4}
            columnSpacing={3}
            justifyContent="flex-end"
            alignContent="center"
            alignItems="center"
          >
            {isAuthenticated() && (
                <Grid item className={classes.headerRight}>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <Controls.Select
                      variant="standard"
                      name="projectName"
                      label="Select Project"
                      value={starProject}
                      onChange={(e) => setStarProject(e.target.value)}
                      options={projectList}
                    />
                  )}
                </Grid>
              ) && (
                <Grid item>
                  <Typography>
                    {
                      getUserDetailFromToken(localStorage.getItem("token"))
                        .Username
                    }
                  </Typography>
                </Grid>
              )}

            {!isAuthenticated() ? (
              <Grid item textAlign="end">
                <Button
                  variant="outlined"
                  text="Sign Up"
                  component={Link}
                  to={"/auth/register"}
                ></Button>
              </Grid>
            ) : (
              <Grid item textAlign="end">
                <Button
                  color="error"
                  variant="outlined"
                  text="Logout"
                  onClick={handleUserLogout}
                ></Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
