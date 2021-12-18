import React from "react";

import AssignmentIcon from "@mui/icons-material/Assignment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { ListItem, Tooltip } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useHistory, useParams, Link } from "react-router-dom";
import { Submenus } from "../components/Submenus";
export const menus = [
  {
    id: 1,
    url: "/projects",
    text: "Projects",
    icon: <AssignmentIcon />,
  },
];

export const submenus = [
  {
    id: 1,
    url: "/project/:projectKey",
    sidebar: () => <Submenus />,
  },
  {
    id: 2,
    url: "/project/:projectKey/components/testcases",
    sidebar: () => <Submenus />,
  },
  // {
  //   id: 2,
  //   url: "/project/:projectKey/releases",
  //   text: "Releases",
  //   icon: <ListAltIcon />,
  // },
  // {
  //   id: 3,
  //   url: "/project/:projectKey/components",
  //   text: "Components",
  //   icon: <ListAltIcon />,
  // },
  // {
  //   id: 4,
  //   url: "/project/:name/component/:name/testcases",
  //   text: "Testcases",
  //   icon: <ListAltIcon />,
  // },
];
