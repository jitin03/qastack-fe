import { Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/provider/context";
import Controls from "../controllers/Controls";
import { Form } from "../useForm";
import { useMutation, useQueryClient } from "react-query";
import { addProject, updateProject } from "../../context/actions/api";
import { useHistory, useParams } from "react-router-dom";
const useStyles = makeStyles({
  bottomDrawer: {
    position: "absolute",
    bottom: "0px",
    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
  },
});
export default function ProjectEditForm() {
  const classes = useStyles();
  const history = useHistory();
  const [form, setForm] = useState({});
  const { module, state, editId, setEditId, handleRightDrawer } =
    useGlobalContext();

  const {
    projectState,
    handleCloseRightDrawer,
    handleProjectFormInput,
    projectDispatch,
  } = useGlobalContext();
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(updateProject);

  console.log(projectState);
  const handleProjectFormSave = async (e) => {
    e.preventDefault();
    if (projectState.project.name) {
      console.log("new name", editId);
      console.log(projectState.project.name);
      await mutateAsync({ editId, projectState });
      queryClient.invalidateQueries("project");
      history.push("/projects");
    }

    handleCloseRightDrawer();
    projectDispatch({
      type: "RESET_PROJECT_FORM",
    });
    console.log(projectState);
  };

  return (
    <Form>
      <Divider />
      <Grid
        container
        direction="column"
        style={{ padding: "2rem 1.5rem 1.5rem" }}
      >
        <Grid item style={{ minWidth: "250px" }}>
          <Controls.Input
            name="name"
            label="Project"
            value={projectState.project.name}
            onChange={(e) => handleProjectFormInput(e)}
          />
        </Grid>
      </Grid>
      <Grid item className={classes.bottomDrawer}>
        <Controls.Button
          color="inherit"
          type="cancel"
          text="Cancel"
          style={{ marginRight: "10px" }}
          onClick={handleCloseRightDrawer}
        />
        <Controls.Button text="Save" onClick={handleProjectFormSave} />
      </Grid>
    </Form>
  );
}
