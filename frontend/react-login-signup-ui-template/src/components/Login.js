import React, { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../redux/actionCreator";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const { errorMsg, errorFound } = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/authUser", {
        email,
        password,
      })
      .then((res) => {
        setEmail("");
        setPassword("");
        // alert(res.data.message);
        console.log("Mona", res.data);
        dispatch(loginSuccess(res.data));
      })
      .catch((err) => {
        console.log("Mohini", err.message);
        dispatch(loginFailure(err.message));
      });
  };

  // useEffect(() => {
  //   console.log("Runnign");
  //   axios.get("http://localhost:5000/api/user").then((res) => {
  //     console.log("res: ", res);
  //   });
  // }, []);
  const checkPass = (value) => {
    setPassword(value);
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorPassword(false);
    } else {
      setErrorPassword(true);
    }
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              required
              onChange={(event) => {
                setEmail(event.target.value);
                var emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
                if (email.match(emailRegex)) {
                  setErrorEmail(false);
                } else {
                  setErrorEmail(true);
                }
              }}
            />
            {errorEmail ? (
              <span className="text-danger small">
                Please Enter Valid Email !
              </span>
            ) : null}
            {errorFound ? (
              <span className="text-danger small">{errorMsg}</span>
            ) : null}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              required
              onChange={(event) => {
                checkPass(event.target.value);
              }}
            />
            {errorPassword ? (
              <span className="text-danger small">
                Password must contain atleast 8-digit long, 1 uppercase letter,
                1 lowercase and 1 numeric digit in it
              </span>
            ) : null}
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
