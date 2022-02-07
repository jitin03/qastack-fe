import React from "react";
import { useGlobalContext } from "../../context/provider/context";
import { makeStyles } from "@mui/styles";
import {
  useForm,
  useFieldArray,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import { Divider, Grid, TextField } from "@mui/material";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Controls from "../controllers/Controls";
import { updateRelease } from "../../context/actions/project/api";
import { useMutation, useQueryClient } from "react-query";
const useStyles = makeStyles({
  bottomDrawer: {
    position: "absolute",
    bottom: "0px",
    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
  },
});
export const ReleaseEditForm = (props) => {
  const { param } = props;

  const classes = useStyles();
  const {
    releaseState: release,
    editId,
    handleCloseRightDrawer,
  } = useGlobalContext();

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: release.release?.data.ReleaseName,
  });

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(updateRelease);
  const onSubmit = async (data, e) => {
    e.preventDefault();
    data.editId = param[1];
    await mutateAsync(data);
    queryClient.invalidateQueries("releases");
    handleCloseRightDrawer(e, "Edit Release", param[0]);
  };
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
            render={({ field: { onChange, value } }) => (
              <TextField
                id="name"
                label="Release Name"
                placeholder="Release"
                size="medium"
                variant="outlined"
                onChange={onChange}
                value={value}
                style={{ minWidth: "100%" }}
              />
            )}
          />
        </Grid>
        <Grid item style={{ minWidth: "250px", padding: "16px" }}>
          <Controller
            name="StartDate"
            control={control}
            setValue={setValue}
            defaultValue={new Date()}
            onChange={(date) => setValue(date)}
            render={({ field: { onChange, value, name } }) => (
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
                />
              </MuiPickersUtilsProvider>
            )}
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
                />
              </MuiPickersUtilsProvider>
            )}
          />
        </Grid>
      </Grid>
      <Grid item className={classes.bottomDrawer}>
        <Controls.Button
          color="inherit"
          type="cancel"
          text="Cancel"
          style={{ marginRight: "10px" }}
          onClick={(e) => {
            handleCloseRightDrawer(e, "Edit Release", param[0]);
          }}
        />
        <Controls.Button text="Submit" />
      </Grid>
    </form>
  );
};
