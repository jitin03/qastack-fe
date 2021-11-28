import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useGlobalContext } from "../context/provider/context";
import { styled, useTheme } from "@mui/material/styles";
import Controls from "./controllers/Controls";
import ModuleForm from "./Modules/ModuleForm";

import CloseIcon from "@mui/icons-material/Close";
import ReleaseForm from "./Releases/ReleaseForm";
import ProjectForm from "./Projects/ProjectForm";
import ProjectEditForm from "./Projects/ProjectEditForm";
import CreateComponent from "../layouts/Component/Create";
import EditComponent from "../layouts/Component/Edit";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  marginTop: "20px",
  // width: 300px;
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
export default function RightDrawer({ configTitle, width = "550px" }) {
  const { state, toggleDrawer, module, anchor, handleCloseRightDrawer } =
    useGlobalContext();

  const list = (width) => (
    <Box sx={{ width: width }}>
      <DrawerHeader>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ padding: "2px 10px" }}
        >
          <Grid item>
            <Typography variant="h4" component="h4">
              {configTitle}
            </Typography>
          </Grid>
          <Grid item style={{ flex: "1" }}></Grid>
          <Grid item>
            <IconButton>
              <CloseIcon onClick={handleCloseRightDrawer} />
            </IconButton>
          </Grid>
        </Grid>
      </DrawerHeader>
      {(function () {
        if (configTitle === "Add Component") {
          return <CreateComponent />;
        } else if (configTitle === "Add Project") {
          return <ProjectForm />;
        } else if (configTitle === "Add Release") {
          return <ReleaseForm />;
        } else if (configTitle === "Edit Project") {
          return <ProjectEditForm />;
        } else if (configTitle === "Edit Component") {
          return <EditComponent />;
        }
      })()}
    </Box>
  );

  return (
    <>
      <Drawer
        // variant="permanent"
        anchor="right"
        open={state}
        // onClose={toggleDrawer("right", state)}
        style={{ zIndex: 1201 }}
      >
        {list(width)}
      </Drawer>
    </>
  );
}
