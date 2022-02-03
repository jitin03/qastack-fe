import { fetchEventSource } from "@microsoft/fetch-event-source";
import axiosAppWorkflowInstance from "../../../helper/workflowAppAxios";

export async function fetchData(workflowName, id, onMessage) {
  // api/event/workflow?workflowName=p
  let workflowEvent = null;
  let token = null;
  if (localStorage.token) {
    token = localStorage.token;
  }

  let eventResponse = await fetchEventSource(
    `${process.env.REACT_APP_WORKFLOW_SERVER}/api/event/workflow?workflowName=${workflowName}`,
    {
      method: "GET",
      headers: {
        Accept: "text/event-stream",
        Authorization: `Bearer ${token}`,
      },

      onopen(res) {
        if (res.ok && res.status === 200) {
          console.log("Connection made ", res);
        } else if (
          res.status >= 400 &&
          res.status < 500 &&
          res.status !== 429
        ) {
          console.log("Client side error ", res);
        }
      },
      onmessage(event) {
        // console.log(event.data);
        const parsedData = JSON.parse(event.data);
        // setData((data) => [...data, parsedData]);
        // console.log("workflow-status", parsedData);
        workflowEvent = parsedData;
        onMessage(parsedData, id, workflowName);
      },
      onclose() {
        console.log("Connection closed by the server");
      },
      onerror(err) {
        console.log("There was an error from server", err);
      },
    }
  );
  console.log("eventResponse");
  return workflowEvent;
}

export async function fetchWorkflowLogs(workflowName, id, onMessage) {
  let workflowEvent = null;
  let token = null;
  if (localStorage.token) {
    token = localStorage.token;
  }

  let eventResponse = await fetchEventSource(
    `${process.env.REACT_APP_WORKFLOW_SERVER}/api/event/logs?workflowName=${workflowName}`,
    {
      method: "GET",
      headers: {
        Accept: "text/event-stream",
        Authorization: `Bearer ${token}`,
      },

      onopen(res) {
        if (res.ok && res.status === 200) {
          console.log("Connection made ", res);
        } else if (
          res.status >= 400 &&
          res.status < 500 &&
          res.status !== 429
        ) {
          console.log("Client side error ", res);
        }
      },
      onmessage(event) {
        // console.log(event.data);
        // const parsedData = JSON.parse(event.data);
        // // setData((data) => [...data, parsedData]);
        // // console.log("workflow-status", parsedData);
        // workflowEvent = parsedData;
        onMessage(event.data, id);
      },
      onclose() {
        console.log("Connection closed by the server");
      },
      onerror(err) {
        console.log("There was an error from server", err);
      },
    }
  );
  console.log("eventResponse");
  return workflowEvent;
}
