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
