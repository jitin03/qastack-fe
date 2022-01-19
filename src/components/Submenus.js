import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import List from "@mui/material/List";
import { useNavigate, useParams, Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { makeStyles } from "@mui/styles";
import { menus } from "../data/data";
import AssignmentIcon from "@mui/icons-material/Assignment";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const useStyles = makeStyles({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "px",
    width: "150px",
    height: "100%",
    backgroundColor: "#253053",
  },
});

export const Submenus = () => {
  const { projectKey } = useParams();

  console.log("projectKey", projectKey);

  return (
    <>
      <Grid container justifyItems="center">
        <Tooltip title="Project Overview" arrow disableInteractive>
          <ListItem
            button
            key="1"
            component={Link}
            to={`/project/${projectKey}`}
          >
            <Grid
              container
              item
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="span"
                  sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
                  style={{ overflowWrap: "break-word" }}
                >
                  Project Overview
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        </Tooltip>
        <Tooltip title="Components" arrow disableInteractive>
          <ListItem
            button
            key="2"
            component={Link}
            to={`/project/${projectKey}/components`}
          >
            <Grid
              container
              item
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="span"
                  sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
                >
                  Components
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        </Tooltip>

        <Tooltip title="Releases" arrow disableInteractive>
          <ListItem
            button
            key="2"
            component={Link}
            to={`/project/${projectKey}/releases`}
          >
            <Grid
              container
              item
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="span"
                  sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
                >
                  Release
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        </Tooltip>

        <Tooltip title="Test Cases" arrow disableInteractive>
          <ListItem
            button
            key="2"
            component={Link}
            to={`/project/${projectKey}/components/testcases`}
          >
            <Grid
              container
              item
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="span"
                  sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
                >
                  Test Cases
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        </Tooltip>

        <Tooltip title="Test Runs" arrow disableInteractive>
          <ListItem
            button
            key="2"
            component={Link}
            to={`/project/${projectKey}/testruns`}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="span"
                  sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
                >
                  Test Runs
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        </Tooltip>

        <Tooltip title="CI Flow" arrow disableInteractive>
          <ListItem
            button
            key="2"
            component={Link}
            to={`/project/${projectKey}/components/ciFlow`}
          >
            <Grid
              container
              item
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="span"
                  sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
                >
                  CI FLow
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        </Tooltip>
      </Grid>
    </>
  );
};
