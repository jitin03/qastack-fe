import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import FolderIcon from "@mui/icons-material/Folder";
import {
  getAllRelease,
  getProjectDetail,
} from "../../context/actions/project/api";
import {
  getAllProjectTestCases,
  getAllProjectTestRuns,
} from "../../context/actions/testcase/api";
const useStyles = makeStyles({
  projectCards: {
    textAlign: "center",
    padding: "5px",
  },
  headers: {
    borderBottom: "1px solid #f3f6f5",
  },
});
const ProjectOverview = () => {
  const { projectKey } = useParams();
  const classes = useStyles();

  const {
    data: project,
    isError,
    isLoading,
  } = useQuery(["project", projectKey], () => getProjectDetail(projectKey));

  console.log("project", project);

  const {
    data: releases,
    error: releaseError,
    isLoading: waitForReleases,
    isError: isErrorFromRelease,
  } = useQuery(["releases", projectKey], () => getAllRelease(projectKey), {
    enabled: !!projectKey,
  });

  const {
    data: projectTestCases,
    error: projectTestCasesError,
    isLoading: waitForProjectTestCases,
    isError: isErrorFromProjectTestCases,
  } = useQuery(
    ["projectTestcases", projectKey],
    getAllProjectTestCases,

    {
      enabled: !!projectKey,
    }
  );

  const {
    data: projectTestRuns,
    error: projectTestRunsError,
    isLoading: waitForProjectTestRuns,
    isError: isErrorFromProjectTestRuns,
  } = useQuery(
    ["projectTestruns", projectKey],
    getAllProjectTestRuns,

    {
      enabled: !!projectKey,
    }
  );

  return (
    <>
      <Box sx={{ border: "1px solid rgb(232, 232, 232)" }}>
        <Grid container justifyItems="center" alignItems="center">
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="center"
            style={{
              backgroundColor: "rgb(248, 248, 248)",
              padding: "20px",
            }}
          >
            <Typography variant="h6">
              Project Overview: {project?.Name}
            </Typography>
          </Grid>
          <Grid item container style={{ padding: "20px" }} spacing={24}>
            <Grid item md={3}>
              <Card style={{ minWidth: 275, minHeight: 400 }}>
                <CardHeader
                  title={`Releases`}
                  style={{ textAlign: "center" }}
                  subheader={
                    waitForReleases ? <CircularProgress /> : releases?.length
                  }
                  className={classes.headers}
                />
                <CardContent
                  className={classes.projectCards}
                  style={{ minHeight: 280, maxHeight: 280, overflow: "auto" }}
                >
                  {releases?.slice(0, 10)?.map((item, index) => (
                    <>
                      <List dense="true" key={item.index}>
                        <ListItemButton>
                          <ListItemIcon></ListItemIcon>
                          <ListItemText primary={item.ReleaseName} />
                        </ListItemButton>
                      </List>
                    </>
                  ))}
                </CardContent>
                <Typography
                  style={{ textAlign: "center" }}
                  color="textSecondary"
                >
                  View more...
                </Typography>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card style={{ minWidth: 275, minHeight: 400 }}>
                <CardHeader
                  title={`Test Cases`}
                  style={{ textAlign: "center" }}
                  subheader={
                    waitForProjectTestCases ? (
                      <CircularProgress />
                    ) : (
                      projectTestCases?.length
                    )
                  }
                  className={classes.headers}
                />
                <CardContent
                  className={classes.projectCards}
                  style={{ minHeight: 280, maxHeight: 280, overflow: "auto" }}
                >
                  {projectTestCases?.slice(1, 10)?.map((item, index) => (
                    <>
                      <List dense="true" key={item.index}>
                        <ListItemButton>
                          <ListItemIcon></ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </List>
                    </>
                  ))}
                </CardContent>
                <Typography
                  style={{ textAlign: "center" }}
                  color="textSecondary"
                >
                  View more...
                </Typography>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card style={{ minWidth: 275, minHeight: 400 }}>
                <CardHeader
                  title={`Test Runs`}
                  style={{ textAlign: "center" }}
                  subheader={
                    waitForProjectTestRuns ? (
                      <CircularProgress />
                    ) : (
                      projectTestRuns?.length
                    )
                  }
                  className={classes.headers}
                />
                <CardContent
                  className={classes.projectCards}
                  style={{ minHeight: 280, maxHeight: 280, overflow: "auto" }}
                >
                  {projectTestRuns?.slice(1, 10)?.map((item, index) => (
                    <>
                      <List dense="true" key={item.index}>
                        <ListItemButton>
                          <ListItemIcon></ListItemIcon>
                          <ListItemText primary={item.name} />
                        </ListItemButton>
                      </List>
                    </>
                  ))}
                </CardContent>
                <Typography
                  style={{ textAlign: "center" }}
                  color="textSecondary"
                >
                  View more...
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProjectOverview;
