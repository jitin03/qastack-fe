import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "react-query";
import { deleteProject } from "../../context/actions/project/api";
import { CircularProgress, IconButton } from "@material-ui/core";
import { useGlobalContext } from "../../context/provider/context";
const DeleteProject = (props) => {
  const { item } = props;
  const queryClient = useQueryClient();
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
  return (
    <>
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <IconButton
          edge="start"
          aria-label="delete"
          onClick={async () => {
            try {
              await mutateAsync(item.Id);
              queryClient.invalidateQueries("project");

              setOpenToast(!openToast);
              setMessage(true);
              settoastMessage("Project has deleted");
            } catch (e) {
              console.log("delete call");
              setOpenToast(!openToast);
              setMessage(true);
              settoastMessage("Something went wrong!!");
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </>
  );
};

export default DeleteProject;
