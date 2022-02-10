import { fetchEventSource } from "@microsoft/fetch-event-source";
import axiosAppWorkflowInstance from "../../../helper/workflowAppAxios";
export default async function closeEventSource(workflowName) {
  let token = null;
  if (localStorage.token) {
    token = localStorage.token;
  }
  const ctrl = new AbortController();
  let eventResponse = await fetchEventSource(
    `${process.env.REACT_APP_API_SERVER}/api/event/workflow?workflowName=${workflowName}`,
    {
      method: "GET",
      headers: {
        Accept: "text/event-stream",
        Authorization: `Bearer ${token}`,
      },
      signal: ctrl.signal,
    }
  );
}
