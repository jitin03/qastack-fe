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
import PlayArrow from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "../../context/provider/context";
import useTable from "../../components/Shared/useTable";
import { Search } from "@material-ui/icons";
import { makeStyles } from "@mui/styles";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import {
  deleteComponent,
  getAllComponents,
} from "../../context/actions/component/api";
import Controls from "../../components/controllers/Controls";
import Toast from "../../components/controllers/Toast";
import {
  COMPONENT_CREATE_ERROR,
  EDIT_COMPONENT,
  WORKFLOW_RUN_STARTED,
} from "../../constants/actionTypes";
import {
  getAllWorkFlows,
  runWorkflowByName,
} from "../../context/actions/workflow/api";
// import {SSE} from 'sse.js';
// import { EventSourcePolyfill } from "event-source-polyfill";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
}));
const CIFlow = () => {
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
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [data, setData] = useState([]);
  const [showToaster, setShowToaster] = useState({ state: false, message: "" });
  let { id } = useParams();
  let { projectKey } = useParams();
  const history = useHistory();

  setEditId(id);
  const headCells = [
    { id: "component_id", label: "Id" },
    { id: "component_name", label: "Flow Name" },
    { id: "action", label: "Action" },
  ];
  const {
    data: components,
    error,
    isLoading: waitForComponents,
    isError,
  } = useQuery(["component", projectKey, rowsPerPage], getAllWorkFlows, {
    onError: (error) => {
      setOpenToast(true);
      componentDispatch({
        type: COMPONENT_CREATE_ERROR,
        payload: error.message,
      });
    },
    onSuccess: (components) => {
      setData(components);
    },
  });

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

  // React.useEffect(() => {
  //   const url = 'http://34.201.1.56:8094/api/event/workflow?workflowName=a3'
  //   const source = new SSE(url, {headers: {'Authorization': `Bearer ${localStorage.token}`}, method: 'GET'});

  //   source.addEventListener('message', (e) => {
  //     console.log(e.data);
  //   });

  //   source.addEventListener('error', (e) => {
  //     console.log(e);
  //   });

  //   source.addEventListener('MODIFIED', (e) => {
  //     console.log(e);
  //   });

  //   source.addEventListener('ADDED', (e) => {
  //     console.log(e);
  //   });

  //   source.stream();

  // return () => {
  //   // source.close();
  // };
  // }, [])

  // React.useEffect(() => {
  //   // const url = 'http://34.201.1.56:8094/api/event/workflow?workflowName=a3'
  //   // var eventSourceInitDict = {headers: {'Authorization': `Bearer ${localStorage.token}`}};

  //   var es = new EventSource("http://localhost:5555/stream");
  //   es.onmessage = function(e) {
  //     console.log(e);
  //   }
  // }, [])

  function getRealtimeData(data) {
    console.log("data aaya", data);
  }

  if (waitForComponents) {
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
                label="Search CI Flow"
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
            <Tooltip title="Add new flow" arrow disableInteractive>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                // onClick={() => setState(!state)}
                onClick={() =>
                  history.push(
                    `/project/${projectKey}/components/ciFlow/create`
                  )
                }
                sx={{ m: 1 }}
              >
                Add new flow
              </Button>
            </Tooltip>
          </Grid>
        </Grid>

        {data?.length ? (
          <Grid item container justifyContent="flex-end">
            <TblContainer>
              <TblHead />
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.Id}</TableCell>
                    <TableCell>{item.workflow_name}</TableCell>
                    <TableCell>
                      <Tooltip title="Run" arrow disableInteractive>
                        <IconButton aria-label="Run">
                          <PlayArrow
                            onClick={async () => {
                              const response = await runWorkflowByName({
                                workflowName: item.workflow_name,
                              });
                              if (response) {
                                setShowToaster({
                                  state: true,
                                  message: "CI Flow triggered Successfully",
                                });
                              }
                            }}
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
                            onClick={
                              () => {}
                              // handleDeleteComponent(item.component_id)
                            }
                          />
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
        {showToaster.state && (
          <Toast
            openToast={showToaster.state}
            message={showToaster.message}
            handleCloseToast={() => {
              setShowToaster({ state: false, message: "" });
            }}
          ></Toast>
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

export default CIFlow;
