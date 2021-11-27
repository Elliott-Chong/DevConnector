import React from "react";
import { useState } from "react";
import { useGlobalContext } from "../../context/context";
// import axios from "axios";

const Register = () => {
  const { setAlert } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  //   const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setAlert("danger", "Passwords do not match");
    } else {
      //   try {
      //     const newUser = {
      //       name,
      //       email,
      //       password,
      //     };
      //     const config = {
      //       headers: { "Content-Type": "application/json" },
      //     };
      //     const body = JSON.stringify(newUser);
      //     const res = await axios.post("/api/users", body, config);
      //     console.log(res.data);
      //   } catch (error) {
      //     console.log(error);
      //   }
      console.log("suucess");
    }
  };

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
            required
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
            minLength="6"
            value={formData.password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
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
