import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { Button, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { array, object, string } from "yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Controls from "../../../components/controllers/Controls";
import StatusChip from "../../../components/controllers/StatusChip";
import UploadFiles from "../../../components/Shared/UploadFile";
import { MultipleFileUploadField } from "../../../components/Shared/upload/MultipleFileUploadField";
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
const Input = styled("input")({
  display: "none",
});
export const TestRunSummary = () => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Divider />
      <Box
        sx={{ borderTop: "1px solid rgb(232, 232, 232)", minHeight: "80vh" }}
      >
        <Grid container justifyContent="center" alignContent="center">
          <Grid item container xs={8} style={{ marginTop: "10px" }}>
            <Grid item xs={12}>
              <Typography variant="h6"> Latest Result</Typography>
              <Grid item container xs={12}>
                <Grid item xs={12}>
                  <Paper
                    style={{
                      border: "1px solid rgb(232, 232, 232)",
                      marginLeft: "15px",
                      height: 140,

                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    }}
                  >
                    <Grid
                      container
                      justifyContent="space-around"
                      alignContent="center"
                      alignItems="center"
                      //   style={{ paddingLeft: "10px" }}
                    >
                      <Grid xs={4} item style={{ paddingLeft: "10px" }}>
                        <StatusChip key="Passed" label="Passed" />
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        container
                        justifyContent="flex-start"
                        alignContent="center"
                      >
                        <Grid item xs={12}>
                          <Typography>Assignee</Typography>
                        </Grid>
                        <Grid item xs={12} style={{ marginLeft: "5px" }}>
                          <Typography>Jitin</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        container
                        justifyContent="flex-start"
                        alignContent="center"
                        style={{ paddingLeft: "10px" }}
                      >
                        <Grid item xs={12}>
                          <Typography>Estimated time</Typography>
                        </Grid>
                        <Grid item xs={12} style={{ marginLeft: "5px" }}>
                          <Typography>15min</Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item style={{ marginTop: "10px" }}>
                      <Divider />
                    </Grid>
                    <Grid item container>
                      <Grid item xs={12}>
                        <Typography variant="h6">Steps</Typography>
                      </Grid>
                      <Grid item container>
                        123123
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Execution History</Typography>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Paper
                    style={{
                      border: "1px solid rgb(232, 232, 232)",
                      marginLeft: "15px",
                      maxHeight: 350,
                      minHeight: 250,

                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    }}
                  >
                    <Grid
                      container
                      justifyContent="space-around"
                      alignContent="center"
                      alignItems="center"
                      //   style={{ paddingLeft: "10px" }}
                    ></Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={4}
            justifyContent="flex-start"
            style={{
              marginTop: "10px",
              paddingLeft: "50px",
              paddingRight: "50px",
            }}
          >
            <Typography variant="h6">Add Result</Typography>
            <Grid item container xs={12}>
              <Paper
                style={{
                  border: "1px solid rgb(232, 232, 232)",
                  // margin: "15px",
                  width: "100%",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <Grid
                  item
                  xs={12}
                  container
                  style={{
                    width: "100%",
                  }}
                >
                  <form
                    className={classes.root}
                    autoComplete="off"
                    style={{
                      marginTop: "10px",
                      width: "100%",
                    }}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Grid
                      item
                      xs={12}
                      style={{
                        width: "100%",
                        padding: "0 20px",
                        marginTop: "15px",
                      }}
                    >
                      <Controller
                        name="status"
                        defaultValue={""}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <FormControl
                            style={{ width: "100%", marginTop: "5px" }}
                            variant="outlined"
                            size="small"
                          >
                            <InputLabel
                              id="status-simple-select-label"
                              htmlFor="outlined-Name"
                            >
                              Status
                            </InputLabel>
                            <Select
                              labelId="status-simple-select-label"
                              id="status-simple-select"
                              value={value}
                              fullWidth
                              label="Status"
                              size="small"
                              onChange={onChange}
                            >
                              <MenuItem value="Unexecuted">Unexecuted</MenuItem>
                              <MenuItem value="Passed">Passed</MenuItem>
                              <MenuItem value="Failed">Failed</MenuItem>
                              <MenuItem value="Blocked">Blocked</MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        width: "100%",
                        padding: "0 20px",
                        marginTop: "15px",
                      }}
                    >
                      <Controller
                        name="assignee"
                        defaultValue={""}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <FormControl
                            style={{ width: "100%", marginTop: "25px" }}
                            variant="outlined"
                            size="small"
                          >
                            <InputLabel id="assignee-simple-select-label">
                              Assignee To
                            </InputLabel>
                            <Select
                              value={value}
                              fullWidth
                              label="Assignee"
                              size="small"
                              onChange={onChange}
                            >
                              <MenuItem value="Jitin">Jitin</MenuItem>
                              <MenuItem value="Client">Client</MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        width: "100%",
                        padding: "0 20px",
                        marginTop: "15px",
                      }}
                    >
                      <Controller
                        name="Comment"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            id="Comment"
                            size="small"
                            style={{ width: "100%", marginTop: "25px" }}
                            label="Enter Comment"
                            placeholder="Comment"
                            rows={6}
                            multiline
                            variant="outlined"
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      justifyContent="center"
                      alignItems="center"
                      style={{
                        width: "100%",
                        padding: "0 20px",
                        marginTop: "15px",
                      }}
                    >
                      <Grid item xs={2}>
                        <Typography>Attachements</Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Divider style={{ marginLeft: "16px" }} />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      style={{ minHeight: "200px" }}
                      justifyContent="center"
                    >
                      <Typography style={{ fontSize: ".8em" }}>
                        Max 5 files of 15 MB each.
                      </Typography>

                      <Grid item xs={12} style={{ padding: "10px" }}>
                        {/* <Stack direction="row" alignItems="center" spacing={2}>
                          <label htmlFor="contained-button-file">
                            <Input
                              accept="image/*"
                              id="contained-button-file"
                              multiple
                              type="file"
                            />
                            <Button
                              variant="contained"
                              size="small"
                              component="span"
                            >
                              Upload
                            </Button>
                          </label>
                        </Stack> */}
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
                                <MultipleFileUploadField name="files" />

                                {/* <Grid item>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={
                                      !isValid ||
                                      isSubmitting ||
                                      !values.files.length
                                    }
                                    type="submit"
                                    size="small"
                                  >
                                    Upload
                                  </Button>
                                </Grid> */}
                              </Grid>

                              {/* <pre>
                                {JSON.stringify({ values, errors }, null, 4)}
                              </pre> */}
                            </Form>
                          )}
                        </Formik>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="flex-end"
                      xs={12}
                      style={{ position: "sticky" }}
                    ></Grid>
                    <Grid
                      container
                      justifyContent="flex-start"
                      style={{ margin: "10px" }}
                    >
                      <Controls.Button text="Save" size="small" />
                    </Grid>
                  </form>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
