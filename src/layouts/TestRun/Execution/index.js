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
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Controls from "../../../components/controllers/Controls";
import AddIcon from "@mui/icons-material/Add";
import {
  getAllProjectTestRuns,
  getAllTestsTitleTestRuns,
  updateTestStatus,
} from "../../../context/actions/testcase/api";
import { useGlobalContext } from "../../../context/provider/context";
import { useProjectContext } from "../../../context/provider/projectContext";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { Controller, useForm } from "react-hook-form";
import StatusChip from "../../../components/controllers/StatusChip";
import moment from "moment";

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
  const { id: testRunId, projectKey: projectId } = useParams();
  const [data, setData] = useState({});

  const {
    mutateAsync,
    isLoading,
    isError,
    error,
    data: updateTestStatusForm,
    isSuccess,
  } = useMutation(updateTestStatus, {
    onError: (error) => {
      // setOpenToast(true);
    },
    onSuccess: (data) => {
      // componentDispatch({
      //   type: COMPONENT_CREATE_SUCCESS,
      //   payload: data,
      // });
    },
  });

  const handleChange = async (e, id) => {
    console.log(id);
    // console.log(e.target.value);
    // setValue(e.target.value);
    // id.api.updateRows([{ id: id.row?.id, status: e.target.value }]);
    id.api.updateRows([{ ...id.row, status: e.target.value }]);
    console.log("Status has changed");
    // console.log([{ ...id.row, status: e.target.value }]);

    console.log(id.api.getRow(id?.id));

    setData(id.api.getRow(id?.id));

    try {
      data.projectId = projectId;
      console.log(data);
      await mutateAsync(id.api.getRow(id?.id));
    } catch (error) {
      console.log(error.message);
    }

    // let x;
    // console.log(id.api.getRowModels());
    // x = id.api.getRowModels();
    // console.log(x.keys());
    // let data = null;
    // x.forEach((element) => {
    //   console.log(element);
    //   if (element?.testcase_run_id === "TRC985") {
    //     data = element;
    //   }
    // });
    // console.log(data);

    // setStatus(e.target.value);

    // apiRef.current.updateRows([{ id: rowId, status: "Passed" }]);

    // setValue(event.target.value);
  };
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
  const { register, handleSubmit, control } = useForm();
  // const [data, setData] = useState([]);
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
            control={control}
            preloadedData={testCasesTitle}
            testRunId={testRunId}
            waitForProjectTestRuns={waitForTestsTitle}
            setData={setData}
            handleChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Tests = (props) => {
  const apiRef = useGridApiRef();
  const {
    control,
    preloadedData,
    testRunId,
    waitForProjectTestRuns,
    setData,
    handleChange,
  } = props;
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
  const [status, setStatus] = useState("Unexecuted");

  const handleDateChange = (e, params) => {
    console.log(params);
    console.log(e.target.value);
    params.api.updateRows([{ ...params.row, Col2: e.target.value }]);
  };

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

  const updateRows = (value, id, field) => {
    console.log(field);
    console.log(id);
    console.log(value);
    // const rowIds = apiRef.current.getAllRowIds();
    const rowId = id;
    apiRef.current.updateRows([{ id: id, status: "Passed" }]);
    // apiRef.current.updateRows([{ id: rowId, status: randomUserName() }]);
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

        renderCell: (params) => {
          return (
            <FormControl>
              <Select
                labelId="demo-simple-select-label"
                id={params?.id}
                // value={status}
                disableUnderline
                defaultValue={params?.row.status}
                label="Unexecuted"
                onChange={(e) => {
                  handleChange(e, params);

                  // updateRows(e.target.value, params?.id, params?.id);
                }}
                // onChange={(e) => setValue("name", e.target.value, true)}
                style={{ width: "100%" }}
                // MenuProps={MenuProps}
                renderValue={(selected) => (
                  // console.log("selected", selected)
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.2 }}>
                    <StatusChip key={selected} label={selected} />
                  </Box>
                )}
              >
                <MenuItem value="Unexecuted">Unexecuted</MenuItem>
                <MenuItem value="Passed">Passed</MenuItem>
                <MenuItem value="Failed">Failed</MenuItem>
                <MenuItem value="Blocked">Blocked</MenuItem>
              </Select>
            </FormControl>
          );
        },
      },
      // {
      //   field: "Col2",
      //   headerName: "Col2",
      //   flex: 1.0,
      //   disableClickEventBubbling: true,
      //   sortable: false,
      //   disableColumnMenu: true,
      //   renderCell: (params) => {
      //     return (
      //       <TextField
      //         type="date"
      //         defaultValue={moment(Date.parse(params.row.Col2)).format(
      //           "YYYY-MM-DD"
      //         )}
      //         InputLabelProps={{ shrink: true }}
      //         onChange={(e) => handleDateChange(e, params)}
      //       />
      //     );
      //   },
      // },

      {
        field: "assignee",
        headerName: "Assignee",
        width: 150,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <FormControl>
              <Select
                labelId="demo-simple-select-label"
                id={params?.id}
                disableUnderline
                // value={status}
                defaultValue={params?.row.assignee}
                label="Unexecuted"
                onChange={(e) => {
                  handleChange(e, params);

                  // updateRows(e.target.value, params?.id, params?.id);
                }}
                // onChange={(e) => setValue("name", e.target.value, true)}
                style={{ width: "100%" }}
                // MenuProps={MenuProps}
                renderValue={(selected) => (
                  // console.log("selected", selected)
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.2 }}>
                    <StatusChip key={selected} label={selected} />
                  </Box>
                )}
              >
                <MenuItem value="Jitin">Jitin</MenuItem>
                <MenuItem value="Client">Client</MenuItem>
              </Select>
            </FormControl>
          );
        },
      },
    ],
  };

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
        // density="compact"
        style={{ height: 600, width: "100%" }}
        columns={baselineProps.columns}
        pagination
        apiRef={apiRef}
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
