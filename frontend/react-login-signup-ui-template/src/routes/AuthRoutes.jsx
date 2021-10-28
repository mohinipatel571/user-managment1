import React from "react";
import User from "../components/User";
import { Route, Switch } from "react-router";
import UserDetail from "../components/UserDetail";
import { Redirect } from "react-router-dom";
const AuthRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={UserDetail} />
        <Route exact path="/home" component={UserDetail} />
        <Route path="/sign-in" ><Redirect to="/"/></Route>
        <Route path="/sign-up" ><Redirect to="/"/></Route>
        <Route path="/user" component={User} />
      </Switch>
    </>
  );
};
export default AuthRoutes;
