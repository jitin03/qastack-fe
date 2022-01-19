import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AddStep({
  openDialog,
  setOpenDialog,
  onSubmitAddStep,
}) {
  const [stepName, setStepName] = useState({
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
  });

  const handleClose = () => {
    setOpenDialog(false);
    setStepName({});
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
            type="name"
            fullWidth
            value={stepName.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="repository"
            label="Git url"
            type="name"
            fullWidth
            value={stepName.repository}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="branchName"
            label="Branch Name"
            type="name"
            fullWidth
            value={stepName.branchName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="token"
            label="Token"
            type="Token"
            fullWidth
            value={stepName.token}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="docker_image"
            label="Image"
            type="Image"
            fullWidth
            value={stepName.docker_image}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="docker_image"
            label="Image"
            type="Image"
            fullWidth
            value={stepName.docker_image}
            onChange={handleChange}
          />

          {/* stepName : - repository:- branch:- token :- Image:- shell path:- input
          commands :- Dependency :- Additional Parameters - Input Parameters :- */}
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
