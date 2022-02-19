import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { XTerm } from 'xterm-for-react';
// import { FitAddon } from 'xterm-addon-fit';
import { isEmpty } from "../../../helper/appHelper";

export const ConsoleLogs = (props) => {
  let { logs } = props;
  let logString = 'Fetching...';

  if (!isEmpty(logs)) {
    logs = JSON.parse(logs);
    logString = !isEmpty(logs.result.content) ? logs.result.content : '';
  }

  const xtermRef = React.useRef(null);
  /* const fitAddon = new FitAddon();
  setTimeout(() => {
    fitAddon.fit();
  }, 0); */

  useEffect(() => {
    xtermRef.current.terminal.writeln(logString);
  }, [logString]);

  return (
    <XTerm
      options={{
        disableStdin: true,
        rows: 39
      }} 
      ref={xtermRef}
      // addons={[fitAddon]}
      onData={(data) => {
        console.log('data', data);
      }}
    />
  );
};
