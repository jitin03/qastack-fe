import { Divider, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/provider/context";
import Controls from "../controllers/Controls";
import DateFnsUtils from "@date-io/date-fns";
import * as moment from "moment";

import {
  useForm,
  useFieldArray,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { addRelease } from "../../context/actions/project/api";
import { useMutation, useQueryClient } from "react-query";
import { RELEASE_CREATE_SUCCESS } from "../../constants/actionTypes";
const useStyles = makeStyles({
  bottomDrawer: {
    position: "absolute",
    bottom: "0px",
    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
  },
});
const dayjs = require("dayjs");
export default function ReleaseForm(props) {
  const { param } = props;
  const classes = useStyles();
  const [form, setForm] = useState({});
  const {
    handleCloseRightDrawer,
    setOpenToast,
    openToast,
    toastMessage,
    settoastMessage,
    setSuccessAtProject,
    setProjectSuccessMessage,
    message,
    setMessage,
    releaseDispatch,
  } = useGlobalContext();
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(addRelease, {
    onSuccess: (data) => {
      releaseDispatch({
        type: RELEASE_CREATE_SUCCESS,
        payload: data,
      });
    },
  });
  const onSubmit = async (data, e) => {
    data.ProjectID = param;

    try {
      e.preventDefault();
      await mutateAsync(data);
      queryClient.invalidateQueries("releases");

      handleCloseRightDrawer(e, "Add Release", param);
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Release is created");
    } catch (e) {
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Something went wrong!!");
    }
  };
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  console.log("errors", errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Divider />
      <Grid
        container
        direction="column"
        justifyItems="center"
        justifyContent="center"
        style={{ padding: "2rem 1.5rem 1.5rem" }}
      >
        <Grid item style={{ minWidth: "250px", padding: "16px" }}>
          <Controller
            name="ReleaseName"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                id="name"
                label="Release Name"
                placeholder="Release"
                onBlur={(e) => setValue("ReleaseName", e.target.value.trim())}
                size="small"
                variant="outlined"
                onChange={onChange}
                value={value}
                style={{ minWidth: "100%" }}
                error={!!errors?.ReleaseName}
                helperText={
                  errors?.ReleaseName ? errors?.ReleaseName.message : null
                }
              />
            )}
            rules={{ required: "Release Name is required field!" }}
          />
        </Grid>
        <Grid item style={{ minWidth: "250px", padding: "16px" }}>
          <Controller
            name="StartDate"
            control={control}
            setValue={setValue}
            defaultValue={new Date()}
            onChange={(date) => setValue(date)}
            render={({ field: { onChange, value, name, onBlur } }) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  // disableToolbar
                  key={value}
                  emptyLabel
                  variant="inline"
                  inputVariant="outlined"
                  label="Start Date"
                  format="dd/MM/yyyy"
                  name={name}
                  value={value}
                  autoOk
                  onChange={onChange}
                  style={{ minWidth: "100%" }}
                  error={!!errors?.StartDate}
                  helperText={
                    errors?.StartDate ? errors?.StartDate.message : null
                  }
                />
              </MuiPickersUtilsProvider>
            )}
            rules={{ required: "EndDate is required field!" }}
          />
        </Grid>
        <Grid item style={{ minWidth: "250px", padding: "16px" }}>
          <Controller
            name="EndDate"
            control={control}
            setValue={setValue}
            defaultValue={new Date()}
            render={({ field: { onChange, value, name } }) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  // disableToolbar
                  key={value}
                  emptyLabel
                  variant="inline"
                  inputVariant="outlined"
                  label="End Date"
                  format="dd/MM/yyyy"
                  name={name}
                  value={value}
                  autoOk
                  onChange={onChange}
                  style={{ minWidth: "100%" }}
                  error={!!errors?.EndDate}
                  helperText={errors?.EndDate ? errors?.EndDate.message : null}
                />
              </MuiPickersUtilsProvider>
            )}
            rules={{
              required: "EndDate is required field!",
              validate: (value) =>
                dayjs(value).isAfter(dayjs(getValues("StartDate"))) ||
                "Release End date should be greater than Start date !",
            }}
          />
        </Grid>
      </Grid>
      <Grid item className={classes.bottomDrawer}>
        <Controls.Button
          color="inherit"
          type="cancel"
          text="Cancel"
          size="small"
          style={{ marginRight: "10px" }}
          onClick={(e) => {
            handleCloseRightDrawer(e, "Add Release", param);
          }}
        />
        <Controls.Button text="Submit" size="small" />
      </Grid>
    </form>
  );
}
