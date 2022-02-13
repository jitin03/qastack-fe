import { Button, Grid, Typography } from "@mui/material";
import React from "react";

import { useGlobalContext } from "../../context/provider/context";


import ModuleList from "./ModuleList";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import RightDrawer from "../RightDrawer";
const useStyle = makeStyles({
  noModules: {
    padding: "50px 10px",
  },
});
const Modules = () => {
  const { module, state, setState, handleRightDrawer } = useGlobalContext();

  const classes = useStyle();
  return (
    <>
      <Grid container>
        <Grid item style={{ flex: "1" }} color="GrayText"></Grid>
        <Grid
          item
          container
          justifyContent="center"
          style={{ padding: "50px 10px" }}
        >
          <Grid item></Grid>
          {module.length > 0 ? (
            <ModuleList />
          ) : (
            <Grid item>
              <Typography>No Module avaiable</Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleRightDrawer("Add Module")}
              >
                Add Module
              </Button>
            </Grid>
          )}
          <Grid item></Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Modules;
