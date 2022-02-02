import { Typography } from "@material-ui/core";
import React from "react";

export const ConsoleLogs = (props) => {
  const { logs } = props;

  console.log(logs);
  return (
    <>
      {/* {logs.map((log) => (
        <Typography>{log}</Typography>
      ))} */}
    </>
  );
};
