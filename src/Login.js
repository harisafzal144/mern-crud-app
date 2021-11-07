import React, { useState, useEffect } from "react";

//import { withRouter } from "react-router-dom";

import axios from "axios";
import Nav from "./Nav";

import { authenticate, getUser } from "./helper";

const Login = (props) => {
  const [state, setState] = useState({
    name: "",
    password: "",
  });

  const { name, password } = state; //destructure the state hook

  useEffect(() => {
    getUser() && props.history.push("/");

    // return () => {
    //   cleanup
    // }
  }, []);

  //onchange event handler

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.table({ name, password });
    const loginData = { ...state };
    //console.log(loginData);
    //login data send to server
    axios

      .post(`${process.env.REACT_APP_API}/login`, loginData)
      .then((res) => {
        console.log(res, "Response");

        // response will contain token  and name

        authenticate(res, () => props.history.push("/create"));

        //redirect to create page
      })
      .catch((err) => {
        alert("password is Incorrect ");
        console.log(err, "Error");
      });

    // console.table({ title, content, user });
  };

  const LoginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name </label>
        <input
          onChange={handleChange("name")}
          value={name}
          type="text"
          className="form-control"
          placeholder="Your Name"
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">password </label>
        <input
          onChange={handleChange("password")}
          value={password}
          type="text"
          className="form-control"
          placeholder="Your Password"
          required
        />
      </div>

      <div style={{ paddingTop: 10 }}>
        <button className="btn btn-primary">LogIn</button>
      </div>
    </form>
  );

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>Login</h1>
      <hr />
      {/* {JSON.stringify(state)} */}
      {LoginForm()}
    </div>
  );
};

export default Login;
