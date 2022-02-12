import { Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useGlobalContext } from "../../../context/provider/context";
import Controls from "../../../components/controllers/Controls";
import { Form } from "../../../components/useForm";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import {
  COMPONENT_CREATE_ERROR,
  COMPONENT_CREATE_SUCCESS,
} from "../../../constants/actionTypes";
import { addComponent } from "../../../context/actions/component/api";
import Toast from "../../../components/controllers/Toast";

const useStyles = makeStyles({
  bottomDrawer: {
    position: "absolute",
    bottom: "0px",
    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
  },
});
export default function CreateComponent(props) {
  const { param } = props;
  const classes = useStyles();
  const {
    componentState: { component },
    componentDispatch,
    handleCloseRightDrawer,
    setOpenToast,
    openToast,
    handleCloseToast,
  } = useGlobalContext();
  let navigate = useNavigate();
  const { projectKey } = useParams();
  console.log("projectKey", param);
  const [form, setForm] = useState({});

  const [fieldErrors, setFieldErrors] = useState({});

  const { mutateAsync, isLoading, isError, error, data, isSuccess } =
    useMutation(addComponent, {
      onError: (error) => {
        setOpenToast(true);
      },
      onSuccess: (data) => {
        componentDispatch({
          type: COMPONENT_CREATE_SUCCESS,
          payload: data,
        });
      },
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };
  const queryClient = useQueryClient();
  const handleComponentSubmit = async (e) => {
    e.preventDefault();
    form.project_id = param;
    try {
      await mutateAsync(form);
      queryClient.invalidateQueries("component");
      setForm({});
      handleCloseRightDrawer(e, "Add Component", param);
    } catch (error) {
      componentDispatch({
        type: COMPONENT_CREATE_ERROR,
        payload: error.message,
      });

      setForm({});
    }
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
            label="Component"
            value={form.component || ""}
            onChange={(e) => handleInputChange(e)}
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
            handleCloseRightDrawer(e, "Add Component", param);
          }}
        />
        <Controls.Button text="Submit" onClick={handleComponentSubmit} />
      </Grid>
      <Toast
        openToast={openToast}
        message={component.error}
        handleCloseToast={handleCloseToast}
      ></Toast>
    </Form>
  );
}
