import {
  Button,
  Card,
  CardActions,
  CardContent,
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
import { useHistory } from "react-router-dom";
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
  const { register, handleSubmit, control, param: projectId } = props;
  console.log("param", projectId);
  const {
    data: releases,
    error,
    isLoading,
    isError,
  } = useQuery(["release", projectId], () => getAllRelease(projectId), {
    enabled: !!projectId,
  });
  const {
    componentState: { component },
    setOpenToast,
    componentDispatch,
  } = useGlobalContext();
  const history = useHistory();

  const queryClient = useQueryClient();
  const onSubmit = (data) => console.log(data);
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
              <TestRunForm control={control} />
            </Grid>
          </Grid>
          <Grid item container xs={4}>
            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <CustomeAttributes control={control} releases={releases} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const YourCard = () => {
  const classes = {};
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{ height: "100%" }}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Customer Profile
        </Typography>
        <Typography variant="h5" component="h2">
          Sarah Doria
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Position
        </Typography>
        <Typography variant="body2" component="p">
          Company
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

const CustomeAttributes = (props) => {
  const { control, releases } = props;

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
            defaultValue=""
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
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="release_id"
            defaultValue=""
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
                    {releases.map((item, index) => (
                      <MenuItem key={item.Id} value={item.ReleaseName}>
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
  const { control } = props;
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
