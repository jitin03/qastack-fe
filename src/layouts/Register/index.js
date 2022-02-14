import {
  Grid,
  IconButton,
  Snackbar,
  TextField,
  InputAdornment,
  Typography,
  Container,
  Button,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Form } from "../../components/useForm";
import Controls from "../../components/controllers/Controls";
import { Link, Paper } from "@material-ui/core";
import { makeStyles } from "@mui/styles";

import CircularProgress from "@mui/material/CircularProgress";
import { registerUser } from "../../context/actions/auth/api";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import Toast from "../../components/controllers/Toast";
import {
  REGISTER_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from "../../constants/actionTypes";
import { useGlobalContext } from "../../context/provider/context";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
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
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);
  const [confirmPasswordIsMasked, setConfirmPasswordIsMasked] = useState(true);
  let navigate = useNavigate();
  const {
    handleCloseToast,
    openToast,
    setOpenToast,

    handleMouseDownPassword,
  } = useGlobalContext();
  const {
    register,
    handleSubmit,
    getValues,
    control,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
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
  } = useGlobalContext();
  const togglePasswordMask = () => {
    setPasswordIsMasked(!passwordIsMasked);
  };
  const toggleConfirmPasswordMask = () => {
    setConfirmPasswordIsMasked(!confirmPasswordIsMasked);
  };

  const onSubmit = async (data, e) => {
    // add a default user role as of now: TODO for later RBAC
    data.role = "user";
    try {
      await mutateAsync(data);
    } catch (error) {
      authDispatch({
        type: REGISTER_ERROR,
        payload: error.message,
      });
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
                    <Typography variant="h3" style={{ fontWeight: "500" }}>
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
        <Grid item xs={4}></Grid>
        <Grid item xs={4} className={classes.registerForm}>
          {isSuccess && (
            <Typography variant="h5">Click here to login</Typography>
          )}
          <form
            className={classes.root}
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Paper>
              <Typography variant="h5">Please Register !</Typography>

              <Grid container justifyContent="center" alignContent="center">
                <Grid
                  item
                  container
                  xs={12}
                  justifyContent="center"
                  alignContent="center"
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field: { onChange, value, onTouched } }) => (
                      <TextField
                        id="username"
                        label="Username"
                        placeholder="Username"
                        multiline
                        size="small"
                        onBlur={(e) =>
                          setValue("username", e.target.value.trim())
                        }
                        variant="outlined"
                        // inputProps={{ className: classes.textarea }}
                        onChange={onChange}
                        value={value}
                        error={!!errors?.username}
                        helperText={
                          errors?.username ? errors?.username.message : null
                        }
                      />
                    )}
                    rules={{
                      required: "Username is required field!",
                      minLength: {
                        value: 6,
                        message: "Username should be minimum 6 character",
                      },
                    }}
                  />
                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextField
                        name="password"
                        label="Password"
                        size="small"
                        onBlur={(e) =>
                          setValue("password", e.target.value.trim())
                        }
                        type={passwordIsMasked ? "password" : "text"}
                        value={value || ""}
                        onChange={onChange}
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
                        error={!!errors?.password}
                        helperText={
                          errors?.password ? errors?.password.message : null
                        }
                      />
                    )}
                    rules={{
                      required: "Password is required field!",
                      pattern: {
                        value:
                          /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                        message:
                          "Password must have (UpperCase, LowerCase, Number/SpecialChar and min 8 Chars)",
                      },
                    }}
                  />
                  {/* <TextField
                    name="confirmpassword"
                    label="Confirm Password"
                    value={form.confirmpassword || ""}
                    onChange={handleInputChange}
                  /> */}
                  <Controller
                    name="confirmpassword"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextField
                        name="confirmpassword"
                        label="Confirm Password"
                        size="small"
                        onBlur={(e) =>
                          setValue("confirmpassword", e.target.value.trim())
                        }
                        type={confirmPasswordIsMasked ? "password" : "text"}
                        value={value || ""}
                        onChange={onChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={toggleConfirmPasswordMask}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {confirmPasswordIsMasked ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={!!errors?.confirmpassword}
                        helperText={
                          errors?.confirmpassword
                            ? errors?.confirmpassword.message
                            : null
                        }
                      />
                    )}
                    rules={{
                      required: "Password is required field!",
                      validate: {
                        matchesPreviousPassword: (value) => {
                          const { password } = getValues();
                          return (
                            password === value || "Passwords should match!"
                          );
                        },
                      },
                    }}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({
                      field: { onChange, value, onTouched, onBlur },
                    }) => (
                      <TextField
                        id="email"
                        label="Email"
                        placeholder="Email"
                        onBlur={(e) => setValue("email", e.target.value.trim())}
                        multiline
                        size="small"
                        variant="outlined"
                        // inputProps={{ className: classes.textarea }}
                        onChange={onChange}
                        value={value}
                        error={!!errors?.email}
                        helperText={
                          errors?.email ? errors?.email.message : null
                        }
                      />
                    )}
                    rules={{
                      required: "Email is required field!",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Please enter a valid email address!",
                      },
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "20px", padding: "32px" }}
                >
                  {isLoading ? (
                    <LoadingButton
                      loading
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="outlined"
                      fullWidth
                    >
                      Save
                    </LoadingButton>
                  ) : (
                    <Controls.Button text="Submit" fullWidth />
                  )}
                  <Grid item>
                    <Toast
                      openToast={openToast}
                      message={auth.error}
                      handleCloseToast={handleCloseToast}
                    ></Toast>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="center"
                  spacing={1}
                >
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
