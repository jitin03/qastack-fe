import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
import InfoIcon from "@mui/icons-material/Info";
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      parameters: [{ name: "", value: "" }],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "parameters",
    }
  );
  const { handleCloseRightDrawer, handleRightDrawer } = useGlobalContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [elements, setElements] = useState([]);
  const [workFlowState, setworkFlowState] = useState([]);
  const [stepsConfig, setStepsConfig] = useState([]);
  const { projectKey: projectId } = useParams();
  const onSubmitAddStep = async (workFlowDetail) => {
    const elementId = generateId();
    workFlowDetail.id = elementId;
    const currentNode = {
      id: `${elementId}`,
      data: {
        label: (
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              {workFlowDetail.name}
            </Grid>
          </Grid>
        ),
      },
    };

    if (elements.length) {
      // currentNode.position = { x: (600 * workFlowState.length) / 2, y: 300 };
      currentNode.position = { x: 100, y: 0 };
      const updatedElements = [...elements, currentNode];
      if (workFlowDetail.dependencies) {
        // add edge
        const edge = {
          id: `${generateId()}`,
          source: `${workFlowDetail.dependencies}`,
          target: `${elementId}`,
          type: "smoothstep",
        };
        updatedElements.push(edge);
      }
      setElements(updatedElements);
    } else {
      // currentNode.position = { x: 600, y: 100 };
      currentNode.position = { x: 100, y: 0 };
      setElements([currentNode]);
    }
    setworkFlowState([...workFlowState, workFlowDetail]);
  };
  const { data: user, isSuccess: userDetails } = useQuery(
    isAuthenticated() && [
      "users",
      getUserDetailFromToken(localStorage.getItem("token")).username,
    ],
    getUserDetail
  );
  let navigate = useNavigate();
  const { mutateAsync, isLoading, isHasError, err, output, isSuccess } =
    useMutation(addWorkFlow, {
      onError: (error) => {},
      onSuccess: (data) => {
        navigate(`/project/${projectId}/ciFlow`);
      },
    });
  const onSubmit = async (data, e) => {
    data.config = workFlowState;
    data.project_Id = projectId;
    data.user_Id = user?.data.users_id;

    try {
      await mutateAsync(data);
    } catch (error) {}
  };

  return (
    <Box sx={{ border: "1px solid rgb(232, 232, 232)" }}>
      <Grid container justifyItems="center" alignItems="center">
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          style={{
            backgroundColor: "rgb(248, 248, 248)",
          }}
        >
          <Grid
            item
            xs={6}
            container
            justifyContent="flex-start"
            style={{ paddingLeft: "10px" }}
          >
            <Typography variant="h6">Create Job</Typography>
          </Grid>
          <Grid
            item
            container
            xs={6}
            style={{ paddingRight: "10px" }}
            justifyContent="flex-end"
          >
            <Tooltip title="Close" arrow>
              <Button size="small">
                <CancelIcon
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={(e) => {
                    navigate(`/project/${projectId}/ciFlow`);
                  }}
                >
                  Close
                </CancelIcon>
              </Button>
            </Tooltip>
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
                <Grid item container justifyContent="center" spacing={2}>
                  <Grid item>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field: { onChange, value, onBlur } }) => (
                        <TextField
                          id="workflowname"
                          label="Job Name"
                          placeholder="Job Name"
                          onBlur={(e) =>
                            setValue(
                              "name",
                              e.target.value.toLocaleLowerCase().trim()
                            )
                          }
                          size="small"
                          variant="outlined"
                          onChange={onChange}
                          value={value}
                          style={{ width: "250px" }}
                          error={!!errors?.name}
                          helperText={
                            errors?.name ? errors?.name.message : null
                          }
                        />
                      )}
                      rules={{
                        required: "Workflow Name is required field!",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Tooltip
                      title="Only alphanumeric characters and hyphen(-) are allowed"
                      placement="right"
                    >
                      <Button size="small" style={{ marginTop: "10px" }}>
                        <InfoIcon></InfoIcon>
                      </Button>
                    </Tooltip>
                  </Grid>
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
                      // onClick={() => handleRightDrawer("Add Step", projectId)}
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
              xs={12}
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
        setValue={setValue}
        remove={remove}
        append={append}
        fields={fields}
      />
    </Box>
  );
}
