import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import WorkflowDetails from "./WorkflowDetails";
import WorkFlowLogs from "./Logs";

export default function WorkflowInfo() {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("Value ", value);
  };

  return (
    <>
      {/* <WorkFlowLogs /> */}
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Logs" />
          <Tab value="two" label="Info" />
        </Tabs>
        {value === "two" && <WorkflowDetails />}
        {value === "one" && <WorkFlowLogs />}
      </Box>
    </>
  );
}
