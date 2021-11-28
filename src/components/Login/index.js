import { Grid, Typography } from "@mui/material";
import React from "react";
import { useAuthContext } from "../../context/provider/authContext";
import LoginUI from "../../layouts/Login";
import useForm from "./useForm";

const LoginContainer = () => {
  const { form, authState } = useAuthContext();
  console.log("authState", authState);
  return <LoginUI form={useForm()} />;
};

export default LoginContainer;
