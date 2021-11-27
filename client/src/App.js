import React from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import { Switch, Route } from "react-router-dom";
import { useGlobalContext } from "./context/context";

function App() {
  const { state } = useGlobalContext();
  return (
    <>
      <Navbar />
      <Route path="/" exact component={Landing} />
      <section className="container">
        <Alert alerts={state.alerts} />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </section>
    </>
  );
}

export default App;
