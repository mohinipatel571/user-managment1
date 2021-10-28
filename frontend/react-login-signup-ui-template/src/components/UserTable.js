import React, { useState } from "react";
import Update from "./Update";
import Delete from "./Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserTable = (props) => {
  const user = props.user;
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const handleUpdate = (userFname, userLname, userEmail, userPhone) => {
    setEmail(userEmail);
    setFname(userFname);
    setLname(userLname);
    setPhone(userPhone);
  };

  const updateData = (event) => {
    event.preventDefault();
    console.log("fffff");
    axios
      .put("http://localhost:5000/api/user", {
        fname,
        lname,
        email,
        phone,
      })
      .then((res) => {
        // setIsDisable(false);
        setFname("");
        setLname("");
        setPhone("");
        setEmail("");
        props.getUser();
        //alert(res.data.message);
        toast(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const handleDelete = () => {
    axios
      .delete("http://localhost:5000/api/user", {
        data: { email },
      })
      .then((res) => {
        // setIsDisable(false);

        setEmail("");
        props.getUser();
        //alert(res.data.message);
        toast(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  return (
    <>
      <div className="m-5 p-5 ml-3">
        <table className="table bg-white user-table">
          <thead>
            <tr>
              <th scope="col">Profile</th>

              <th scope="col">FirtName</th>
              <th scope="col">LastName</th>
              <th scope="col">Email</th>
              <th scope="col">Phone No</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {user.length ? (
              user.map((value) => {
                return (
                  <tr key={value._id}>
                    <td>
                      <img
                        src={`http://localhost:5000/${value.image}`}
                        className="img-fluid"
                        style={{ height: "50px" }}
                      />
                    </td>
                    <td>{value.fname}</td>
                    <td>{value.lname}</td>
                    <td>{value.email}</td>
                    <td>{value.phone}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => {
                          handleUpdate(
                            value.fname,
                            value.lname,
                            value.email,
                            value.phone
                          );
                        }}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger "
                        data-toggle="modal"
                        data-target="#exampleModalLong"
                        onClick={() => {
                          setEmail(value.email);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>No User Found</td>
              </tr>
            )}
          </tbody>
        </table>
        <Update
          email={email}
          lname={lname}
          fname={fname}
          phone={phone}
          setFname={setFname}
          setLname={setLname}
          setPhone={setPhone}
          updateData={updateData}
        />
        <Delete email={email} handleDelete={handleDelete} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default UserTable;
