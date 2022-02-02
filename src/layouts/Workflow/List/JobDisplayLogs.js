import React, { useEffect, useState } from "react";
import { fetchWorkflowLogs } from "../../../context/actions/workflow/sseClient";
import { ConsoleLogs } from "./ConsoleLogs";

const JobDisplayLogs = (props) => {
  const [logs, setLogs] = useState([]);
  const { params } = props;
  function handleFetchEvent(message, id) {
    // console.log(message);

    if (message.trim()) {
      const parsedData = JSON.parse(message.trim());
      // setLogs(parsedData);
      setLogs((logs) => [...logs, parsedData]);
    }
  }
  useEffect(async () => {
    let response = await fetchWorkflowLogs(
      params[1],
      params[0],
      handleFetchEvent
    );
  }, []);

  return (
    <>
      <ConsoleLogs logs={logs} />
    </>
  );
};

export default JobDisplayLogs;
