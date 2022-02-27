import {
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/provider/context";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";

import { COMPONENT_CREATE_SUCCESS } from "../../../constants/actionTypes";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TestSteps from "./testSteps";
import Controls from "../../../components/controllers/Controls";
import LinkJiraIssue from "./linkJiraIssue";
import {
  addTestcase,
  getTestCase,
  updateTestCase,
} from "../../../context/actions/testcase/api";
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
export default function EditTestCase(props) {
  const { param } = props;

  const {
    setOpenToast,
    openToast,
    toastMessage,
    settoastMessage,
    setSuccessAtProject,
    setProjectSuccessMessage,
    message,
    setMessage,
    componentDispatch,
    handleCloseRightDrawer,
    setState,
    state,
    handleCloseToast,
  } = useGlobalContext();
  let testCaseSteps = [];
  const {
    data: testCase,
    error: testCaseError,
    isLoading: waitForTestCase,
    isError: isTestCaseError,
  } = useQuery(["testcase", param[1]], getTestCase, {
    onSuccess: (testCase) => {},
    onError: (error) => {},
  });

  console.log("testCaseSteps", testCase);
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();
  const { register, handleSubmit, control, reset, setValue } = useForm({
    // defaultValues: {
    //   Steps: testCaseSteps || { stepDescription: "", expectedResult: "" },
    // },
    mode: "onBlur",
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "Steps",
    }
  );
  useEffect(() => {
    if (Array.isArray(testCase?.steps)) {
      setValue(
        "Steps",
        testCase?.steps || [{ stepDescription: "", expectedResult: "" }]
      );
    }
  }, [testCase]);

  let navigate = useNavigate();

  const [form, setForm] = useState({});

  const [fieldErrors, setFieldErrors] = useState({});

  const { mutateAsync, isLoading, isError, error, data, isSuccess } =
    useMutation(updateTestCase, {
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

  const queryClient = useQueryClient();
  const onSubmit = async (data, e) => {
    data.id = param[1];
    try {
      await mutateAsync(data);

      handleCloseRightDrawer(e, "Edit TestCase", param);
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Test Case has updated");
    } catch (error) {
      handleCloseRightDrawer(e, "Edit TestCase", param);
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Something went wrong!!");
    }
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (waitForTestCase) {
    return (
      <>
        <Grid container>
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
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Test Case Details" />
        <Tab label="Link Requirement" />
        <Tab label="Jira Requirement" />
      </Tabs>
      <FormProvider
        register={register}
        control={control}
        handleSubmit={handleSubmit}
        remove={remove}
        append={append}
      >
        <form
          className={classes.root}
          autoComplete="off"
          style={{ maxHeight: "100%", overflowY: "scroll" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TabPanel value={tabValue} index={0}>
            <Divider />
            <TestSteps
              register={register}
              control={control}
              handleSubmit={handleSubmit}
              fields={fields}
              remove={remove}
              append={append}
              param={param}
              setValue={setValue}
              preloadedData={testCase}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Divider />
            Item Two
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Divider />
            <LinkJiraIssue />
          </TabPanel>
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
                size="small"
                text="Cancel"
                style={{ marginRight: "10px" }}
                onClick={(e) => {
                  handleCloseRightDrawer(e, "Edit TestCase", param);
                }}
              />
              <Controls.Button size="small" text="Update" />
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
