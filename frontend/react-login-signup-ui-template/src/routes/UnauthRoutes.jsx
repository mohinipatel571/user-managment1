import React from "react";
import { Route, Switch } from "react-router";
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
const UnauthRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route path="/sign-in" component={Login} />
        <Route path="/sign-up" component={Signup} />
      </Switch>
    </>
  );
};
export default UnauthRoutes;
