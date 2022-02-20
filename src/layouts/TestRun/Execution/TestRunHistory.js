import { Grid } from "@material-ui/core";
import { Divider, Typography } from "@mui/material";
import React from "react";
import StatusChip from "../../../components/controllers/StatusChip";
const dayjs = require("dayjs");
export const TestRunHistory = (props) => {
  const { testCaseRunHistory } = props;
  console.log(testCaseRunHistory);
  console.log(dayjs());
  //   console.log(dayjs(testCaseRunHistory[0].last_execution_date));
  const date1 = dayjs(testCaseRunHistory[0].last_execution_date);
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
            <Grid item xs={8}>
              <Typography variant="h6" fontSize="1em">
                {item?.executed_by}
              </Typography>
              {/* <Typography>{item?.last_execution_date}</Typography> */}
              <Typography>
                {Math.floor(date2.diff(item.last_execution_date, "day", true))}
                days , {Math.floor((diff - days) * 24)} hours ago
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
