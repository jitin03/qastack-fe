import axiosAppTestcaseInstance from "../../../helper/testcasAppAxios";

export const addWorkFlow = async (data) => {
  let payload = JSON.stringify(data);
  const response = await axiosAppTestcaseInstance().post(
    `http://34.201.1.56:8094/api/workflow/add`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getAllWorkFlows = async ({ queryKey }) => {
  const [_key, componentId, pageId] = queryKey;

  const response = await axiosAppTestcaseInstance().get(
    `http://34.201.1.56:8094/api/workflows?projectKey=PR937&page=10`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const runWorkflowByName = async (data) => {

  const response = await axiosAppTestcaseInstance().post(
    `http://34.201.1.56:8094/api/workflow/run?workflowName=${data.workflowName}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getWorkflowDetail = async (data) => {

  const response = await axiosAppTestcaseInstance().get(
    `http://34.201.1.56:8094/api/workflow/${data.queryKey[1]}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
