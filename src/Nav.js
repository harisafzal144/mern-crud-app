import React from "react";

import { Link, withRouter } from "react-router-dom";

import { getUser, logout } from "./helper";

const Nav = (props) => (
  <nav>
    <ul className="nav nav-tabs">
      <li style={{ paddingRight: 10 }} className="nav-item  pr-3 pt-3 pb-3">
        <Link to="/">Home</Link>
      </li>
      <br />
      <li style={{ paddingRight: 10 }} className="nav-item pr-3 pt-3 pb-3">
        <Link to="/create">Create</Link>
      </li>

      {!getUser() && (
        <li
          style={{ marginLeft: "auto" }}
          className="nav-item ml-auto pr-3 pt-3 pb-3"
        >
          <Link to="/login">Login</Link>
        </li>
      )}

      {getUser() && (
        <li
          onClick={() => logout(() => props.history.push("/"))}
          style={{ marginLeft: "auto", cursor: "pointer" }}
          className="nav-item ml-auto pr-3 pt-3 pb-3"
        >
          Logout
        </li>
      )}
      {/* 
      <li
        style={{ marginLeft: "10px" }}
        className="nav-item ml-auto pr-3 pt-3 pb-3"
      >
        <Link>Register</Link>
      </li> */}
    </ul>
  </nav>
);

export default withRouter(Nav);
