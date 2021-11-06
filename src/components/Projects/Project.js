import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { useGlobalContext } from "../../context/provider/context";
import Breadcrumb from "../Breadcrumb";
import { getAllProjects } from "../../context/actions/api";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import RightDrawer from "../RightDrawer";
import ProjectList from "./ProjectList";
import { useQuery } from "react-query";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const useStyle = makeStyles({
  noModules: {
    padding: "50px 10px",
  },
});
const Project = () => {
  const { module, state, setState, setEditId, handleRightDrawer } =
    useGlobalContext();
  const { data, error, isLoading, isError } = useQuery(
    "project",
    getAllProjects
  );
  let { id } = useParams();
  console.log(useParams());
  setEditId(id);
  const classes = useStyle();

  if (isLoading) {
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
            <Container sx={{ display: "flex" }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            </Container>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </>
    );
  }
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
          {data.length > 0 ? (
            <ProjectList projects={data} />
          ) : (
            <Grid item>
              <Typography>No Project avaiable</Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleRightDrawer("Add Project")}
              >
                Add Project
              </Button>
            </Grid>
          )}
          <Grid item></Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Project;
