import { Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/provider/context";
import Controls from "../controllers/Controls";
import { Form } from "../useForm";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { addProject } from "../../context/actions/project/api";
import { useNavigate } from "react-router-dom";
import { getUserDetail } from "../../context/actions/auth/api";
import { getUserDetailFromToken } from "../../helper/token";
import isAuthenticated from "../../context/actions/auth/isAuthenticated";
const useStyles = makeStyles({
  bottomDrawer: {
    position: "absolute",
    bottom: "0px",
    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
  },
});
export default function ProjectForm() {
  const classes = useStyles();
  let navigate = useNavigate();
  const [form, setForm] = useState({});
  const {
    projectState,
    handleCloseRightDrawer,
    handleProjectFormInput,
    projectDispatch,
  } = useGlobalContext();
  const queryClient = useQueryClient();
  const { data: user, isSuccess: userDetails } = useQuery(
    isAuthenticated() && [
      "users",
      getUserDetailFromToken(localStorage.getItem("token")).username,
    ],
    getUserDetail
  );

  let userId = user?.data.users_id;
  const { mutateAsync, isLoading } = useMutation(addProject);

  const handleProjectFormSubmit = async (e) => {
    e.preventDefault();
    if (projectState.project.name) {
      projectDispatch({
        type: "ADD_PROJECT",
        payload: projectState.project,
      });
      projectState.project.user_id = userId;
      await mutateAsync(projectState.project);
      queryClient.invalidateQueries("project");
    }

    handleCloseRightDrawer(e, "Add Project");
    projectDispatch({
      type: "RESET_PROJECT_FORM",
    });
    navigate("/projects");
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
            value={projectState.project.name.trim() || ""}
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
          onClick={(e) => {
            handleCloseRightDrawer(e, "Add Project");
          }}
        />
        <Controls.Button text="Submit" onClick={handleProjectFormSubmit} />
      </Grid>
    </Form>
  );
}
