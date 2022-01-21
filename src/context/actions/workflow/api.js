import axiosAppTestcaseInstance from "../../../helper/testcasAppAxios";

export const addWorkFlow = async (data) => {
  let payload = JSON.stringify(data);
  const response = await axiosAppTestcaseInstance().post(
    `http://54.243.246.111:8094/api/workflow/add`,
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
    `http://54.243.246.111:8094/api/workflows?projectKey=PR937&page=10`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
