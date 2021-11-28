import React, { useState, useContext, useReducer } from "react";
import releaseInitialState from "../initialStates/releaseInitialState";
import release from "../reducers/release";
import project from "../reducers/project";
import { useHistory } from "react-router-dom";
import projectInitialState from "../initialStates/projectInitialState";
import authInitialState from "../initialStates/authInitialState";
import auth from "../reducers/auth";
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);
  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
