import { CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteComponent } from "../../../context/actions/component/api";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "../../../context/provider/context";
import { Button } from "@mui/material";
const DeleteComponent = (props) => {
  const { params, item } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const {
    setOpenToast,
    openToast,
    toastMessage,
    settoastMessage,
    setSuccessAtProject,
    setProjectSuccessMessage,
    message,
    setMessage,
    handleCloseToast,
  } = useGlobalContext();

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading: deleteComponentLoading } =
    useMutation(deleteComponent);
  const handleDeleteComponent = async (id) => {
    setOpenDialog(true);
    // try {
    //   await mutateAsync(id);
    //   queryClient.invalidateQueries("component");
    //   setOpenToast(!openToast);
    //   setMessage(true);
    //   settoastMessage("Component is deleted");
    // } catch (e) {
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
      queryClient.invalidateQueries("component");
      setOpenDialog(false);
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Component is deleted");
    } catch (e) {
      setOpenDialog(false);
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Something went wrong!!");
    }
  };
  return (
    <>
      <Tooltip title="Delete component" arrow>
        <IconButton aria-label="delete component">
          <DeleteIcon onClick={() => handleDeleteComponent(params?.id)} />
          {deleteComponentLoading && <CircularProgress size={20} />}
        </IconButton>
      </Tooltip>

      <Dialog
        open={openDialog}
        setOpenDialog={setOpenDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Test cases may associated with component!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={(e) => {
              handleConfirm(params?.id);
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteComponent;
