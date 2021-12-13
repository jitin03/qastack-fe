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
