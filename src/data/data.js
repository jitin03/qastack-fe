import React from "react";

import AssignmentIcon from "@mui/icons-material/Assignment";
import { Submenus } from "../components/Submenus";
export const menus = [
  {
    id: 1,
    url: "/projects/",
    text: "Projects",
    icon: <AssignmentIcon />,
  },
];

export const submenus = [
  {
    id: 1,
    url: "/project/:projectKey/*",
    sidebar: <Submenus />,
  },
  {
    id: 2,
    url: "/project/:projectKey/components/testcases",
    sidebar: <Submenus />,
  },
  {
    id: 2,
    url: "/project/:projectKey/components/testcases",
    sidebar: <Submenus />,
  },
];
