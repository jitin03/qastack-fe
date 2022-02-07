import {
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useGlobalContext } from "../../../context/provider/context";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import {
  useForm,
  useFieldArray,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { COMPONENT_CREATE_SUCCESS } from "../../../constants/actionTypes";
import PropTypes from "prop-types";
import { addComponent } from "../../../context/actions/component/api";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Box } from "@mui/system";
import Controls from "../../../components/controllers/Controls";

import { addTestcase, addTestrun } from "../../../context/actions/testcase/api";
import TestRuns from "./testRun";
import TestCaseRecords from "./testCaseRecords";
import { useProjectContext } from "../../../context/provider/projectContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      marginTop: theme.spacing(1),
    },
  },
  textarea: {
    resize: "both",
  },
  bottomDrawer: {
    position: "absolute",

    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
    backgroundColor: "rgb(255, 255, 255)",
  },
}));
export default function CreateTestRun(props) {
  const { param } = props;
  console.log("param", param);
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();

  const {
    componentDispatch,
    handleCloseRightDrawer,
    setOpenToast,
    openToast,
    setState,
    state,
    handleCloseToast,
  } = useGlobalContext();
  const { selectionModel, setSelectionModel } = useProjectContext();
  const { mutateAsync, isLoading, isError, error, data, isSuccess } =
    useMutation(addTestrun, {
      onError: (error) => {
        setOpenToast(true);
      },
      onSuccess: (data) => {
        componentDispatch({
          type: COMPONENT_CREATE_SUCCESS,
          payload: data,
        });
      },
    });
  const history = useHistory();

  const queryClient = useQueryClient();
  const onSubmit = async (data, e) => {
    console.log(data);
    data.testcases = selectionModel;
    try {
      await mutateAsync(data);

      handleCloseRightDrawer(e, "Add TestRun", param);
      setSelectionModel([]);
    } catch (error) {
      handleCloseRightDrawer(e, "Add TestRun", param);
      console.log(error.message);
      setSelectionModel([]);
    }
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="Test run configuration"
      >
        <Tab label="Test Run Details" />
        {/* <Tab label="Specific test cases" /> */}
      </Tabs>
      <FormProvider
        register={register}
        control={control}
        handleSubmit={handleSubmit}
      >
        <form
          className={classes.root}
          autoComplete="off"
          style={{ height: "100%" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TabPanel value={tabValue} index={0}>
            <Divider />
            <TestRuns
              register={register}
              control={control}
              handleSubmit={handleSubmit}
              param={param}
            />
            <TestCaseRecords
              register={register}
              control={control}
              param={param}
            />
          </TabPanel>
          {/* <TabPanel value={tabValue} index={1}>
            <Divider />
          </TabPanel> */}

          <Grid
            container
            className={classes.bottomDrawer}
            justifyContent="flex-end"
            alignContent="center"
          >
            <Grid item>
              <Controls.Button
                color="inherit"
                type="cancel"
                text="Cancel"
                style={{ marginRight: "10px" }}
                onClick={(e) => {
                  handleCloseRightDrawer(e, "Add TestRun", param);
                }}
              />
              <Controls.Button text="Submit" />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
