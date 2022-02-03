import { CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteComponent } from "../../../context/actions/component/api";
import DeleteIcon from "@mui/icons-material/Delete";
const DeleteComponent = (props) => {
  const { item } = props;
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading: deleteComponentLoading } =
    useMutation(deleteComponent);
  const handleDeleteComponent = async (id) => {
    await mutateAsync(id);
    queryClient.invalidateQueries("component");
  };
  return (
    <>
      <Tooltip title="Delete component" arrow>
        <IconButton aria-label="delete component">
          <DeleteIcon
            onClick={() => handleDeleteComponent(item.component_id)}
          />
          {deleteComponentLoading && <CircularProgress size={20} />}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DeleteComponent;
