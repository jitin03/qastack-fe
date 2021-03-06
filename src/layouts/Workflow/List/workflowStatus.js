import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";

const WorkflowStatus = (props) => {
  const {
    params,
    waitForWorkflowRun,
    workflowEventStatus,
    currentWorkflowId,
    eventStatus,
  } = props;
  console.log("---workflowEventStatus---", eventStatus);
  return (
    <>
      {workflowEventStatus && currentWorkflowId === params?.id ? (
        <Typography>
          Running
          <CircularProgress size={20} />
        </Typography>
      ) : (
        params?.row.workflow_status
      )}
    </>
  );
};

export default WorkflowStatus;
