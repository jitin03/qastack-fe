import { Divider, Grid, Select, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/provider/context";
import { modules } from "../../data/modules";
import Controls from "../controllers/Controls";
import { Form, useForm } from "../useForm";

const useStyles = makeStyles({
  bottomDrawer: {
    position: "absolute",
    bottom: "0px",
    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
  },
});
export default function ModuleForm() {
  const classes = useStyles();
  const {
    module,
    values,
    setValues,
    moduleType,
    setModuleName,
    setModule,
    setSubModule,
    subModule,
    handleCloseRightDrawer,
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
  const moduleTypes = [
    { id: "1", title: "Module" },
    { id: "2", title: "SubModule" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.moduleType == 2) {
      let newSubModule = {
        subModuleName: values.subModuleName,
        id: new Date().getTime().toString(),
      };

      const newModuleMap = module.map((mod) => {
        if (mod.moduleName === values.moduleName) {
          return {
            ...mod,
            subModules: [...mod.subModules, newSubModule],
          };
        }
        return mod;
      });
      setModule(newModuleMap);
      setValues({
        id: 0,
        moduleName: "",
        subModules: { subModuleName: "", id: 0 },
        moduleType: "1",
        isEditing: false,
      });
      handleCloseRightDrawer();
    } else if (values.moduleType == 1 && !values.isEditing) {
      let newModule = {
        moduleName: values.moduleName,
        id: new Date().getTime().toString(),
        subModules: [],
      };

      setModule([...module, newModule]);
      setValues({
        id: 0,
        moduleName: "",
        subModules: { subModuleName: "", id: 0 },
        moduleType: "1",
        isEditing: false,
      });

      handleCloseRightDrawer();
    } else if (values.moduleType == 1 && values.isEditing) {
      setModule(
        module.map((item) => {
          if (item.isEditing === true) {
            return { ...item, moduleName: values.moduleName, isEditing: false };
          } else {
            return item;
          }
        })
      );

      setValues({
        id: 0,
        moduleName: "",
        subModules: { subModuleName: "", id: 0 },
        moduleType: "1",
        isEditing: false,
      });
      handleCloseRightDrawer();
    } else {
      console.log("failure");
    }
  };

  return (
    <Form>
      <Divider />
      <Grid
        container
        direction="column"
        style={{ padding: "2rem 1.5rem 1.5rem" }}
      >
        <Grid item>
          <Controls.RadioGroup
            name="moduleType"
            label="Select Module Type"
            value={values.moduleType}
            onChange={handleInputChange}
            items={
              module.length > 0 ? moduleTypes : [{ id: "1", title: "Module" }]
            }
          />
        </Grid>

        {values.moduleType == 2 && module.length > 0 ? (
          <Grid item style={{ minWidth: "250px" }}>
            <Controls.Select
              name="moduleName"
              label="Module"
              value={values.moduleName}
              onChange={handleInputChange}
              options={module}
            />
            <Controls.Input
              name="subModuleName"
              label="Sub Module"
              value={values.subModules.subModuleName}
              onChange={handleInputChange}
            />
          </Grid>
        ) : (
          <Grid item style={{ minWidth: "250px" }}>
            <Controls.Input
              name="moduleName"
              label="Module"
              value={values.moduleName}
              onChange={handleInputChange}
            />
          </Grid>
        )}
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
          onClick={handleSubmit}
          disabled={!values.moduleName && !values.subModules.subModuleName}
        />
      </Grid>
    </Form>
  );
}
