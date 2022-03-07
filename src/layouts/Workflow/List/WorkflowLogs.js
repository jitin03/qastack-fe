import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import NotesIcon from "@mui/icons-material/Notes";
import { grey } from "@material-ui/core/colors";
import { useGlobalContext } from "../../../context/provider/context";
import { Button } from "@mui/material";

export default function WorkflowLogs(props) {
  const { handleRightDrawer } = useGlobalContext();
  const { params, workflow_run_name, projectId } = props;
  const handleViewLogs = (projectId, id, workflow_run_name) => {
    let params = [];
    params.push(projectId);
    params.push(id);
    console.log("---workflow_run_name---", workflow_run_name);
    params.push(workflow_run_name);
    handleRightDrawer("View Logs", params);
  };
  return (
    <>
      <Tooltip title="View Logs" arrow>
        <Button
          variant="outlined"
          size="small"
          startIcon={<NotesIcon style={{ color: grey[800] }} />}
          onClick={() =>
            handleViewLogs(projectId, params.id, workflow_run_name)
          }
        >
          View logs
        </Button>
        {/* <IconButton
          color="secondary"
     
          onClick={() =>
            
          }
        >
          <NotesIcon  /> 
        </IconButton>
          */}
      </Tooltip>
    </>
  );
}
