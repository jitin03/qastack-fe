import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "../../context/provider/context";
import Controls from "../controllers/Controls";
import EditIcon from "@mui/icons-material/Edit";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { modules } from "../../data/modules";
import { useMutation, useQueryClient } from "react-query";
import { deleteProject } from "../../context/actions/project/api";
export default function ReleaseList(props) {
  const { releases, projectId } = props;
  const {
    module,
    setModuleName,
    values,
    setValues,
    setModule,
    handleRightDrawer,
    handleEditProject,
    setState,
    state,
  } = useGlobalContext();
  const [checked, setChecked] = useState([]);
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(deleteProject);
  const handleEditModule = (moduleName) => {
    const specificModule = module.find(
      (item) => item.moduleName === moduleName
    );
    setValues({
      ...values,

      moduleName: specificModule.moduleName,
      isEditing: true,
    });

    setModule(
      module.map((item) => {
        if (item.moduleName === moduleName) {
          return { ...item, isEditing: true };
        } else {
          return item;
        }
      })
    );

    setState(!state);
  };
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);

    let newCheckModule = {
      moduleName: value,
    };
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
        {" "}
        <Grid
          item
          md={3}
          style={{
            textAlign: "left",

            height: "100%",
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
                      onClick={() =>
                        handleRightDrawer("Add Release", projectId)
                      }
                      sx={{ p: 7 }}
                    >
                      Add Release
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Link>
          </Card>
        </Grid>
        {releases.map((item, index) => (
          <Grid
            key={item.Id}
            item
            md={3}
            style={{
              textAlign: "left",

              height: "100%",
              fontWeight: "1rem",
            }}
          >
            <Card style={{ minWidth: 275, minHeight: 180 }}>
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
                      {item.ReleaseName}
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        Opacity: "0.5",
                      }}
                    >
                      Created on data:
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
                      <Typography>Release Id</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{item.Id}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "flex-end",

                  height: "100%",
                }}
              >
                <Tooltip title="Edit project" arrow disableInteractive>
                  <IconButton
                    edge="start"
                    aria-label="edit"
                    onClick={() => handleEditProject(item.Id, item.Name)}
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
                        await mutateAsync(item.Id);
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
      </Grid>
    </>
  );
}
