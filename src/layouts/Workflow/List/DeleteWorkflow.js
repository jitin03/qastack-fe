import { CircularProgress, IconButton } from "@material-ui/core";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteWorkflow } from "../../../context/actions/workflow/api";
import DeleteIcon from "@mui/icons-material/Delete";
import { grey } from "@material-ui/core/colors";
import { useGlobalContext } from "../../../context/provider/context";
const DeleteWorkflow = (props) => {
  const { params, workflowTriggeredStatus } = props;
  const queryClient = useQueryClient();
  const {
    setOpenToast,
    openToast,
    toastMessage,
    handleCloseToast,
    settoastMessage,
    setSuccessAtProject,
    setProjectSuccessMessage,
    message,
    setMessage,
  } = useGlobalContext();
  const { mutateAsync, isLoading: waitForDeleteWorkflow } = useMutation(
    deleteWorkflow,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("workflows");
      },
    }
  );
  const handleDeleteWorkflow = async (id) => {
    let params = [];
    // params.push(projectKey);
    params.push(id);
    await mutateAsync(id);
    queryClient.invalidateQueries("workflows");
    setOpenToast(!openToast);
    setMessage(true);
    settoastMessage("Workflow has deleted");
  };
  return (
    <>
      <IconButton
        color="secondary"
        aria-label="delete the test run"
        style={{ padding: "10px" }}
        disabled={workflowTriggeredStatus}
        onClick={() => handleDeleteWorkflow(params.id)}
      >
        <DeleteIcon style={{ color: grey[800] }} />
        {/* waitForDeleteWorkflow && (
          <CircularProgress key={params?.id} size={20} />
        ) */}
      </IconButton>
    </>
  );
};

export default DeleteWorkflow;
