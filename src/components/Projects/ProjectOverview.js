import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProjectDetail } from "../../context/actions/project/api";
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
                  subheader={`1000`}
                  className={classes.headers}
                />
                <CardContent className={classes.projectCards}>
                  <Typography color="textSecondary">Word of the Day</Typography>
                  <Typography variant="headline" component="h2">
                    benevolent
                  </Typography>
                  <Typography color="textSecondary">adjective</Typography>
                  <Typography component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card style={{ minWidth: 275, minHeight: 400 }}>
                <CardHeader
                  title={`Test Cases`}
                  style={{ textAlign: "center" }}
                  subheader={`1000`}
                  className={classes.headers}
                />
                <CardContent className={classes.projectCards}>
                  <Typography color="textSecondary">Word of the Day</Typography>
                  <Typography variant="headline" component="h2">
                    benevolent
                  </Typography>
                  <Typography color="textSecondary">adjective</Typography>
                  <Typography component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={3}>
              <Card style={{ minWidth: 275, minHeight: 400 }}>
                <CardHeader
                  title={`Test Runs`}
                  style={{ textAlign: "center" }}
                  subheader={`1000`}
                  className={classes.headers}
                />
                <CardContent className={classes.projectCards}>
                  <Typography color="textSecondary">Word of the Day</Typography>
                  <Typography variant="headline" component="h2">
                    benevolent
                  </Typography>
                  <Typography color="textSecondary">adjective</Typography>
                  <Typography component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProjectOverview;
