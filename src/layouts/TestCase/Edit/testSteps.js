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
import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { Controller } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import {
  COMPONENT_CREATE_ERROR,
  COMPONENT_CREATE_SUCCESS,
  COMPONENT_LIST_ERROR,
} from "../../../constants/actionTypes";
import {
  addComponent,
  getAllComponents,
} from "../../../context/actions/component/api";
import Toast from "../../../components/controllers/Toast";
import { styled, useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useQuery } from "react-query";
import { useForm } from "../../../components/useForm";
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
    backgroundColor: "rgb(255, 255, 255)",
    // zIndex: 1202,
  },
}));
const BottomDrawer = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: "0px",
  right: "0px",
  padding: "1rem 1.5rem 1.5rem",
  backgroundColor: "rgb(255, 255, 255)",
  zIndex: 2,
}));
export default function TestSteps(props) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    control,
    fields,
    remove,
    append,
    param,
    preloadedData,
  } = props;
  console.log("param", param);
  const {
    componentState: { component },
    setOpenToast,
    componentDispatch,
  } = useGlobalContext();
  const history = useHistory();

  const [form, setForm] = useState({});
  const [inputStepFields, setInputStepFields] = useState([
    { stepDescription: "", expectedResult: "" },
    { stepDescription: "", expectedResult: "" },
  ]);

  const [fieldErrors, setFieldErrors] = useState({});
  const {
    data: components,
    error: componentError,
    isLoading: isComponentLoading,
    isError: isComponentsError,
  } = useQuery(["component", param[0], 30], getAllComponents, {
    onError: (error) => {
      setOpenToast(true);
      componentDispatch({
        type: COMPONENT_LIST_ERROR,
        payload: error.message,
      });
    },
    enabled: !!preloadedData,
  });

  console.log("components", components);

  const handleAddStep = () => {
    append({
      stepDescription: "",
      expectedResult: "",
    });
  };
  const handleRemoveStep = (id) => {
    const values = [...inputStepFields];
    values.splice(id, 1);
    setInputStepFields(values);
  };

  const queryClient = useQueryClient();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        {/* <form
          className={classes.root}
          autoComplete="off"
          style={{ height: "100%" }}
        > */}
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="stretch"
          style={{ height: 200, width: "100%" }}
        >
          {/* <Grid item xs={12}>
              <Paper className={classes.paper}>xs=12</Paper>
            </Grid> */}

          <Grid item xs={9}>
            <Grid>
              {/* <YourCard /> */}
              <TestDetails
                control={control}
                handleAddStep={handleAddStep}
                fields={fields}
                remove={remove}
                preloadedData={preloadedData}
              />
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CustomeAttributes
                  control={control}
                  components={components}
                  preloadedData={preloadedData}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

const CustomeAttributes = (props) => {
  const { control, handleAddStep, remove, fields, components, preloadedData } =
    props;

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
        <Grid item>
          <Controller
            name="Priority"
            defaultValue={preloadedData?.priority || "High"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Priority
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Type"
                    onChange={onChange}
                  >
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="Type"
            defaultValue={preloadedData?.type || ""}
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Type"
                    onChange={onChange}
                  >
                    <MenuItem value="accessiblity">Accessiblity</MenuItem>
                    <MenuItem value="smoke">Smoke</MenuItem>
                    <MenuItem value="performance">Performance</MenuItem>
                    <MenuItem value="functional">Functional</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          />
        </Grid>
        <Grid item style={{ width: "100%" }}>
          <Controller
            name="componentId"
            defaultValue={preloadedData?.component_id || ""}
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Select Component
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Select Component"
                    onChange={onChange}
                  >
                    {components?.map((item, index) => (
                      <MenuItem
                        key={item.component_id}
                        value={item.component_id}
                      >
                        {item.component_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

const TestDetails = (props) => {
  const { control, handleAddStep, remove, fields, preloadedData } = props;
  console.log("preloadedData", preloadedData);
  let title = preloadedData?.title;
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
      <CardContent sx={{ marginTop: "2px" }}>
        <Grid item style={{ minWidth: "250px" }}>
          <Controller
            defaultValue={title || ""}
            name="title"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="title"
                label="Enter title"
                placeholder="Testcase title"
                multiline
                size="small"
                variant="outlined"
                // inputProps={{ className: classes.textarea }}
                onChange={onChange}
                value={value}
                style={{ width: "450px" }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                id="description"
                defaultValue={preloadedData?.description || ""}
                size="small"
                style={{ width: "450px" }}
                label="Enter description"
                placeholder="Testcase Description"
                multiline
                variant="outlined"
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item container alignItems="center">
          <Grid item>
            <Typography variant="subtitle1">Test steps</Typography>
          </Grid>
          <Grid item sx={{ marginLeft: 35 }}>
            <Tooltip title="Add steps" arrow>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddStep}
                sx={{ m: 1 }}
              >
                Add
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
        {fields.map((item, index) => (
          <>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              className={classes.inputGroup}
              key={item.id}
            >
              <Grid item xs={2}>
                <Typography variant="subtitle2">
                  {`Step${index + 1}`}
                </Typography>
              </Grid>
              <Grid item style={{ minWidth: "250px" }} xs={4}>
                <Controller
                  name={`Steps[${index}].stepDescription`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Step description"
                      multiline
                      size="small"
                      variant="outlined"
                      // inputProps={{ className: classes.textarea }}
                      onChange={onChange}
                      // defaultValue={item.stepDescription}
                      //   style={{ width: "350px" }}
                      value={value}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name={`Steps[${index}].expectedResult`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="small"
                      //   style={{ width: "150px" }}
                      label="Expected result"
                      multiline
                      variant="outlined"
                      onChange={onChange}
                      // defaultValue={item.expectedResult}
                      value={value}
                      // inputProps={{ className: classes.textarea }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={1}>
                <Tooltip title="Add steps" arrow>
                  <AddIcon onClick={handleAddStep} />
                </Tooltip>
              </Grid>
              <Grid item xs={1}>
                {index !== 0 && (
                  <Tooltip title="Remove steps" arrow>
                    <DeleteIcon onClick={() => remove(index)} />
                  </Tooltip>
                )}
              </Grid>
            </Grid>
          </>
        ))}
      </CardContent>
    </Card>
  );
};
