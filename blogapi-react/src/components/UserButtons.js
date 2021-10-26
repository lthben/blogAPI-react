import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const UserButtons = (props) => {
  // props: refreshList, setRefreshList, isLoggedIn, setIsLoggedIn
  let history = useHistory();

  useEffect(() => {}, [props.isLoggedIn]);

  const handleLogout = () => {
    props.setIsLoggedIn(false);
    sessionStorage.clear();
    history.push("/");
  };

  const handleMyBlogBtn = () => {
    props.setRefreshList(!props.refreshList);
    history.push("/myblog");
  };

  const loggedInJSX = (
    <>
      Welcome &nbsp;
      <b>{sessionStorage.getItem("firstname")}</b>
      <Link to="/create">
        <button type="button" className="btn btn-primary ms-5">
          Create
        </button>
      </Link>
      <button
        type="button"
        className="btn btn-primary ms-3"
        onClick={handleMyBlogBtn}
      >
        My Blog
      </button>
      <Link to="/myprofile">
        <button type="button" className="btn btn-primary ms-3">
          My Profile
        </button>
      </Link>
      <button
        type="button"
        className="btn btn-primary ms-3"
        onClick={handleLogout}
      >
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
