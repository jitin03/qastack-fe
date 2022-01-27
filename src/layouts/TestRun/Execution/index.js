import { Search } from "@material-ui/icons";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@material-ui/core";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Controls from "../../../components/controllers/Controls";
import AddIcon from "@mui/icons-material/Add";
import {
  getAllProjectTestRuns,
  getAllTestsTitleTestRuns,
} from "../../../context/actions/testcase/api";
import { useGlobalContext } from "../../../context/provider/context";
import { useProjectContext } from "../../../context/provider/projectContext";
import { DataGrid } from "@mui/x-data-grid";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
}));
export const TestExecution = (props) => {
  const { id: testRunId } = useParams();

  const classes = useStyles();
  const {
    handleCloseToast,
    openToast,
    setOpenToast,
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

  const history = useHistory();

  const {
    data: testCasesTitle,
    error: projectTestRunsError,
    isLoading: waitForTestsTitle,
    isError: isErrorFromProjectTestRuns,
  } = useQuery(
    ["testcaseTitles", testRunId],
    getAllTestsTitleTestRuns,

    {
      enabled: !!testRunId,
    }
  );

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
            <Typography variant="h6">Test Runs & Results</Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            justifyItems="center"
            justifySelf="center"
            md={8}
          >
            <Grid item>
              <Toolbar>
                <Controls.Input
                  label="Search Test by title "
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
            preloadedData={testCasesTitle}
            testRunId={testRunId}
            waitForProjectTestRuns={waitForTestsTitle}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const Tests = (props) => {
  const { preloadedData, testRunId, waitForProjectTestRuns } = props;
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
        field: "testcase_run_id",
        headerName: "Case Code",
        width: 150,
      },
      {
        field: "testcase_title",
        headerName: "Test Case Title",
        width: 450,
      },

      {
        field: "status",
        headerName: "Status",
        width: 150,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer", width: "100%" }}
            >
              {/* <MatEdit index={params.id} /> */}

              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value="-1"
                  label="Type"
                  //   onChange={onChange}
                >
                  <MenuItem value="-1">Unexecuted</MenuItem>
                  <MenuItem value="0">Passed</MenuItem>
                  <MenuItem value="1">Failed</MenuItem>
                  <MenuItem value="2">Blocked</MenuItem>
                </Select>
              </FormControl>
            </div>
          );
        },
      },
      {
        field: "assignee",
        headerName: "Assignee",
        width: 350,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer", width: "100%" }}
            >
              {/* <MatEdit index={params.id} /> */}

              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value="2"
                  label="Type"
                  //   onChange={onChange}
                >
                  <MenuItem value="-1">Jitin</MenuItem>
                  <MenuItem value="0">Client</MenuItem>
                  <MenuItem value="1">Doriya</MenuItem>
                  <MenuItem value="2">Mehul</MenuItem>
                </Select>
              </FormControl>
            </div>
          );
        },
      },
    ],
  };

  // useEffect(() => {
  //   setSelectionModel(prevSelectionModel.current);
  // }, [componentId]);

  console.log("selectionModel", selectionModel);
  console.log("preloadedData", preloadedData);
  const getRowId = (row) => `${row?.testcase_run_id}`;
  return (
    <Grid
      item
      container
      style={{ padding: "16px", flexGrow: 1, display: "flex" }}
    >
      <DataGrid
        style={{ height: 600, width: "100%" }}
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
