import React from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  const onChange1 = (date) => {
    onChange(convertToDefEventPara(name, date));
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        // disableToolbar
        key={value}
        emptyLabel
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="mm/dd/yyyy"
        name={name}
        value={value}
        autoOk
        onChange={onChange1}
      />
    </MuiPickersUtilsProvider>
  );
}
