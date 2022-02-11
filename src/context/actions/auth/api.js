import axiosInstance from "../../../helper/axios";

export const registerUser = async ({ ...data }) => {
  let payload = JSON.stringify(data);
  const response = await axiosInstance().post(`/api/users/register`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data.user_id;
};

export const verifyUser = async ({ ...data }) => {
  try {
    let payload = JSON.stringify(data);
    const response = await axiosInstance().post(`/auth/login`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const getUserDetail = async ({ queryKey }) => {
  const [_key, userName] = queryKey;

  try {
    const response = await axiosInstance().get(`/api/users/${userName}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
export const getVerifyEmail = async ({ queryKey }) => {
  const [_key, code, email] = queryKey;

  try {
    const response = await axiosInstance().get(
      `/verify/mail?code=${code}&email=${email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
export const logout = () => {
  localStorage.removeItem("token");
};

export const getPasswordResetCode = async ({ queryKey }) => {
  const [_key, email] = queryKey;
  const response = await axiosInstance().get(
    `/get-password-reset-code?email=${email}`,

    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
export const resetPassword = async ({ ...data }) => {
  try {
    let payload = JSON.stringify(data);
    const response = await axiosInstance().put(
      `reset-password?email=${data.email}&code=${data.code}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
