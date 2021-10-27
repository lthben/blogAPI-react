import React from "react";
import UserButtons from "./UserButtons";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import logo from "../logo.png";

const NavBar = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top px-3">
        <div className="container-fluid">
          {/* logo */}
          <Link
            to="/"
            className="navbar-brand py-1 ps-1"
            style={{ textDecoration: "none" }}
          >
            <img src={logo} alt="logo" width="60px" height="60px" />
            <span id="log-site">log Site</span>
          </Link>
          {/* username  */}
          {props.isLoggedIn ? (
            <div className="row align-items-center mx-lg-3">
              <div className="col text-center" id="welcome-text">
                Welcome <b>{sessionStorage.getItem("firstname")}</b>
              </div>
            </div>
          ) : null}
          {/* collapsible button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* collapsible navbar */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <SearchBar />
            <UserButtons
              isLoggedIn={props.isLoggedIn}
              setIsLoggedIn={props.setIsLoggedIn}
              refreshList={props.refreshList}
              setRefreshList={props.setRefreshList}
            />
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
