import React from "react";
import { Route, Redirect } from "react-router-dom";

import { getUser } from "./helper";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    //two type of props, childern props and render props ........we are using here render props
    <Route
      {...rest}
      render={(props) =>
        getUser() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { form: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
