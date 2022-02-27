import { CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteRelease } from "../../context/actions/project/api";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { useGlobalContext } from "../../context/provider/context";
const DeleteRelease = (props) => {
  const { item } = props;
  const queryClient = useQueryClient();
  const {
    setOpenToast,
    openToast,
    toastMessage,
    settoastMessage,
    setSuccessAtProject,
    setProjectSuccessMessage,
    message,
    setMessage,
  } = useGlobalContext();
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
              try {
                await mutateAsync(item.Id);
                queryClient.invalidateQueries("releases");
                setOpenToast(!openToast);
                setMessage(true);
                settoastMessage("Release is archived");
              } catch (e) {
                setOpenToast(!openToast);
                setMessage(true);
                settoastMessage("Something went wrong!!");
              }
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
