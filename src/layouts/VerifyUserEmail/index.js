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

import CircularProgress from "@mui/material/CircularProgress";
import { getVerifyEmail, registerUser } from "../../context/actions/auth/api";
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

const VerifyUserEmail = () => {
  const queryClient = useQueryClient();
  let navigate = useNavigate();

  let code = getQueryVariable("code");
  let email = getQueryVariable("email");
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
  } = useQuery(["verification", code, email], getVerifyEmail, {
    onError: (error) => {
      // setOpenToast(true);
      // componentDispatch({
      //   type: COMPONENT_CREATE_ERROR,
      //   payload: error.message,
      // });
    },
  });

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
                      Awesome! Your verificaton is done !
                    </Typography>
                    <br></br>
                    <Link underline="none" href={`/login`}>
                      <Typography>Please Sign In</Typography>
                    </Link>
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

  if (isLoading) {
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
        <Typography>Verification is in-progress !!</Typography>
        <Grid item md={4}></Grid>
      </Grid>
    </>
  );
};

export default VerifyUserEmail;
