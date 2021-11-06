import { CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import "./App.css";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import Requirement from "../components/Requirement";
import Modules from "../components/Modules/Modules";
import Error from "../components/Error";
import RightDrawer from "../components/RightDrawer";
import Release from "../components/Releases/Release";
import { useGlobalContext } from "../context/provider/context";
import Project from "../components/Projects/Project";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ProjectEditForm from "../components/Projects/ProjectEditForm";
import ProjectList from "../components/Projects/ProjectList";
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

        <SideMenu open={open} handleDrawerClose={handleDrawerClose} />

        <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
          <DrawerHeader />

          <Switch>
            <Route exact path="/" exact component={Requirement} />
            <Route exact path="/modules" component={Modules} />
            <Route exact path="/projects" component={Project} />
            <Route exact path="/project/create" component={Project} />
            <Route exact path="/releases" component={Release} />
            <Route exact path="/release/create" component={Release} />
            <Route exact path="/module/create" component={Modules} />
            <Route exact path="/project/edit/:id" component={Project} />
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Box>
      </Box>
      <RightDrawer
        open={open}
        configTitle={configTitle}
        handleDrawerClose={handleDrawerClose}
      />
      <CssBaseline />
    </QueryClientProvider>
  );
}

export default App;
