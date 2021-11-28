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

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("called");
    setForm({ ...form, [name]: value });
  };

  const registerFormValid =
    !form.username?.length ||
    !form.password?.length ||
    !form.email?.length ||
    !form.confirmpassword?.length;

  return {
    form,
    handleInputChange,
    registerFormValid,
    setForm,
  };
};
