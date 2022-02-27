import { CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteComponent } from "../../../context/actions/component/api";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "../../../context/provider/context";
const DeleteComponent = (props) => {
  const { params, item } = props;
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
  console.log("---param---", params);
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading: deleteComponentLoading } =
    useMutation(deleteComponent);
  const handleDeleteComponent = async (id) => {
    try {
      await mutateAsync(id);
      queryClient.invalidateQueries("component");
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Component is deleted");
    } catch (e) {
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
    </>
  );
};

export default DeleteComponent;
