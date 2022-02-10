import {
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import Controls from "../../components/controllers/Controls";
import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import { useQuery } from "react-query";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useHistory } from "react-router-dom";
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
import { useAuthContext } from "../../context/provider/authContext";
import Button from "../../components/controllers/Button";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
const LoginUI = ({
  form: { handleInputChange, form, setForm, loginFormValid },
}) => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const {
    authState: { auth },
    authState: { loggedIn },
    authDispatch,
  } = useAuthContext();
  const {
    componentState,
    handleCloseToast,
    openToast,
    setOpenToast,
    passwordIsMasked,
    setPasswordIsMasked,
    togglePasswordMask,
    handleMouseDownPassword,
  } = useGlobalContext();
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

      authDispatch({
        type: LOGIN_SUCCESS,
        payload: token,
      });
      history.push("/projects");
    },
  });

  let userName = form?.username;
  const { data: user, isSuccess: userDetails } = useQuery(
    ["users", userName],
    getUserDetail,
    {
      enabled: !!token,
    }
  );

  if (userDetails) {
    authDispatch({
      type: LOGIN_USER_DETAIL,
      payload: user,
    });
  }
  const classes = useStyles();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await mutateAsync(form);
    } catch (error) {
      authDispatch({
        type: LOGIN_ERROR,
        payload: error.message,
      });

      setForm({});
    }
  };

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
          <form className={classes.root} autoComplete="off">
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
                            aria-label="toggle password visibility"
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
                </Grid>
                <Grid item style={{ flex: "1" }}>
                  {loginFormValid ? (
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
                    <Button text="Submit" fullWidth onClick={onSubmit}></Button>
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
                  <Grid item container spacing={1}>
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
