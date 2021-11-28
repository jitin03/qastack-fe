import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CircularProgress from "@mui/material/CircularProgress";
import { useGlobalContext } from "../../context/provider/context";
import Controls from "../controllers/Controls";
import EditIcon from "@mui/icons-material/Edit";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import useTable from "../Shared/useTable";
import { modules } from "../../data/modules";
import { useMutation, useQueryClient } from "react-query";
import {
  deleteProject,
  updateProject,
} from "../../context/actions/project/api";
import projectInitialState from "../../context/initialStates/projectInitialState";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export default function ProjectList(props) {
  const { projects } = props;
  // console.log(projects.length);
  const {
    module,
    projectState,
    values,
    setValues,
    setModule,
    projectDispatch,
    setState,
    state,
    handleRightDrawer,
  } = useGlobalContext();
  const history = useHistory();
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
  const { mutateAsync, isLoading } = useMutation(deleteProject);

  console.log("Before edit state");
  console.log(projectState);
  const handleEditProject = (id, name) => {
    console.log(id);
    console.log(name);

    projectDispatch({
      type: "EDIT_PROJECT",
      payload: name,
    });

    console.log("after edit state");
    console.log(projectState);

    // console.log(specificProject);

    // history.push(`/project/edit/${id}`);
    handleRightDrawer("Edit Project", id);
  };
  return (
    <>
      <Grid container justifyItems="center" alignItems="center"></Grid>

      <Grid
        container
        justifyItems="center"
        alignItems="center"
        style={{ flex: "1" }}
      >
        {projects.map((item) => (
          <Grid
            key={item.ID}
            item
            md={2}
            style={{
              textAlign: "left",

              height: "100%",
              fontWeight: "1rem",
            }}
          >
            <Card sx={{ maxWidth: 200 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontWeight: "100", fontSize: "1.2rem" }}
                >
                  {item.Name}
                </Typography>
              </CardContent>
              <CardActions
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "flex-end",

                  height: "100%",
                }}
              >
                <Tooltip title="Bookmark project" arrow disableInteractive>
                  <IconButton aria-label="add to favorites">
                    <BookmarkBorderIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit project" arrow disableInteractive>
                  <IconButton
                    edge="start"
                    aria-label="edit"
                    onClick={() => handleEditProject(item.ID, item.Name)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Tooltip title="Delete project" arrow disableInteractive>
                    <IconButton
                      edge="start"
                      aria-label="delete"
                      onClick={async () => {
                        await mutateAsync(item.ID);
                        queryClient.invalidateQueries("project");
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}

        {/* <Card sx={{ maxWidth: 200 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card> */}

        {/* <TblContainer>
            <TblHead />
            <TableBody>
              {projects.map((item) => (
                <TableRow key={item.ID}>
                  <TableCell>{item.Name}</TableCell>
                  <TableCell>Jitin</TableCell>

                  <TableCell>
                    <IconButton
                      edge="start"
                      aria-label="edit"
                      onClick={() => handleEditProject(item.ID, item.Name)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {isLoading ? (
                      <CircularProgress />
                    ) : (
                      <IconButton
                        edge="start"
                        aria-label="delete"
                        onClick={async () => {
                          await mutateAsync(item.ID);
                          queryClient.invalidateQueries("project");
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer> */}
      </Grid>
    </>
  );
}
