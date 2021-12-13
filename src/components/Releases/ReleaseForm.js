import { Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/provider/context";
import Controls from "../controllers/Controls";
import { Form } from "../useForm";

const useStyles = makeStyles({
  bottomDrawer: {
    position: "absolute",
    bottom: "0px",
    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
  },
});
export default function ReleaseForm() {
  const classes = useStyles();
  const [form, setForm] = useState({});
  const {
    releaseState,
    projectState,
    handleCloseRightDrawer,
    handleReleaseFormSubmit,
    handleReleaseFormInput,
  } = useGlobalContext();

  // const validate = (fieldValues = values) => {
  //   let temp = { ...errors };
  //   //
  //   temp.moduleName = /([A-Z])\w+/.test(fieldValues.moduleName)
  //     ? ""
  //     : "Module should be alphanumeric";

  //   temp.subModuleName = /([A-Z])\w+/.test(fieldValues.subModules.subModuleName)
  //     ? ""
  //     : "Module should be alphanumeric";

  //   // temp.subModules =
  //   //   fieldValues.departmentId.length != 0 ? "" : "This field is required.";
  //   // setErrors({
  //   //   ...temp,
  //   // });

  //   if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  // };

  return (
    <Form>
      <Divider />
      <Grid
        container
        direction="column"
        style={{ padding: "2rem 1.5rem 1.5rem" }}
      >
        <Grid item style={{ minWidth: "250px" }}>
          <Controls.Input
            name="name"
            label="Release"
            value={releaseState.release.name}
            onChange={(e) => handleReleaseFormInput(e)}
          />

          <Controls.DatePicker
            name="startDate"
            label="Start Date"
            value={releaseState.release.startDate}
            onChange={(e) => handleReleaseFormInput(e)}
          />

          <Controls.DatePicker
            name="endDate"
            label="End Date"
            value={releaseState.release.endDate}
            onChange={(e) => handleReleaseFormInput(e)}
          />
        </Grid>
      </Grid>
      <Grid item className={classes.bottomDrawer}>
        <Controls.Button
          color="inherit"
          type="cancel"
          text="Cancel"
          style={{ marginRight: "10px" }}
          onClick={handleCloseRightDrawer}
        />
        <Controls.Button
          text="Submit"
          onClick={handleReleaseFormSubmit}
          // disabled={!releaseState.release.name}
        />
      </Grid>
    </Form>
  );
}
