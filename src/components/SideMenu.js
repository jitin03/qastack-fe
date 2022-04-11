import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { Grid, Toolbar, Typography } from "@mui/material";
import List from "@mui/material/List";
import { useParams, NavLink, Routes } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { submenus } from "../data/data";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Route } from "react-router-dom";
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
  width: `calc(${theme.spacing(12)} + 10px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(12)} + 10px)`,
  },
});

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

export default function SideMenu(props) {
  const { projectKey } = useParams();
  return (
    <>
      <Drawer variant="permanent">
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button component={NavLink} to={`/projects`}>
              <Grid item container direction="column">
                <Grid item xs={6}>
                  <ListItemIcon sx={{ pt: 2 }}>
                    <AssignmentIcon />
                  </ListItemIcon>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="span"
                    sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
                  >
                    Projects
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>

            {/* <ListItem button component={NavLink} to={`/role`}>
              <Grid item container direction="column">
                <Grid item xs={6}>
                  <ListItemIcon sx={{ pt: 2 }}>
                    <AssignmentIcon />
                  </ListItemIcon>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="span"
                    sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
                  >
                    Roles
                  </Typography>
                </Grid>
              </Grid>
            </ListItem> */}

            {/* <ListItem button component={NavLink} to={`/users`}>
              <Grid item container direction="column">
                <Grid item xs={6}>
                  <ListItemIcon sx={{ pt: 2 }}>
                    <AssignmentIcon />
                  </ListItemIcon>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="span"
                    sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
                  >
                    Users
                  </Typography>
                </Grid>
              </Grid>
            </ListItem> */}

            <Routes>
              {submenus.map((route, index) => (
                // You can render a <Route> in as many places
                // as you want in your app. It will render along
                // with any other <Route>s that also match the URL.
                // So, a sidebar or breadcrumbs or anything else
                // that requires you to render multiple things
                // in multiple places at the same URL is nothing
                // more than multiple <Route>s.
                <Route key={index} path={route.url} element={route.sidebar} />
              ))}
            </Routes>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
