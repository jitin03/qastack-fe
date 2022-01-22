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
import Breadcrumb from "../Breadcrumb";

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
  const { handleRightDrawer, openToast, handleCloseToast } = useGlobalContext();
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
            justifyContent="flex-end"
            alignItems="center"
            style={{
              backgroundColor: "rgb(248, 248, 248)",
            }}
          >
            <Grid item>
              <Tooltip title="Add Release" arrow disableInteractive>
                <Button
                  variant="outlined"
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
                <Typography>No Project avaiable</Typography>
                <Tooltip title="Add Release" arrow disableInteractive>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => handleRightDrawer("Add Release", projectId)}
                  >
                    Add Release
                  </Button>
                </Tooltip>
              </Grid>
            )}
            <Grid item></Grid>
            {isError && (
              <>
                <Toast
                  openToast={openToast}
                  message={JSON.stringify(error.message)}
                  handleCloseToast={handleCloseToast}
                ></Toast>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Release;
