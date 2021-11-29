import React, { useContext, useReducer, useCallback } from "react";
import { reducer, initialState } from "./reducer";
import { v4 } from "uuid";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    console.log(state);
  }, [state]);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }

    try {
      const response = await axios.get("/api/auth");
      dispatch({ type: "USER_LOADED", payload: response.data });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" });
    }
  }, []);

  const loginUser = async (email, password) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ email, password });
    try {
      const response = await axios.post("/api/auth", body, config);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      loadUser();
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert("danger", error.msg));
      }
      dispatch({ type: "AUTH_ERROR" });
    }
  };

  const setAlert = (type, msg) => {
    const id = v4();
    dispatch({
      type: "SET_ALERT",
      payload: { type, msg, id },
    });
    setTimeout(() => dispatch({ type: "REMOVE_ALERT", payload: { id } }), 3000);
  };

  const createOrUpdateProfile = useCallback(
    async (profileData, history, edit = false) => {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const response = await axios.post("/api/profile", profileData, config);
        dispatch({
          type: "SET_PROFILE",
          payload: { profile: response.data.profile },
        });
        setAlert("success", edit ? "Profile Updated!" : "Profile Created!");
        if (!edit) {
          history.push("/dashboard");
        }
      } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;
        if (errors) {
          errors.forEach((error) => setAlert("danger", error.msg));
        }
      }
    },
    []
  );
  const addExperience = useCallback(async (experienceData, history) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const response = await axios.put(
        "/api/profile/experience",
        experienceData,
        config
      );
      dispatch({
        type: "SET_PROFILE",
        payload: { profile: response.data.profile },
      });
      setAlert("success", "Experience Added!");
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert("danger", error.msg));
      }
    }
  }, []);
  const addEducation = useCallback(async (experienceData, history) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const response = await axios.put(
        "/api/profile/education",
        experienceData,
        config
      );
      dispatch({
        type: "SET_PROFILE",
        payload: { profile: response.data.profile },
      });
      setAlert("success", "Education Added!");
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert("danger", error.msg));
      }
    }
  }, []);
  const getCurrentProfile = useCallback(async () => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await axios.get("/api/profile/me");
      dispatch({
        type: "SET_PROFILE",
        payload: { profile: response.data.profile },
      });
    } catch (err) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }, []);

  const attemptRegister = async (name, email, password) => {
    dispatch({ type: "START_LOADING" });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const response = await axios.post("/api/users", body, config);
      dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
      // {token: pq8uq98wr23rr}
      loadUser();
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert("danger", error.msg));
      }

      dispatch("REGISTER_FAIL");
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        setAlert,
        attemptRegister,
        loadUser,
        loginUser,
        getCurrentProfile,
        createOrUpdateProfile,
        addEducation,
        addExperience,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
