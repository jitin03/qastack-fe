import axiosAppInstance from "../../../helper/componentAppAxios";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_COMPONENT_SERVER;
export const getAllComponents = async ({ queryKey }) => {
  const [_key, componentId, pageId] = queryKey;
  const response = await axiosAppInstance().get(
    `/api/components?projectId=${componentId}&page=${pageId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getComponent = async ({ queryKey }) => {
  const [_key, componentId] = queryKey;
  const response = await axiosAppInstance().get(
    `/api/component/${componentId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const addComponent = async ({ ...data }) => {
  let payload = JSON.stringify(data);
  const response = await axiosAppInstance().post(
    `/api/component/add`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const deleteComponent = async (id) => {
  const response = await axiosAppInstance().delete(
    `/api/component/delete/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.data;
};

export const updateComponent = async ({ ...data }) => {
  let payload = JSON.stringify(data);
  const response = await axiosAppInstance().put(
    `/api/component/update/${data?.id}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
