import {
  Box,
  Grid,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MultipleFileUploadField } from "../../../components/Shared/upload/MultipleFileUploadField";
import { array, object, string } from "yup";
import { Form, Formik } from "formik";
import { makeStyles } from "@mui/styles";
import { Controller, useForm } from "react-hook-form";
import Controls from "../../../components/controllers/Controls";
import { importedFieldsMapping } from "../../../constants/appConstants";
const Papa = require("papaparse");
const fs = require("fs");
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      marginTop: theme.spacing(1),
    },
  },
  textarea: {
    resize: "both",
  },
  bottomDrawer: {
    position: "absolute",

    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
    backgroundColor: "rgb(255, 255, 255)",
  },
}));
export const ImportTestCases = () => {
  const [importData, setImportData] = useState({});
  const classes = useStyles();
  const location = useLocation();
  console.log(importData.meta?.fields);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data, e) => {
    const mappingFieldsKey = Object.keys(data);
  
    const importedMappedData = importData.data.map((row) => {
      const importedRowMapping = {};
      mappingFieldsKey.map(keyName => importedRowMapping[importedFieldsMapping[keyName]] = row[data[keyName]]);
      return importedRowMapping;
    });

    console.log('--importedMappedData--', importedMappedData);

    // fs.writeFileSync("./testCase.csv", testCase, (err) => {
    //   if (err) throw err;
    //   console.log("testcase saved");
    // });
  };
  return (
    <>
      <Box sx={{ border: "1px solid rgb(232, 232, 232)" }}>
        <Grid container justifyItems="center" alignItems="center">
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="center"
            style={{
              backgroundColor: "rgb(248, 248, 248)",
              padding: "20px",
            }}
          >
            <Typography variant="h6">Import Test Cases</Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            xs={12}
            md={12}
            style={{ padding: "20px" }}
            spacing={24}
          >
            <Typography>Guide to import test cases</Typography>
          </Grid>
          <Grid item md={12} xs={12}>
            <Divider />
          </Grid>
          <Grid item container md={12} xs={12}>
            <Grid
              item
              md={12}
              xs={12}
              style={{ marginTop: "5px", padding: "10px" }}
            >
              <Formik
                initialValues={{ files: [] }}
                validationSchema={object({
                  files: array(
                    object({
                      url: string().required(),
                    })
                  ),
                })}
                onSubmit={(values) => {
                  console.log("values", values);
                  return new Promise((res) => setTimeout(res, 2000));
                }}
              >
                {({ values, errors, isValid, isSubmitting }) => (
                  <Form>
                    <Grid container direction="column">
                      <MultipleFileUploadField
                        name="files"
                        importData={importData}
                        setImportData={setImportData}
                      />
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center" md={12} xs={12}>
            <Typography style={{ padding: "10px" }}>
              File size should be less than 1MB and allowed formats are .csv,
              .xls, .xlsx
            </Typography>
          </Grid>

          <Grid item container justifyContent="center" alignContent="center">
            <Paper
              style={{
                border: "1px solid rgb(232, 232, 232)",
                width: "100%",
                margin: "10px",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
            >
              <form
                className={classes.root}
                autoComplete="off"
                style={{
                  maxHeight: "100%",
                  overflowY: "scroll",
                  width: "100%",
                }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div style={{ display: "flex" }}>
                  <Grid item container justifyContent="center" md={6}>
                    <Grid
                      item
                      container
                      justifyContent="center"
                      md={12}
                      style={{ padding: "50px" }}
                      spacing={6}
                    >
                      <Grid item md={12}>
                        <Controller
                          name="component"
                          defaultValue=""
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                              >
                                <InputLabel>Component</InputLabel>
                                <Select
                                  id="module-select"
                                  value={value}
                                  label="Component"
                                  onChange={onChange}
                                >
                                  {importData.meta?.fields.map(
                                    (item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                                <FormHelperText error={true}>
                                  {errors?.component
                                    ? errors?.component.message
                                    : null}
                                </FormHelperText>
                              </FormControl>
                            </>
                          )}
                          rules={{ required: "Component is required field!" }}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <Controller
                          name="title"
                          defaultValue=""
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                              >
                                <InputLabel>Test Case Title</InputLabel>
                                <Select
                                  id="title-select"
                                  value={value}
                                  label="Test Case Title"
                                  onChange={onChange}
                                >
                                  {importData.meta?.fields.map(
                                    (item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                                <FormHelperText error={true}>
                                  {errors?.title ? errors?.title.message : null}
                                </FormHelperText>
                              </FormControl>
                            </>
                          )}
                          rules={{
                            required: "TestCase Title is required field!",
                          }}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <Controller
                          name="description"
                          defaultValue=""
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                              >
                                <InputLabel>Description</InputLabel>
                                <Select
                                  id="description-select"
                                  value={value}
                                  label="Description"
                                  onChange={onChange}
                                >
                                  {importData.meta?.fields.map(
                                    (item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                                <FormHelperText error={true}>
                                  {errors?.description
                                    ? errors?.description.message
                                    : null}
                                </FormHelperText>
                              </FormControl>
                            </>
                          )}
                          rules={{ required: "Description is required field!" }}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <Controller
                          name="priority"
                          defaultValue=""
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                              >
                                <InputLabel>Priority</InputLabel>
                                <Select
                                  id="priority-select"
                                  value={value}
                                  label="Priority"
                                  onChange={onChange}
                                >
                                  {importData.meta?.fields.map(
                                    (item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </>
                          )}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <Controller
                          name="type"
                          defaultValue=""
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                              >
                                <InputLabel>Type</InputLabel>
                                <Select
                                  id="type-select"
                                  value={value}
                                  label="Type"
                                  onChange={onChange}
                                >
                                  {importData.meta?.fields.map(
                                    (item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item container md={6} justifyContent="center">
                    <Grid
                      item
                      container
                      justifyContent="center"
                      md={12}
                      style={{ padding: "50px" }}
                      spacing={6}
                    >
                      <Grid item md={12}>
                        <Controller
                          name="type"
                          defaultValue=""
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                              >
                                <InputLabel>Type</InputLabel>
                                <Select
                                  id="type-select"
                                  value={value}
                                  label="Type"
                                  onChange={onChange}
                                >
                                  {importData.meta?.fields.map(
                                    (item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </>
                          )}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <Controller
                          name="expectedResult"
                          defaultValue=""
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                              >
                                <InputLabel>Expected Result</InputLabel>
                                <Select
                                  id="expectedResult-select"
                                  value={value}
                                  label="Expected Result"
                                  onChange={onChange}
                                >
                                  {importData.meta?.fields.map(
                                    (item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </>
                          )}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <Controller
                          name="steps"
                          defaultValue=""
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                              >
                                <InputLabel>Steps</InputLabel>
                                <Select
                                  id="step-select"
                                  value={value}
                                  label="Steps"
                                  onChange={onChange}
                                >
                                  {importData.meta?.fields.map(
                                    (item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </>
                          )}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <Controller
                          name="mode"
                          defaultValue=""
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                              >
                                <InputLabel>Mode</InputLabel>
                                <Select
                                  id="mode-select"
                                  value={value}
                                  label="Mode"
                                  onChange={onChange}
                                >
                                  {importData.meta?.fields.map(
                                    (item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </>
                          )}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <Controller
                          name="prerequisite"
                          defaultValue=""
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                              >
                                <InputLabel>Prerequisite</InputLabel>
                                <Select
                                  id="prerequisite-select"
                                  value={value}
                                  label="Prerequisite"
                                  onChange={onChange}
                                >
                                  {importData.meta?.fields.map(
                                    (item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
                <div style={{ textAlign: "center", padding: "5px" }}>
                  <Controls.Button size="small" text="Submit" />
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
