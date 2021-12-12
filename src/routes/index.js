import { lazy } from "react";

import LoginContainer from "../components/Login";
import Project from "../components/Projects/Project";
import RegisterContainer from "../components/Register";
import CreateComponent from "../layouts/Component/Create";
import EditComponent from "../layouts/Component/Edit";
import ComponentList from "../layouts/Component/List";
import CreateTestCase from "../layouts/TestCase/Create";
import TestCaseList from "../layouts/TestCase/List";

{
  /* <Route exact path="/" exact component={Requirement} />
            <Route exact path="/modules" component={Modules} />
            <Route exact path="/projects" component={Project} />
            <Route exact path="/project/create" component={Project} />
            <Route exact path="/releases" component={Release} />
            <Route exact path="/release/create" component={Release} />
            <Route exact path="/module/create" component={Modules} />
            <Route exact path="/project/edit/:id" component={Project} />
            <Route path="*"></Route> */
}
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
    path: "/component/edit/:id",
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
    path: "/components",
    component: ComponentList,
    title: "All Components",
    needsAuth: true,
  },
  {
    path: "/component/create",
    component: ComponentList,
    title: "Create Component",
    needsAuth: true,
  },

  {
    path: "/testcases",
    component: TestCaseList,
    title: "TestCases",
    needsAuth: true,
  },
  {
    path: "/testcase/create",
    component: TestCaseList,
    title: "Create TestCase",
    needsAuth: true,
  },
];

export default routes;
