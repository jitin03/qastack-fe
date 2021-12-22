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
  const { register, control, param } = props;
  const classes = useStyles();

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
      <Container>
        <Grid
          container
          sx={{ p: 10 }}
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
              padding: "2px",
            }}
            xs={3}
          >
            <Grid item container>
              <Records control={control} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const Records = (props) => {
  //   console.log("components", components);
  const { control } = props;
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
    isLoading,
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
  let data = components;
  const baselineProps = {
    rows: components,
    columns: [
      { field: "component_id", hide: true },
      { field: "component_name", headerName: "Component Name", width: 250 },
      { field: "project_id", headerName: "Project Name", hide: true },
    ],
  };
  console.log("rowsState", components);
  const loadServerRows = (page, pageSize, allRows) =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log("allrows", allRows);
        resolve(allRows?.slice(page * pageSize, (page + 1) * pageSize));
      }, Math.random() * 200 + 100); // simulate network latency
    });

  const [rows, setRows] = useState(baselineProps.rows);
  useEffect(() => {
    let active = true;

    (async () => {
      setRowsState((prev) => ({ ...prev, loading: true }));
      refetch();
      const newRows = await loadServerRows(
        rowsState.page,
        rowsState.pageSize,
        components
      );

      if (!active) {
        return;
      }

      setRowsState((prev) => ({ ...prev, loading: false, rows: newRows }));
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
        // height: "100%",
        border: "none",
        boxShadow: "none",
        // backgroundColor: "rgb(248, 248, 248)",
      }}
    >
      <CardContent>
        <Grid item>
          <div style={{ height: 400, width: "100%" }}>
            {/* <DataGrid
              pagination
              {...baselineProps}
              getRowId={getRowId}
              pageSize={pageSize}
              rowsPerPageOptions={[5, 10, 15]}
              rowCount={100}
              paginationMode="server"
              onPageChange={(newPage) => setPage(newPage)}
              //   onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              page={page}
              loading={loading}
            /> */}

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
            />
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
};
