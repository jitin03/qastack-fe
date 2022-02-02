import axiosAppWorkflowInstance from "../../../helper/workflowAppAxios";

export const addWorkFlow = async (data) => {
  let payload = JSON.stringify(data);
  const response = await axiosAppWorkflowInstance().post(
    `/api/workflow/add`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const deleteWorkflow = async (workflowId) => {
  const response = await axiosAppWorkflowInstance().delete(
    `/api/workflow/delete/${workflowId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.data;
};

export const getAllWorkFlows = async ({ queryKey }) => {
  const [_key, componentId, pageId] = queryKey;

  const response = await axiosAppWorkflowInstance().get(
    `/api/workflows?projectKey=PR937&page=10`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const runWorkflowByName = async (workflowName, userId) => {
  const response = await axiosAppWorkflowInstance().post(
    `/api/workflow/run?workflowName=${workflowName}&userId=3`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getWorkflowDetail = async (data) => {
  const response = await axiosAppWorkflowInstance().get(
    `http://localhost:8094/api/workflow/${data.queryKey[1]}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};