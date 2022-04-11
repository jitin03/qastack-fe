import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../../../context/provider/context";

export const AddUser = () => {
  const { message, openToast, setOpenToast, toastMessage, handleCloseToast } =
    useGlobalContext();
  return (
    <>
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
              container
              xs={6}
              justifyContent="flex-start"
              style={{ paddingLeft: "10px" }}
            >
              <Typography variant="h6">Add User</Typography>
            </Grid>
            <Grid
              item
              container
              justifyContent="flex-end"
              xs={3}
              style={{ margin: "2px 0" }}
            ></Grid>
            <Grid
              item
              container
              xs={3}
              justifyContent="flex-end"
              style={{ paddingRight: "10px" }}
            >
              <Tooltip title="Add user" arrow>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddIcon />}
                  // onClick={() => setState(!state)}
                >
                  Add User
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            justifyItems="center"
            xs={12}
          ></Grid>
          <Grid item>
            {message && (
              <>
                <Toast
                  openToast={openToast}
                  message={JSON.stringify(toastMessage)}
                  handleCloseToast={handleCloseToast}
                ></Toast>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
