import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const UserButtons = (props) => {
  useEffect(() => {
    console.log("in USerBittons, isLoggedIn: ", props.isLoggedIn);
  }, [props.isLoggedIn]);

  const handleLogout = () => {
    props.setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("access_token", null);
    localStorage.setItem("refresh_token", null);
  };

  if (props.isLoggedIn) {
    return (
      <>
        <Link to="/create">
          <button type="button" className="btn btn-primary mx-3">
            Create
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogout}
        >
          Logout
        </button>
      </>
    );
  } else {
    return (
      <>
        <Link to="/signup">
          <button type="button" className="btn btn-primary mx-3">
            Sign up
          </button>
        </Link>
        <Link to="/login">
          <button type="button" className="btn btn-primary">
            Log in
          </button>
        </Link>
      </>
    );
  }
};

export default UserButtons;