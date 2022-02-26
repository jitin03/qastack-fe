import { Box, Button, Grid, Tooltip } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "../../context/provider/context";
import { DataGrid } from "@mui/x-data-grid";
import DeleteUser from "./DeleteUser";

export const UserManagementList = () => {
  const { handleRightDrawer } = useGlobalContext();
  return (
    <>
      <Box sx={{ border: "1px solid rgb(232, 232, 232)" }}>
        <Grid container justifyItems="center" alignItems="center">
          <Grid
            item
            container
            justifyContent="flex-end"
            alignItems="center"
            style={{
              backgroundColor: "rgb(248, 248, 248)",
            }}
          >
            <Grid item>
              <Tooltip title="Add new user" arrow>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleRightDrawer("Add User")}
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
            <UserList
              userList={userList}
              userId={userId}
              waitForUserList={waitForUserList}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const UserList = (props) => {
  const { userList } = props;
  const { handleRightDrawer } = useGlobalContext();

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
        field: "name",
        headerName: "Name",
        width: 150,
      },
      {
        field: "email",
        headerName: "Email",
        width: 450,
      },
      {
        field: "user_type",
        headerName: "User Type",
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
                      <DeleteUser params={params} userId={userId} />
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
