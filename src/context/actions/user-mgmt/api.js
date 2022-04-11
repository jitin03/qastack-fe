import axiosAppUserMgmtInstance from "../../../helper/userMgmtAxios";
import download from "downloadjs";
import axios from "axios";

export const getAllRoles = async ({ queryKey }) => {
  const [_key] = queryKey;

  const response = await axiosAppUserMgmtInstance().get(`/api/roles`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getAllRolePermissions = async ({ queryKey }) => {
  const [_key, role] = queryKey;

  const response = await axiosAppUserMgmtInstance().get(
    `/api/roles/default/permissions?role=${role}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getAllUsers = async ({ queryKey }) => {
  const [_key] = queryKey;

  const response = await axiosAppUserMgmtInstance().get(
    `/api/users`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
