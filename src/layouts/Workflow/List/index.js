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
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Controls from "../../../components/controllers/Controls";
import { getAllWorkFlows } from "../../../context/actions/workflow/api";
import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "../../../context/provider/context";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
          />
        </Grid>
      </Grid>
    </Box>
  );
}

const WorkflowList = (props) => {
  const { preloadedData, projectId, waitForAllWorkflows } = props;
  const { handleRightDrawer } = useGlobalContext();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);

  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: 5,

    loading: false,
  });

  const handleEditWorkflow = (id, projectKey) => {
    let params = [];
    params.push(projectKey);
    params.push(id);
    handleRightDrawer("Edit Workflow", params);
  };

  const handleDeleteWorkflow = (id, projectKey) => {
    let params = [];
    params.push(projectKey);
    params.push(id);
    // handleRightDrawer("Edit TestCase", params);
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
        field: "Create By",
        headerName: "Create by",
        width: 150,
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
                    <div style={{ padding: "50px" }}>
                      <IconButton
                        color="secondary"
                        aria-label="edit the test run"
                        onClick={() => handleEditWorkflow(params.id, projectId)}
                        style={{ padding: "20px" }}
                      >
                        <EditIcon style={{ color: grey[500] }} />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="delete the test run"
                        style={{ padding: "20px" }}
                        onClick={() =>
                          handleDeleteWorkflow(params.id, projectId)
                        }
                      >
                        <DeleteIcon style={{ color: grey[500] }} />
                      </IconButton>
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
        // paginationMode="server"
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
