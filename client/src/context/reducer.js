export const initialState = {
  alerts: [],
  token: localStorage.getItem("token"),
  loading: true,
  user: null,
  isAuthenticated: null,
  profile: null,
  post: null,
  all_profiles: null,
  posts: [],
  error: {},
  repos: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_REPOS":
      return { ...state, loading: false, repos: payload };
    case "START_LOADING":
      return { ...state, loading: true };
    case "SET_ALERT":
      let newAlerts = state.alerts;
      newAlerts.push({ id: payload.id, type: payload.type, msg: payload.msg });
      return {
        ...state,
        alerts: newAlerts,
      };
    case "ADD_COMMENT":
      console.log(payload);
      return {
        ...state,
        post: { ...state.post, comments: payload },
      };
    case "REMOVE_ALERT":
      let newAlertss = state.alerts.filter((alert) => alert.id !== payload.id);
      return { ...state, alerts: newAlertss };

    case "FILL_ALL_PROFILES":
      return { ...state, all_profiles: payload, loading: false };
    case "CLEAR_PROFILE":
      return { ...state, profile: null };

    case "FILL_POSTS":
      return { ...state, posts: payload, loading: false };

    case "FILL_POST":
      return { ...state, loading: false, post: payload };

    case "DELETE_COMMENT":
      return { ...state, post: { ...state.post, comments: payload } };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };

    case "ADD_POST":
      return { ...state, posts: [payload, ...state.posts] };

    case "UPDATE_LIKES":
      // id and likes
      const newPosts = state.posts.map((post) => {
        if (post._id === payload.id) {
          return { ...post, likes: payload.likes };
        }
        return post;
      });
      return { ...state, posts: newPosts };

    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        loading: false,
        isAuthenticated: true,
      };

    case "SET_PROFILE":
      return { ...state, loading: false, profile: payload.profile };

    case "PROFILE_ERROR":
      return { ...state, loading: false, error: payload, profile: null };

    case "USER_LOADED":
      return { ...state, isAuthenticated: true, loading: false, user: payload };

    case "REGISTER_FAIL":
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        profile: null,
        error: {},
        repos: [],
        user: null,
      };

    default:
      return state;
  }
};
