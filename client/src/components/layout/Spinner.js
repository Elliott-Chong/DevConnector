import React from "react";
import Spinning from "../../Spinner.gif";

const Spinner = () => {
  return (
    <img
      src={Spinning}
      alt="Spinner"
      style={{ width: "400px", margin: "auto", display: "block" }}
    />
  );
};

export default Spinner;
