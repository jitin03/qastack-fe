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
import CreateTestCase from "../layouts/TestCase/Create";
import CreateTestRun from "../layouts/TestRun/Create";
import { ReleaseEditForm } from "./Releases/ReleaseEditForm";
import EditTestCase from "../layouts/TestCase/Edit";
import EditTestRun from "../layouts/TestRun/Edit";
import JobDisplayLogs from "../layouts/Workflow/List/JobDisplayLogs";
import AddStep from "../layouts/Workflow/Create/AddStep";
import { TestRunSummary } from "../layouts/TestRun/Execution/TestRunSummary";

// import AddStep from "../layouts/CIFlow/Create/AddStep";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  marginTop: "20px",
  position: "sticky",
  top: "0",
  zIndex: 2,
  backgroundColor: "rgb(255, 255, 255)",
  // width: 300px;
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
export default function RightDrawer({ configTitle, width = "550px", params }) {
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
            <Typography variant="h5" component="h4">
              {configTitle}
            </Typography>
          </Grid>
          <Grid item style={{ flex: "1" }}></Grid>
          <Grid item>
            <IconButton
              onClick={(e) => handleCloseRightDrawer(e, configTitle, params)}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DrawerHeader>

      {(function () {
        if (configTitle === "Add Component") {
          return <CreateComponent param={params} />;
        } else if (configTitle === "Add Project") {
          return <ProjectForm />;
        } else if (configTitle === "Add Release") {
          return <ReleaseForm param={params} />;
        } else if (configTitle === "Edit Release") {
          return <ReleaseEditForm param={params} />;
        } else if (configTitle === "Edit Project") {
          return <ProjectEditForm />;
        } else if (configTitle === "Edit Component") {
          return <EditComponent param={params} />;
        } else if (configTitle === "Add TestCase") {
          return <CreateTestCase param={params} />;
        } else if (configTitle === "Edit TestCase") {
          return <EditTestCase param={params} />;
        } else if (configTitle === "Add TestRun") {
          return <CreateTestRun param={params} />;
        } else if (configTitle === "Edit TestRun") {
          return <EditTestRun param={params} />;
        } else if (configTitle === "View Logs") {
          return <JobDisplayLogs params={params} />;
        } else if (configTitle === "Add Step") {
          return <AddStep params={params} />;
        } else if (configTitle === "Test Run Summary") {
          return <TestRunSummary params={params} />;
        }
        // else if (configTitle === "Add step") {
        //   return <AddStep param={params} />;
        // }
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
        {configTitle === "Add TestCase" ||
        configTitle === "Add TestRun" ||
        configTitle === "Edit TestCase" ||
        configTitle === "Edit TestRun" ||
        configTitle === "Test Run Summary"
          ? list((width = "1300px"))
          : configTitle === "View Logs"
          ? list((width = "1000px"))
          : list(width)}
      </Drawer>
    </>
  );
}
