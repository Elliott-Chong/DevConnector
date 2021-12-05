import React from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Alert from "./components/layout/Alert";
import PrivateRoute from "./components/auth/PrivateRoute";
import { Switch, Route } from "react-router-dom";
import { useGlobalContext } from "./context/context";
// import Spinner from "./components/layout/Spinner";
import EditProfile from "./components/layout/EditProfile";
import AllProfiles from "./components/profiles/AllProfiles";
import CreateProfile from "./components/layout/CreateProfile";
import CreateExperience from "./components/layout/CreateExperience";
import CreateEducation from "./components/layout/CreateEducation";
import SingleProfile from "./components/profile/SingleProfile";
import Posts from "./components/posts/Posts";
import SinglePost from "./components/posts/SinglePost";
function App() {
  const { state, loadUser } = useGlobalContext();
  // const { loading } = state;
  React.useEffect(() => loadUser(), [loadUser]);

  return (
    <>
      <Navbar />
      <Route path="/" exact component={Landing} />
      <section className="container">
        <Alert alerts={state.alerts} />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/profile" exact component={AllProfiles} />
          <Route path="/profile/:id" exact component={SingleProfile} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/post/:id" exact component={SinglePost} />
          <PrivateRoute path="/posts" exact component={Posts} />
          <PrivateRoute
            path="/create-profile"
            exact
            component={CreateProfile}
          />
          <PrivateRoute path="/edit-profile" exact component={EditProfile} />
          <PrivateRoute
            path="/add-experience"
            exact
            component={CreateExperience}
          />
          <PrivateRoute
            path="/add-education"
            exact
            component={CreateEducation}
          />
        </Switch>
      </section>
    </>
  );
}

export default App;
