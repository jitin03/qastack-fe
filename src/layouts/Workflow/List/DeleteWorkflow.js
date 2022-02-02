import { CircularProgress, IconButton } from "@material-ui/core";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteWorkflow } from "../../../context/actions/workflow/api";
import DeleteIcon from "@mui/icons-material/Delete";
import { grey } from "@material-ui/core/colors";
const DeleteWorkflow = (props) => {
  const { params } = props;
  const queryClient = useQueryClient();
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
  };
  return (
    <>
      <IconButton
        color="secondary"
        aria-label="delete the test run"
        style={{ padding: "10px" }}
        onClick={() => handleDeleteWorkflow(params.id)}
      >
        <DeleteIcon style={{ color: grey[800] }} />
        {waitForDeleteWorkflow && (
          <CircularProgress key={params?.id} size={20} />
        )}
      </IconButton>
    </>
  );
};

export default DeleteWorkflow;
