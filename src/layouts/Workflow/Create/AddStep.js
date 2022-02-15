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
import {
  Typography,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
  Grid,
  Tooltip,
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
  append,
  setValue,
  remove,
  fields,
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
    // try {
    //   await mutateAsync(data);
    // } catch (error) {
    //   history.goBack();
    //   console.log(error.message);
    // }
  };
  const handleAddParam = () => {
    append({
      parameter_name: "",
      parameter_value: "",
    });
  };
  console.log("errrors", errors);
  return (
    <div>
      <Grid container justifyContent="center" alignContent="center">
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Step</DialogTitle>
          <form
            className={classes.root}
            autoComplete="off"
            style={{ height: "100%", width: "100%", marginLeft: "10px" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <DialogContent>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="name"
                    label="Step Name"
                    size="small"
                    type="text"
                    onChange={onChange}
                    value={value}
                    error={!!errors?.name}
                    helperText={errors?.name ? errors?.name.message : null}
                  />
                )}
                rules={{
                  required: "Step Name is required field!",
                  pattern: {
                    value: /^[a-zA-Z0-9]+(?:[\w -]*[a-zA-Z0-9]+)*$/,
                    message:
                      "Only alphanumeric characters and hyphen(-) are allowed",
                  },
                }}
              />
              <Controller
                name="repository"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="repository"
                    label="Repository URL"
                    size="small"
                    type="text"
                    onChange={onChange}
                    value={value}
                    error={!!errors?.repository}
                    helperText={
                      errors?.repository ? errors?.repository.message : null
                    }
                  />
                )}
                rules={{ required: "Repository URL is required field!" }}
              />
              <Controller
                name="branchName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="branchName"
                    label="Repository Branch"
                    size="small"
                    type="text"
                    onChange={onChange}
                    value={value}
                    error={!!errors?.branchName}
                    helperText={
                      errors?.branchName ? errors?.branchName.message : null
                    }
                  />
                )}
                rules={{ required: "Repository Branch is required field!" }}
              />

              <Controller
                name="token"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="token"
                    label="Token (Optional)"
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
                    variant="outlined"
                    id="docker_image"
                    label="Docker Image"
                    size="small"
                    type="text"
                    onChange={onChange}
                    value={value}
                    error={!!errors?.docker_image}
                    helperText={
                      errors?.docker_image ? errors?.docker_image.message : null
                    }
                  />
                )}
                rules={{ required: "Image is required field!" }}
              />

              <Controller
                name="entrypath"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="entrypath"
                    label="Shell Path"
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
                    variant="outlined"
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
                        Dependency
                      </InputLabel>
                      <Select
                        labelId="dependencies"
                        id="dependencies"
                        value={value}
                        label="Dependency"
                        fullWidth
                        onChange={onChange}
                      >
                        {workFlowState.map((item) => (
                          <MenuItem value={item.id} key={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              />

              <Grid item style={{ marginTop: "15px" }}>
                <Typography variant="h6">
                  Additional Parameters (Optional)
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                justifyContent="center"
                alignItems="center"
              >
                {fields.map((item, index) => (
                  <>
                    <Grid
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                      className={classes.inputGroup}
                      key={item.id}
                    >
                      <Grid item xs={4}>
                        <Controller
                          name={`parameters[${index}].name`}
                          control={control}
                          render={({ field: { onChange, value, onBlur } }) => (
                            <TextField
                              label="Name"
                              multiline
                              size="small"
                              variant="outlined"
                              onBlur={(e) =>
                                setValue(
                                  `parameters[${index}].name`,
                                  e.target.value.trim()
                                )
                              }
                              // inputProps={{ className: classes.textarea }}
                              onChange={onChange}
                              // defaultValue={item.stepDescription}
                              //   style={{ width: "350px" }}
                              value={value}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Controller
                          name={`parameters[${index}].value`}
                          control={control}
                          render={({ field: { onChange, value, onBlur } }) => (
                            <TextField
                              size="small"
                              //   style={{ width: "150px" }}
                              label="Value"
                              multiline
                              variant="outlined"
                              onChange={onChange}
                              onBlur={(e) =>
                                setValue(
                                  `parameters[${index}].value`,
                                  e.target.value.trim()
                                )
                              }
                              // defaultValue={item.expectedResult}
                              value={value}

                              // inputProps={{ className: classes.textarea }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <Tooltip title="Add param" arrow>
                          <AddIcon onClick={handleAddParam} />
                        </Tooltip>
                      </Grid>
                      <Grid item xs={1}>
                        {index !== 0 && (
                          <Tooltip title="Remove param" arrow>
                            <DeleteIcon onClick={() => remove(index)} />
                          </Tooltip>
                        )}
                      </Grid>
                    </Grid>
                  </>
                ))}

                {/* <Grid item xs={4}>
                  <Controller
                    name="parameter_name"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant="outlined"
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
                </Grid>

                <Grid item xs={4}>
                  <Controller
                    name="parameter_value"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant="outlined"
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
                </Grid>
                <Grid item xs={2}>
                  <Button>Add</Button>
                </Grid> */}
              </Grid>
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
      </Grid>
    </div>
  );
}
