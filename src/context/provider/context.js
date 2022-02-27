import React, { useState, useContext, useReducer } from "react";
import releaseInitialState from "../initialStates/releaseInitialState";
import release from "../reducers/release";
import project from "../reducers/project";
import { useNavigate } from "react-router-dom";
import projectInitialState from "../initialStates/projectInitialState";
import componentInitialState from "../initialStates/componentInitialState";
import component from "../reducers/component";
import authInitialState from "../initialStates/authInitialState";
import auth from "../reducers/auth";
import RightDrawer from "../../components/RightDrawer";
const AppContext = React.createContext();

const anchor = "right";
const AppProvider = ({ children }) => {
  const initialModuleValues = {
    id: 0,
    moduleName: "",
    subModules: { subModuleName: "", id: 0 },
    moduleType: "1",
    isEditing: false,
  };

  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [authState, authDispatch] = useReducer(auth, authInitialState);
  const [configTitle, setConfigTitle] = useState("");
  const [drawerParam, setDrawerParam] = useState("");
  const [testResult, setTestResult] = useState({
    projectId: "",
    testRunId: "",
  });

  const [registerPasswordIsMasked, setRegisterPasswordIsMasked] =
    useState(true);
  const [confirmPasswordIsMasked, setConfirmPasswordIsMasked] = useState(true);
  const [openToast, setOpenToast] = useState(false);
  const [editId, setEditId] = useState(0);
  const [projectList, setProjectList] = useState([]);
  const [values, setValues] = useState(initialModuleValues);
  const [projectName, setProjectName] = useState(projectInitialState);
  const [module, setModule] = useState([]);
  const [releases, setReleases] = useState([]);
  const [projects, setProjects] = useState([]);
  const [subModule, setSubModule] = useState([]);
  const [state, setState] = useState(false);
  const [openRightDrawer, setOpenRightDrawer] = useState(false);
  const [isAddModuleModalOpen, setAddModuleOpen] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [moduleType, setModuleType] = useState("Module");

  const [message, setMessage] = useState(false);
  const [successAtProject, setSuccessAtProject] = useState(false);
  const [toastMessage, settoastMessage] = useState("");
  const [projectSuccessMessage, setProjectSuccessMessage] = useState("");
  // Reducer for Release component
  const [releaseState, releaseDispatch] = useReducer(
    release,
    releaseInitialState
  );

  const [componentState, componentDispatch] = useReducer(
    component,
    componentInitialState
  );

  const [testCaseState, testCaseDispatch] = useReducer(
    component,
    componentInitialState
  );
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [projectState, projectDispatch] = useReducer(
    project,
    projectInitialState
  );

  const addModule = () => {
    setAddModuleOpen(true);
  };

  const handleCloseToast = () => {
    console.log(openToast);
    setOpenToast(!openToast);
  };

  const handleCloseModal = () => {
    setAddModuleOpen(false);
  };

  const handleRightDrawer = (configTitle, param) => {
    if (configTitle === "Add Release") {
      navigate(`${window.location.pathname}/create`);
    } else if (configTitle === "Edit Release") {
      navigate(`${window.location.pathname}/edit/${param[1]}`);
    } else if (configTitle === "Add Project") {
      navigate("/project/create");
    } else if (configTitle === "Edit Project") {
      navigate(`/project/edit/${param}`);
    } else if (configTitle === "Edit Component") {
      navigate(`${window.location.pathname}/edit/${param[1]}`);
    } else if (configTitle === "Add TestCase") {
      navigate(`${window.location.pathname}/create`);
    } else if (configTitle === "Edit TestCase") {
      navigate(`${window.location.pathname}/edit/${param[1]}`);
    } else if (configTitle === "Edit TestRun") {
      navigate(`${window.location.pathname}/edit/${param[1]}`);
    } else if (configTitle === "View Logs") {
      navigate(`${window.location.pathname}/workflow/logs/${param[1]}`);
    } else if (configTitle === "Add Step") {
      navigate(`${window.location.pathname}/step`);
    } else if (configTitle === "Test Run Summary") {
      navigate(
        `${window.location.pathname}/testSummary/${param?.testcase_run_id}`
      );
    }
    setConfigTitle(configTitle);
    setState(!state);
    setDrawerParam(param);
  };

  const handleReleaseFormInput = (e) => {
    releaseDispatch({
      type: "HANDLE_INPUT_TEXT",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleProjectFormInput = (e) => {
    projectDispatch({
      type: "HANDLE_INPUT_TEXT",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleReleaseFormSubmit = (e) => {
    e.preventDefault();

    if (releaseState.release.name) {
      releaseDispatch({
        type: "ADD_RELEASE",
        payload: releaseState.release,
      });
    }
  };

  const handleProjectFormSubmit = (e) => {
    e.preventDefault();

    if (projectState.project.name) {
      releaseDispatch({
        type: "ADD_PROJECT",
        payload: projectState.project,
      });
    }
  };
  const handleDeleteModule = (checkedModule, module) => {
    const newModules = module.filter((ar) => {
      return !checkedModule.find((rm) => rm === ar.moduleName);
    });
    setModule(newModules);
  };
  const handleCloseRightDrawer = (e, title, params) => {
    console.log(params);
    e.preventDefault();
    setState(!state);
    if (Array.isArray(params) && title !== "Test Run Summary") {
      params = params[0];
    }

    if (title === "Add Project") {
      navigate("/projects");
    } else if (title === "Edit Project") {
      navigate("/projects");
    } else if (title === "Add Release") {
      navigate(`/project/${params}/releases`);
    } else if (title === "Edit Release") {
      navigate(`/project/${params}/releases`);
    } else if (title === "Add Component") {
      navigate(`/project/${params}/components`);
    } else if (title === "Edit Component") {
      navigate(`/project/${params}/components`);
    } else if (title === "Add TestCase") {
      navigate(`/project/${params}/components/testcases`);
    } else if (title === "Edit TestCase") {
      navigate(`/project/${params}/components/testcases`);
    } else if (title === "Add TestRun") {
      navigate(`/project/${params}/testruns`);
    } else if (title === "Edit TestRun") {
      navigate(`/project/${params}/testruns`);
    } else if (title === "View Logs") {
      navigate(`/project/${params}/ciFlow`);
    } else if (title === "Add Job") {
      navigate(`/project/${params}/ciFlow`);
    } else if (title === "Add Step") {
      navigate(`/project/${params}/ciFlow/create`);
    } else if (title === "Test Run Summary") {
      navigate(-1);
    } else if (title === "Close Run Summary") {
      console.log("close called");
      navigate(-1);
      // navigate(`/project/${params[0]}/testrun/${params[1]}`);
    }
  };
  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(!state);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <AppContext.Provider
      value={{
        module,
        editId,
        setEditId,
        addModule,
        moduleName,
        setModule,
        anchor,
        projects,
        authState,
        authDispatch,
        setProjects,
        setModuleName,
        toggleDrawer,
        testResult,
        setTestResult,
        setState,
        subModule,
        setSubModule,
        openRightDrawer,
        handleDeleteModule,
        moduleType,
        confirmPasswordIsMasked,
        setConfirmPasswordIsMasked,
        registerPasswordIsMasked,
        setRegisterPasswordIsMasked,

        handleCloseToast,

        handleMouseDownPassword,
        openToast,
        setOpenToast,
        state,
        values,
        setValues,
        configTitle,
        setConfigTitle,
        isAddModuleModalOpen,
        handleCloseModal,
        handleCloseRightDrawer,
        handleRightDrawer,
        handleReleaseFormInput,
        releaseState,
        componentState,
        componentDispatch,
        toastMessage,
        settoastMessage,
        projectState,
        releases,
        projectList,
        setProjectList,
        setReleases,
        releaseDispatch,
        handleReleaseFormSubmit,
        handleProjectFormInput,
        projectDispatch,
        drawerParam,
        message,
        setMessage,
        projectSuccessMessage,
        setProjectSuccessMessage,
        successAtProject,
        setSuccessAtProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
