import axiosAppTestcaseInstance from "../../../helper/testcasAppAxios";

export const addTestcase = async ({ ...data }) => {
  let payload = JSON.stringify(data);
  const response = await axiosAppTestcaseInstance().post(
    `/api/testcase/add?projectId=${data?.projectId}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
//

export const addRawTestcase = async (data) => {
  let payload = JSON.stringify(data);
  console.log("--rawdata--", payload);
  const response = await axiosAppTestcaseInstance().post(
    `/api/testcase/upload?projectId=${data.projectId}`,
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

export const updateTestStatus = async ({ ...data }) => {
  let payload = JSON.stringify(data);
  const response = await axiosAppTestcaseInstance().post(
    `/api/testrun/${data?.projectId}/test/update/status`,
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
  const [_key, componentId, projectKey, pageId] = queryKey;

  console.log("--projectKey--", projectKey);
  const response = await axiosAppTestcaseInstance().get(
    `/api/testcases?componentId=${componentId}&projectId=${projectKey}&page=${pageId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getTestCaseRunHistory = async ({ queryKey }) => {
  const [_key, testCaseRunId] = queryKey;

  const response = await axiosAppTestcaseInstance().get(
    `/api/testrun/testcase-history?testCaseRunId=${testCaseRunId}`,
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

export const UploadFile = async (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return axiosAppTestcaseInstance().post(
    "/api/testrun/result/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    }
  );
};

export const GetFiles = async () => {
  return axiosAppTestcaseInstance().get("/files");
};
