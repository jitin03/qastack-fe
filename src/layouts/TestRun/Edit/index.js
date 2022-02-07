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
import { useMutation, useQuery, useQueryClient } from "react-query";
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

import {
  addTestcase,
  addTestrun,
  getProjectTestRun,
  updateTestRun,
} from "../../../context/actions/testcase/api";
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
export default function EditTestRun(props) {
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
  const { selectedModel, setSelectedModel } = useProjectContext();
  const { mutateAsync, isLoading, isError, error, data, isSuccess } =
    useMutation(updateTestRun, {
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
  const {
    data: testRunDetails,
    error: testRunError,
    isLoading: waitForTestRunDetails,
    isError: isTestRunError,
  } = useQuery(["testRunDetails", param[0], param[1]], getProjectTestRun, {
    enabled: !!param[1],
    onSuccess: (testRunDetails) => {},
  });

  const onSubmit = async (data, e) => {
    console.log(data);
    console.log("selectedModel", selectedModel);
    console.log("testRunDetails?.testcases");

    console.log(new Set([...testRunDetails?.testcases, ...selectedModel]));
    // console.log(
    //   selectedModel.filter((x) => testRunDetails?.testcases.indexOf(x) === -1)
    // );
    data.testcases = selectedModel;
    // data.testcases = [
    //   new Set([...testRunDetails?.testcases, ...selectedModel]),
    // ];
    // [...new Set(selectedModel)];

    // data.testcases = selectedModel.filter(
    //   (x) => testRunDetails?.testcases.indexOf(x) === -1
    // );
    data.id = param[1];
    try {
      await mutateAsync(data);

      // setSelectedModel([]);
      handleCloseRightDrawer(e, "Edit TestRun", param);
    } catch (error) {
      handleCloseRightDrawer(e, "Edit TestRun", param);
      console.log(error.message);
      setSelectedModel([]);
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
              testRunDetails={testRunDetails}
              waitForTestRunDetails={waitForTestRunDetails}
            />
            <TestCaseRecords
              register={register}
              control={control}
              param={param}
              testRunDetails={testRunDetails}
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
                  handleCloseRightDrawer(e, "Edit TestRun", param);
                }}
              />
              <Controls.Button text="Update" />
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
