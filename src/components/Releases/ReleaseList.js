import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
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
export default function ModuleList() {
  const {
    module,
    setModuleName,
    values,
    setValues,
    setModule,
    handleDeleteModule,
    setState,
    state,
  } = useGlobalContext();
  const [checked, setChecked] = useState([]);

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
      <Grid container spacing={2} justifyItems="center" alignItems="center">
        <Grid item style={{ textAlign: "right", flex: "1" }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setState(!state)}
          >
            Add Module
          </Button>
        </Grid>

        <Grid item container>
          <Card sx={{ minWidth: 275, minHeight: 275 }}>
            <CardContent>
              <Grid container direction="column" justifyItems="flex-start">
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyItems="flex-end"
                  spacing={4}
                >
                  <Grid item>
                    <Typography>All Modules:</Typography>
                  </Grid>
                  <Grid item />
                  <Grid item alignItems="flex-end" justify="flex-end">
                    <IconButton
                      edge="start"
                      aria-label="delete"
                      onClick={() => handleDeleteModule(checked, module)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>

                <Grid item marginTop="5px">
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {module.map((item, index) => {
                      // const labelId = `checkbox-list-label-${value}`;
                      const { id, moduleName } = item;

                      return (
                        <ListItem
                          key={id}
                          secondaryAction={
                            <IconButton edge="end" aria-label="edit">
                              <EditIcon
                                onClick={() => handleEditModule(moduleName)}
                              />
                            </IconButton>
                          }
                          disablePadding
                        >
                          <ListItemButton
                            role={undefined}
                            onClick={handleToggle(moduleName)}
                            dense
                          >
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={checked.indexOf(moduleName) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ "aria-labelledby": id }}
                              />
                            </ListItemIcon>
                            <ListItemText id={id} primary={moduleName} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={8}></Grid>
      </Grid>
    </>
  );
}
