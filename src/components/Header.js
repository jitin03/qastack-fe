import React, { useEffect } from "react";
import { Badge, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { makeStyles } from "@mui/styles";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Menu from "@mui/icons-material/Menu";
import Controls from "./controllers/Controls";
import { useGlobalContext } from "../context/provider/context";
import { useQuery } from "react-query";
import { getAllProjects } from "../context/actions/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useProjectContext } from "../context/provider/projectContext";
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
  const cars = ["tset", "asdad"];
  let getProjectList = [];
  const { data, error, isLoading, isError } = useQuery(
    "project",
    getAllProjects
  );
  useEffect(() => {
    if (data) {
      const temp = data.map((item) => {
        return item.Name;
      });

      setProjectList(temp);
    }
  }, [data]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name);
  //   console.log(value);

  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  // };

  console.log(getProjectList);
  return (
    <AppBar position="fixed" open={open}>
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
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <Menu />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography>QA-Stack</Typography>
            </Grid>
          </Grid>

          <Grid item className={classes.nospace} md={4}></Grid>
          <Grid
            item
            container
            md={4}
            columnSpacing={3}
            justifyContent="flex-start"
            alignContent="center"
            alignItems="center"
          >
            <Grid item className={classes.headerRight}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Controls.Select
                  name="projectName"
                  label="Select Project"
                  value={starProject}
                  onChange={(e) => setStarProject(e.target.value)}
                  options={projectList}
                />
              )}
            </Grid>
            <Grid item>
              <Typography>Org.ABC</Typography>
            </Grid>
            <Grid item textAlign="end">
              <IconButton>
                <Badge badgeContent={4} color="secondary">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
