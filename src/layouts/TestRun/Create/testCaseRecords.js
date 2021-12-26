import {
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect, useRef } from "react";

// import { useDemoData } from "@mui/x-data-grid-generator";
import { useGlobalContext } from "../../../context/provider/context";
import { useQuery } from "react-query";
import { COMPONENT_CREATE_ERROR } from "../../../constants/actionTypes";
import { getAllComponents } from "../../../context/actions/component/api";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import component from "../../../context/reducers/component";
import { getAllTestCases } from "../../../context/actions/testcase/api";
import { Box } from "@mui/system";
import { Controller } from "react-hook-form";
import { useProjectContext } from "../../../context/provider/projectContext";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      marginTop: theme.spacing(2),
    },
  },
  textarea: {
    resize: "both",
  },
  inputGroup: {
    marginBottom: theme.spacing(2),
  },
  bottomDrawer: {
    position: "sticky",
    bottom: "0px",
    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
    // backgroundColor: "rgb(255, 255, 255)",
    // zIndex: 1202,
  },
}));
const BottomDrawer = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: "0px",
  right: "0px",
  padding: "1rem 1.5rem 1.5rem",
  // backgroundColor: "rgb(255, 255, 255)",
  zIndex: 2,
}));
export default function TestCaseRecords(props) {
  const { register, control, param: projectId } = props;
  const classes = useStyles();
  const [selectionModel, setSelectionModel] = useState([]);
  console.log("projectId", projectId);
  const {
    componentState: { component },
    componentDispatch,
    handleCloseRightDrawer,
    setOpenToast,
    openToast,
    handleCloseToast,
  } = useGlobalContext();

  // console.log("selectTestCases", selectTestCases);
  return (
    <>
      <Box sx={{ border: "1px solid rgb(232, 232, 232)" }}>
        <Grid
          container
          //   sx={{ p: 10 }}
          direction="row"
          justify="center"
          alignItems="stretch"
        >
          <Grid
            item
            container
            justifyContent="center"
            justifyItems="center"
            style={{
              backgroundColor: "rgb(248, 248, 248)",
              //   padding: "2px",
            }}
            xs={3}
          >
            <Grid item container>
              <Records
                control={control}
                selectionModel={selectionModel}
                setSelectionModel={setSelectionModel}
                projectId={projectId}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            justifyItems="center"
            xs={9}
          >
            <TestCaseList
              control={control}
              selectionModel={selectionModel}
              setSelectionModel={setSelectionModel}
              // selectTestCases={selectTestCases}
              // setSelectTestCases={setSelectTestCases}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const Records = (props) => {
  //   console.log("components", components);
  const { control, selectionModel, setSelectionModel, projectId } = props;
  const classes = {};

  const pagesNextCursor = useRef({});

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //   const { data } = useDemoData({
  //     dataSet: "Commodity",
  //     rowLength: 100,
  //     maxColumns: 6,
  //   });
  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: 5,

    loading: false,
  });

  const {
    data: components,
    error,
    isLoading: waitForComponents,
    isError,
    refetch,
  } = useQuery(["component", projectId, pageSize], getAllComponents, {
    onError: (error) => {
      //   setOpenToast(true);
      //   componentDispatch({
      //     type: COMPONENT_CREATE_ERROR,
      //     payload: error.message,
      //   });
    },
    onSuccess: (components) => {
      setRowsState((prev) => ({ ...prev, rows: components }));
    },
  });
  let data = components;
  const baselineProps = {
    rows: components || [],
    columns: [
      { field: "component_id", hide: true },
      { field: "component_name", headerName: "Component Name", width: 250 },
      { field: "project_id", headerName: "Project Name", hide: true },
    ],
  };

  useEffect(() => {
    let active = true;

    (async () => {
      setRowsState((prev) => ({ ...prev, loading: true }));
      refetch();
      //   const newRows = await loadServerRows(
      //     rowsState.page,
      //     rowsState.pageSize,
      //     components
      //   );

      if (!active) {
        return;
      }

      setRowsState((prev) => ({ ...prev, loading: false, rows: components }));
    })();

    return () => {
      active = false;
    };
  }, [rowsState.page, rowsState.pageSize]);

  const getRowId = (row) => `${row?.component_id}`;
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{
        border: "none",
        boxShadow: "none",
      }}
    >
      <CardContent>
        <Grid item>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              columns={baselineProps.columns}
              pagination
              rowCount={baselineProps.rows?.length}
              getRowId={getRowId}
              {...rowsState}
              {...baselineProps}
              paginationMode="server"
              onPageChange={(page) =>
                setRowsState((prev) => ({ ...prev, page }))
              }
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              loading={waitForComponents}
              onSelectionModelChange={(newSelectionModel) => {
                console.log(newSelectionModel);
                setSelectionModel(newSelectionModel);
              }}
            />
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
};

