import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FolderIcon from "@mui/icons-material/Folder";
import EditIcon from "@mui/icons-material/Edit";
import ListItemIcon from "@mui/material/ListItemIcon";
import SearchIcon from "@mui/icons-material/Search";
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
const TestCaseList = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, "firstName") || ""} ${
          params.getValue(params.id, "lastName") || ""
        }`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const classes = useStyles();
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
                // onChange={handleSearch}
              />
            </Toolbar>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              //   onClick={() => handleRightDrawer("Add Component")}
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
                  <List dense="true">
                    <ListItemButton>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText primary="Component 1" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText primary="Component 2" />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText primary="Component 3" />
                    </ListItemButton>
                  </List>
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
              <Grid item sx={{ flex: 1 }}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestCaseList;
