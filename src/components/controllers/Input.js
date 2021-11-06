import { TextField } from "@mui/material";
import React from "react";

function Input(props) {
  const { name, label, value, onChange, size, ...others } = props;
  return (
    <>
      <TextField
        variant="outlined"
        label={label}
        size={size || "small"}
        name={name}
        value={value || null}
        onChange={onChange}
        {...others}
      ></TextField>
    </>
  );
}

export default Input;
