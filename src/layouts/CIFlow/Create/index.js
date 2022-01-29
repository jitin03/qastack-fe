import React, { useState, useEffect } from "react";
import WorkFlow from "./WorkFlow";
import { Button, Grid, InputAdornment, Tooltip, Toolbar } from "@mui/material";
import Controls from "../../../components/controllers/Controls";
import { makeStyles } from "@mui/styles";
import { Search } from "@material-ui/icons";
import AddIcon from "@mui/icons-material/Add";
import AddStep from "./AddStep";
import { useMutation, useQuery } from "react-query";
import { addWorkFlow } from "../../../context/actions/workflow/api";
import { useParams, useHistory } from "react-router-dom";
import isAuthenticated from "../../../context/actions/auth/isAuthenticated";
import { getUserDetail } from "../../../context/actions/auth/api";
import { getUserDetailFromToken } from "../../../helper/token";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
}));

// const initialElements = [
//   { id: "1", data: { label: "Node 1" }, position: { x: 300, y: 100 } },
//   { id: "2", data: { label: "Node 2" }, position: { x: 300, y: 200 } },
//   { id: "e1-2", source: "1", target: "2" },
// ];
const initialElements = [];

export default function Create() {
  const classes = useStyles();

  const [elements, setElements] = useState(initialElements);
  const [openDialog, setOpenDialog] = useState(false);
  const [workFlowName, setWorkFlowName] = useState("");
  const [workFlowState, setworkFlowState] = useState([]);

  let { projectKey } = useParams();
  const history = useHistory();

  const { data: user, isSuccess: userDetails } = useQuery(
    isAuthenticated() && [
      "users",
      getUserDetailFromToken(localStorage.getItem("token")).Username,
    ],
    getUserDetail
  );

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

  const { mutateAsync, isLoading, isHasError, err, output, isSuccess } =
    useMutation(addWorkFlow, {
      onError: (error) => {},
      onSuccess: (data) => {
        history.push(`/project/projectKey/components/ciFlow`);
      },
    });

  return (
    <Grid Container>
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        style={{
          backgroundColor: "rgb(248, 248, 248)",
        }}
      >
        <Grid item>
          <Toolbar>
            <Controls.Input
              label="Name"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              value={workFlowName}
              onChange={() => {
                setWorkFlowName();
              }}
            />
          </Toolbar>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <Tooltip title="Add step" arrow disableInteractive>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setOpenDialog(true);
                  }}
                  sx={{ m: 1 }}
                >
                  Add step
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Publish" arrow disableInteractive>
                <Button
                  variant="outlined"
                  // onClick={() => setState(!state)}
                  onClick={async () => {
                    await mutateAsync({
                      project_Id: projectKey,
                      user_Id: user?.data.users_id,
                      name: workFlowName,
                      config: workFlowState,
                    });
                  }}
                  sx={{ m: 1 }}
                >
                  Publish
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          width: "100%",
          height: "85vh",
        }}
      >
        <WorkFlow elements={elements} setElements={setElements} />
      </Grid>

      <AddStep
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        onSubmitAddStep={onSubmitAddStep}
        workFlowState={workFlowState}
      />
    </Grid>
  );
}
