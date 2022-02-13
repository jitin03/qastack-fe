import { lazy } from "react";

import LoginContainer from "../components/Login";
import Project from "../components/Projects/Project";
import ProjectOverview from "../components/Projects/ProjectOverview";
import RegisterContainer from "../components/Register";
import Release from "../components/Releases/Release";
import CIFlow from "../layouts/CIFlow";
import WorkflowList from "../layouts/Workflow/List";
// import OverviewFlow from "../layouts/CIFlow/Create";
import WorkflowInfo from "../layouts/CIFlow/Info";
import CreateComponent from "../layouts/Component/Create";
import EditComponent from "../layouts/Component/Edit";
import ComponentList from "../layouts/Component/List";
import CreateTestCase from "../layouts/TestCase/Create";
import TestCaseList from "../layouts/TestCase/List";
import { TestExecution } from "../layouts/TestRun/Execution";
import TestRunList from "../layouts/TestRun/List";
import CreateWorkflow from "../layouts/Workflow/Create";
import VerifyUserEmail from "../layouts/VerifyUserEmail";
import ForgotPassword from "../layouts/ForgotPassword";
import ResetPassword from "../layouts/ForgotPassword/resetPassword";

const routes = [
  // {
  //   path: "/register",
  //   component: <RegisterContainer />,
  //   title: "Register",
  //   needsAuth: false,
  // },
  // {
  //   path: "/forgot-password",
  //   component: <ForgotPassword />,
  //   title: "Forgot Password",
  //   needsAuth: false,
  // },

  // {
  //   path: "/verify/mail",
  //   component: <VerifyUserEmail />,
  //   title: "VerifyUserEmail",
  //   needsAuth: false,
  // },

  // {
  //   path: "/reset-password",
  //   component: <ResetPassword />,
  //   title: "ResetPassword",
  //   needsAuth: false,
  // },

  // {
  //   path: "/login",
  //   component: <LoginContainer />,
  //   title: "Login",
  //   needsAuth: false,
  // },

  {
    path: "/",
    component: <LoginContainer />,
    title: "Login",
    needsAuth: false,
  },

  {
    path: "/project/edit/:id",
    component: <Project />,
    title: "Edit Project",
    needsAuth: true,
  },
  {
    path: "/project/:name/component/edit/:id",
    component: <ComponentList />,
    title: "Edit Component",
    needsAuth: true,
  },
  {
    path: "/project/create",
    component: <Project />,
    title: "Create Project",
    needsAuth: true,
  },

  {
    path: "/projects",
    component: <Project />,
    title: "All Projects",
    needsAuth: true,
  },
  {
    path: "/project/:projectKey",
    component: <ProjectOverview />,
    title: "Project Overview",
    needsAuth: true,
  },
  {
    path: "/project/:projectKey/components",
    component: <ComponentList />,
    title: "All Components",
    needsAuth: true,
  },
  {
    path: "/project/:projectKey/components/create",
    component: <ComponentList />,
    title: "Create Component",
    needsAuth: true,
  },
  {
    path: "/project/:projectKey/components/edit/:name",
    component: <ComponentList />,
    title: "Create Component",
    needsAuth: true,
  },

  {
    path: "/project/:projectKey/components/testcases",
    component: <TestCaseList />,
    title: "TestCases",
    needsAuth: true,
  },

  {
    path: "/project/:projectKey/releases",
    component: <Release />,
    title: "Release",
    needsAuth: true,
  },
  {
    path: "/project/:projectKey/release/create",
    component: <Release />,
    title: "Release",
    needsAuth: true,
  },
  {
    path: "/project/:projectKey/releases/edit/:id",
    component: <Release />,
    title: "Release",
    needsAuth: true,
  },
  {
    path: "/project/:projectKey/component/:name/testcase/create",
    component: <TestCaseList />,
    title: "Create TestCase",
    needsAuth: true,
  },
  {
    path: "/project/:projectKey/testruns",
    component: <TestRunList />,
    title: "Create TestCase",
    needsAuth: true,
  },
  {
    path: "/project/:projectKey/testrun/:id",
    component: <TestExecution />,
    title: "TestRun Status",
    needsAuth: true,
  },
  {
    path: "/project/:projectKey/testrun/create",
    component: <TestRunList />,
    title: "Create TestCase",
    needsAuth: true,
  },
  {
    path: "/project/:projectKey/ciFlow",
    component: <WorkflowList />,
    title: "CI Flow",
    needsAuth: true,
  },
  {
    path: "/project/:projectKey/ciFlow/workflow/logs/:workflowname",
    component: <WorkflowList />,
    title: "CI Flow",
    needsAuth: true,
  },
  {
    path: "/project/:projectKey/ciFlow/create",
    component: <CreateWorkflow />,
    title: "Create CI Flow",
    needsAuth: true,
  },
  {
    path: "/project/:projectKey/ciFlow/:workflowName",
    component: <WorkflowInfo />,
    title: "CI Flow Logs",
    needsAuth: true,
  },
];

export default routes;
