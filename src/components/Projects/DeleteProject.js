import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "react-query";
import { deleteProject } from "../../context/actions/project/api";
import { CircularProgress, IconButton } from "@material-ui/core";
import { useGlobalContext } from "../../context/provider/context";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const DeleteProject = (props) => {
  const { item } = props;
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const {
    message,
    setMessage,
    toastMessage,
    projectSuccessMessage,
    setProjectSuccessMessage,
    settoastMessage,
    successAtProject,
    setSuccessAtProject,
    openToast,
    setOpenToast,
  } = useGlobalContext();
  const { mutateAsync, isLoading, isError, error } = useMutation(deleteProject);

  const handleDeleteProject = async (id) => {
    setOpenDialog(true);

    // try {
    //   await mutateAsync(id);
    //   queryClient.invalidateQueries("project");

    //   setOpenToast(!openToast);
    //   setMessage(true);
    //   settoastMessage("Project has deleted");
    // } catch (e) {
    //   console.log("delete call");
    //   setOpenToast(!openToast);
    //   setMessage(true);
    //   settoastMessage("Something went wrong!!");
    // }
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleConfirm = async (id) => {
    try {
      await mutateAsync(id);
      queryClient.invalidateQueries("project");
      setOpenDialog(false);
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Project has deleted");
    } catch (e) {
      setOpenDialog(false);
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Something went wrong!!");
    }
  };
  return (
    <>
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <>
          <IconButton
            edge="start"
            aria-label="delete"
            onClick={(e) => handleDeleteProject(item.Id)}
          >
            <DeleteIcon />
          </IconButton>
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openDialog}
            setOpenDialog={setOpenDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Delete?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Deleted Project cannot be
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={(e) => {
                  handleConfirm(item?.Id);
                }}
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default DeleteProject;
