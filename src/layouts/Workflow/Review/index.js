import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import WorkFlow from "../Create/WorkFlow";
import { makeStyles } from "@mui/styles";
import { useGlobalContext } from "../../../context/provider/context";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      marginTop: theme.spacing(1),
    },
  },
  textarea: {
    resize: "both",
  },
  bottomDrawer: {
    position: "absolute",

    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
    backgroundColor: "rgb(255, 255, 255)",
  },
}));
export const WorkflowReview = () => {
  const { elements, setElements } = useGlobalContext();
  let navigate = useNavigate();
  let { projectKey: projectId, id } = useParams();
  const classes = useStyles();
  console.log("---elements--", elements);
  return (
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
            container
            justifyContent="flex-start"
            style={{ paddingLeft: "10px" }}
          >
            <Typography variant="h6">{id}</Typography>
          </Grid>
          <Grid
            item
            container
            xs={6}
            style={{ paddingRight: "10px" }}
            justifyContent="flex-end"
          >
            <Tooltip title="Close" arrow>
              <Button size="small">
                <CancelIcon
                  variant="outlined"
                  onClick={(e) => {
                    navigate(`/project/${projectId}/ciFlow`);
                  }}
                >
                  Close
                </CancelIcon>
              </Button>
            </Tooltip>
          </Grid>
          <Grid
            item
            container
            justifyContent="flex-end"
            justifyItems="center"
            justifySelf="center"
            md={8}
          ></Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid
            item
            container
            style={{
              width: "100%",
              height: "65vh",
              backgroundColor: "#dde2e5",
            }}
          >
            <WorkFlow elements={elements} setElements={setElements} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
