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
export default function EditComponent(props) {
  const { param } = props;
  console.log("param", param);
  const classes = useStyles();
  const {
    componentState: { component },
    componentDispatch,
    handleCloseRightDrawer,
    editId,
    setOpenToast,
    openToast,
    toastMessage,
    settoastMessage,
    setSuccessAtProject,
    setProjectSuccessMessage,
    message,
    setMessage,
    handleCloseToast,
  } = useGlobalContext();

  const [form, setForm] = useState({});

  const [fieldErrors, setFieldErrors] = useState({});

  const { mutateAsync, isLoading, isError, error, data, isSuccess } =
    useMutation(updateComponent, {
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
    component.data.project_id = param[0];
    component.data.editId = param[1];
    let editPayload = component.data;
    console.log("editPayload", editPayload);
    try {
      await mutateAsync({ editId, editPayload });
      queryClient.invalidateQueries("component");
      setForm({});
      handleCloseRightDrawer(e, "Edit Component", param[0]);
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Component has updated");
    } catch (error) {
      componentDispatch({
        type: COMPONENT_CREATE_ERROR,
        payload: error.message,
      });
      handleCloseRightDrawer(e, "Edit Component", param[0]);
      setForm({});
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Something went wrong!!");
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
          size="small"
          style={{ marginRight: "10px" }}
          onClick={(e) => {
            handleCloseRightDrawer(e, "Edit Component", param[0]);
          }}
        />
        <Controls.Button
          size="small"
          text="Submit"
          onClick={(e) => handleComponentSubmit(e)}
        />
      </Grid>
      <Toast
        openToast={openToast}
        message={component.error}
        handleCloseToast={handleCloseToast}
      ></Toast>
    </Form>
  );
}
