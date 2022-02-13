import { useState, useContext, useEffect } from "react";
// import { GlobalContext } from "../../context/Provider";
// import { register } from "../../context/actions/auth/register";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import { registerUser } from "../../context/actions/auth/api";
import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from "../../constants/actionTypes";
import { useGlobalContext } from "../../context/provider/context";

export default () => {
  const {
    authState: {
      auth: { loading, error, data },
    },
    authDispatch,
  } = useGlobalContext();
  const [form, setForm] = useState({});

  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const loginFormValid = !form.username?.length || !form.password?.length;

  return {
    form,
    handleInputChange,
    loginFormValid,
    setForm,
  };
};
