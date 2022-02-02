import { IconButton } from "@material-ui/core";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { grey } from "@material-ui/core/colors";
const DeleteTestRun = (props) => {
  const { params, projectId } = props;

  const handleDeleteTestRun = (id, projectId) => {
    let params = [];
    params.push(projectId);
    params.push(id);
    // handleRightDrawer("Edit TestCase", params);
  };
  return (
    <>
      <IconButton
        color="secondary"
        aria-label="delete the test run"
        style={{ padding: "20px" }}
        onClick={() => handleDeleteTestRun(params.id, projectId)}
      >
        <DeleteIcon style={{ color: grey[800] }} />
      </IconButton>
    </>
  );
};

export default DeleteTestRun;
