import React from "react";

const Alert = ({ alerts }) => {
  return (
    <>
      {alerts.length > 0 &&
        alerts.map((alert) => {
          return (
            <div className={`alert alert-${alert.type}`} key={alert.id}>
              {alert.msg}
            </div>
          );
        })}
    </>
  );
};

export default Alert;
