import {
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect, useRef } from "react";

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
  },
}));
const BottomDrawer = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: "0px",
  right: "0px",
  padding: "1rem 1.5rem 1.5rem",

  zIndex: 2,
}));
export default function TestCaseRecords(props) {
  const { register, control, param: projectId } = props;
  const classes = useStyles();
  const [selectedComponent, setSelectedComponent] = useState("");
  console.log("projectId", projectId);

  const {
    componentState: { component },
    componentDispatch,
    handleCloseRightDrawer,
    setOpenToast,
    openToast,
    handleCloseToast,
  } = useGlobalContext();

  return (
    <>
      <Box sx={{ border: "1px solid rgb(232, 232, 232)" }}>
        <Grid container direction="row" justify="center" alignItems="stretch">
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
                setSelectedComponent={setSelectedComponent}
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
              component={selectedComponent}
              projectId={projectId}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const Records = (props) => {
  const { control, projectId, setSelectedComponent } = props;
  const classes = {};
  const [selectionModel, setSelectionModel] = useState([]);

  const [pageSize, setPageSize] = useState(5);

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
    onError: (error) => {},
    onSuccess: (components) => {
      setRowsState((prev) => ({ ...prev, rows: components }));
    },
  });

  const baselineProps = {
    rows: components || [],
    columns: [
      { field: "component_id", hide: true },
      { field: "component_name", headerName: "Component Name", width: 250 },
      { field: "project_id", headerName: "Project Name", hide: true },
    ],
  };

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
              //
              columns={baselineProps.columns}
              pagination
              rowCount={baselineProps.rows?.length}
              getRowId={getRowId}
              // {...rowsState}
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
                console.log("newSelectionModel", newSelectionModel);
                setSelectionModel(newSelectionModel);
                setSelectedComponent(newSelectionModel);
              }}
              selectionModel={selectionModel}
            />
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
};

const TestCaseList = (props) => {
  const { control, component: componentId, projectId: projectId } = props;

  const { selectionModel, setSelectionModel } = useProjectContext();
  const classes = {};

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);

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
    onError: (error) => {},
    onSuccess: (components) => {
      setRowsState((prev) => ({ ...prev, rows: components }));
    },
  });

  const {
    data: testcases,
    error: testcaseErrors,
    loading: waitForTests,
  } = useQuery(
    ["testcases", componentId, projectId, pageSize],
    getAllTestCases,
    {
      onError: (error) => {},
      enabled: !!componentId,
    }
  );

  const baselineProps = {
    rows: testcases || [],
    columns: [
      { field: "testcaseId", headerName: "TestCase ID", width: 150 },
      { field: "title", headerName: "Title", width: 250 },
      { field: "type", headerName: "Type" },
      { field: "priority", headerName: "Priority" },
      {
        field: "mode",
        headerName: "Mode",
        width: 250,
        headerAlign: "center",
      },
    ],
  };

  const prevSelectionModel = useRef(selectionModel);

  useEffect(() => {
    setSelectionModel(prevSelectionModel.current);
  }, [componentId]);

  console.log("selectionModel", selectionModel);
  const getRowId = (row) => `${row?.testcaseId}`;
  return (
    <Grid item container style={{ padding: "16px" }}>
      <DataGrid
        //
        style={{ height: 400, width: "100%" }}
        columns={baselineProps.columns}
        pagination
        rowCount={baselineProps.rows?.length}
        getRowId={getRowId}
        {...rowsState}
        {...baselineProps}
        paginationMode="server"
        onPageChange={(newPage) => {
          prevSelectionModel.current = selectionModel;
          setPage(newPage);
        }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        loading={waitForComponents}
        checkboxSelection
        selectionModel={selectionModel}
        onSelectionModelChange={(newSelectionModel) => {
          prevSelectionModel.current = selectionModel;
          setSelectionModel(newSelectionModel);
        }}
      />
    </Grid>
  );
};
