export const initialState = {
  alerts: [],
};
// {id: '', type: '', msg: ''}

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
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

    default:
      return state;
  }
};
