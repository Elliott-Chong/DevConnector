import React, { useContext, useReducer, useCallback } from "react";
import { reducer, initialState } from "./reducer";
import { v4 } from "uuid";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    if (!state.user) return;
    if (state.user.email === "elliottchong16@gmail.com") console.log(state);
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

  const get_all_profiles = useCallback(async () => {
    dispatch({ type: "START_LOADING" });
    const response = await axios.get("/api/profile");
    dispatch({ type: "FILL_ALL_PROFILES", payload: response.data });
  }, []);

  const get_github_repos = useCallback(async (username) => {
    try {
      const response = await axios.get(`/api/profile/github/${username}`);
      dispatch({ type: "SET_REPOS", payload: response.data });
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert("danger", error.msg));
      }
    }
  }, []);

  const get_profile_by_user_id = useCallback(async (id) => {
    try {
      dispatch({ type: "CLEAR_PROFILE" });
      dispatch({ type: "START_LOADING" });
      const response = await axios.get(`/api/profile/user/${id}`);
      dispatch({ type: "SET_PROFILE", payload: { profile: response.data } });
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert("danger", error.msg));
      }
    }
  }, []);

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

  const getPosts = useCallback(async () => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await axios.get("/api/posts");
      dispatch({
        type: "FILL_POSTS",
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: "POST_ERROR",
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }, []);
  const getPost = useCallback(async (id) => {
    try {
      dispatch({ type: "START_LOADING" });
      const response = await axios.get(`/api/posts/${id}`);
      dispatch({
        type: "FILL_POST",
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: "POST_ERROR",
        payload: { msg: err.response.statusText, status: err.response.status },
      });
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

  const delete_experience = async (id) => {
    const url = `/api/profile/experience/${id}`;
    try {
      const response = await axios.delete(url);
      setAlert("success", response.data);
      getCurrentProfile();
    } catch (error) {
      const errors = error.response.data.errros;

      if (errors) {
        errors.forEach((error) => setAlert("danger", error.msg));
      }
    }
  };

  const delete_education = async (id) => {
    const url = `/api/profile/education/${id}`;
    try {
      const response = await axios.delete(url);
      setAlert("success", response.data);
      getCurrentProfile();
    } catch (error) {
      const errors = error.response.data.erros;

      if (errors) {
        errors.forEach((error) => setAlert("danger", error.msg));
      }
    }
  };
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

  const delete_account = async () => {
    if (!window.confirm("Are you sure? This action CANNOT be undone!")) return;
    try {
      await axios.delete("/api/profile");
      setAlert("", "Account Deleted");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      if (error.response) {
        setAlert("danger", "Server Error");
      }
    }
  };

  const like = async (id) => {
    const response = await axios.put(`/api/posts/like/${id}`);
    dispatch({ type: "UPDATE_LIKES", payload: { likes: response.data, id } });
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      dispatch({ type: "DELETE_POST", payload: id });
      setAlert("success", "Post Deleted!");
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert("danger", error.msg));
      }
    }
  };
  const deleteComment = async (commentId, postId) => {
    try {
      const response = await axios.delete(
        `/api/posts/comment/${commentId}/${postId}`
      );
      dispatch({ type: "DELETE_COMMENT", payload: response.data });
      setAlert("success", "Comment Deleted!");
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert("danger", error.msg));
      }
    }
  };
  const addPost = async (text) => {
    const config = {
      headers: { "Application-Type": "application/json" },
    };
    const body = { text };
    const response = await axios.post("/api/posts", body, config);
    dispatch({ type: "ADD_POST", payload: response.data });
    setAlert("success", "Post Created!");
  };

  const addComment = async (id, text) => {
    const config = {
      headers: { "Application-Type": "application/json" },
    };
    const body = { text };
    const response = await axios.post(`/api/posts/comment/${id}`, body, config);
    dispatch({
      type: "ADD_COMMENT",
      payload: response.data,
    });
    setAlert("success", "Comment Added!");
  };

  return (
    <AppContext.Provider
      value={{
        addPost,
        state,
        dispatch,
        setAlert,
        like,
        attemptRegister,
        deletePost,
        loadUser,
        loginUser,
        getCurrentProfile,
        deleteComment,
        addComment,
        createOrUpdateProfile,
        addEducation,
        addExperience,
        get_profile_by_user_id,
        getPost,
        delete_account,
        getPosts,
        delete_experience,
        get_github_repos,
        delete_education,
        get_all_profiles,
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
