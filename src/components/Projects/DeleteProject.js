import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "react-query";
import { deleteProject } from "../../context/actions/project/api";
import { CircularProgress, IconButton } from "@material-ui/core";
const DeleteProject = (props) => {
  const { item } = props;
  const queryClient = useQueryClient();
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
            await mutateAsync(item.Id);
            queryClient.invalidateQueries("project");
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </>
  );
};

export default DeleteProject;
