import React from "react";
import App from "./App";
import Create from "./Create";
import Login from "./Login";
import SinglePost from "./SinglePost";
import UpdatePost from "./UpdatePost";
import PrivateRoute from "./PrivateRoute";

import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/create" exact component={Create} />
        <Route path="/post/:slug" exact component={SinglePost} />
        <PrivateRoute path="/post/update/:slug" exact component={UpdatePost} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
