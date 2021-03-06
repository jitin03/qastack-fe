import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "../../../context/provider/context";
import Controls from "../../../components/controllers/Controls";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { Controller } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import {
  COMPONENT_CREATE_ERROR,
  COMPONENT_CREATE_SUCCESS,
  COMPONENT_LIST_ERROR,
} from "../../../constants/actionTypes";
import {
  addComponent,
  getAllComponents,
} from "../../../context/actions/component/api";
import Toast from "../../../components/controllers/Toast";
import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useQuery } from "react-query";
import { getAllRelease } from "../../../context/actions/project/api";
import { getProjectTestRun } from "../../../context/actions/testcase/api";
import { getUserDetailFromToken } from "../../../helper/token";
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
    backgroundColor: "rgb(255, 255, 255)",
    // zIndex: 1202,
  },
}));
const BottomDrawer = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: "0px",
  right: "0px",
  padding: "1rem 1.5rem 1.5rem",
  backgroundColor: "rgb(255, 255, 255)",
  zIndex: 2,
}));
export default function TestRuns(props) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    control,
    param,
    testRunDetails,
    waitForTestRunDetails,
  } = props;
  console.log("param", param[0]);

  const {
    data: releases,
    error: releaseError,
    isLoading: waitForReleases,
    isError: isReleaseError,
  } = useQuery(["release", param[0]], () => getAllRelease(param[0]), {
    enabled: !!testRunDetails,
  });
  const { setOpenToast, componentDispatch } = useGlobalContext();
  let navigate = useNavigate();

  const queryClient = useQueryClient();
  const onSubmit = (data) => console.log(data);
  console.log("releases", releases);
  console.log("testRun", testRunDetails);
  if (waitForTestRunDetails) {
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
    <>
      <Container>
        <Grid
          container
          spacing={4}
          direction="row"
          justify="center"
          alignItems="stretch"
        >
          <Grid item container xs={8}>
            <Grid item style={{ padding: "5px" }}>
              <TestRunForm control={control} testRunDetails={testRunDetails} />
            </Grid>
          </Grid>
          <Grid item container xs={4}>
            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <CustomeAttributes
                  control={control}
                  releases={releases}
                  testRunDetails={testRunDetails}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const CustomeAttributes = (props) => {
  const { control, testRunDetails, releases } = props;

  const classes = {};
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{
        height: "100%",
        border: "none",
        boxShadow: "none",
        // backgroundColor: "rgb(248, 248, 248)",
      }}
    >
      <CardContent>
        <Grid item>
          <Controller
            name="assignee"
            defaultValue={testRunDetails?.assignee}
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Assignee
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Type"
                    onChange={onChange}
                  >
                    <MenuItem
                      value={
                        getUserDetailFromToken(localStorage.getItem("token"))
                          .username
                      }
                    >
                      {
                        getUserDetailFromToken(localStorage.getItem("token"))
                          ?.username
                      }
                    </MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="release_id"
            defaultValue={testRunDetails?.release_id || ""}
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Release
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Type"
                    onChange={onChange}
                  >
                    {releases?.map((item, index) => (
                      <MenuItem key={item.Id} value={item.Id}>
                        {item.ReleaseName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

const TestRunForm = (props) => {
  const { control, testRunDetails } = props;
  const classes = {};
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{
        height: "100%",
        border: "none",
        boxShadow: "none",
      }}
    >
      <CardContent sx={{ marginTop: "2px" }}>
        <Grid item style={{ minWidth: "250px" }}>
          <Controller
            name="name"
            defaultValue={testRunDetails?.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="name"
                label="Enter Name"
                placeholder="TestRun Name"
                size="small"
                variant="outlined"
                onChange={onChange}
                value={value}
                style={{ width: "450px" }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="description"
            defaultValue={testRunDetails?.description || ""}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="description"
                size="small"
                style={{ width: "450px" }}
                label="Enter description"
                placeholder="Testcase Description"
                multiline
                variant="outlined"
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};
