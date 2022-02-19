import { fetchEventSource } from "@microsoft/fetch-event-source";
import { EventSourcePolyfill } from 'event-source-polyfill';
import axiosAppWorkflowInstance from "../../../helper/workflowAppAxios";

export async function fetchData(workflowName, id, onMessage) {
  // api/event/workflow?workflowName=p
  let workflowEvent = null;
  let token = null;
  if (localStorage.token) {
    token = localStorage.token;
  }

  let eventResponse = await fetchEventSource(
    `https://test.qastack.io/api/event/workflow?workflowName=${workflowName}`,
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
        const parsedData = JSON.parse(event.data);
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
  return workflowEvent;
}

export async function fetchWorkflowLogs(workflowName, id, onMessage) {
  let workflowEvent = null;
  let token = null;
  if (localStorage.token) {
    token = localStorage.token;
  }

  let evtSource = new EventSourcePolyfill(`https://test.qastack.io/api/event/logs?workflowName=${workflowName}`, {
    method: "GET",
    headers: {
      Accept: "text/event-stream",
      Authorization: `Bearer ${token}`,
    },
    openWhenHidden: false,
    lastEventIdQueryParameterName: 'Last-Event-Id',
    heartbeatTimeout: 45000, // no activity timeout
  });
  evtSource.onopen = (res) => {
    if (res.ok && res.status === 200) {
      console.log("Connection made ", res);
    } else if (
      res.status >= 400 &&
      res.status < 500 &&
      res.status !== 429
    ) {
      console.log("Client side error ", res);
    }
  };
  evtSource.onmessage = (event) => {
    onMessage(event.data, id);
  };
  evtSource.onclose = (err) => {
    console.log("Connection closed by the server");
    // throw new RetriableError();
    throw err;
  };
  evtSource.onerror = (err) => {
    console.log("There was an error from server", err);
    evtSource.close();
    // throw err;
  };
  return workflowEvent;
}
