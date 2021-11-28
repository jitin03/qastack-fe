import axios from "axios";

export default (history = null) => {
  let baseURL = process.env.REACT_APP_API_SERVER;

  let headers = {};

  if (localStorage.token) {
    headers.Authorization = `Bearer ${localStorage.token}`;
  }

  const axiosAppInstance = axios.create({
    baseURL: baseURL,
    headers,
  });

  axiosAppInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 403) {
        localStorage.removeItem("token");

        if (history) {
          history.push("/auth/login");
        } else {
          window.location = "/auth/login";
        }
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return axiosAppInstance;
};
