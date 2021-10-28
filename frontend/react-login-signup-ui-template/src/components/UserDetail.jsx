import React from "react";
import { useSelector } from "react-redux";
const UserDetail = () => {
  const userData = useSelector((state) => state.userData);
  return (
    <>
      <div className="my-5">
        <h1 className="">Name: {userData.fname + " " + userData.lname}</h1>
        <h1 className="">Email: {userData.email}</h1>
        <h1 className="">Phone: {userData.phone}</h1>
        <div className="text-center">
          <img
            src={`http://localhost:5000/${userData.image}`}
            className="img-fluid"
            style={{ height: "200px" }}
          />
        </div>
      </div>
    </>
  );
};
export default UserDetail;
