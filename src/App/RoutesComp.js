import React, { useState } from "react";
import SideMenu from "../components/SideMenu";
import isAuthenticated from "../context/actions/auth/isAuthenticated";
import RightDrawer from "../components/RightDrawer";
import { useGlobalContext } from "../context/provider/context";
import Box from "@mui/material/Box";
import routes, { openRoutes } from "../routes";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function RoutesComp() {
  const [open, setOpen] = useState(false);
  const { configTitle, drawerParam } = useGlobalContext();

  //   const handleDrawerOpen = () => {
  //     setOpen(true);
  //   };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      {isAuthenticated() && (
        <SideMenu open={open} handleDrawerClose={handleDrawerClose} />
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
        <Router>
          {routes.map((route, index) => {
            const { path, component } = route;

            if (!openRoutes.includes(path) && !isAuthenticated())
              return (
                <Redirect to={{ pathname: "/login", state: { from: path } }} />
              );

            return (
              <Route key={index} exact path={path} component={component} />
            );
          })}
        </Router>
      </Box>
      <RightDrawer
        open={open}
        configTitle={configTitle}
        handleDrawerClose={handleDrawerClose}
        params={drawerParam}
      />
    </>
  );
}

export default RoutesComp;
