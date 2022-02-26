import React from "react";

export const AddUser = () => {
  return (
    <>
      <Box sx={{ border: "1px solid rgb(232, 232, 232)" }}>
        <Grid container justifyItems="center" alignItems="center">
          <Grid
            item
            container
            justifyContent="flex-end"
            alignItems="center"
            style={{
              backgroundColor: "rgb(248, 248, 248)",
            }}
          >
            <Grid item>
              <Tooltip title="Add new user" arrow>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleRightDrawer("Add Project")}
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
            style={{ padding: "50px 10px" }}
          ></Grid>
        </Grid>
      </Box>
    </>
  );
};
