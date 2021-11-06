import { Button, Grid, Typography } from "@mui/material";
import React from "react";

import { useGlobalContext } from "../../src/context";
import Breadcrumb from "./Breadcrumb";
import ModuleList from "../components/Modules/ModuleList";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import RightDrawer from "../components/RightDrawer";
import Modules from "./Modules/Modules";
const useStyle = makeStyles({
  noModules: {
    padding: "50px 10px",
  },
});
const Release = () => {
  const { module, state, setState } = useGlobalContext();

  const classes = useStyle();
  return (
    <>
      <Grid container>
        <Grid item style={{ flex: "1" }} color="GrayText">
          <Breadcrumb />
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          style={{ padding: "50px 10px" }}
        >
          <Grid item></Grid>
          <Modules />
          <Grid item></Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Release;
