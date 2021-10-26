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
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <Link to="/create">
          <button type="button" className="btn btn-primary">
            <i class="bi bi-pen"></i>&nbsp;Create
          </button>
        </Link>
      </li>
      <li class="nav-item">
        <button
          type="button"
          className="btn btn-primary ms-1"
          onClick={handleMyBlogBtn}
        >
          <i class="bi bi-book"></i>
          &nbsp;My Blog
        </button>
      </li>
      <li class="nav-item">
        <Link to="/myprofile">
          <button type="button" className="btn btn-primary ms-1">
            <i class="bi bi-person"></i>&nbsp;My Profile
          </button>
        </Link>
      </li>
      <li class="nav-item">
        <button
          type="button"
          className="btn btn-primary ms-1"
          onClick={handleLogout}
        >
          <i class="bi bi-box-arrow-right"></i>&nbsp;Logout
        </button>
      </li>
    </ul>
  );

  const loggedOutJSX = (
    <>
      <Link to="/signup">
        <button type="button" className="btn btn-primary mx-3">
          <i class="bi bi-person-plus"></i>&nbsp;Sign up
        </button>
      </Link>
      <Link to="/login">
        <button type="button" className="btn btn-primary">
          <i class="bi bi-door-open"></i>&nbsp;Log in
        </button>
      </Link>
    </>
  );

  return <>{props.isLoggedIn === true ? loggedInJSX : loggedOutJSX}</>;
};

export default UserButtons;
