import { Typography } from "@material-ui/core";
import { CircularProgress, Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { XTerm } from "xterm-for-react";
// import { FitAddon } from 'xterm-addon-fit';
import { isEmpty } from "../../../helper/appHelper";

export const ConsoleLogs = (props) => {
  let { logs } = props;
  let logString = "Fetching...";

  if (!isEmpty(logs)) {
    logs = JSON.parse(logs);
    logString = !isEmpty(logs.result.content) ? logs.result.content : "";
    console.log(logString);
  }
  if (!logString) {
    return (
      <>
        <Grid container>
          <Grid item style={{ flex: "1" }} color="GrayText"></Grid>
          <Grid
            item
            container
            justifyContent="center"
            style={{ padding: "50px 10px" }}
          >
            <Container sx={{ display: "flex" }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            </Container>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </>
    );
  }

  const xtermRef = React.useRef(null);
  /* const fitAddon = new FitAddon();
  setTimeout(() => {
    fitAddon.fit();
  }, 0); */

  useEffect(() => {
    // xtermRef.current.terminal.writeln(logString);

    xtermRef.current.terminal.writeln(logString);
  }, [logString]);

  return (
    <XTerm
      options={{
        disableStdin: true,
        rows: 39,
        allowTransparency: true,
        logLevel: "info",
      }}
      ref={xtermRef}
      // addons={[fitAddon]}
      onData={(data) => {
        console.log("data", data);
      }}
      // onData={(data) => {
      //   const code = data.charCodeAt(0);
      //   // If the user hits empty and there is something typed echo it.
      //   if (code === 13 && state.input.length > 0) {
      //     xtermRef.current.terminal.write(
      //       "\r\nYou typed: '" + state.input + "'\r\n"
      //     );
      //     xtermRef.current.terminal.write("echo> ");
      //     setState({ input: "" });
      //   } else if (code < 32 || code === 127) {
      //     // Disable control Keys such as arrow keys
      //     return;
      //   } else {
      //     // Add general key press characters to the terminal
      //     xtermRef.current.terminal.write(data);
      //     setState({ input: state.input + data });
      //   }
      // }}
    />
  );
};
