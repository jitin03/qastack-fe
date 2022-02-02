import { Button, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Controller, useForm } from "react-hook-form";
import PublishIcon from "@mui/icons-material/Publish";
import WorkFlow from "../../CIFlow/Create/WorkFlow";
import AddStep from "../../CIFlow/Create/AddStep";
import { useMutation, useQuery } from "react-query";
import { addWorkFlow } from "../../../context/actions/workflow/api";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import isAuthenticated from "../../../context/actions/auth/isAuthenticated";
import { getUserDetailFromToken } from "../../../helper/token";
import { getUserDetail } from "../../../context/actions/auth/api";
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
export default function CreateWorkflow() {
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const [openDialog, setOpenDialog] = useState(false);
  const [elements, setElements] = useState([]);
  const [workFlowState, setworkFlowState] = useState([]);
  const [stepsConfig, setStepsConfig] = useState([]);
  const { projectKey: projectId } = useParams();
  const onSubmitAddStep = (workFlowDetail) => {
    switch (elements.length) {
      case 0:
        setElements([
          {
            id: `${elements.length}`,
            data: { label: `${workFlowDetail.name}` },
            position: { x: 600, y: 100 },
          },
        ]);
        setworkFlowState([...workFlowState, workFlowDetail]);
        break;
      case 1:
        setElements([
          ...elements,
          {
            id: `${elements.length}`,
            data: { label: `${workFlowDetail.name}` },
            position: { x: 600, y: 300 },
          },
          { id: "e0-1", source: "0", target: "1" },
        ]);
        setworkFlowState([...workFlowState, workFlowDetail]);
        break;
      default:
        break;
    }
  };
  console.log("workFlowState", workFlowState);
  const { data: user, isSuccess: userDetails } = useQuery(
    isAuthenticated() && [
      "users",
      getUserDetailFromToken(localStorage.getItem("token")).Username,
    ],
    getUserDetail
  );
  const history = useHistory();
  const { mutateAsync, isLoading, isHasError, err, output, isSuccess } =
    useMutation(addWorkFlow, {
      onError: (error) => {},
      onSuccess: (data) => {
        history.push(`/project/${projectId}/ciFlow`);
      },
    });
  const onSubmit = async (data) => {
    data.config = workFlowState;
    data.project_Id = projectId;
    data.user_Id = user?.data.users_id;
    console.log(data);
    try {
      await mutateAsync(data);
    } catch (error) {
      history.goBack();
      console.log(error.message);
    }
  };

  return (
    <Box sx={{ border: "1px solid rgb(232, 232, 232)" }}>
      <Grid container justifyItems="center" alignItems="center">
        <Grid
          item
          container
          justifyContent="center"
          justifyItems="center"
          style={{
            backgroundColor: "rgb(248, 248, 248)",
          }}
        >
          <Grid item md={4} style={{ padding: "15px" }}>
            <Typography variant="h6">Create Job</Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent="flex-end"
            justifyItems="center"
            justifySelf="center"
            md={8}
          ></Grid>
        </Grid>
        <Grid item container xs={12}>
          <form
            className={classes.root}
            autoComplete="off"
            style={{ height: "100%", width: "100%" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              item
              container
              justifyContent="center"
              justifyItems="center"
              xs={12}
            >
              <Grid
                item
                container
                xs={6}
                justifyContent="flex-end"
                style={{ padding: "10px" }}
              >
                <Grid item>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="workflowname"
                        label="Job Name"
                        placeholder="Job Name"
                        size="small"
                        variant="outlined"
                        onChange={onChange}
                        value={value}
                        style={{ width: "250px" }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={6}
                justifyContent="center"
                alignItems="center"
                style={{ padding: "10px" }}
              >
                <Grid item xs={3}>
                  <Tooltip title="Add step" arrow disableInteractive>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        setOpenDialog(true);
                      }}
                    >
                      Add step
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid item xs={1}>
                  <Tooltip title="Publish" arrow disableInteractive>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<PublishIcon />}
                      type="submit"
                    >
                      Publish
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              style={{
                width: "100%",
                height: "65vh",
                backgroundColor: "#dde2e5",
              }}
            >
              <WorkFlow
                elements={elements}
                control={control}
                setElements={setElements}
              />
            </Grid>
          </form>
        </Grid>
      </Grid>

      <AddStep
        control={control}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        onSubmitAddStep={onSubmitAddStep}
        workFlowState={workFlowState}
      />
    </Box>
  );
}
