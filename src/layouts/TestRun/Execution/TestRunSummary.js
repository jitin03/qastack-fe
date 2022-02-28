import {
  Box,
  Chip,
  CircularProgress,
  Container,
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Controller, useForm } from "react-hook-form";
import Controls from "../../../components/controllers/Controls";
import StatusChip from "../../../components/controllers/StatusChip";
import UploadFiles from "../../../components/Shared/UploadFile";
import { MultipleFileUploadField } from "../../../components/Shared/upload/MultipleFileUploadField";
import { useParams } from "react-router-dom";
import {
  getTestCase,
  getTestCaseRunHistory,
  getTestCaseRunUploadHistory,
  updateTestStatus,
} from "../../../context/actions/testcase/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TestRunHistory } from "./TestRunHistory";
import { useGlobalContext } from "../../../context/provider/context";
import { blue } from "@material-ui/core/colors";
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
export const TestRunSummary = (props) => {
  const {
    testResult,
    handleCloseRightDrawer,
    setOpenToast,
    openToast,
    toastMessage,
    handleCloseToast,
    settoastMessage,
    setSuccessAtProject,
    setProjectSuccessMessage,
    message,
    setMessage,
  } = useGlobalContext();
  const classes = useStyles();
  const { params, testRunId } = props;
  console.log(params);
  console.log(testResult);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });
  const queryClient = useQueryClient();
  const {
    mutateAsync,
    isLoading,
    isError,
    error,
    data: updateTestStatusForm,
    isSuccess,
  } = useMutation(updateTestStatus, {
    onError: (error) => {
      // setOpenToast(true);
    },
    onSuccess: (data) => {
      // componentDispatch({
      //   type: COMPONENT_CREATE_SUCCESS,
      //   payload: data,
      // });
    },
  });

  const onSubmit = async (data, e) => {
    console.log(data);

    try {
      data.projectId = testResult?.projectId;
      console.log(data);
      data.testcase_id = params?.testcase_id;
      data.testcase_run_id = params?.testcase_run_id;

      await mutateAsync(data);
      queryClient.invalidateQueries("testcaseTitles");
      let closeParam = [];
      closeParam.push(testResult?.projectId);
      closeParam.push(testResult?.testRunId);
      console.log("close called");
      handleCloseRightDrawer(e, "Close Run Summary", closeParam);
      reset();
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Status has updated");
    } catch (error) {
      reset();
      setOpenToast(!openToast);
      setMessage(true);
      settoastMessage("Something went wrong!!");
    }
  };

  const {
    data: testCaseRunHistory,
    error: testCaseRunHistoryError,
    isLoading: waitForTestCaseRunHistory,
  } = useQuery(
    ["testCaseRunHistory", params?.testcase_run_id],
    getTestCaseRunHistory,
    {
      onError: (error) => {
        // setOpenToast(true);
        // componentDispatch({
        //   type: COMPONENT_LIST_ERROR,
        //   payload: error.message,
        // });
      },
      enabled: !!params,
    }
  );

  const {
    data: testCaseRunUploadHistory,
    error: testCaseRunUploadHistoryError,
    isLoading: waitForTestCaseRunUploadHistory,
  } = useQuery(
    [
      "testCaseRunUploadHistory",
      testResult?.projectId,
      testResult?.testRunId,
      params?.testcase_id,
    ],
    getTestCaseRunUploadHistory,
    {
      onError: (error) => {
        // setOpenToast(true);
        // componentDispatch({
        //   type: COMPONENT_LIST_ERROR,
        //   payload: error.message,
        // });
      },
      enabled: !!testCaseRunHistory,
    }
  );

  console.log("--testCaseRunUploadHistory---", testCaseRunUploadHistory);
  const {
    data: testCase,
    error: testCaseError,
    isLoading: waitForTestCase,
    isError: isTestCaseError,
  } = useQuery(["testcase", params?.testcase_id], getTestCase, {
    onSuccess: (testCase) => {},
    onError: (error) => {
      //   setOpenToast(true);
      //   componentDispatch({
      //     type: COMPONENT_LIST_ERROR,
      //     payload: error.message,
      //   });
    },
    enabled: !!params,
  });

  if (waitForTestCaseRunUploadHistory) {
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

  return (
    <>
      <Divider />
      <Box
        sx={{ borderTop: "1px solid rgb(232, 232, 232)", minHeight: "80vh" }}
      >
        <Grid container justifyContent="center" alignContent="center">
          <Grid
            item
            container
            xs={8}
            style={{ marginTop: "10px", paddingLeft: "15px" }}
          >
            <Grid item xs={12}>
              <Typography variant="h6" style={{ fontSize: "1.2em" }}>
                Latest Result
              </Typography>
              <Grid item container xs={12}>
                <Grid item xs={12}>
                  <Paper
                    style={{
                      border: "1px solid rgb(232, 232, 232)",
                      marginLeft: "15px",
                      maxHeight: 1050,
                      overflow: "scroll",
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
                        style={{ paddingLeft: "10px", marginTop: "10px" }}
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
                        <Typography
                          variant="h6"
                          style={{ fontSize: "1em", paddingLeft: "10px" }}
                        >
                          Steps
                        </Typography>
                      </Grid>
                      <Grid item container>
                        <TableContainer>
                          <Table
                            sx={{ minWidth: 150 }}
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Step Description</TableCell>
                                <TableCell align="right">
                                  Expected Result
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {testCase?.steps.map((row, index) => (
                                <TableRow
                                  key={index}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    <Chip
                                      label={index + 1}
                                      size="small"
                                      style={{
                                        backgroundColor: blue[500],
                                        color: "white",
                                        minWidth: "24px",
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    {row.stepDescription || "N/A"}
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    style={{ marginRight: "5px" }}
                                  >
                                    {row.expectedResult || "N/A"}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "10px" }}>
              <Typography variant="h6" style={{ fontSize: "1.2em" }}>
                Execution History
              </Typography>
              <Grid
                item
                xs={12}
                style={{
                  minHeight: "350px",
                  maxHeight: "350px",
                  overflow: "auto",
                }}
              >
                <Grid item xs={12}>
                  <Paper
                    style={{
                      border: "1px solid rgb(232, 232, 232)",
                      marginLeft: "15px",
                      // maxHeight: 250,
                      // minHeight: 250,

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
                      {testCaseRunHistory?.length ? (
                        <TestRunHistory
                          testCaseRunHistory={testCaseRunHistory}
                          testCaseRunUploadHistory={testCaseRunUploadHistory}
                          projectId={testResult?.projectId}
                          testRunId={testResult?.testRunId}
                          testCaseId={params?.testcase_id}
                        />
                      ) : (
                        <Typography>No Result</Typography>
                      )}
                    </Grid>
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
            <Typography variant="h6" style={{ fontSize: "1.2em" }}>
              Add Result
            </Typography>
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
                        defaultValue={params?.status || ""}
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
                        defaultValue={params?.assignee || ""}
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
                        name="comments.String"
                        control={control}
                        defaultValue={""}
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
                            error={!!errors?.comments}
                            helperText={
                              errors?.comments ? errors?.comments.message : null
                            }
                          />
                        )}
                        rules={{ required: "Please add comments" }}
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
                                  projectId={testResult?.projectId}
                                  testRunId={testResult?.testRunId}
                                  testCaseId={params?.testcase_id}
                                />

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
