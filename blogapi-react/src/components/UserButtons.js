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
    <ul className="navbar-nav ms-auto align-items-center ">
      <li className="nav-item">
        <Link to="/create" className="nav-link ">
          <button type="button" className="btn btn-primary">
            <i className="bi bi-pen"></i>&nbsp;Create
          </button>
        </Link>
      </li>
      <li className="nav-item">
        <span className="nav-link ">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleMyBlogBtn}
          >
            <i className="bi bi-book"></i>
            &nbsp;My Blog
          </button>
        </span>
      </li>
      <li className="nav-item">
        <Link to="/myprofile" className="nav-link ">
          <button type="button" className="btn btn-primary">
            <i className="bi bi-person"></i>&nbsp;My Profile
          </button>
        </Link>
      </li>
      <li className="nav-item">
        <span className="nav-link ">
          <button
            type="button"
            className="btn btn-primary "
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>
            &nbsp;Logout
          </button>
        </span>
      </li>
    </ul>
  );

  const loggedOutJSX = (
    <ul className="navbar-nav ms-auto   align-items-center">
      <li className="nav-item">
        <Link to="/signup" className="nav-link ">
          <button type="button" className="btn btn-primary ">
            <i className="bi bi-person-plus"></i>&nbsp;Sign up
          </button>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link ">
          <button type="button" className="btn btn-primary">
            <i className="bi bi-door-open"></i>&nbsp;Log in
          </button>
        </Link>
      </li>
    </ul>
  );

  return <>{props.isLoggedIn === true ? loggedInJSX : loggedOutJSX}</>;
};

export default UserButtons;
