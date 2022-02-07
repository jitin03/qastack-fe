import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import NotesIcon from "@mui/icons-material/Notes";
import { grey } from "@material-ui/core/colors";
import { useGlobalContext } from "../../../context/provider/context";

export default function WorkflowLogs(props) {
  const { handleRightDrawer } = useGlobalContext();
  const { params, projectId } = props;
  const handleViewLogs = (projectId, id, workflow_run_name) => {
    let params = [];
    params.push(projectId);
    params.push(id);
    params.push(workflow_run_name);
    handleRightDrawer("View Logs", params);
  };
  return (
    <>
      <Tooltip title="View Logs" arrow>
        <IconButton
          color="secondary"
          aria-label="delete the test run"
          style={{ padding: "10px" }}
          onClick={() =>
            handleViewLogs(projectId, params.id, params?.row.workflow_run_name)
          }
        >
          <NotesIcon style={{ color: grey[800] }} />
        </IconButton>
      </Tooltip>
    </>
  );
}
