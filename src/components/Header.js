import React, { useEffect } from "react";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { makeStyles } from "@mui/styles";
import InboxIcon from "@mui/icons-material/Inbox";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Menu from "@mui/icons-material/Menu";
import Controls from "./controllers/Controls";
import { useGlobalContext } from "../context/provider/context";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useProjectContext } from "../context/provider/projectContext";
import DraftsIcon from "@mui/icons-material/Drafts";
import isAuthenticated from "../context/actions/auth/isAuthenticated";
import { getAllProjects } from "../context/actions/project/api";

import { getUserDetail, logout } from "../context/actions/auth/api";
import { getUserDetailFromToken } from "../helper/token";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Box } from "@mui/system";
const drawerWidth = 240;
const useStyles = makeStyles({
  headerRight: {
    flex: "1",
  },
  input: {
    padding: "10px 14px",
  },
  paragraph: {
    lineHeight: "2.5",
    textAlign: "center",
  },
  nospace: {
    flex: "1",
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header(props) {
  const { open, handleDrawerOpen } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popover" : undefined;
  const {
    projectState,
    projectList,
    setProjectList,
    authState: { loggedIn },
    authDispatch,
  } = useGlobalContext();
  const { starProject, setStarProject } = useProjectContext();
  const classes = useStyles();

  const cars = ["tset", "asdad"];
  let getProjectList = [];
  const { data: user, isSuccess: userDetails } = useQuery(
    isAuthenticated() && [
      "users",
      getUserDetailFromToken(localStorage.getItem("token")).username,
    ],
    getUserDetail
  );

  let userId = user?.data.users_id;
  const {
    data: projects,
    error,
    isLoading,
    isError,
  } = useQuery(["project", userId], () => getAllProjects(userId), {
    enabled: !!user,
  });

  let navigate = useNavigate();
  const handleUserLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("roles");
    navigate("/login");
  };
  useEffect(() => {
    if (projects) {
      const temp = projects.map((item) => {
        return item.Name;
      });
      setProjectList(temp);
    }
    localStorage.setItem("starProject", starProject);
  }, [projects, starProject]);

  return (
    <AppBar position="fixed" open={open} style={{ background: "#795cec" }}>
      <Toolbar>
        <Grid
          container
          className={classes.root}
          align="center"
          justify="center"
          alignItems="center"
        >
          <Grid
            item
            container
            md={4}
            align="center"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Link underline="none" href={`/`}>
                <Typography
                  variant="h5"
                  style={{ marginLeft: "20px", color: "#fefe" }}
                >
                  QAStack
                </Typography>
              </Link>
            </Grid>
          </Grid>

          <Grid item className={classes.nospace} md={4}></Grid>
          <Grid
            item
            container
            md={4}
            columnSpacing={3}
            justifyContent="flex-end"
            alignContent="center"
            alignItems="center"
          >
            {isAuthenticated() && (
              <>
                <Button
                  variant="text"
                  size="small"
                  style={{
                    backgroundColor: "rgb(121, 92, 236)",
                    color: "#fefe",
                  }}
                  startIcon={
                    <Avatar
                      size="small"
                      sx={{ width: 24, height: 24 }}
                      src="/broken-image.jpg"
                    />
                  }
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleClick}
                >
                  {
                    getUserDetailFromToken(localStorage.getItem("token"))
                      .username
                  }
                </Button>

                <Popover
                  id={id}
                  open={openPop}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                    }}
                  >
                    <List dense="true">
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Avatar
                              size="small"
                              sx={{ width: 24, height: 24 }}
                              src="/broken-image.jpg"
                            />
                          </ListItemIcon>
                          <ListItemText primary="Profile" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <LockOpenIcon />
                          </ListItemIcon>
                          <ListItemText primary="Change Password" />
                        </ListItemButton>
                      </ListItem>
                    </List>

                    <Divider />

                    <List dense="true">
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleUserLogout}>
                          <ListItemIcon>
                            <LogoutIcon />
                          </ListItemIcon>
                          <ListItemText primary="Logout" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Box>
                </Popover>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
