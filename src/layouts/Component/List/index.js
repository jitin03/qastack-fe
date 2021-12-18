import {
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TableBody,
  TableCell,
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
import { useHistory, useParams } from "react-router-dom";
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
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
}));
const ComponentList = () => {
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
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  let { id } = useParams();
  let { projectKey } = useParams();

  setEditId(id);
  const headCells = [
    { id: "component_id", label: "Id" },
    { id: "component_name", label: "Component Name" },
    { id: "action", label: "Action" },
  ];
  const { data, error, isLoading, isError } = useQuery(
    ["component", projectKey, rowsPerPage],
    getAllComponents,
    {
      onError: (error) => {
        setOpenToast(true);
        componentDispatch({
          type: COMPONENT_CREATE_ERROR,
          payload: error.message,
        });
      },
    }
  );
  const history = useHistory();
  const { mutateAsync, isLoading: deleteComponentLoading } =
    useMutation(deleteComponent);

  const handleEditComponent = (name, id) => {
    componentDispatch({
      type: EDIT_COMPONENT,
      payload: name,
    });

    handleRightDrawer("Edit Component", id);
  };
  const queryClient = useQueryClient();
  const handleDeleteComponent = async (id) => {
    await mutateAsync(id);
    queryClient.invalidateQueries("component");
  };

  if (isError) {
    console.log(error);
  }
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.component_name.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(data, headCells, filterFn);

  if (isLoading) {
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
          justifyContent="flex-end"
          alignItems="center"
          style={{
            backgroundColor: "rgb(248, 248, 248)",
          }}
        >
          <Grid item>
            <Toolbar>
              <Controls.Input
                label="Search Component "
                className={classes.searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />
            </Toolbar>
          </Grid>
          <Grid item>
            <Tooltip title="Add new component" arrow disableInteractive>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                // onClick={() => setState(!state)}
                onClick={() => handleRightDrawer("Add Component", projectKey)}
                sx={{ m: 1 }}
              >
                Add Component
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
        {data?.length ? (
          <Grid item container justifyContent="flex-end">
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.component_id}>
                    <TableCell>{item.component_id}</TableCell>
                    <TableCell>{item.component_name}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit component" arrow disableInteractive>
                        <IconButton aria-label="Edit component">
                          <EditIcon
                            onClick={() =>
                              handleEditComponent(
                                item.component_name,
                                item.component_id
                              )
                            }
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title="Delete component"
                        arrow
                        disableInteractive
                      >
                        <IconButton aria-label="delete component">
                          <DeleteIcon
                            onClick={() =>
                              handleDeleteComponent(item.component_id)
                            }
                          />
                          {deleteComponentLoading && <CircularProgress />}
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </Grid>
        ) : (
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            sx={{ m: 5 }}
          >
            <Typography>No component avaiable</Typography>
          </Grid>
        )}
        {isError && (
          <>
            <Toast
              openToast={openToast}
              message={component.error}
              handleCloseToast={handleCloseToast}
            ></Toast>
          </>
        )}
        <Grid item md={8}></Grid>
      </Grid>
    </Box>
  );
};

export default ComponentList;
