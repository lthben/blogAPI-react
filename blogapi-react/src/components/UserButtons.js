import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const UserButtons = (props) => {
  useEffect(() => {
    console.log(
      "in UserButtons UseEffect, props.isLoggedIn: ",
      props.isLoggedIn
    );
  }, [props.isLoggedIn]);

  const handleLogout = () => {
    props.setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("access_token", null);
    localStorage.setItem("refresh_token", null);
    localStorage.setItem("firstname", "logged out");
  };

  const loggedInJSX = (
    <>
      Welcome &nbsp;
      <b>{localStorage.getItem("firstname")}</b>
      <Link to="/create">
        <button type="button" className="btn btn-primary mx-3">
          Create
        </button>
      </Link>
      <button type="button" className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </>
  );

  const loggedOutJSX = (
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

  return <>{props.isLoggedIn === true ? loggedInJSX : loggedOutJSX}</>;
};

export default UserButtons;
