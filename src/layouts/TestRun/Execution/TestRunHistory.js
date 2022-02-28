import { Grid } from "@material-ui/core";
import { Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import StatusChip from "../../../components/controllers/StatusChip";
import {
  downloadViaSignedUrlFile,
  getFileToTestCaseRun,
} from "../../../context/actions/testcase/api";
const dayjs = require("dayjs");
export const TestRunHistory = (props) => {
  const {
    testCaseRunHistory,
    testCaseRunUploadHistory,
    projectId,
    testRunId,
    testCaseId,
  } = props;
  const [downloadFile, setDownloadFile] = useState("");
  console.log(testCaseRunHistory);
  console.log(dayjs());

  const {
    data: downloadTestCaseRunFile,
    error: downloadFileError,
    isLoading: waitForFileToDownload,
    refetch,
  } = useQuery(
    ["downloadFile", projectId, testRunId, testCaseId, downloadFile],
    getFileToTestCaseRun,
    {
      onError: (error) => {
        // setOpenToast(true);
        // componentDispatch({
        //   type: COMPONENT_LIST_ERROR,
        //   payload: error.message,
        // });
      },
      enabled: !!downloadFile,
    }
  );
  console.log("--downloadTestCaseRunFile?.url--", downloadTestCaseRunFile?.url);
  const {
    data: signedUrlData,
    error: signedUrlDataError,
    isLoading: waitForSignedUrlData,
  } = useQuery(
    ["downloadFile", downloadTestCaseRunFile?.url, downloadFile],
    downloadViaSignedUrlFile,
    {
      enabled: !!downloadTestCaseRunFile?.url,
    }
  );
  const handleDownloadFile = async (filename) => {
    console.log("--filename--", filename);
    // refetch();
    console.log("--downloadFile--", downloadFile);
  };
  //   console.log(dayjs(testCaseRunHistory[0].last_execution_date));
  const date1 = dayjs(testCaseRunHistory[0]?.last_execution_date);
  const date2 = dayjs();
  const diff = date2.diff(date1, "day", true);
  console.log("obtained", diff);
  const days = Math.floor(diff);
  const hours = Math.floor((diff - days) * 24);
  console.log(`${days} days, ${hours} hours`);
  return (
    <>
      <Grid container justifyContent="center">
        {testCaseRunHistory.map((item, index) => (
          <Grid
            item
            key={index}
            container
            style={{ border: "1px solid rgb(232, 232, 232)", padding: "10px" }}
          >
            <Grid item xs={4}>
              <StatusChip key={item.status} label={item.status} />
            </Grid>
            <Grid item container xs={4}>
              <Grid item xs={12}>
                <Typography variant="h6" fontSize="1em">
                  {item?.comments.String || null}
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                justifyContent="center"
                alignItems="center"
                alignContent="center"
              >
                <Grid item container xs={12}>
                  <Typography variant="h6" fontSize="1em">
                    {item?.executed_by}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    {Math.floor(
                      date2.diff(item.last_execution_date, "day", true)
                    )}
                    days , {Math.floor((diff - days) * 24)} hours ago
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <a>
                <Typography
                  onClick={() => {
                    setDownloadFile(
                      testCaseRunUploadHistory[index]?.file_name.split("/")[1]
                    );
                    handleDownloadFile(
                      testCaseRunUploadHistory[index]?.file_name.split("/")[1]
                    );
                  }}
                  paragraph
                  component="span"
                  color="primary"
                  style={{ cursor: "pointer" }}
                >
                  {testCaseRunUploadHistory[index]?.file_name.split("/")[1] ||
                    null}
                </Typography>
              </a>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
