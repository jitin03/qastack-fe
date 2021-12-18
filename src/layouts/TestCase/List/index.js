import {
  Button,
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
import React, { useState } from "react";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "../../../context/provider/context";
import { Search } from "@material-ui/icons";

import Controls from "../../../components/controllers/Controls";
import { getAllComponents } from "../../../context/actions/component/api";
import {
  COMPONENT_CREATE_ERROR,
  COMPONENT_LIST_ERROR,
} from "../../../constants/actionTypes";
import { getAllTestCases } from "../../../context/actions/testcase/api";
import useTable from "../../../components/Shared/useTable";
import { useParams } from "react-router-dom";
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
const TestCaseList = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { handleRightDrawer, setOpenToast, componentDispatch } =
    useGlobalContext();
  const { projectKey } = useParams();
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [componentId, setComponentId] = useState("");
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
  const handleListItemClick = (event, index, id) => {
    setSelectedIndex(index);
    console.log("id", id);
    setComponentId(id);
  };
  const headCells = [
    { id: "testcaseId", label: "TestCase ID " },
    { id: "teststeps", label: "TestSteps " },
    { id: "title", label: "Title" },
    { id: "type", label: "Type" },
    { id: "priority", label: "Priority" },
    { id: "action", label: "Actions" },
  ];
  const TblContainer = (props) => (
    <Table className={classes.table}>{props.children}</Table>
  );
  const TblHead = (props) => {
    const classes = useStyles();
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => {
                    handleSortRequest(headCell.id);
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  const recordsAfterPagingAndSorting = () => {
    return stableSort(
      filterFn.fn(testcases),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const classes = useStyles();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearchByTitle = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.component_name.includes(target.value.toLowerCase())
          );
      },
    });
  };

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
                label="Search By Title "
                className={classes.searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
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
              onClick={() => handleRightDrawer("Add TestCase", projectKey)}
              sx={{ m: 1 }}
            >
              Add Test Case
            </Button>
          </Grid>
        </Grid>

        <Grid
          item
          container
          marginTop="10px"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
          //   columnSpacing={4}
        >
          <Grid item md={4}>
            <Grid
              item
              container
              sx={{ p: 2, borderRadius: 2, m: 2 }}
              // md="auto"
              backgroundColor="#f9f9f9"
              // spacing={2}
            >
              <Grid item container justifyContent="space-between">
                <Grid item>
                  <Typography>Components</Typography>
                </Grid>
                <Grid item>
                  <AddIcon />
                </Grid>
                <Grid item container>
                  <Divider sx={{ width: "100%", paddingTop: 1.5 }} />
                </Grid>
              </Grid>

              <Grid item container alignContent="center">
                <Grid
                  item
                  sx={{ display: "flex", width: "100%", paddingTop: 2 }}
                >
                  <TextField
                    label="Search by Name"
                    fullWidth="true"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  {components?.map((item, index) => (
                    <>
                      <List dense="true" key={item.index}>
                        <ListItemButton
                          selected={selectedIndex === index}
                          onClick={(event) =>
                            handleListItemClick(event, index, item.component_id)
                          }
                        >
                          <ListItemIcon>
                            <FolderIcon />
                          </ListItemIcon>
                          <ListItemText primary={item.component_name} />
                        </ListItemButton>
                      </List>
                    </>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={8} container>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{ p: 2, flex: 1, borderRadius: 2, m: 2 }}
              backgroundColor="#f9f9f9"
            >
              <Grid item textAlign="right">
                <Typography>Test Cases</Typography>
              </Grid>
              <Grid item>
                <TextField
                  label="Search by Summary"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item container>
                <Divider sx={{ width: "100%", paddingTop: 1 }} />
              </Grid>
              <Grid item container sx={{ flex: 1 }}>
                {testcases?.length ? (
                  <Grid item container justifyContent="flex-end">
                    <TblContainer>
                      <TblHead />
                      <TableBody>
                        {recordsAfterPagingAndSorting().map((item) => (
                          <TableRow key={item.testcaseId}>
                            <TableCell>{item.testcaseId}</TableCell>
                            <TableCell>{item.testStepCounts}</TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.priority}</TableCell>
                            <TableCell>
                              <Tooltip
                                title="Edit component"
                                arrow
                                disableInteractive
                              >
                                <IconButton aria-label="Edit component">
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip
                                title="Delete component"
                                arrow
                                disableInteractive
                              >
                                <IconButton aria-label="delete component">
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </TblContainer>
                    <TablePagination
                      component="div"
                      page={page}
                      rowsPerPageOptions={pages}
                      rowsPerPage={rowsPerPage}
                      count={testcases.length}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </Grid>
                ) : (
                  <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ m: 5 }}
                  >
                    <TblContainer>
                      <TblHead />
                      <TableBody>
                        <Grid item container justifyContent="center">
                          <Typography>No Record found !</Typography>
                        </Grid>
                      </TableBody>
                    </TblContainer>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestCaseList;
