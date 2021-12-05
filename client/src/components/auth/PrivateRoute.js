import React from "react";
import { Redirect, Route } from "react-router";
import { useGlobalContext } from "../../context/context";

const PrivateRoute = ({ path, component: Component }) => {
  const {
    state: { isAuthenticated },
  } = useGlobalContext();
  return (
    <Route
      path={path}
      exact
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login"></Redirect>
        )
      }
    />
  );
};

export default PrivateRoute;
