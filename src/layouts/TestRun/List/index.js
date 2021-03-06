import {
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "../../../context/provider/context";
import useTable from "../../../components/Shared/useTable";
import { Search } from "@material-ui/icons";
import { makeStyles } from "@mui/styles";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteComponent,
  getAllComponents,
} from "../../../context/actions/component/api";
import Controls from "../../../components/controllers/Controls";
import { FormControlLabel } from "@material-ui/core";
import Toast from "../../../components/controllers/Toast";
import { useMutation, useQueryClient } from "react-query";
import {
  COMPONENT_CREATE_ERROR,
  EDIT_COMPONENT,
} from "../../../constants/actionTypes";
import { useProjectContext } from "../../../context/provider/projectContext";
import {
  getAllProjectTestCases,
  getAllProjectTestRuns,
} from "../../../context/actions/testcase/api";
import { blue, grey } from "@mui/material/colors";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteTestRun from "./DeleteTestRun";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
}));
export default function TestRunList() {
  const classes = useStyles();
  const {
    setOpenToast,
    openToast,
    toastMessage,
    handleCloseToast,
    settoastMessage,
    setSuccessAtProject,
    setProjectSuccessMessage,
    message,
    setMessage,
    setState,
    state,
    handleRightDrawer,
    componentDispatch,
    componentState: { component },
    setEditId,
  } = useGlobalContext();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [data, setData] = useState([]);
  let { id } = useParams();
  let { projectKey } = useParams();

  setEditId(id);
  const headCells = [
    { id: "testrun_id", label: "TestRun ID" },
    { id: "testrun_name", label: "TestRun Name" },
    { id: "action", label: "Action" },
  ];

  let navigate = useNavigate();

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
            <Typography variant="h6">Test Runs & Results</Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent="flex-end"
            justifyItems="center"
            style={{ paddingRight: "10px" }}
            xs={6}
          >
            <Tooltip title="Add TestRun" arrow>
              <Button
                size="small"
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleRightDrawer("Add TestRun", projectKey)}
              >
                Add TestRun
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          justifyItems="center"
          xs={12}
        >
          <Tests
            preloadedData={projectTestRuns}
            projectKey={projectKey}
            waitForProjectTestRuns={waitForProjectTestRuns}
          />
        </Grid>
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
    </Box>
  );
}

const Tests = (props) => {
  const { preloadedData, projectKey, waitForProjectTestRuns } = props;
  const { handleRightDrawer } = useGlobalContext();
  const { selectionModel, setSelectionModel } = useProjectContext();
  const classes = {};

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);

  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: 5,

    loading: false,
  });

  const handleEditTestRun = (id, projectKey) => {
    let params = [];
    params.push(projectKey);
    params.push(id);
    handleRightDrawer("Edit TestRun", params);
    setSelectionModel([]);
  };

  const handleDeleteTestRun = (id, projectKey) => {
    let params = [];
    params.push(projectKey);
    params.push(id);
    // handleRightDrawer("Edit TestCase", params);
  };
  const baselineProps = {
    rows: preloadedData || [],
    columns: [
      {
        field: "assignee",
        headerName: "Assignee",
        width: 150,
      },
      {
        field: "name",
        headerName: "Title",
        width: 450,
        renderCell: (params) => {
          return (
            <Link href={`/project/${projectKey}/testrun/${params?.id}`}>
              {params.value}
            </Link>
          );
        },
      },
      {
        field: "testcase_count",
        headerName: "Test Cases",
        width: 150,
      },
      {
        field: "status",
        headerName: "Status",
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
                        onClick={() => handleEditTestRun(params.id, projectKey)}
                        style={{ padding: "20px" }}
                      >
                        <EditIcon style={{ color: grey[800] }} />
                      </IconButton>
                      <DeleteTestRun params={params} projectId={projectKey} />
                      {/* <IconButton
                        color="secondary"
                        aria-label="delete the test run"
                        style={{ padding: "20px" }}
                        onClick={() =>
                          handleDeleteTestRun(params.id, projectKey)
                        }
                      >
                        <DeleteIcon style={{ color: blue[500] }} />
                      </IconButton> */}
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
  const MatEdit = ({ index }) => {
    const handleEditClick = (index) => {
      // some action
    };
    const handleEditTestRun = (id, projectKey) => {
      let params = [];
      params.push(projectKey);
      params.push(id);
      handleRightDrawer("Edit TestCase", params);
    };

    return (
      <FormControlLabel
        control={
          <IconButton
            color="secondary"
            aria-label="edit the test case"
            onClick={() => handleEditTestRun(index, projectKey)}
          >
            <EditIcon style={{ color: blue[500] }} />
          </IconButton>
        }
      />
    );
  };

  // useEffect(() => {
  //   setSelectionModel(prevSelectionModel.current);
  // }, [componentId]);

  const getRowId = (row) => `${row?.id}`;
  return (
    <Grid
      item
      container
      style={{ padding: "16px", flexGrow: 1, display: "flex" }}
    >
      <DataGrid
        disableSelectionOnClick
        style={{ height: 400, width: "100%" }}
        columns={baselineProps.columns}
        pagination
        components={{
          Toolbar: GridToolbar,
        }}
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
        loading={waitForProjectTestRuns}
        selectionModel={selectionModel}
        onSelectionModelChange={(newSelectionModel) => {
          // prevSelectionModel.current = selectionModel;
          setSelectionModel(newSelectionModel);
        }}
      />
    </Grid>
  );
};
function QuickSearchToolbar(props) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search???"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
