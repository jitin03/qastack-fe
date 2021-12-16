import { CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import "./App.css";
import Project from "../components/Projects/Project";
import ProjectOverview from "../components/Projects/ProjectOverview";
import ComponentList from "../layouts/Component/List";
import LoginContainer from "../components/Login";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import RightDrawer from "../components/RightDrawer";
import { useGlobalContext } from "../context/provider/context";
import { QueryClientProvider, QueryClient } from "react-query";
import routes from "../routes";

import { useHistory } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import isAuthenticated from "../context/actions/auth/isAuthenticated";
const drawerWidth = 240;
const useStyles = makeStyles({
  appMain: {
    paddingLeft: "150px",
    width: "100%",
  },
});
const queryClient = new QueryClient();

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function App() {
  const [open, setOpen] = useState(false);
  const { configTitle } = useGlobalContext();
  const history = useHistory();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Box sx={{ display: "flex" }}>
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
        {isAuthenticated() && (
          <SideMenu open={open} handleDrawerClose={handleDrawerClose} />
        )}

        <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
          <DrawerHeader />

          <Switch>
            {routes.map((route, index) => {
              const { path, component } = route;
              if (route.needsAuth && !isAuthenticated()) {
                history.push("/auth/login");
              }
              return (
                <Route key={index} exact path={path} component={component} />
              );
            })}
          </Switch>
        </Box>
      </Box>
      <RightDrawer
        open={open}
        // width="1300px"
        configTitle={configTitle}
        handleDrawerClose={handleDrawerClose}
      />
      <CssBaseline />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
