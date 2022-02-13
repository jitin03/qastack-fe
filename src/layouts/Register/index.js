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
  let navigate = useNavigate();
  const {
    handleCloseToast,
    openToast,
    setOpenToast,

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
  } = useGlobalContext();
  const togglePasswordMask = () => {
    setPasswordIsMasked(!passwordIsMasked);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // add a default user role as of now: TODO for later RBAC
    form.role = "user";
    try {
      await mutateAsync(form);

      setForm({});
      // navigate("/verify");
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
          <form className={classes.root} autoComplete="off">
            <Paper>
              <Typography variant="h5">Please Register !</Typography>

              <Grid
                container
                justifyContent="center"
                alignContent="center"
                // spacing={4}
              >
                <Grid item>
                  <TextField
                    name="username"
                    label="Username"
                    value={form.username || ""}
                    onChange={handleInputChange}
                  />
                  <TextField
                    name="password"
                    label="Password"
                    type={passwordIsMasked ? "password" : "text"}
                    value={form.password || ""}
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
                    onChange={handleInputChange}
                  />
                  <TextField
                    name="email"
                    label="Email"
                    value={form.email || ""}
                    onChange={handleInputChange}
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
                    <Controls.Button
                      text="Submit"
                      fullWidth
                      disabled={registerFormValid}
                      onClick={onSubmit}
                    />
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
