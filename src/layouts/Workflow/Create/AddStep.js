import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Typography,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
import { FormControl } from "@mui/material";
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
export default function AddStep({
  openDialog,
  setOpenDialog,
  onSubmitAddStep,
  workFlowState,
  control: parentControl,
}) {
  const defaultStepName = {
    name: "",
    repository: "",
    branch: "",
    token: "",
    docker_image: "",
    entrypath: [""],
    input_command: "",
    dependencies: [""],
    parameters: [
      {
        name: "",
        value: "",
      },
    ],
  };

  const { register, handleSubmit, control, reset } = useForm();
  const classes = useStyles();
  const handleClose = () => {
    setOpenDialog(false);
    // setStepName(defaultStepName);
  };

  // const handleChange = (e) => {
  //   switch (e.target.id) {
  //     case "name":
  //       setStepName({ ...stepName, name: e.target.value });
  //       break;
  //     case "repository":
  //       setStepName({ ...stepName, repository: e.target.value });
  //       break;
  //     case "branchName":
  //       setStepName({ ...stepName, branchName: e.target.value });
  //       break;
  //     case "token":
  //       setStepName({ ...stepName, token: e.target.value });
  //       break;
  //     case "docker_image":
  //       setStepName({ ...stepName, docker_image: e.target.value });
  //       break;
  //     case "entrypath":
  //       setStepName({ ...stepName, entrypath: e.target.value });
  //       break;
  //     case "input_command":
  //       setStepName({ ...stepName, input_command: e.target.value });
  //       break;
  //     case "dependencies":
  //       setStepName({ ...stepName, dependencies: e.target.value });
  //       break;
  //     case "parameter_name":
  //       setStepName({
  //         ...stepName,
  //         parameters: [
  //           { value: stepName.parameters[0].value, name: e.target.value },
  //         ],
  //       });
  //       break;
  //     case "parameter_value":
  //       setStepName({
  //         ...stepName,
  //         parameters: [{ ...stepName.parameters[0], value: e.target.value }],
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const onSubmit = async (data) => {
    console.log(data);
    setOpenDialog(false);
    onSubmitAddStep(data);
    reset();
    // try {
    //   await mutateAsync(data);
    // } catch (error) {
    //   history.goBack();
    //   console.log(error.message);
    // }
  };
  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Step</DialogTitle>
        <form
          className={classes.root}
          autoComplete="off"
          style={{ height: "100%", width: "100%" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant="standard"
                  id="name"
                  label="Name"
                  size="small"
                  type="text"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              name="repository"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant="standard"
                  id="repository"
                  label="Git url"
                  size="small"
                  type="text"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              name="branchName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant="standard"
                  id="branchName"
                  label="Branch Name"
                  size="small"
                  type="text"
                  onChange={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              name="token"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant="standard"
                  id="token"
                  label="Token"
                  size="small"
                  type="text"
                  onChange={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              name="docker_image"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant="standard"
                  id="docker_image"
                  label="Image"
                  size="small"
                  type="text"
                  onChange={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              name="entrypath"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant="standard"
                  id="entrypath"
                  label="Entry Path"
                  size="small"
                  type="text"
                  onChange={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              name="input_command"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  variant="standard"
                  id="input_command"
                  label="Input Command"
                  size="small"
                  type="text"
                  onChange={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              name="dependencies"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      Dependencies
                    </InputLabel>
                    <Select
                      labelId="dependencies"
                      id="dependencies"
                      value={value}
                      label="Age"
                      fullWidth
                      onChange={onChange}
                    >
                      {workFlowState.map(item => (
                        <MenuItem value={item.id} key={item.id}>
                          { item.name }
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
            />

            {/* <InputLabel id="demo-simple-select-label">Dependencies</InputLabel>
          <Select
            labelId="dependencies"
            id="dependencies"
            value={stepName.dependencies}
            label="Age"
            fullWidth
            onChange={handleChange}
          >
            {workFlowState.length > 0 && (
              <MenuItem value={workFlowState[0].name}>
                {workFlowState[0].name}
              </MenuItem>
            )}
          </Select> */}

            <Typography variant="h6">Additional Parameters</Typography>

            <Controller
              name="parameter_name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="standard"
                  margin="dense"
                  id="parameter_name"
                  label="Name"
                  size="small"
                  type="text"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            {/* <TextField
            margin="dense"
            id="parameter_name"
            label="Name"
            type="text"
            value={stepName.parameters[0].name}
            onChange={handleChange}
          /> */}
            <Controller
              name="parameter_value"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="standard"
                  margin="dense"
                  id="parameter_value"
                  label="Value"
                  size="small"
                  type="text"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            {/* <TextField
            margin="dense"
            id="parameter_value"
            label="Value"
            type="text"
            value={stepName.parameters[0].value}
            onChange={handleChange}
          /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              // onClick={() => {
              //   console.log(name);
              //   onSubmitAddStep(stepName);
              //   // handleClose();
              // }}
              color="primary"
              type="submit"
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
