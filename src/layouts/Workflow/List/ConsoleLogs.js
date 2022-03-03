import { Typography } from "@material-ui/core";
import { CircularProgress, Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { XTerm } from "xterm-for-react";
// import { FitAddon } from 'xterm-addon-fit';
import { isEmpty } from "../../../helper/appHelper";
import("./logs-viewer.scss");
import { Terminal } from "xterm";

import { FitAddon } from "xterm-addon-fit";

export const ConsoleLogs = (props) => {
  let { logs } = props;
  let logString = "Fetching...";

  if (!isEmpty(logs)) {
    logs = JSON.parse(logs);
    logString = !isEmpty(logs.result.content) ? logs.result.content : "";
  }
  const terminal = React.useRef();
  useEffect(() => {
    terminal.current = new Terminal({
      scrollback: 99999,
      allowTransparency: true,
      theme: {
        foreground: "#495763",
        background: "transparent",
      },

      fontWeight: 200,
      // fontFamily: `normal 13px/1.2 "Courier", sans-serif`,
      rendererType: "dom",
      windowOptions: {
        setWinSizeChars: true,
      },
    });

    const fitAddon = new FitAddon();
    terminal.current.loadAddon(fitAddon);

    terminal.current.reset();
    terminal.current.open(document.getElementById("terminal"));
  }, []);

  useEffect(() => {
    terminal.current.writeln(logString);
  }, [logString]);

  return (
    <>
      <div
        style={{
          // fontFamily: `normal 4px/1.2 "Courier", sans-serif`,
          overflow: "hidden",
          width: "100%",
          // lineHeight: "20px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            border: "1px solid rgb(232, 232, 232)",
          }}
          id="terminal"
        />
      </div>
    </>
  );
};
