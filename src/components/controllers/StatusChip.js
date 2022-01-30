import { Chip } from "@material-ui/core";
import { green, grey, orange, red, yellow } from "@material-ui/core/colors";
import React from "react";

const StatusChip = (props) => {
  const { label } = props;
  console.log("label", label);

  function colorForStatus(label) {
    console.log("label", label);
    switch (label) {
      case "Unexecuted":
        return grey;
      case "Passed":
        return green;
      case "Failed":
        return red;
      case "Blocked":
        return orange;

      default:
        return grey;
    }
  }
  return (
    <Chip
      label={label}
      style={{ backgroundColor: colorForStatus(label)[500], color: "white" }}
    />
  );
};

export default StatusChip;
