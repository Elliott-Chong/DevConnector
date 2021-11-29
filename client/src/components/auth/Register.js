import React from "react";
import { useState } from "react";
import { useGlobalContext } from "../../context/context";
import { Redirect } from "react-router";
// import axios from "axios";

const Register = () => {
  const { setAlert, attemptRegister, state } = useGlobalContext();
  const { isAuthenticated } = state;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // if (!password) {
    //   console.log("hello?");
    //   setAlert("danger", "Please enter a password");
    if (formData.password !== formData.password2) {
      setAlert("danger", "Passwords do not match");
    } else {
      attemptRegister(name, email, password);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            // required
            value={formData.name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            // minLength="6"
            value={formData.password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            // minLength="6"
            value={formData.password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </>
  );
};

export default Register;
