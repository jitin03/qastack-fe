import { CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteRelease } from "../../context/actions/project/api";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
const DeleteRelease = (props) => {
  const { item } = props;
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(deleteRelease);
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Tooltip title="Close release" arrow>
          <IconButton
            edge="start"
            aria-label="delete"
            onClick={async () => {
              await mutateAsync(item.Id);
              queryClient.invalidateQueries("releases");
            }}
          >
            <CloseFullscreenIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default DeleteRelease;
