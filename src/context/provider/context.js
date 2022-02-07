import React, { useState, useContext, useReducer } from "react";
import releaseInitialState from "../initialStates/releaseInitialState";
import release from "../reducers/release";
import project from "../reducers/project";
import { useHistory } from "react-router-dom";
import projectInitialState from "../initialStates/projectInitialState";
import componentInitialState from "../initialStates/componentInitialState";
import component from "../reducers/component";
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

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [configTitle, setConfigTitle] = useState("");
  const [drawerParam, setDrawerParam] = useState("");
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);
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
    setOpenToast(false);
  };

  const handleCloseModal = () => {
    setAddModuleOpen(false);
  };

  const handleRightDrawer = (configTitle, param) => {
    if (configTitle === "Add Release") {
      history.push(`${window.location.pathname}/create`);
    } else if (configTitle === "Edit Release") {
      history.push(`${window.location.pathname}/edit/${param[1]}`);
    } else if (configTitle === "Add Project") {
      history.push("/project/create");
    } else if (configTitle === "Edit Project") {
      history.push(`/project/edit/${param}`);
    } else if (configTitle === "Edit Component") {
      history.push(`${window.location.pathname}/edit/${param[1]}`);
    } else if (configTitle === "Add TestCase") {
      history.push(`${window.location.pathname}/create`);
    } else if (configTitle === "Edit TestCase") {
      history.push(`${window.location.pathname}/edit/${param[1]}`);
    } else if (configTitle === "Edit TestRun") {
      history.push(`${window.location.pathname}/edit/${param[1]}`);
    } else if (configTitle === "View Logs") {
      history.push(`${window.location.pathname}/workflow/logs/${param[1]}`);
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
    e.preventDefault();
    setState(!state);
    if (Array.isArray(params)) {
      params = params[0];
    }

    if (title === "Add Project") {
      history.push("/projects");
    } else if (title === "Edit Project") {
      history.push("/projects");
    } else if (title === "Add Release") {
      history.push(`/project/${params}/releases`);
    } else if (title === "Edit Release") {
      history.push(`/project/${params}/releases`);
    } else if (title === "Add Component") {
      history.push(`/project/${params}/components`);
    } else if (title === "Edit Component") {
      history.push(`/project/${params}/components`);
    } else if (title === "Add TestCase") {
      history.push(`/project/${params}/components/testcases`);
    } else if (title === "Edit TestCase") {
      history.push(`/project/${params}/components/testcases`);
    } else if (title === "Add TestRun") {
      history.push(`/project/${params}/testruns`);
    } else if (title === "Edit TestRun") {
      history.push(`/project/${params}/testruns`);
    } else if (title === "View Logs") {
      history.push(`/project/${params}/ciFlow`);
    } else if (title === "Add Job") {
      history.push(`/project/${params}/ciFlow`);
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
  const togglePasswordMask = () => {
    setPasswordIsMasked(!passwordIsMasked);
  };
  const toggleRegisterPasswordMask = (e) => {
    e.preventDefault();
    setRegisterPasswordIsMasked(!registerPasswordIsMasked);
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
        setProjects,
        setModuleName,
        toggleDrawer,
        passwordIsMasked,
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
        toggleRegisterPasswordMask,
        handleCloseToast,
        setPasswordIsMasked,
        togglePasswordMask,
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
