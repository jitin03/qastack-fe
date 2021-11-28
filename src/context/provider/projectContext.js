import React, { useState, useContext, useReducer } from "react";
import releaseInitialState from "../initialStates/releaseInitialState";
import release from "../reducers/release";
import project from "../reducers/project";
import { useHistory } from "react-router-dom";
import projectInitialState from "../initialStates/projectInitialState";
const ProjectContext = React.createContext();

const getStarProject = () => {
  let project = localStorage.getItem("starProject");
  if (project) {
    return localStorage.getItem("starProject");
  } else {
    return "";
  }
};
const ProjectProvider = ({ children }) => {
  const [starProject, setStarProject] = useState(getStarProject());
  return (
    <ProjectContext.Provider
      value={{
        starProject,
        setStarProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  return useContext(ProjectContext);
};

export { ProjectContext, ProjectProvider };
