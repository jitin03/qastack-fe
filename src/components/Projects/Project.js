import { Button, Container, Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useGlobalContext } from "../../context/provider/context";

import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import RightDrawer from "../RightDrawer";
import ProjectList from "./ProjectList";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useProjectContext } from "../../context/provider/projectContext";
import Toast from "../controllers/Toast";
import { getAllProjects } from "../../context/actions/project/api";
import { getUserDetail } from "../../context/actions/auth/api";
import isAuthenticated from "../../context/actions/auth/isAuthenticated";
import { getUserDetailFromToken } from "../../helper/token";
import project from "../../context/reducers/project";

const useStyle = makeStyles({
  noModules: {
    padding: "50px 10px",
  },
});
const Project = () => {
  const {
    module,
    state,
    setState,
    setEditId,
    handleRightDrawer,
    handleCloseToast,
    openToast,
    setOpenToast,
    message,
    setMessage,
    toastMessage,
    projectSuccessMessage,
    setProjectSuccessMessage,
    settoastMessage,
    successAtProject,
    setSuccessAtProject,
  } = useGlobalContext();
  const classes = useStyle();

  console.log("---projectSuccessMessage---", projectSuccessMessage);
  console.log("---successAtProject---", successAtProject);
  const { data: user, isSuccess: userDetails } = useQuery(
    ["users", getUserDetailFromToken(localStorage.getItem("token")).username],
    getUserDetail,
    {
      enabled: isAuthenticated(),
    }
  );

  let userId = user?.data.users_id;

  const {
    data: projects,
    error,
    isLoading,
    isError,
  } = useQuery(["project", userId], () => getAllProjects(userId), {
    enabled: !!userId,
    cacheTime: 5,
    onError: (error) => {
      setMessage(!message);
    },
  });

  let { id } = useParams();

  setEditId(id);
  let newData;

  if (isLoading) {
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
      <Box sx={{ border: "1px solid rgb(232, 232, 232)" }}>
        <Grid container justifyItems="center" alignItems="center">
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            style={{
              backgroundColor: "rgb(248, 248, 248)",
            }}
          >
            <Grid
              item
              container
              xs={6}
              justifyContent="flex-start"
              style={{ paddingLeft: "10px" }}
            >
              <Typography variant="h6">Projects</Typography>
            </Grid>
            <Grid
              item
              container
              xs={6}
              justifyContent="flex-end"
              style={{ paddingRight: "10px" }}
            >
              <Tooltip title="Add new project" arrow>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => handleRightDrawer("Add Project")}
                >
                  Add Project
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            style={{ padding: "50px 10px" }}
          >
            {projects?.length ? (
              <ProjectList projects={projects} />
            ) : (
              <Grid item>
                <Typography>No Project avaiable</Typography>
                <Tooltip title="Add new project" arrow>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => handleRightDrawer("Add Project")}
                  >
                    Add Project
                  </Button>
                </Tooltip>
              </Grid>
            )}
            <Grid item>
              {message && (
                <>
                  <Toast
                    openToast={openToast}
                    message={JSON.stringify(toastMessage)}
                    handleCloseToast={handleCloseToast}
                  ></Toast>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Project;
