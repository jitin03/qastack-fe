import axiosInstance from "../../../helper/axios";

export const registerUser = async ({ ...data }) => {
  let payload = JSON.stringify(data);
  const response = await axiosInstance().post(`/api/users/register`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(
    "User is created successfully with user_id" + response.data.user_id
  );
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

    console.log("User is authorised", response);
    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const getUserDetail = async ({ queryKey }) => {
  const [_key, userName] = queryKey;
  console.log("userName", userName);
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