const TestCaseList = (props) => {
  const { control, selectionModel: componentId } = props;
  const { selectTestCases, setSelectTestCases } = useProjectContext();
  const classes = {};

  const pagesNextCursor = useRef({});

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //   const { data } = useDemoData({
  //     dataSet: "Commodity",
  //     rowLength: 100,
  //     maxColumns: 6,
  //   });
  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: 5,

    loading: false,
  });

  const {
    data: components,
    error,
    isLoading: waitForComponents,
    isError,
    refetch,
  } = useQuery(["component", "PR931", pageSize], getAllComponents, {
    onError: (error) => {
      //   setOpenToast(true);
      //   componentDispatch({
      //     type: COMPONENT_CREATE_ERROR,
      //     payload: error.message,
      //   });
    },
    onSuccess: (components) => {
      setRowsState((prev) => ({ ...prev, rows: components }));
    },
  });

  const {
    data: testcases,
    error: testcaseErrors,
    loading: waitForTests,
  } = useQuery(["testcases", componentId, pageSize], getAllTestCases, {
    onError: (error) => {
      // setOpenToast(true);
      // componentDispatch({
      //   type: COMPONENT_LIST_ERROR,
      //   payload: error.message,
      // });
    },
    enabled: !componentId,
  });

  //   description: "test"
  // priority: "high"
  // testStepCounts: 1
  // testcaseId: "TC902"
  // title: "tste"
  // type: "accessiblity"

  const baselineProps = {
    rows: testcases || [],
    columns: [
      { field: "testcaseId", headerName: "TestCase ID", width: 150 },
      { field: "title", headerName: "Title", width: 250 },
      { field: "type", headerName: "Type" },
      { field: "priority", headerName: "Priority" },
    ],
  };

  useEffect(() => {
    let active = true;

    (async () => {
      setRowsState((prev) => ({ ...prev, loading: true }));
      refetch();
      //   const newRows = await loadServerRows(
      //     rowsState.page,
      //     rowsState.pageSize,
      //     components
      //   );

      if (!active) {
        return;
      }

      setRowsState((prev) => ({ ...prev, loading: false, rows: components }));
    })();

    return () => {
      active = false;
    };
  }, [rowsState.page, rowsState.pageSize]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  console.log("selectedRows", selectedRows);
  const getRowId = (row) => `${row?.testcaseId}`;
  return (
    <Grid item container style={{ padding: "16px" }}>
      <Controller
        name="testcases"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DataGrid
            style={{ height: 400, width: "100%" }}
            columns={baselineProps.columns}
            pagination
            rowCount={baselineProps.rows?.length}
            getRowId={getRowId}
            {...rowsState}
            {...baselineProps}
            //   rows={baselineProps.rows}
            paginationMode="server"
            onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            loading={waitForComponents}
            checkboxSelection
            onSelectionModelChange={onChange}
            // onSelectionModelChange={(newTestCase) => {
            //   console.log("newTestCase", newTestCase);
            //   // setSelectionModel(e);
            //   const selectedIDs = new Set(newTestCase);
            //   const selectedRows = baselineProps.rows?.filter((r) =>
            //     selectedIDs.has(r.testcaseId)
            //   );
            //   setSelectedRows(selectedRows);
            //   console.log(newTestCase);
            //   setSelectTestCases(newTestCase);
            // }}
            // selectionModel={selectTestCases}
            selectedRows={value}
          />
        )}
      />

      {/* <DataGrid
        style={{ height: 400, width: "100%" }}
        columns={baselineProps.columns}
        pagination
        rowCount={baselineProps.rows?.length}
        getRowId={getRowId}
        {...rowsState}
        {...baselineProps}
        //   rows={baselineProps.rows}
        paginationMode="server"
        onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        loading={waitForComponents}
        checkboxSelection
        onSelectionModelChange={(newTestCase) => {
          console.log(newTestCase);
          setSelectTestCases(newTestCase);
        }}
      /> */}
    </Grid>
  );
};
