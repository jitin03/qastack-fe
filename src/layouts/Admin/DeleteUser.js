import { IconButton } from "@material-ui/core";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { grey } from "@material-ui/core/colors";
const DeleteUser = (props) => {
  const { params, userId } = props;

  const handleDeleteUser = (id, userId) => {
    let params = [];
    params.push(userId);
    params.push(id);
    // handleRightDrawer("Edit TestCase", params);
  };
  return (
    <>
      <IconButton
        color="secondary"
        aria-label="delete the test run"
        style={{ padding: "20px" }}
        onClick={() => handleDeleteUser(params.id, userId)}
      >
        <DeleteIcon style={{ color: grey[800] }} />
      </IconButton>
    </>
  );
};

export default DeleteUser;
