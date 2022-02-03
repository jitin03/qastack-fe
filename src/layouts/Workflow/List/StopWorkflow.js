import React from "react";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useMutation, useQueryClient } from "react-query";
import { deleteWorkflow } from "../../../context/actions/workflow/api";
import { IconButton, Tooltip } from "@material-ui/core";
const StopWorkflow = (props) => {
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
  const handleStopNowWorkflow = async (id) => {
    let params = [];
    // params.push(projectKey);
    params.push(id);
    // await mutateAsync(id);
    // queryClient.invalidateQueries("workflows");
  };
  return (
    <>
      <Tooltip title="Stop" arrow>
        <IconButton
          aria-label="Stop"
          style={{ padding: "10px" }}
          onClick={(e) =>
            handleStopNowWorkflow(
              params?.row.workflow_name
              // userDetails?.data.users_id
            )
          }
        >
          <StopCircleIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default StopWorkflow;
