import axiosAppInstance from "../../../helper/componentAppAxios";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_COMPONENT_SERVER;
export const getAllComponents = async () => {
  const response = await axiosAppInstance().get(`/api/components`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

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
  console.log(id);
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
  console.log(data.editId);
  console.log(data);
  let payload = JSON.stringify(data.editPayload);

  const response = await axiosAppInstance().put(
    `/api/component/update/${data.editId}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
