import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography, InputLabel, MenuItem, Select } from "@material-ui/core";

export default function AddStep({
  openDialog,
  setOpenDialog,
  onSubmitAddStep,
  workFlowState,
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
  }
  const [stepName, setStepName] = useState(defaultStepName);

  const handleClose = () => {
    setOpenDialog(false);
    setStepName(defaultStepName);
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case "name":
        setStepName({ ...stepName, name: e.target.value });
        break;
      case "repository":
        setStepName({ ...stepName, repository: e.target.value });
        break;
      case "branchName":
        setStepName({ ...stepName, branchName: e.target.value });
        break;
      case "token":
        setStepName({ ...stepName, token: e.target.value });
        break;
      case "docker_image":
        setStepName({ ...stepName, docker_image: e.target.value });
        break;
      case "entrypath":
        setStepName({ ...stepName, entrypath: e.target.value });
        break;
      case "input_command":
        setStepName({ ...stepName, input_command: e.target.value });
        break;
      case "dependencies":
        setStepName({ ...stepName, dependencies: e.target.value });
        break;
      case "parameter_name":
        setStepName({ ...stepName, parameters: [{ value: stepName.parameters[0].value, name: e.target.value }] });
        break;
      case "parameter_value":
        setStepName({ ...stepName, parameters: [{ ...stepName.parameters[0], value: e.target.value }] });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Step</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={stepName.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="repository"
            label="Git url"
            type="text"
            fullWidth
            value={stepName.repository}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="branchName"
            label="Branch Name"
            type="text"
            fullWidth
            value={stepName.branchName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="token"
            label="Token"
            type="text"
            fullWidth
            value={stepName.token}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="docker_image"
            label="Image"
            type="text"
            fullWidth
            value={stepName.docker_image}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="entrypath"
            label="Entry Path"
            type="text"
            fullWidth
            value={stepName.entrypath}
            onChange={handleChange}
          />

          <TextField
            margin="dense"  
            id="input_command"
            label="Input Command"
            type="text"
            fullWidth
            value={stepName.input_command}
            onChange={handleChange}
          />

          <InputLabel id="demo-simple-select-label">Dependencies</InputLabel>
          <Select
            labelId="dependencies"
            id="dependencies"
            value={stepName.dependencies}
            label="Age"
            fullWidth
            onChange={handleChange}
          >
            {workFlowState.length > 0 && <MenuItem value={workFlowState[0].name}>{workFlowState[0].name}</MenuItem>}
          </Select>

          <Typography variant="h6">Additional Parameters</Typography>

          <TextField
            margin="dense"
            id="parameter_name"
            label="Name"
            type="text"
            value={stepName.parameters[0].name}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            id="parameter_value"
            label="Value"
            type="text"
            value={stepName.parameters[0].value}
            onChange={handleChange}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmitAddStep(stepName);
              handleClose();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
