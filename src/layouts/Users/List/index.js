import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useGlobalContext } from "../../../context/provider/context";
import AddIcon from "@mui/icons-material/Add";
import { getAllUsers } from "../../../context/actions/user-mgmt/api";
import { useQuery } from "react-query";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { FormControlLabel } from "@material-ui/core";
export default function Users() {
  const { message, openToast, setOpenToast, toastMessage, handleCloseToast } =
    useGlobalContext();

  const {
    data: users,
    error,
    isLoading: waitForUsers,
    isError,
  } = useQuery(["users"], getAllUsers);

  const handleAddUser = () => {
    navigate(`/users/create`);
  };

  if (waitForUsers) {
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
              <Typography variant="h6">Users</Typography>
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
              <Tooltip title="Add user" arrow>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddIcon />}
                  // onClick={() => setState(!state)}
                  onClick={() => handleAddUser()}
                >
                  Add User
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
            <UserList preloadedData={users} waitForUsers={waitForUsers} />
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
    </>
  );
}

const UserList = (props) => {
  const { preloadedData, waitForUsers } = props;
  const { handleRightDrawer } = useGlobalContext();

  const classes = {};

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: 5,

    loading: false,
  });

  const handleEditUser = (param) => {};

  const baselineProps = {
    rows: preloadedData || [],
    columns: [
      {
        field: "username",
        headerName: "Username",
        width: 150,
      },

      {
        field: "email",
        headerName: "Email",
        width: 250,
      },
      {
        field: "role",
        headerName: "Role",
        width: 150,
      },
      {
        field: "isactive",
        headerName: "IsActive",
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
                        onClick={() => handleEditUser(params)}
                        style={{ padding: "20px" }}
                      >
                        <EditIcon style={{ color: grey[800] }} />
                      </IconButton>
                    </div>
                  </>
                }
              />
            </div>
          );
        },
      },
      {
        field: "created_at",
        headerName: "Create Date",
        width: 350,
      },
    ],
  };

  const getRowId = (row) => `${row?.user_id}`;
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
        rowsPerPageOptions={[10, 15, 25]}
        loading={waitForUsers}
      />
    </Grid>
  );
};
