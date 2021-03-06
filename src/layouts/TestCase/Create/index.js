import { Divider, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useGlobalContext } from "../../../context/provider/context";
import { useNavigate } from "react-router-dom";
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
import TestSteps from "./testSteps";
import { Box } from "@mui/system";
import Controls from "../../../components/controllers/Controls";
import LinkJiraIssue from "./linkJiraIssue";
import { addTestcase } from "../../../context/actions/testcase/api";
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
export default function CreateTestCase(props) {
  const { param } = props;

  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Steps: [{ stepDescription: "", expectedResult: "" }],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "Steps",
    }
  );
  const {
    componentDispatch,
    handleCloseRightDrawer,

    setState,
    state,
    setOpenToast,
    openToast,
    toastMessage,
    settoastMessage,
    setSuccessAtProject,
    setProjectSuccessMessage,
    message,
    setMessage,
  } = useGlobalContext();
  let navigate = useNavigate();

  const [form, setForm] = useState({});

  const [fieldErrors, setFieldErrors] = useState({});

  const { mutateAsync, isLoading, isError, error, data, isSuccess } =
    useMutation(addTestcase, {
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
  console.log("errors", errors);
  const onSubmit = async (data, e) => {
    data.projectId = param;
    try {
      await mutateAsync(data);

      handleCloseRightDrawer(e, "Add TestCase", param);
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Test Case is created");
    } catch (error) {
      handleCloseRightDrawer(e, "Add TestCase", param);
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Something went wrong!!");
    }
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <>
      <FormProvider
        register={register}
        control={control}
        handleSubmit={handleSubmit}
        remove={remove}
        append={append}
      >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Test Case Details" />
          {/* <Tab label="Link Requirement" />
          <Tab label="Jira Requirement" /> */}
        </Tabs>

        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                width: "100%",
                maxHeight: "100%",
                overflowY: "scroll",
                minHeight: "500px",
              }}
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
                  errors={errors}
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
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent="flex-end"
              style={{ marginRight: "15px", bottom: "0px" }}
              spacing={2}
            >
              <Grid item>
                <Controls.Button
                  color="inherit"
                  size="small"
                  type="cancel"
                  text="Cancel"
                  onClick={(e) => {
                    handleCloseRightDrawer(e, "Add TestCase", param);
                  }}
                />
              </Grid>
              <Grid item>
                <Controls.Button size="small" text="Submit" />
              </Grid>
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
