import {
  Box,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Toast from "../../../components/controllers/Toast";
import {
  getAllRolePermissions,
  getAllRoles,
} from "../../../context/actions/user-mgmt/api";
import { useGlobalContext } from "../../../context/provider/context";

export default function RoleList() {
  const [selectedRole, setSelectedRole] = useState("");
  const {
    setOpenToast,
    openToast,
    toastMessage,
    handleCloseToast,
    settoastMessage,
    message,
    setMessage,
  } = useGlobalContext();

  const {
    data: roles,
    error,
    isLoading,
    isError,
  } = useQuery(["roles"], getAllRoles);

  if (isLoading) {
    return (
      <>
        <Grid container>
          <Grid
            item
            container
            justifyContent="center"
            style={{ padding: "50px 10px" }}
          >
            <Container sx={{ display: "flex" }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            </Container>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </>
    );
  }
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
              xs={12}
              container
              justifyContent="flex-start"
              style={{ paddingLeft: "10px" }}
            >
              <Typography variant="h6">Roles</Typography>
            </Grid>
          </Grid>

          <Grid
            item
            container
            justifyContent="center"
            justifyItems="center"
            xs={3}
          >
            <Grid item container style={{ padding: "10px" }}>
              <Roles roles={roles} />
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            justifyItems="center"
            xs={9}
          >
            <Grid item container style={{ padding: "10px" }}>
              <Resources setSelectedRole={setSelectedRole} />
            </Grid>
          </Grid>
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
}

const Roles = (props) => {
  const { roles, setSelectedRole } = props;
  const classes = {};

  return (
    <Grid item xs={12}>
      <List component={Paper}>
        {roles.map((item, index) => (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={item.roles} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

const Resources = (props) => {
  const { setSelectedRole } = props;
  const classes = {};

  const {
    data: permissions,
    error,
    isLoading,
    isError,
  } = useQuery(["role-permission", "manager"], getAllRolePermissions);
  console.log("permissions", permissions);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  if (isLoading) {
    return (
      <>
        <Grid container>
          <Grid
            item
            container
            justifyContent="center"
            style={{ padding: "50px 10px" }}
          >
            <Container sx={{ display: "flex" }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            </Container>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </>
    );
  }
  const onSubmit = async (data, e) => {};
  return (
    <Grid item xs={12}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Resources</TableCell>
                <TableCell align="right">View</TableCell>
                <TableCell align="right">Add &nbsp;&&nbsp;Edit</TableCell>

                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Project
                </TableCell>
                <TableCell align="right">
                  {/* <FormCheckBox
                    key={boat.id}
                    name={`boat_ids[${boat.id}]`}
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                    value={index}
                  /> */}
                  <Controller
                    name="ProjectView"
                    control={control}
                    defaultValue={
                      permissions.includes("GetAllProjects") || value
                    }
                    render={({ field: { onChange, value, onBlur } }) => (
                      <FormControlLabel
                        onChange={onChange}
                        control={
                          <Checkbox
                            color="primary"
                            defaultChecked={permissions.includes(
                              "GetAllProjects"
                            )}
                            checked={value}
                            value={
                              permissions.includes("GetAllProjects") || value
                            }
                            onChange={(e) => onChange(e.target.checked)}
                          />
                        }
                        label=""
                      />
                    )}
                  />
                </TableCell>
                <TableCell align="right">
                  <Controller
                    name="ProjectEdit"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={
                              permissions.includes("UpdateProject") || value
                            }
                            onChange={onChange}
                          />
                        }
                        label=""
                      />
                    )}
                  />
                </TableCell>
                <TableCell align="right">
                  <Controller
                    name="ProjectDelete"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={
                              permissions.includes("DeleteProject") || value
                            }
                            onChange={onChange}
                          />
                        }
                        label=""
                      />
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Test Case
                </TableCell>
                <TableCell align="right">
                  <Controller
                    name="TestCaseView"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={value}
                            onChange={onChange}
                          />
                        }
                        label=""
                      />
                    )}
                  />
                </TableCell>
                <TableCell align="right">
                  <Controller
                    name="TestCaseEdit"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={value}
                            onChange={onChange}
                          />
                        }
                        label=""
                      />
                    )}
                  />
                </TableCell>
                <TableCell align="right">
                  <Controller
                    name="TestCaseDelete"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={value}
                            onChange={onChange}
                          />
                        }
                        label=""
                      />
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Test Run
                </TableCell>
                <TableCell align="right">
                  <Controller
                    name="TestRunView"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={value}
                            onChange={onChange}
                          />
                        }
                        label=""
                      />
                    )}
                  />
                </TableCell>
                <TableCell align="right">
                  <Controller
                    name="TestRunEdit"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={value}
                            onChange={onChange}
                          />
                        }
                        label=""
                      />
                    )}
                  />
                </TableCell>
                <TableCell align="right">
                  <Controller
                    name="TestRunDelete"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={value}
                            onChange={onChange}
                          />
                        }
                        label=""
                      />
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Dashboard
                </TableCell>
                <TableCell align="right">
                  <Controller
                    name="DashboardView"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={value}
                            onChange={onChange}
                          />
                        }
                        label=""
                      />
                    )}
                  />
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Reports
                </TableCell>
                <TableCell align="right">
                  <Controller
                    name="ReportView"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={value}
                            onChange={onChange}
                          />
                        }
                        label=""
                      />
                    )}
                  />
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </Grid>
  );
};
export const FormCheckBox = ({ name, value, register, control }) => {
  return (
    <FormControlLabel
      value={value}
      control={
        <Controller
          as={<Checkbox />}
          name={name}
          type="checkbox"
          value={value}
          register={register}
          control={control}
        />
      }
      label={`Boat ${value}`}
    />
  );
};
