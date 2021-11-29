export const initialState = {
  alerts: [],
  token: localStorage.getItem("token"),
  loading: true,
  user: null,
  isAuthenticated: null,
  profile: null,
  all_profiles: {},
  error: {},
  repos: [],
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "START_LOADING":
      return { ...state, loading: true };
    case "SET_ALERT":
      let newAlerts = state.alerts;
      newAlerts.push({ id: payload.id, type: payload.type, msg: payload.msg });
      return {
        ...state,
        alerts: newAlerts,
      };
    case "REMOVE_ALERT":
      let newAlertss = state.alerts.filter((alert) => alert.id !== payload.id);
      return { ...state, alerts: newAlertss };

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
      return { ...state, loading: false, error: payload };

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
