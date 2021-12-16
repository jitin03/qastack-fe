import { lazy } from "react";

import LoginContainer from "../components/Login";
import Project from "../components/Projects/Project";
import ProjectOverview from "../components/Projects/ProjectOverview";
import RegisterContainer from "../components/Register";
import CreateComponent from "../layouts/Component/Create";
import EditComponent from "../layouts/Component/Edit";
import ComponentList from "../layouts/Component/List";
import CreateTestCase from "../layouts/TestCase/Create";
import TestCaseList from "../layouts/TestCase/List";

const routes = [
  {
    path: "/auth/register",
    component: RegisterContainer,
    title: "Register",
    needsAuth: false,
  },

  {
    path: "/auth/login",
    component: LoginContainer,
    title: "Login",
    needsAuth: false,
  },
  {
    path: "/project/edit/:id",
    component: Project,
    title: "Edit Project",
    needsAuth: true,
  },
  {
    path: "/project/:name/component/edit/:id",
    component: ComponentList,
    title: "Edit Component",
    needsAuth: true,
  },
  {
    path: "/project/create",
    component: Project,
    title: "Create Project",
    needsAuth: true,
  },

  {
    path: "/projects",
    component: Project,
    title: "All Projects",
    needsAuth: true,
  },
  {
    path: "/project/:name",
    component: ProjectOverview,
    title: "Project Overview",
    needsAuth: true,
  },
  {
    path: "/project/:name/components",
    component: ComponentList,
    title: "All Components",
    needsAuth: true,
  },
  {
    path: "/project/:name/component/create",
    component: ComponentList,
    title: "Create Component",
    needsAuth: true,
  },

  {
    path: "/project/:name/component/:componentName/testcases",
    component: TestCaseList,
    title: "TestCases",
    needsAuth: true,
  },
  {
    path: "/project/:name/component/:componentName/testcase/create",
    component: TestCaseList,
    title: "Create TestCase",
    needsAuth: true,
  },
];

export default routes;
