import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CircularProgress from "@mui/material/CircularProgress";
import { useGlobalContext } from "../../context/provider/context";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useTable from "../Shared/useTable";
import { useMutation, useQueryClient } from "react-query";
import { deleteProject } from "../../context/actions/project/api";
import projectInitialState from "../../context/initialStates/projectInitialState";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import ProjectOverview from "./ProjectOverview";
import { Link } from "@material-ui/core";
import Toast from "../controllers/Toast";
import DeleteProject from "./DeleteProject";
const dayjs = require("dayjs");
const useStyles = makeStyles((theme) => ({
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
}));
export default function ProjectList(props) {
  const { projects } = props;
  const classes = useStyles();
  const {
    module,
    projectState,
    values,
    setValues,
    setModule,
    projectDispatch,
    openToast,
    handleCloseToast,
    handleRightDrawer,
    message,
    setMessage,
    toastMessage,
    projectSuccessMessage,
    setProjectSuccessMessage,
    settoastMessage,
  } = useGlobalContext();
  let navigate = useNavigate();
  const headCells = [
    { id: "projectName", label: "Project Name" },
    { id: "createdBy", label: "Created By" },
    { id: "edit", label: "Edit" },
    { id: "delete", label: "Delete" },
  ];
  const [isEditing, setIsEditing] = useState(false);
  const [projestStateTest, setProjectStateTest] = useState(projectInitialState);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(projects, headCells);
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading, isError, error } = useMutation(deleteProject);

  const handleEditProject = (id, name) => {
    projectDispatch({
      type: "EDIT_PROJECT",
      payload: name,
    });

    handleRightDrawer("Edit Project", id);
  };
  return (
    <>
      <Grid
        container
        justifyItems="center"
        justify="space-around"
        spacing={4}
        alignItems="center"
        style={{ flex: "1" }}
      >
        <Grid
          item
          md={3}
          style={{
            textAlign: "left",

            fontWeight: "1rem",
          }}
        >
          <Card style={{ minWidth: 275, minHeight: 180 }}>
            <Link underline="none">
              <CardContent style={{ padding: "20px" }}>
                <Grid
                  container
                  style={{
                    fontWeight: "100",
                    fontSize: "1.2rem",
                  }}
                >
                  <Grid item>
                    <Button
                      variant="text"
                      startIcon={<AddIcon />}
                      onClick={() => handleRightDrawer("Add Project")}
                      sx={{ p: 7 }}
                    >
                      Add Project
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Link>
          </Card>
        </Grid>
        {projects.map((item, index) => (
          <Grid
            key={item.Id}
            item
            md={3}
            style={{
              textAlign: "left",

              fontWeight: "1rem",
            }}
          >
            <Card style={{ minWidth: 275, minHeight: 180 }}>
              <Link underline="none" href={`/project/${item.Id}`}>
                <CardContent style={{ padding: "20px" }}>
                  <Grid
                    container
                    style={{
                      fontWeight: "100",
                      fontSize: "1.2rem",
                    }}
                  >
                    <Grid item>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.Name}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "12px",
                          Opacity: "0.5",
                        }}
                      >
                        Created on date:
                        {dayjs(item?.CreatedAt).format("MM/DD/YYYY")}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="space-between"
                      style={{
                        borderBottom: "2px solid #f3f6f5",
                      }}
                    >
                      <Grid item>
                        <Typography>Project Key</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{item.Id}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Link>
              <CardActions
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Tooltip title="Bookmark project" arrow>
                  <IconButton aria-label="add to favorites">
                    <BookmarkBorderIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit project" arrow>
                  <IconButton
                    edge="start"
                    aria-label="edit"
                    onClick={() => handleEditProject(item.Id, item.Name)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <DeleteProject item={item} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
