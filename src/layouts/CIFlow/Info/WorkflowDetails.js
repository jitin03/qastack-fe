import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";

const style = {
  width: "100%",
  maxWidth: "100%",
  bgcolor: "background.paper",
};

export default function WorkflowDetails() {
  let { projectKey, workflowName } = useParams();

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="Name" />
        <ListItemText primary={workflowName} />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Project Key" />
        <ListItemText primary={projectKey} />
      </ListItem>
    </List>
  );
}
