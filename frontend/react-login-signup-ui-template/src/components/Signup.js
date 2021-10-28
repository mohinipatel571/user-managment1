import React, { useEffect, useState } from "react";
import validator from "validator";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState("");
  const [IsDisable, setIsDisable] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const { errorMsg, errorFound } = useState(false);
  const [filedata, setFiledata] = useState("");
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsDisable(true);

    const formdata = new FormData();
    formdata.append("fname", fname);
    formdata.append("lname", lname);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("phone", mobile);
    formdata.append("myimage", filedata);
    axios
      .post("http://localhost:5000/api/user", formdata, {
        // fname,
        // lname,
        // email,
        // password,
        // phone: mobile,
        // image,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setIsDisable(false);
        setEmail("");
        setFname("");
        setLname("");
        setMobile("");
        setPassword("");
        setImage("");
        //alert(res.data.message);
        toast(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          // type: "success",
        });
        setTimeout(() => {
          history.push("/sign-in");
        }, 1500);

        // <ModalSmall />;
      });
  };
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
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                value={fname}
                required
                onChange={(event) => {
                  setFname(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                value={lname}
                required
                onChange={(event) => {
                  setLname(event.target.value);
                }}
              />
            </div>

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
                  var emailRegex =
                    /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
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

                // var passwordRegex =
                //   /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[^a-zA-Z0-9])(?!.*\s).{7,15}$/;

                // if (password.match(passwordRegex)) {
                //   setErrorPassword(false);
                // } else {
                //   setErrorPassword(true);
                // }
                //}
              />
              {errorPassword ? (
                <span className="text-danger small">
                  Password must contain atleast 8-digit long, 1 uppercase
                  letter, 1 lowercase and 1 numeric digit in it
                </span>
              ) : null}
            </div>
            <div className="form-group">
              <label>Phone No</label>
              <input
                type="phone"
                className="form-control"
                placeholder="Enter Mobile"
                value={mobile}
                required
                pattern="[6-9]{1}[0-9]{9}"
                required
                title="Phone number with 6-9 and remaing 9 digit with 0-9"
                onChange={(event) => {
                  setMobile(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Upload Image</label>

              <input
                type="file"
                className="form-control"
                accept=".png, .jpg, .jpeg"
                name="myimage"
                required
                value={image}
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setFiledata(event.target.files[0]);
                  setImage(event.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
              disabled={IsDisable}
            >
              Sign Up
            </button>
            <p className="forgot-password text-right">
              Already registered <a href="/sign-in">sign in?</a>
            </p>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};
export default Signup;
