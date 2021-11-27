import React, { useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import { v4 } from "uuid";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setAlert = (type, msg) => {
    const id = v4();
    dispatch({
      type: "SET_ALERT",
      payload: { type: "danger", msg: "Passwords do not match", id },
    });
    setTimeout(() => dispatch({ type: "REMOVE_ALERT", payload: { id } }), 3000);
  };

  return (
    <AppContext.Provider value={{ state, dispatch, setAlert }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
