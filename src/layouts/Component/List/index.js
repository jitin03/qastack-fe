import {
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
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
import Toast from "../../../components/controllers/Toast";
import { useMutation, useQueryClient } from "react-query";
import {
  COMPONENT_CREATE_ERROR,
  EDIT_COMPONENT,
} from "../../../constants/actionTypes";
import DeleteComponent from "./DeleteComponent";
import { DataGrid } from "@mui/x-data-grid";
import { useProjectContext } from "../../../context/provider/projectContext";
import { grey } from "@mui/material/colors";
import { FormControlLabel } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "100%",
  },
}));
export default function ComponentList() {
  const classes = useStyles();
  const {
    handleCloseToast,
    openToast,
    setOpenToast,
    toastMessage,
    message,
    setState,
    state,
    handleRightDrawer,
    componentDispatch,
    componentState: { component },
    setEditId,
  } = useGlobalContext();

  let { id } = useParams();
  let { projectKey: projectId } = useParams();
  const pages = [20, 50, 80];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  const headCells = [
    { id: "component_id", label: "Id" },
    { id: "component_name", label: "Component Name" },
    { id: "action", label: "Action" },
  ];
  console.log("--rowsPerPage--", rowsPerPage);
  const {
    data: components,
    error,
    isLoading: waitForComponents,
    isError,
  } = useQuery(["component", projectId, rowsPerPage], getAllComponents);
  let navigate = useNavigate();
  const { mutateAsync, isLoading: deleteComponentLoading } =
    useMutation(deleteComponent);

  const queryClient = useQueryClient();
  const handleDeleteComponent = async (id) => {
    await mutateAsync(id);
    queryClient.invalidateQueries("component");
  };

  if (waitForComponents) {
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
            container
            xs={6}
            justifyContent="flex-start"
            style={{ paddingLeft: "10px" }}
          >
            <Typography variant="h6">Component</Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent="flex-end"
            xs={3}
            style={{ margin: "2px 0" }}
          ></Grid>
          <Grid
            item
            container
            xs={3}
            justifyContent="flex-end"
            style={{ paddingRight: "10px" }}
          >
            <Tooltip title="Add new component" arrow>
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                // onClick={() => setState(!state)}
                onClick={() => handleRightDrawer("Add Component", projectId)}
              >
                Add Component
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
          <Components
            preloadedData={components}
            projectKey={projectId}
            waitForComponents={waitForComponents}
            setRowsPerPage={setRowsPerPage}
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

const Components = (props) => {
  const { preloadedData, projectKey, waitForComponents, setRowsPerPage } =
    props;
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

  const handleEditComponent = (param, projectKey) => {
    console.log(param?.id);
    let params = [];

    params.push(projectKey);
    params.push(param?.id);
    handleRightDrawer("Edit Component", params);
    setSelectionModel([]);
  };

  const baselineProps = {
    rows: preloadedData || [],
    columns: [
      {
        field: "component_name",
        headerName: "Component",
        width: 450,
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
                        onClick={() => handleEditComponent(params, projectKey)}
                        style={{ padding: "20px" }}
                      >
                        <EditIcon style={{ color: grey[800] }} />
                      </IconButton>
                      <DeleteComponent params={params} projectId={projectKey} />
                    </div>
                  </>
                }
              />
            </div>
          );
        },
      },
      {
        field: "create_date",
        headerName: "Create Date",
        width: 350,
      },
    ],
  };

  const getRowId = (row) => `${row?.component_id}`;
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
          setPage(newPage);
        }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setRowsPerPage(newPageSize);
        }}
        rowsPerPageOptions={[20, 50, 80]}
        loading={waitForComponents}
        selectionModel={selectionModel}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
      />
    </Grid>
  );
};
