import axiosAppTestcaseInstance from "../../../helper/testcasAppAxios";

export const addTestcase = async ({ ...data }) => {
  let payload = JSON.stringify(data);
  const response = await axiosAppTestcaseInstance().post(
    `/api/testcase/add`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const addTestrun = async ({ ...data }) => {
  let payload = JSON.stringify(data);
  const response = await axiosAppTestcaseInstance().post(
    `/api/testrun/add`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getAllTestCases = async ({ queryKey }) => {
  const [_key, componentId, pageId] = queryKey;

  const response = await axiosAppTestcaseInstance().get(
    `/api/testcases?componentId=${componentId}&page=${pageId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getAllProjectTestCases = async ({ queryKey }) => {
  const [_key, projectId] = queryKey;

  const response = await axiosAppTestcaseInstance().get(
    `/api/testcases/project?projectId=${projectId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getAllProjectTestRuns = async ({ queryKey }) => {
  const [_key, projectId] = queryKey;

  const response = await axiosAppTestcaseInstance().get(
    `/api/testruns/project?projectId=${projectId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
