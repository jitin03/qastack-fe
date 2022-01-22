import axiosAppInstance from "../../../helper/appAxios";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;
export const getAllProjects = async (userid) => {
  // const [_key, { userid }] = queryKey;
  console.log("userid", userid);
  const response = await axiosAppInstance().get(
    `/api/projects?userid=${userid}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getAllRelease = async (projectId) => {
  const response = await axiosAppInstance().get(
    `${process.env.REACT_APP_API_SERVER}/api/releases?projectId=${projectId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.data;
};

export const deleteProject = async (id) => {
  const response = await axiosAppInstance().delete(
    `${process.env.REACT_APP_API_SERVER}/api/project/delete/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.data;
};

export const getProjectDetail = async (id) => {
  const response = await axiosAppInstance().get(
    `${process.env.REACT_APP_API_SERVER}/api/project/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.data;
};

export const addProject = async ({ ...data }) => {
  let payload = JSON.stringify(data);
  const response = await axiosAppInstance().post(
    `/api/project/create`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const addRelease = async ({ ...data }) => {
  let payload = JSON.stringify(data);
  const response = await axiosAppInstance().post(
    `/api/release/create`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const deleteRelease = async (id) => {
  const response = await axiosAppInstance().delete(
    `${process.env.REACT_APP_API_SERVER}/api/release/delete/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.data;
};

export const updateRelease = async ({ ...data }) => {
  console.log(data);
  let payload = JSON.stringify(data);

  const response = await axiosAppInstance().put(
    `/api/release/update/${data.editId}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const updateProject = async ({ ...data }) => {
  let payload = JSON.stringify(data.projectState.project);

  const response = await axiosAppInstance().put(
    `/api/project/update/${data.editId}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
