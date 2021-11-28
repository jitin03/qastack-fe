import React from "react";

import AssignmentIcon from "@mui/icons-material/Assignment";
import ListAltIcon from "@mui/icons-material/ListAlt";
export const menus = [
  {
    id: 1,
    url: "/projects",
    text: "Project",
    icon: <AssignmentIcon />,
  },
  {
    id: 2,
    url: "/",
    text: "Requirement",
    icon: <AssignmentIcon />,
  },
  {
    id: 3,
    url: "/releases",
    text: "Releases",
    icon: <ListAltIcon />,
  },
  {
    id: 4,
    url: "/components",
    text: "Components",
    icon: <ListAltIcon />,
  },
  {
    id: 5,
    url: "/testcases",
    text: "Testcases",
    icon: <ListAltIcon />,
  },
];
