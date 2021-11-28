import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export default function Select(props) {
  const { variant, name, label, value, onChange, options, ...others } = props;
  console.log(value);

  return (
    <FormControl variant={variant || "outlined"} fullWidth margin="dense">
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value="">All</MenuItem>

        {options.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </MuiSelect>
    </FormControl>
  );
}
