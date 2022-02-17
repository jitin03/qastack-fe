import * as React from "react";
import { Grid, Tooltip, Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const Submenus = () => {
  const { projectKey } = useParams();

  return (
    <>
      <Grid container>
        <Tooltip title="Project Overview" arrow>
          <ListItem
            button
            key="1"
            component={Link}
            to={`/project/${projectKey}`}
          >
            <Grid container item direction="column">
              <Grid item xs={6}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="span"
                  sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
                  style={{ overflowWrap: "break-word" }}
                >
                  Project Overview
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        </Tooltip>

        <ListItem
          button
          key="2"
          component={Link}
          to={`/project/${projectKey}/components`}
        >
          <Grid container item direction="column">
            <Grid item xs={6}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="span"
                sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
              >
                Components
              </Typography>
            </Grid>
          </Grid>
        </ListItem>

        <ListItem
          button
          key="2"
          component={Link}
          to={`/project/${projectKey}/releases`}
        >
          <Grid container item direction="column">
            <Grid item xs={6}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="span"
                sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
              >
                Release
              </Typography>
            </Grid>
          </Grid>
        </ListItem>

        <ListItem
          button
          key="2"
          component={Link}
          to={`/project/${projectKey}/components/testcases`}
        >
          <Grid container item direction="column">
            <Grid item xs={6}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="span"
                sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
              >
                Test Cases
              </Typography>
            </Grid>
          </Grid>
        </ListItem>

        <ListItem
          button
          key="2"
          component={Link}
          to={`/project/${projectKey}/testruns`}
        >
          <Grid container direction="column">
            <Grid item xs={6}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="span"
                sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
              >
                Test Runs
              </Typography>
            </Grid>
          </Grid>
        </ListItem>

        <ListItem
          button
          key="2"
          component={Link}
          to={`/project/${projectKey}/ciFlow`}
        >
          <Grid container item direction="column">
            <Grid item xs={6}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="span"
                sx={{ lineHeight: 2, fontWeight: "light", fontSize: 11 }}
              >
                CI FLow
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      </Grid>
    </>
  );
};
