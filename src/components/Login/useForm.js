import { useState, useContext, useEffect } from "react";
// import { GlobalContext } from "../../context/Provider";
// import { register } from "../../context/actions/auth/register";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../context/provider/authContext";
import { registerUser } from "../../context/actions/auth/api";
import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from "../../constants/actionTypes";

export default () => {
  const {
    authState: {
      auth: { loading, error, data },
    },
    authDispatch,
  } = useAuthContext();
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
