import { Divider, Grid, TextField } from "@mui/material";
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

import { Controller, useForm } from "react-hook-form";

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
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

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
  const onSubmit = async (data, e) => {
    e.preventDefault();
    data.project_id = param;
    try {
      await mutateAsync(data);
      queryClient.invalidateQueries("component");

      handleCloseRightDrawer(e, "Add Component", param);
    } catch (error) {
      componentDispatch({
        type: COMPONENT_CREATE_ERROR,
        payload: error.message,
      });
    }
  };
  return (
    <form
      className={classes.root}
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Divider />
      <Grid
        container
        direction="column"
        style={{ padding: "2rem 1.5rem 1.5rem" }}
      >
        <Grid item style={{ minWidth: "250px" }}>
          {/* <Controls.Input
            name="name"
            label="Component"
            value={form.component || ""}
            onChange={(e) => handleInputChange(e)}
          /> */}
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value, onTouched, onBlur } }) => (
              <TextField
                id="Component"
                label="Component"
                placeholder="Component"
                onBlur={(e) => setValue("name", e.target.value.trim())}
                multiline
                size="small"
                variant="outlined"
                // inputProps={{ className: classes.textarea }}
                onChange={onChange}
                value={value}
                style={{ width: "450px" }}
                error={!!errors?.name}
                helperText={errors?.name ? errors?.name.message : null}
              />
            )}
            rules={{ required: "Component is required field!" }}
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
        <Controls.Button text="Submit" />
      </Grid>
      <Toast
        openToast={openToast}
        message={component.error}
        handleCloseToast={handleCloseToast}
      ></Toast>
    </form>
  );
}
