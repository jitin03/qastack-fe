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
import {
  getPasswordResetCode,
  registerUser,
  resetPassword,
} from "../../context/actions/auth/api";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import Toast from "../../components/controllers/Toast";
import {
  REGISTER_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from "../../constants/actionTypes";
import { useGlobalContext } from "../../context/provider/context";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
    "& .MuiFormControl-root": {
      width: "80%",
      marginTop: theme.spacing(3),
    },
  },
  ForgotPassword: {
    flex: "1",
    padding: "1rem 1.5rem 1.5rem",
  },
}));

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  console.log(query); //"app=article&act=news_content&aid=160990"
  var vars = query.split("&");
  console.log(vars); //[ 'app=article', 'act=news_content', 'aid=160990' ]
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    console.log(pair); //[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

const ResetPassword = () => {
  console.log("reset-password");
  const queryClient = useQueryClient();

  let email = getQueryVariable("email");
  let code = getQueryVariable("code");
  console.log("email", email);
  console.log("code", code);
  let navigate = useNavigate();

  const { register, handleSubmit, control } = useForm();
  const {
    handleCloseToast,
    openToast,
    setOpenToast,
    togglePasswordMask,
    passwordIsMasked,
    handleMouseDownPassword,
  } = useGlobalContext();

  const { mutateAsync, isLoading, isError, error, data, isSuccess } =
    useMutation(resetPassword, {
      // onError: (error) => {
      //   setOpenToast(true);
      // },
      // onSuccess: (data) => {
      //   componentDispatch({
      //     type: COMPONENT_CREATE_SUCCESS,
      //     payload: data,
      //   });
      // },
    });

  const classes = useStyles();
  const {
    authState: { auth },
    authDispatch,
  } = useGlobalContext();
  const onSubmit = async (data, e) => {
    console.log(data);
    // setEmail(data.emailaddress);
    try {
      data.email = email;
      data.code = code;
      console.log(data);
      await mutateAsync(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isSuccess) {
    return (
      <>
        <Grid container justifyContent="center">
          <Paper
            align="center"
            textAlign="center"
            style={{ marginTop: "40px" }}
          >
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
                    <Grid item xs={12}>
                      <Typography variant="h3" style={{ fontWeight: "400" }}>
                        Password Changed!
                      </Typography>
                      <br></br>
                      <Typography>
                        You password has been changed succesfully
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      justifyContent="center"
                      style={{ marginTop: "15px" }}
                    >
                      <Link underline="none" href={`/login`}>
                        <Typography
                          align="center"
                          style={{ color: "rgb(121, 92, 236)" }}
                        >
                          Back to login page
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
              <Grid item></Grid>
            </Grid>
          </Paper>
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
        <Grid item xs={2}></Grid>
        <Grid item xs={8} className={classes.ForgotPassword}>
          <form
            className={classes.root}
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Paper>
              <Typography variant="h5">Reset your password</Typography>

              <Grid
                container
                justifyContent="center"
                alignContent="center"
                // spacing={4}
              >
                <Grid item>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="password"
                        label="Password"
                        placeholder="New Password"
                        multiline
                        size="small"
                        variant="outlined"
                        // inputProps={{ className: classes.textarea }}
                        onChange={onChange}
                        value={value}
                        style={{ width: "450px" }}
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <Controller
                    name="password_re"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="password_re"
                        label="Password (Confirm)"
                        placeholder="Confirm password"
                        multiline
                        size="small"
                        variant="outlined"
                        // inputProps={{ className: classes.textarea }}
                        onChange={onChange}
                        value={value}
                        style={{ width: "450px" }}
                      />
                    )}
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
                    >
                      Submit
                    </LoadingButton>
                  ) : (
                    <Controls.Button text="Submit" />
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
                  <Grid item>
                    <Link underline="none" href={`/login`}>
                      <Typography
                        align="left"
                        style={{ color: "rgb(121, 92, 236)" }}
                      >
                        Back to login page
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
