import axios from "axios";
import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";

const User = () => {
  const USER_API = "http://localhost:5000/api/user";

  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUser = () => {
    axios
      .get(USER_API)
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {console.log(users)}
      <div className="my-5">
        {loading ? (
          <div className="text-center my-5">
            <h1>Loading.........</h1>
          </div>
        ) : (
          <UserTable user={users} getUser={getUser} />
        )}
      </div>
    </>
  );
};
export default User;
