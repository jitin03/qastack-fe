import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { array, object, string } from "yup";
import { Form, Formik } from "formik";
import {
  Typography,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
  Grid,
  Tooltip,
  Divider,
  Input,
} from "@material-ui/core";
import { Box, FormControl, Paper } from "@material-ui/core";
import Controls from "../../../components/controllers/Controls";
import { MultipleFileUploadField } from "../../../components/Shared/upload/MultipleFileUploadField";
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
export default function AddResult({
  openDialog,
  setOpenDialog,
  onSubmitAddStep,
  selectedStatus,
  setValue,

  control: parentControl,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const classes = useStyles();
  const handleClose = () => {
    setOpenDialog(false);
    // setStepName(defaultStepName);
  };

  const onSubmit = async (data) => {
    console.log(data);
    setOpenDialog(false);
    onSubmitAddStep(data);
    reset();
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        style={{
          padding: "0 15px 40px 15px",
          width: "100%",
          minHeight: "50vh",
          maxWidth: "600px",
          minWidth: "600px",
          gap: 15,
        }}
      >
        <Paper elevation={0} style={{ width: "100%" }}>
          <form
            className={classes.root}
            autoComplete="off"
            style={{
              marginTop: "10px",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid item xs={12}>
              <Controller
                name="status"
                defaultValue={selectedStatus || ""}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    style={{ width: "100%", marginTop: "5px" }}
                    variant="outlined"
                    size="small"
                  >
                    <InputLabel
                      id="status-simple-select-label"
                      htmlFor="outlined-Name"
                    >
                      Status
                    </InputLabel>
                    <Select
                      labelId="status-simple-select-label"
                      id="status-simple-select"
                      value={value}
                      fullWidth
                      label="Status"
                      size="small"
                      onChange={onChange}
                    >
                      <MenuItem value="Unexecuted">Unexecuted</MenuItem>
                      <MenuItem value="Passed">Passed</MenuItem>
                      <MenuItem value="Failed">Failed</MenuItem>
                      <MenuItem value="Blocked">Blocked</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="assignee"
                defaultValue={selectedStatus || ""}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    style={{ width: "100%", marginTop: "25px" }}
                    variant="outlined"
                    size="small"
                  >
                    <InputLabel id="assignee-simple-select-label">
                      Assignee To
                    </InputLabel>
                    <Select
                      value={value}
                      fullWidth
                      label="Assignee"
                      size="small"
                      onChange={onChange}
                    >
                      <MenuItem value="Jitin">Jitin</MenuItem>
                      <MenuItem value="Client">Client</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="Comment"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    id="Comment"
                    size="small"
                    style={{ width: "100%", marginTop: "25px" }}
                    label="Enter Comment"
                    placeholder="Comment"
                    rows={6}
                    multiline
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              justifyContent="center"
              alignItems="center"
              style={{ width: "100%", marginTop: "15px" }}
            >
              <Grid item xs={2}>
                <Typography>Attachements</Typography>
              </Grid>
              <Grid item xs={10}>
                <Divider style={{ marginLeft: "16px" }} />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ minHeight: "200px", maxHeight: "200px" }}
            >
              <Typography style={{ fontSize: ".8em" }}>
                Max 5 files of 15 MB each.
              </Typography>

              <Grid item style={{ marginTop: "5px" }}>
                <Formik
                  initialValues={{ files: [] }}
                  validationSchema={object({
                    files: array(
                      object({
                        url: string().required(),
                      })
                    ),
                  })}
                  onSubmit={(values) => {
                    console.log("values", values);
                    return new Promise((res) => setTimeout(res, 2000));
                  }}
                >
                  {({ values, errors, isValid, isSubmitting }) => (
                    <Form>
                      <Grid container direction="column">
                        <MultipleFileUploadField name="files" />
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
            <Grid item container justifyContent="flex-end" xs={12}>
              <Grid item>
                <Controls.Button size="small" text="Save" />
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
}
