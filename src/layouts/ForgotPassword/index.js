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
import { useAuthContext } from "../../context/provider/authContext";
import CircularProgress from "@mui/material/CircularProgress";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import {
  getPasswordResetCode,
  registerUser,
} from "../../context/actions/auth/api";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
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

const ForgotPassword = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const { register, handleSubmit, control } = useForm();
  const {
    handleCloseToast,
    openToast,
    setOpenToast,
    togglePasswordMask,
    passwordIsMasked,
    handleMouseDownPassword,
  } = useGlobalContext();
  const {
    data: verificationData,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useQuery(["passresetcode", email], getPasswordResetCode, {
    onError: (error) => {
      // setOpenToast(true);
      // componentDispatch({
      //   type: COMPONENT_CREATE_ERROR,
      //   payload: error.message,
      // });
    },
    enabled: false && !!email,
  });

  const classes = useStyles();
  const {
    authState: { auth },
    authDispatch,
  } = useAuthContext();
  const onSubmit = async (data, e) => {
    console.log(data);
    // setEmail(data.emailaddress);
    try {
      console.log(email);
      refetch();
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
                      <Typography variant="h4">
                        Password reset requested.
                      </Typography>
                      <br></br>
                      <Typography>
                        You should have a reset password link in your email.
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
                          // align="left"
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
              <Typography variant="h5">Recover your password</Typography>

              <Grid
                container
                justifyContent="center"
                alignContent="center"
                // spacing={4}
              >
                <Grid item>
                  <Controller
                    name="emailaddress"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="emailaddress"
                        label="Emailaddress"
                        placeholder="Enter Emailaddress"
                        multiline
                        size="small"
                        variant="outlined"
                        // inputProps={{ className: classes.textarea }}
                        onChange={(e) => {
                          // onChange's arg will send value into hook form
                          onChange(e.target.value);
                          console.log(e.target.value);
                          setEmail(e.target.value);
                        }}
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

export default ForgotPassword;
