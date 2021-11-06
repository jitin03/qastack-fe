import { Button, Grid, Typography } from "@mui/material";
import React from "react";

import { useGlobalContext } from "../../context/provider/context";
import Breadcrumb from "../Breadcrumb";

import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import RightDrawer from "../RightDrawer";
const useStyle = makeStyles({
  noModules: {
    padding: "50px 10px",
  },
});
const Release = () => {
  const { module, state, setState, handleRightDrawer } = useGlobalContext();

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

          <Grid item>
            <Typography>No Release avaiable</Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => handleRightDrawer("Add Release")}
            >
              Add Release
            </Button>
          </Grid>

          <Grid item></Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Release;
