import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

import { useGlobalContext } from "../../context/provider/context";

import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import RightDrawer from "../RightDrawer";
import { getAllRelease } from "../../context/actions/project/api";
import ReleaseList from "./ReleaseList";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Toast from "../controllers/Toast";
const useStyle = makeStyles({
  noModules: {
    padding: "50px 10px",
  },
});
const Release = () => {
  const {
    handleRightDrawer,
    setOpenToast,
    openToast,
    toastMessage,
    settoastMessage,
    setSuccessAtProject,
    setProjectSuccessMessage,
    message,
    setMessage,
    handleCloseToast,
  } = useGlobalContext();
  const { projectKey: projectId } = useParams();
  console.log("projectId", projectId);
  const {
    data: releases,
    error,
    isLoading,
    isError,
  } = useQuery(["releases", projectId], () => getAllRelease(projectId), {
    enabled: !!projectId,
  });
  const classes = useStyle();
  if (isLoading) {
    return (
      <>
        <Grid container>
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
              xs={6}
              justifyContent="flex-start"
              style={{ paddingLeft: "10px" }}
              container
            >
              <Typography variant="h6">Releases</Typography>
            </Grid>
            <Grid
              item
              container
              justifyContent="flex-end"
              xs={6}
              style={{ paddingRight: "10px" }}
            >
              <Tooltip title="Add Release" arrow>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => handleRightDrawer("Add Release", projectId)}
                >
                  Add Release
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
            {releases?.length ? (
              <ReleaseList releases={releases} projectId={projectId} />
            ) : (
              <Grid item>
                <Typography>No Release avaiable</Typography>
                <Tooltip title="Add Release" arrow>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => handleRightDrawer("Add Release", projectId)}
                    size="small"
                  >
                    Add Release
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

export default Release;
