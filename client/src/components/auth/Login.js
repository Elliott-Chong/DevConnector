import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
const Login = () => {
  const { loginUser, state } = useGlobalContext();
  const { isAuthenticated } = state;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <>
      {/* <div className="alert alert-danger">Invalid credentials</div> */}
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            placeholder="Email Address"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            onChange={onChange}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <a href="register.html">Sign Up</a>
      </p>
    </>
  );
};

export default Login;
