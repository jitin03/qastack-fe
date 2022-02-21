import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TableBody,
  TablePagination,
  TableSortLabel,
} from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import ListItemIcon from "@mui/material/ListItemIcon";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import { blue } from "@material-ui/core/colors";
import { FormControlLabel } from "@material-ui/core";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "../../../context/provider/context";
import { Search } from "@material-ui/icons";

import { getAllComponents } from "../../../context/actions/component/api";
import {
  COMPONENT_CREATE_ERROR,
  COMPONENT_LIST_ERROR,
  EDIT_COMPONENT,
  EDIT_TEST_CASE,
} from "../../../constants/actionTypes";
import { getAllTestCases } from "../../../context/actions/testcase/api";
import useTable from "../../../components/Shared/useTable";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useProjectContext } from "../../../context/provider/projectContext";
import Controls from "../../../components/controllers/Controls";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  table: {
    // marginTop: theme.spacing(3),
    "& thead th": {
      textAlign: "center",
      fontWeight: "600",

      // color: theme.palette.primary.main,
      // backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      textAlign: "center",
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "rgb(232, 232, 232)",
      cursor: "pointer",
    },
  },
}));
export default function TestCaseList() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedComponent, setSelectedComponent] = useState("");
  const {
    handleRightDrawer,
    setOpenToast,
    componentDispatch,
    testCaseDispatcg,
  } = useGlobalContext();
  const { projectKey } = useParams();
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [componentId, setComponentId] = useState("");
  const [chooseComponent, setChooseComponent] = useState("");
  const {
    data: components,
    error,
    isLoading,
    isError,
  } = useQuery(["component", projectKey, rowsPerPage], getAllComponents, {
    onError: (error) => {
      setOpenToast(true);
      componentDispatch({
        type: COMPONENT_CREATE_ERROR,
        payload: error.message,
      });
    },
  });
  const {
    data: testcases,
    error: componentError,
    isLoading: isComponentLoading,
    isError: isComponentsError,
  } = useQuery(["testcases", componentId, rowsPerPage], getAllTestCases, {
    onError: (error) => {
      setOpenToast(true);
      componentDispatch({
        type: COMPONENT_LIST_ERROR,
        payload: error.message,
      });
    },
  });

  const classes = useStyles();

  if (isLoading) {
    return (
      <>
        <Grid container>
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
    <>
      <Box sx={{ border: "1px solid rgb(232, 232, 232)" }}>
        <Grid container justifyItems="center" alignItems="center">
          <Grid container direction="row" justify="center" alignItems="stretch">
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
                <Typography variant="h6">Test Cases</Typography>
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
                      label="Search By Title "
                      className={classes.searchInput}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment>
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Toolbar>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() =>
                      handleRightDrawer("Add TestCase", projectKey)
                    }
                    sx={{ m: 1.5 }}
                  >
                    Add Test Case
                  </Button>
                </Grid>
              </Grid>
            </Grid>

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
                  setSelectedComponent={setSelectedComponent}
                  projectKey={projectKey}
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
              <Tests component={selectedComponent} projectKey={projectKey} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const Records = (props) => {
  const { projectKey, setSelectedComponent } = props;
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
  } = useQuery(["component", projectKey, pageSize], getAllComponents, {
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

const Tests = (props) => {
  const { component: componentId, projectKey: projectKey } = props;
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

  const {
    data: components,
    error,
    isLoading: waitForComponents,
    isError,
    refetch,
  } = useQuery(["component", projectKey, pageSize], getAllComponents, {
    onError: (error) => {},
    onSuccess: (components) => {
      setRowsState((prev) => ({ ...prev, rows: components }));
    },
  });

  const {
    data: testcases,
    error: testcaseErrors,
    loading: waitForTests,
  } = useQuery(["testcases", componentId, pageSize], getAllTestCases, {
    enabled: !!componentId,
    cacheTime: 0,
  });
  const handleEditTestCase = (id, projectKey) => {
    let params = [];
    params.push(projectKey);
    params.push(id);
    handleRightDrawer("Edit TestCase", params);
  };

  const baselineProps = {
    rows: testcases || [],
    columns: [
      {
        field: "testcaseId",
        headerName: "TestCase ID",
        width: 150,
        headerAlign: "center",
      },
      {
        field: "title",
        headerName: "Title",
        width: 450,
        headerAlign: "center",
      },
      { field: "type", headerName: "Type", headerAlign: "center" },
      { field: "priority", headerName: "Priority", headerAlign: "center" },

      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
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
                  <IconButton
                    color="secondary"
                    aria-label="edit the test case"
                    onClick={() => handleEditTestCase(params.id, projectKey)}
                  >
                    <EditIcon style={{ color: blue[500] }} />
                  </IconButton>
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

      console.log(index);
    };
    const handleEditTestCase = (id, projectKey) => {
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
            onClick={() => handleEditTestCase(index, projectKey)}
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

  console.log("selectionModel", selectionModel);
  const getRowId = (row) => `${row?.testcaseId}`;
  return (
    <Grid item container style={{ padding: "16px" }}>
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
        loading={waitForComponents}
        selectionModel={selectionModel}
        onSelectionModelChange={(newSelectionModel) => {
          // prevSelectionModel.current = selectionModel;
          setSelectionModel(newSelectionModel);
        }}
      />
    </Grid>
  );
};
