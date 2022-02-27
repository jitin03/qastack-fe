import { CircularProgress, Container, Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useGlobalContext } from "../../../context/provider/context";
import Controls from "../../../components/controllers/Controls";
import { Form } from "../../../components/useForm";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  COMPONENT_CREATE_ERROR,
  COMPONENT_CREATE_SUCCESS,
  HANDLE_COMPONENT_EDIT_INPUT,
} from "../../../constants/actionTypes";
import {
  addComponent,
  getComponent,
  updateComponent,
} from "../../../context/actions/component/api";
import Toast from "../../../components/controllers/Toast";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";

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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  let componentId = param[1];
  const {
    data: editComponent,

    isLoading: waitForGetComponent,
  } = useQuery(["component", componentId], getComponent);

  console.log("---editComponent---", editComponent);
  const { mutateAsync, isLoading, isError, error, data, isSuccess } =
    useMutation(updateComponent);

  const queryClient = useQueryClient();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    data.project_id = param[0];
    data.id = param[1];

    console.log("editPayload", data);
    try {
      await mutateAsync(data);
      queryClient.invalidateQueries("component");

      handleCloseRightDrawer(e, "Edit Component", param[0]);
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Component has updated");
    } catch (error) {
      // handleCloseRightDrawer(e, "Edit Component", param[0]);

      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Something went wrong!!");
    }
  };

  if (waitForGetComponent) {
    return (
      <>
        <Grid container>
          <Grid item style={{ flex: "1" }} color="GrayText"></Grid>
          <Grid
            item
            container
            justifyContent="center"
            style={{ padding: "50px 10px" }}
          >
            <Container sx={{ display: "flex" }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            </Container>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </>
    );
  }
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
          <Controller
            name="name"
            control={control}
            defaultValue={editComponent?.component_name || ""}
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
          size="small"
          text="Cancel"
          style={{ marginRight: "10px" }}
          onClick={(e) => {
            handleCloseRightDrawer(e, "Add Component", param);
          }}
        />
        <Controls.Button size="small" text="Submit" />
      </Grid>
    </form>
  );
}
