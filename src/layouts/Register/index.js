import {
  Grid,
  IconButton,
  Snackbar,
  TextField,
  InputAdornment,
  Typography,
  Container,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useState, useEffect } from "react";
import { Form } from "../../components/useForm";
import Controls from "../../components/controllers/Controls";
import { Link, Paper } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { useAuthContext } from "../../context/provider/authContext";
import CircularProgress from "@mui/material/CircularProgress";
import { registerUser } from "../../context/actions/auth/api";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import Toast from "../../components/controllers/Toast";
import {
  REGISTER_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from "../../constants/actionTypes";
import { useGlobalContext } from "../../context/provider/context";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
    "& .MuiFormControl-root": {
      width: "80%",
      marginTop: theme.spacing(3),
    },
  },
  registerForm: {
    flex: "1",
    padding: "1rem 1.5rem 1.5rem",
  },
}));

const RegisterUI = ({
  form: { handleInputChange, form, registerFormValid, setForm },
}) => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const {
    handleCloseToast,
    openToast,
    setOpenToast,
    togglePasswordMask,
    passwordIsMasked,
    handleMouseDownPassword,
  } = useGlobalContext();
  const { mutateAsync, isLoading, isError, error, data, isSuccess } =
    useMutation(registerUser, {
      onError: (error) => {
        setOpenToast(true);
      },
      onSuccess: (data) => {
        authDispatch({
          type: REGISTER_SUCCESS,
          payload: data,
        });
      },
    });

  const classes = useStyles();
  const {
    authState: { auth },
    authDispatch,
  } = useAuthContext();

  const onSubmit = async (e) => {
    e.preventDefault();

    // add a default user role as of now: TODO for later RBAC
    form.role = "user";
    try {
      await mutateAsync(form);

      setForm({});
      // history.push("/verify");
    } catch (error) {
      authDispatch({
        type: REGISTER_ERROR,
        payload: error.message,
      });

      setForm({});
    }
  };

  if (isSuccess) {
    return (
      <>
        <Grid container>
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
                <Grid item container justifyContent="center">
                  <Grid item>
                    <Typography variant="h3" style={{ fontWeight: "600" }}>
                      Awesome! Please check your email.
                    </Typography>
                    <br></br>
                    <Typography>
                      You should have a confirmation link in your email.
                    </Typography>
                  </Grid>
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
    <>
      <Grid
        container
        justifyItems="center"
        alignContent="center"
        alignSelf="center"
        textAlign="center"
        marginTop="80px"
      >
        <Grid item md={4}></Grid>
        <Grid item md={4} className={classes.registerForm}>
          {isSuccess && (
            <Typography variant="h5">Click here to login</Typography>
          )}
          <form className={classes.root} autoComplete="off">
            <Paper>
              <Typography variant="h5">Please Register !</Typography>

              <Grid
                container
                justifyContent="center"
                style={{ padding: "20px" }}
                spacing={4}
              >
                <Grid item>
                  <TextField
                    name="username"
                    label="Username"
                    value={form.username || ""}
                    style={{ width: "100%" }}
                    onChange={handleInputChange}
                  />
                  <TextField
                    name="password"
                    label="Password"
                    type={passwordIsMasked ? "password" : "text"}
                    value={form.password || ""}
                    style={{ width: "100%" }}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordMask}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {passwordIsMasked ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    name="confirmpassword"
                    label="Confirm Password"
                    value={form.confirmpassword || ""}
                    style={{ width: "100%" }}
                    onChange={handleInputChange}
                  />
                  <TextField
                    name="email"
                    label="Email"
                    value={form.email || ""}
                    style={{ width: "100%" }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item style={{ flex: "1" }}>
                  {registerFormValid ? (
                    <Controls.Button text="Submit" disabled fullWidth />
                  ) : (
                    <Controls.Button text="Submit" fullWidth onClick={onSubmit}>
                      {isLoading && <CircularProgress />}
                    </Controls.Button>
                  )}
                  <Grid item>
                    <Toast
                      openToast={openToast}
                      message={auth.error}
                      handleCloseToast={handleCloseToast}
                    ></Toast>
                  </Grid>
                </Grid>
                <Grid item container justifyContent="center" spacing={1}>
                  <Grid item justifyContent="flex-end">
                    <Typography>Already have an account?</Typography>
                  </Grid>
                  <Grid item>
                    <Link underline="none" href={`/login`}>
                      <Typography
                        align="left"
                        style={{ color: "rgb(121, 92, 236)" }}
                      >
                        Sign In
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </>
  );
};

export default RegisterUI;
