import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "../../../context/provider/context";
import Controls from "../../../components/controllers/Controls";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { Controller, useFormContext } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { COMPONENT_CREATE_SUCCESS } from "../../../constants/actionTypes";
import { addComponent } from "../../../context/actions/component/api";
import Toast from "../../../components/controllers/Toast";
import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      marginTop: theme.spacing(2),
    },
  },
  textarea: {
    resize: "both",
  },
  inputGroup: {
    marginBottom: theme.spacing(2),
  },
  bottomDrawer: {
    position: "sticky",
    bottom: "0px",
    right: "0px",
    padding: "1rem 1.5rem 1.5rem",
    // backgroundColor: "rgb(255, 255, 255)",
    // zIndex: 1202,
  },
}));
const BottomDrawer = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: "0px",
  right: "0px",
  padding: "1rem 1.5rem 1.5rem",
  // backgroundColor: "rgb(255, 255, 255)",
  zIndex: 2,
}));
export default function LinkJiraIssue() {
  const classes = useStyles();
  const { control } = useFormContext();

  const {
    componentState: { component },
    componentDispatch,
    handleCloseRightDrawer,
    setOpenToast,
    openToast,
    handleCloseToast,
  } = useGlobalContext();
  let navigate = useNavigate();

  return (
    <>
      <Container>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="stretch"
        >
          <Grid item xs={9}>
            <Grid>
              {/* <YourCard /> */}
              <JiraIssue control={control} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const JiraIssue = (props) => {
  const { control } = props;
  const classes = {};
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{
        height: "100%",
        border: "none",
        boxShadow: "none",
        // backgroundColor: "rgb(248, 248, 248)",
      }}
    >
      <CardContent>
        <Grid item style={{ minWidth: "250px" }}>
          <Controller
            name="jira"
            control={control}
            render={({ field: { onChange } }) => (
              <TextField
                id="jira"
                label="Enter jira"
                placeholder="Testcase title"
                multiline
                size="small"
                variant="outlined"
                // inputProps={{ className: classes.textarea }}
                onChange={onChange}
                defaultValue=""
                style={{ width: "450px" }}
              />
            )}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};
