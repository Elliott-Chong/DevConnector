import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppProvider from "./context/context";

import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://138.75.246.252:5000/";

ReactDOM.render(
  <AppProvider>
    <Router>
      <App />
    </Router>
  </AppProvider>,
  document.getElementById("root")
);
