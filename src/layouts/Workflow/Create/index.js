import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Add as AddIcon, Publish as PublishIcon } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core";
import isAuthenticated from "../../../context/actions/auth/isAuthenticated";
import { getUserDetailFromToken } from "../../../helper/token";
import { getUserDetail } from "../../../context/actions/auth/api";
import WorkFlow from "./WorkFlow";
import AddStep from "./AddStep";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { addWorkFlow } from "../../../context/actions/workflow/api";
import { generateId } from "../../../helper/appHelper";
import { useGlobalContext } from "../../../context/provider/context";
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
  const { handleCloseRightDrawer } = useGlobalContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [elements, setElements] = useState([]);
  const [workFlowState, setworkFlowState] = useState([]);
  const [stepsConfig, setStepsConfig] = useState([]);
  const { projectKey: projectId } = useParams();
  const onSubmitAddStep = (workFlowDetail) => {
    const elementId = generateId();
    workFlowDetail.id = elementId;
    const currentNode = {
      id: `${elementId}`,
      data: { label: `${workFlowDetail.name}` },
    };

    if (elements.length) {
      currentNode.position = { x: (600 * workFlowState.length) / 2, y: 300 };
      const updatedElements = [...elements, currentNode];
      if (workFlowDetail.dependencies) {
        // add edge
        const edge = {
          id: `${generateId()}`,
          source: `${workFlowDetail.dependencies}`,
          target: `${elementId}`,
        };
        updatedElements.push(edge);
      }
      setElements(updatedElements);
    } else {
      currentNode.position = { x: 600, y: 100 };
      setElements([currentNode]);
    }
    setworkFlowState([...workFlowState, workFlowDetail]);
  };
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

    try {
      await mutateAsync(data);
    } catch (error) {
      history.goBack();
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
            md={8}
            style={{ padding: "15px" }}
            justifyContent="flex-end"
          >
            <Grid item>
              <Tooltip title="Close" arrow>
                <Button>
                  <CancelIcon
                    variant="outlined"
                    startIcon={<AddIcon />}
                    // onClick={() => setState(!state)}
                    onClick={(e) => {
                      history.push(`/project/${projectId}/ciFlow`);
                    }}
                    sx={{ m: 1, textAlign: "right" }}
                  >
                    Close
                  </CancelIcon>
                </Button>
              </Tooltip>
            </Grid>
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
                  <Tooltip title="Add step" arrow>
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
                  <Tooltip title="Publish" arrow>
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
