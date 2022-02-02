import { Search } from "@material-ui/icons";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Toolbar,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FormControlLabel } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import NotesIcon from "@mui/icons-material/Notes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import Controls from "../../../components/controllers/Controls";
import PlayArrow from "@mui/icons-material/PlayArrow";
import {
  deleteWorkflow,
  getAllWorkFlows,
  reSubmitWorkflowByName,
  runWorkflowByName,
  updateWorkflowRunStatus,
} from "../../../context/actions/workflow/api";
import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "../../../context/provider/context";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getUserDetail } from "../../../context/actions/auth/api";
import isAuthenticated from "../../../context/actions/auth/isAuthenticated";
import { getUserDetailFromToken } from "../../../helper/token";
import fetchData from "../../../context/actions/workflow/sseClient";
import closeEventSource from "../../../context/actions/workflow/closeClient";
import workflowStatus from "./workflowStatus";
import WorkflowStatus from "./workflowStatus";
import DeleteWorkflow from "./DeleteWorkflow";
import StopWorkflow from "./StopWorkflow";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
}));
export default function WorfklowCreate() {
  const classes = useStyles();
  const { projectKey: projectId } = useParams();

  const pages = [5, 10, 25];
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  const history = useHistory();

  const {
    data: userDetails,
    isSuccess: waitForUserDetails,
    refetch,
  } = useQuery(
    isAuthenticated() && [
      "users",
      getUserDetailFromToken(localStorage.getItem("token")).Username,
    ],
    getUserDetail
  );
  const {
    data: workflows,
    error,
    isLoading: waitForAllWorkflows,
    isError,
  } = useQuery(["workflows", projectId, rowsPerPage], getAllWorkFlows, {
    onError: (error) => {
      // setOpenToast(true);
      // componentDispatch({
      //   type: COMPONENT_CREATE_ERROR,
      //   payload: error.message,
      // });
    },
    onSuccess: (components) => {
      // setData(components);
    },
    enabled: !!userDetails,
  });
  const handleAddNewFlow = (projectId) => {
    console.log(projectId);
    history.push(`/project/${projectId}/ciFlow/create`);
  };

  if (waitForAllWorkflows) {
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
          justifyItems="center"
          style={{
            backgroundColor: "rgb(248, 248, 248)",
          }}
        >
          <Grid item md={4} style={{ padding: "15px" }}>
            <Typography variant="h6">Test Jobs</Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent="flex-end"
            justifyItems="center"
            justifySelf="center"
            md={8}
          >
            <Grid item>
              <Toolbar>
                <Controls.Input
                  label="Search Workflow "
                  className={classes.searchInput}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  // onChange={handleSearch}
                />
              </Toolbar>
            </Grid>
            <Grid item>
              <Tooltip title="Add new Job" arrow disableInteractive>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  // onClick={() => setState(!state)}
                  onClick={() => handleAddNewFlow(projectId)}
                  sx={{ m: 1.5 }}
                >
                  Add new job
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          justifyItems="center"
          xs={12}
        >
          <WorkflowList
            preloadedData={workflows}
            projectId={projectId}
            waitForAllWorkflows={waitForAllWorkflows}
            userDetails={userDetails}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

const WorkflowList = (props) => {
  const { preloadedData, projectId, waitForAllWorkflows, userDetails } = props;

  const userId = userDetails?.data.users_id;
  const { handleRightDrawer } = useGlobalContext();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [workflowTriggeredStatus, setTriggeredWorkflowStatus] =
    useState("Unexecuted");
  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: 5,

    loading: false,
  });
  const { mutateAsync, isLoading: waitForDeleteWorkflow } = useMutation(
    deleteWorkflow,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("workflows");
      },
    }
  );
  const { mutateAsync: runNowWorkflow, isLoading: waitForWorkflowRun } =
    useMutation(runWorkflowByName, {
      onSettled: () => {
        queryClient.invalidateQueries("workflows");
      },
    });

  const {
    mutateAsync: reSubmitNowWorkflow,
    isLoading: waitForWorkflowReSubmit,
  } = useMutation(reSubmitWorkflowByName);

  const handleEditWorkflow = (id, projectId) => {
    let params = [];
    params.push(projectId);
    params.push(id);
    handleRightDrawer("Edit Workflow", params);
  };
  const {
    mutateAsync: updateWorkflowStatus,
    isLoading: waitForWorkflowUpdateStatus,

    err,
    output,
    isSuccess,
  } = useMutation(updateWorkflowRunStatus, {});

  function handleFetchEvent(message, id) {
    console.log(message);
    console.log(message.result.object.status.phase);
    // setWorkflowStatus(message.result.object.status.phase);

    // if (message?.result?.object.status.phase !== "Running") {
    let workflowStatus = {};
    workflowStatus.user_Id = "3";
    workflowStatus.workflow_name = message?.result?.object.metadata.name;
    workflowStatus.id = id;
    workflowStatus.status = message?.result?.object.status.phase;
    setTriggeredWorkflowStatus(message?.result?.object.status.phase);
    updateWorkflowRunStatus(workflowStatus);
    if (
      message?.result?.object.status.phase === "Succeeded" ||
      message?.result?.object.status.phase === "Failed"
    ) {
      setTriggeredWorkflowStatus(message?.result?.object.status.phase);
      queryClient.invalidateQueries("workflows");
    }
    // }
  }

  const handleRunNowWorkflow = async (id, name, userId, status) => {
    console.log("name", name);

    let data = {};
    if (status === "Build Now") {
      await runNowWorkflow(id, userId);

      console.log("preloadedData", preloadedData);
      let response = await fetchData(name, id, handleFetchEvent);
      console.log("response", response);
    } else if (status === "Succeeded") {
      data.workflowName = name;
      data.userId = userId;
      let response = await reSubmitNowWorkflow(data);

      await fetchData(response?.workflow_run_name, id, handleFetchEvent);
    }
  };
  const queryClient = useQueryClient();
  const handleDeleteWorkflow = async (id) => {
    let params = [];
    // params.push(projectKey);
    params.push(id);
    await mutateAsync(id);
    queryClient.invalidateQueries("workflows");
  };

  const handleViewLogs = (id) => {
    handleRightDrawer("View Logs", id);
  };

  const baselineProps = {
    rows: preloadedData || [],
    columns: [
      {
        field: "workflow_name",
        headerName: "Workflow Name",
        width: 350,
        padding: "50px",
      },
      {
        field: "username",
        headerName: "Create by",
        width: 150,
      },
      {
        field: "workflow_status",
        headerName: "Status",
        width: 150,
        renderCell: (params) => (
          <Typography
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
          >
            <WorkflowStatus
              params={params}
              waitForWorkflowRun={waitForWorkflowRun}
              workflowEventStatus={workflowTriggeredStatus}
              key={params?.id}
            />
          </Typography>
        ),
      },

      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 350,
        headerAlign: "center",
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
            >
              {/* <MatEdit index={params.id} /> */}
              <FormControlLabel
                control={
                  <>
                    <div style={{ padding: "80px" }}>
                      <Tooltip title="Run" arrow disableInteractive>
                        <IconButton
                          aria-label="Run"
                          style={{ padding: "10px" }}
                        >
                          <PlayCircleOutlineIcon
                            onClick={() =>
                              handleRunNowWorkflow(
                                params?.id,
                                params?.row.workflow_run_name,
                                userId,
                                params?.row.workflow_status
                              )
                            }
                          />
                        </IconButton>
                      </Tooltip>

                      <StopWorkflow params={params} />
                      <IconButton
                        color="secondary"
                        aria-label="edit the test run"
                        onClick={() => handleEditWorkflow(params.id, projectId)}
                        style={{ padding: "10px" }}
                      >
                        <EditIcon style={{ color: grey[500] }} />
                      </IconButton>
                      <DeleteWorkflow params={params} />
                      <Tooltip title="View Logs" arrow>
                        <IconButton
                          color="secondary"
                          aria-label="delete the test run"
                          style={{ padding: "10px" }}
                          onClick={() => handleViewLogs(params.id)}
                        >
                          <NotesIcon style={{ color: grey[500] }} />
                          {waitForDeleteWorkflow && (
                            <CircularProgress key={params?.id} />
                          )}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </>
                }
              />
            </div>
          );
        },
      },
    ],
  };

  const getRowId = (row) => `${row?.Id}`;
  return (
    <Grid
      item
      container
      style={{ padding: "16px", flexGrow: 1, display: "flex" }}
    >
      <DataGrid
        style={{ height: 400, width: "100%" }}
        columns={baselineProps.columns}
        pagination
        rowCount={baselineProps.rows?.length}
        getRowId={getRowId}
        {...rowsState}
        {...baselineProps}
        paginationMode="server"
        onPageChange={(newPage) => {
          // prevSelectionModel.current = selectionModel;
          setPage(newPage);
        }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[20, 50, 100, 150]}
        loading={waitForAllWorkflows}
      />
    </Grid>
  );
};
