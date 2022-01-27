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

export const updateTestCase = async ({ ...data }) => {
  let payload = JSON.stringify(data);
  const response = await axiosAppTestcaseInstance().put(
    `/api/testcase/update/${data?.id}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const updateTestRun = async ({ ...data }) => {
  let payload = JSON.stringify(data);
  const response = await axiosAppTestcaseInstance().put(
    `/api/testrun/update/${data?.id}`,
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

export const getTestCase = async ({ queryKey }) => {
  const [_key, testCaseId, pageId] = queryKey;

  const response = await axiosAppTestcaseInstance().get(
    `/api/testcase?testCaseId=${testCaseId}`,
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

export const getAllTestsTitleTestRuns = async ({ queryKey }) => {
  const [_key, id] = queryKey;

  const response = await axiosAppTestcaseInstance().get(
    `/api/testrun/testcases?id=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getProjectTestRun = async ({ queryKey }) => {
  const [_key, projectId, id] = queryKey;

  const response = await axiosAppTestcaseInstance().get(
    `/api/testrun/project?projectId=${projectId}&id=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
