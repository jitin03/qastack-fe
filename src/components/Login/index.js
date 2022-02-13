import { Grid, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../../context/provider/context";

import LoginUI from "../../layouts/Login";
import useForm from "./useForm";

const LoginContainer = () => {
  const { form, authState } = useGlobalContext();

  return <LoginUI form={useForm()} />;
};

export default LoginContainer;
