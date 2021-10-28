import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AuthRoutes from "./routes/AuthRoutes";
import UnauthRoutes from "./routes/UnauthRoutes";
import { useSelector, useDispatch } from "react-redux";
import { checkUserStart, logout } from "./redux/actionCreator";
function App() {
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(checkUserStart(token));
    }
  }, []);
  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>
              Welcome to My New Project UserManagement
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/home"}>
                    Home
                  </Link>
                </li>
                {!isLogin ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-in"}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>
                        Sign Up
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/user"}>
                        User
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={logoutUser}>
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        {isLogin ? <AuthRoutes /> : <UnauthRoutes />}
      </div>
    </Router>
  );
}

export default App;
