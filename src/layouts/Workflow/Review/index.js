import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import WorkFlow from "../Create/WorkFlow";
import { makeStyles } from "@mui/styles";
import { useGlobalContext } from "../../../context/provider/context";
import { useNavigate, useParams } from "react-router-dom";
import { getWorkflowDetail } from "../../../context/actions/workflow/api";
import { useQuery } from "react-query";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { green, grey, orange } from "@mui/material/colors";
import { fetchData } from "../../../context/actions/workflow/sseClient";
import WorkflowLogs from "../List/WorkflowLogs";
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
  const { workflowNameLog, setWorkflowNameLog } = useGlobalContext();
  let params = {};
  const [elements, setElements] = useState([]);
  const [workFlowState, setworkFlowState] = useState([]);
  let navigate = useNavigate();
  let { projectKey: projectId, id } = useParams();
  const classes = useStyles();
  params.id = id;
  console.log("---elements--", elements);

  const {
    data: workflowDetails,
    error,
    isLoading: waitForWorkflowDetails,
    isError,
    isFetched,
  } = useQuery(["workflowDetail", id, "PR937"], getWorkflowDetail, {
    onError: (error) => {},
    onSuccess: (data) => {
      let node = {
        id: "",
        data: { label: "" },
        position: { x: 150, y: 0 },
      };
      const updatedElements = [];

      for (let index = 0; index < data?.Config.length; index++) {
        node.position = { x: 150, y: 0 };
        console.log(updatedElements);
        console.log(data?.node_status[index].phase);
        setWorkflowNameLog(data.node_status[0].updateWorkflowName);
        if (data?.Config[index].dependencies) {
          updatedElements.push({
            id: data?.Config[index].id,
            data: {
              label: (
                <Grid
                  container
                  justifyContent="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <Grid item xs={10}>
                    {data?.Config[index].name}
                  </Grid>

                  <Grid item xs={2}>
                    {data?.node_status[index].phase === "Succeeded" ? (
                      <CheckCircleOutlineIcon
                        size="small"
                        style={{
                          color: green[500],
                        }}
                      />
                    ) : (
                      <HourglassTopIcon
                        size="small"
                        style={{
                          color: orange[500],
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
              ),
            },
            position: { x: 150, y: 0 },
          });
          updatedElements.push({
            id: data?.Config[index].id,
            source: data?.Config[index].dependencies,
            target: data?.Config[index].id,
            type: "smoothstep",
          });
        } else {
          updatedElements.push({
            id: data?.Config[index].id,
            data: {
              label: (
                <Grid
                  container
                  justifyContent="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <Grid item xs={10}>
                    {data?.Config[index].name}
                  </Grid>

                  <Grid item xs={2}>
                    {data?.node_status[index].phase === "Succeeded" ? (
                      <CheckCircleOutlineIcon
                        size="small"
                        style={{
                          color: green[500],
                        }}
                      />
                    ) : (
                      <HourglassTopIcon
                        size="small"
                        style={{
                          color: orange[500],
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
              ),
            },
            position: { x: 150, y: 0 },
          });
        }
      }

      setElements(updatedElements);
      console.log(updatedElements);
      console.log(data);
    },
  });

  if (waitForWorkflowDetails) {
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
            <Typography variant="h6">
              {workflowDetails?.workflow_name}
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={3}
            style={{ paddingRight: "10px" }}
            justifyContent="flex-end"
          >
            
            <WorkflowLogs
              params={params}
              workflow_run_name={workflowNameLog}
              projectId={projectId}
            />
          </Grid>
          <Grid
            item
            container
            xs={3}
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
