import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/private-theming";
import { AppProvider } from "./context/provider/context";

import theme from "./theme";
import { ProjectProvider } from "./context/provider/projectContext";
import { AuthProvider } from "./context/provider/authContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <AppProvider>
          <AuthProvider>
            <ProjectProvider>
              <App />
            </ProjectProvider>
          </AuthProvider>
        </AppProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
