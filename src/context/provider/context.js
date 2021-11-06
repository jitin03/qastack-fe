import React, { useState, useContext, useReducer } from "react";
import releaseInitialState from "../initialStates/releaseInitialState";
import release from "../reducers/release";
import project from "../reducers/project";
import { useHistory } from "react-router-dom";
import projectInitialState from "../initialStates/projectInitialState";
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
  // useState for Module
  const [configTitle, setConfigTitle] = useState("");
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

  const [projectState, projectDispatch] = useReducer(
    project,
    projectInitialState
  );

  const addModule = () => {
    setAddModuleOpen(true);
  };

  const handleCloseModal = () => {
    setAddModuleOpen(false);
  };

  const handleRightDrawer = (configTitle, param) => {
    if (configTitle === "Add Release") {
      history.push("/release/create");
    } else if (configTitle === "Add Project") {
      history.push("/project/create");
    } else if (configTitle === "Edit Project") {
      history.push(`/project/edit/${param}`);
    } else {
      history.push("/module/create");
    }
    setState(!state);
    setConfigTitle(configTitle);
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
    console.log(releaseState.release.name);
    if (releaseState.release.name) {
      console.log("call reducer");
      releaseDispatch({
        type: "ADD_RELEASE",
        payload: releaseState.release,
      });
    }
    console.log(releaseState);
  };

  const handleProjectFormSubmit = (e) => {
    e.preventDefault();
    console.log(projectState.project.name);
    if (projectState.project.name) {
      console.log("call reducer");
      releaseDispatch({
        type: "ADD_PROJECT",
        payload: projectState.project,
      });
    }
    console.log(releaseState);
  };
  const handleDeleteModule = (checkedModule, module) => {
    console.log(checkedModule);
    console.log(module);
    const newModules = module.filter((ar) => {
      return !checkedModule.find((rm) => rm === ar.moduleName);
    });
    setModule(newModules);
    console.log(newModules);
  };
  const handleCloseRightDrawer = () => {
    setState(!state);
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
        setState,
        subModule,
        setSubModule,
        openRightDrawer,
        handleDeleteModule,
        moduleType,
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
        projectState,
        releases,
        projectList,
        setProjectList,
        setReleases,
        releaseDispatch,
        handleReleaseFormSubmit,
        handleProjectFormInput,
        projectDispatch,
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
