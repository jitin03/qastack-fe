import { Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useGlobalContext } from "../../../context/provider/context";
import Controls from "../../../components/controllers/Controls";
import { Form } from "../../../components/useForm";
import { useHistory, useParams } from "react-router-dom";

import { useMutation, useQueryClient } from "react-query";
import {
  COMPONENT_CREATE_ERROR,
  COMPONENT_CREATE_SUCCESS,
  HANDLE_COMPONENT_EDIT_INPUT,
} from "../../../constants/actionTypes";
import {
  addComponent,
  updateComponent,
} from "../../../context/actions/component/api";
import Toast from "../../../components/controllers/Toast";

const useStyles = makeStyles({
  bottomDrawer: {
    position: "absolute",
    bottom: "0px",
    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
  },
});
export default function EditComponent() {
  const classes = useStyles();
  const {
    componentState: { component },
    componentDispatch,
    handleCloseRightDrawer,
    setOpenToast,
    openToast,
    editId,
    handleCloseToast,
  } = useGlobalContext();

  console.log("component.data", component);
  console.log("component.id", editId);

  const [form, setForm] = useState({});

  const [fieldErrors, setFieldErrors] = useState({});

  const { mutateAsync, isLoading, isError, error, data, isSuccess } =
    useMutation(updateComponent, {
      onError: (error) => {
        setOpenToast(true);
      },
      onSuccess: (data) => {
        console.log(data);
        componentDispatch({
          type: COMPONENT_CREATE_SUCCESS,
          payload: data,
        });
      },
    });

  const handleEditChange = (e) => {
    componentDispatch({
      type: HANDLE_COMPONENT_EDIT_INPUT,
      field: e.target.name,
      payload: e.target.value,
    });
  };
  const queryClient = useQueryClient();
  const handleComponentSubmit = async (e) => {
    e.preventDefault();

    console.log("component", component);
    component.data.project_id = 57;
    let editPayload = component.data;
    try {
      await mutateAsync({ editId, editPayload });
      queryClient.invalidateQueries("component");
      setForm({});
      handleCloseRightDrawer();
    } catch (error) {
      console.log(error.message);
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
            value={component.data.name || ""}
            onChange={(e) => handleEditChange(e)}
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
