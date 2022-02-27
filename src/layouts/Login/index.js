import {
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import jwt_decode from "jwt-decode";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import Controls from "../../components/controllers/Controls";
import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import { useQuery } from "react-query";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useGlobalContext } from "../../context/provider/context";
import {
  getUserDetail,
  registerUser,
  verifyUser,
} from "../../context/actions/auth/api";
import Toast from "../../components/controllers/Toast";
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_USER_DETAIL,
} from "../../constants/actionTypes";

import Button from "../../components/controllers/Button";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
    "& .MuiFormControl-root": {
      width: "80%",
      marginTop: theme.spacing(3),
    },
  },
  loginForm: {
    flex: "1",
    padding: "1rem 1.5rem 1.5rem",
  },
  circularProgress: {
    marginLeft: 0,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: "1px",
    paddingLeft: theme.spacing.unit,
  },
}));
const LoginUI = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onTouched" });
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const {
    authState: { auth },
    authState: { loggedIn },
    authDispatch,
  } = useGlobalContext();
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);
  const togglePasswordMask = () => {
    setPasswordIsMasked(!passwordIsMasked);
  };
  let user;
  let roles = [];
  const {
    componentState,
    handleCloseToast,
    openToast,
    setOpenToast,

    handleMouseDownPassword,
  } = useGlobalContext();
  const { setAuth } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    mutateAsync,
    isLoading,
    isError,
    error,
    reset,
    data: token,
    status,
    isSuccess,
  } = useMutation(verifyUser, {
    onError: (error) => {
      setOpenToast(true);
    },
    onSuccess: (token) => {
      localStorage.token = token.data.access_token;
      localStorage.roles = [];
      let accessToken = token.data.access_token;
      let decoded_token = jwt_decode(token.data.access_token);
      user = decoded_token?.username;
      localStorage.user = decoded_token?.username;
      roles.push(decoded_token?.role);
      localStorage.roles = [...roles];

      setAuth({ user, roles, accessToken });
      authDispatch({
        type: LOGIN_SUCCESS,
        payload: token,
      });
      navigate(from, { replace: true });
    },
  });

  // const { data: user, isSuccess: userDetails } = useQuery(
  //   ["users", userName],
  //   getUserDetail,
  //   {
  //     enabled: !!token,
  //   }
  // );

  // if (userDetails) {
  //   authDispatch({
  //     type: LOGIN_USER_DETAIL,
  //     payload: user,
  //   });
  // }

  const classes = useStyles();

  const onSubmit = async (data, e) => {
    try {
      console.log(data);
      await mutateAsync(data);
    } catch (error) {
      authDispatch({
        type: LOGIN_ERROR,
        payload: error.message,
      });
    }
  };
  console.log("errors", errors);

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
        <Grid item md={4} className={classes.loginForm}>
          <form
            className={classes.root}
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Paper>
              <Typography variant="h5">
                Login to your QAStack account !
              </Typography>

              <Grid
                container
                justifyContent="center"
                style={{ padding: "20px" }}
                spacing={3}
              >
                <Grid item container xs={12}>
                  <Controller
                    name="username"
                    control={control}
                    render={({
                      field: { onChange, value, onTouched, onBlur },
                    }) => (
                      <TextField
                        id="emailaddress"
                        label="Email"
                        placeholder="Email"
                        size="small"
                        variant="outlined"
                        // inputProps={{ className: classes.textarea }}
                        onChange={onChange}
                        value={value}
                        onBlur={(e) =>
                          setValue("emailaddress", e.target.value.trim())
                        }
                        style={{ width: "100%" }}
                        error={!!errors?.username}
                        helperText={
                          errors?.username ? errors?.username.message : null
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

                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="password"
                        label="Password"
                        size="small"
                        variant="outlined"
                        onBlur={(e) =>
                          setValue("password", e.target.value.trim())
                        }
                        type={passwordIsMasked ? "password" : "text"}
                        value={value}
                        style={{ width: "100%" }}
                        onChange={onChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={togglePasswordMask}
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
                    rules={{ required: "Password is required field!" }}
                  />

                  <Grid item xs={12}>
                    <Link underline="none" href={`/forgotpassword`}>
                      <Typography
                        align="right"
                        style={{ color: "rgb(121, 92, 236)" }}
                      >
                        Forgot password?
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {false ? (
                    <Controls.Button text="Submit" disabled fullWidth />
                  ) : isLoading ? (
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
                    <Button text="Submit" fullWidth></Button>
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
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item container spacing={0.5}>
                    <Grid item xs={6} justifyContent="flex-end">
                      <Typography align="right">New User?</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Link underline="none" href={`/register`}>
                        <Typography
                          align="left"
                          style={{ color: "rgb(121, 92, 236)" }}
                        >
                          Create Account
                        </Typography>
                      </Link>
                    </Grid>
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

export default LoginUI;
