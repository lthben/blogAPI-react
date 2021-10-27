import "./App.css";
import { Route, Link, Redirect, Switch, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import logo from "./logo.png";
import Create from "./pages/Create";
import Update from "./pages/Update";
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserButtons from "./components/UserButtons";
import MyBlog from "./pages/MyBlog";
import MyProfile from "./pages/MyProfile";

function App() {
  let history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshList, setRefreshList] = useState(false); //home list
  const [thisPost, setThisPost] = useState({
    //for initialising the update post
    title: "",
    content: "",
    author: "",
    slug: "",
    id: "",
  });
  const [list, setList] = useState([]); //home list
  // const [refreshBlogList, setRefreshBlogList] = useState(false); //myblog list
  const [blogList, setBlogList] = useState([]); //myblog list
  // const [username, setUsername] = useState("");
  const [pageAt, setPageAt] = useState("home"); //or "blog"
  const [search, setSearch] = useState(""); //navbar search

  useEffect(() => {
    // setUsername(sessionStorage.getItem("username"));
    const loginStatus = sessionStorage.getItem("isLoggedIn");
    if (loginStatus === "true") setIsLoggedIn(true);
    else setIsLoggedIn(false);
    // console.log("in App useEffect, isLoggedIn: ", loginStatus);
  }, [isLoggedIn]);
  /*
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  */

  const handleSearchInputChange = () => {};

  const handleSearchKeyDown = () => [];

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
    history.push("/");
  };

  const handleMyBlogBtn = () => {
    setRefreshList(!refreshList);
    history.push("/myblog");
  };

  const loggedInJSX = (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link to="/create" className="nav-link">
          <button type="button" className="btn btn-primary">
            <i className="bi bi-pen"></i>&nbsp;Create
          </button>
        </Link>
      </li>
      <li className="nav-item">
        <span className="nav-link">
          <button
            type="button"
            className="btn btn-primary ms-1 "
            onClick={handleMyBlogBtn}
          >
            <i className="bi bi-book"></i>
            &nbsp;My Blog
          </button>
        </span>
      </li>
      <li className="nav-item">
        <Link to="/myprofile" className="nav-link">
          <button type="button" className="btn btn-primary ms-1">
            <i className="bi bi-person"></i>&nbsp;My Profile
          </button>
        </Link>
      </li>
      <li className="nav-item">
        <span className="nav-link">
          <button
            type="button"
            className="btn btn-primary ms-1"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>&nbsp;Logout
          </button>
        </span>
      </li>
      <li className="nav-item">
        <div className="nav-link">
          Welcome <b>{sessionStorage.getItem("firstname")}</b>
        </div>
      </li>
    </ul>
  );

  const loggedOutJSX = (
    <>
      <Link to="/signup">
        <button type="button" className="btn btn-primary mx-3">
          <i className="bi bi-person-plus"></i>&nbsp;Sign up
        </button>
      </Link>
      <Link to="/login">
        <button type="button" className="btn btn-primary">
          <i className="bi bi-door-open"></i>&nbsp;Log in
        </button>
      </Link>
    </>
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div className="container-fluid">
          <Link
            to="/"
            className="navbar-brand bg-light px-1 py-1"
            style={{ textDecoration: "none" }}
          >
            <img src={logo} alt="logo" width="60px" height="60px" />
            <span id="log-site">log Site</span>
          </Link>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isLoggedIn === true ? (
              <ul className="navbar-nav ms-auto mb-3 mb-lg-0 mt-3 mt-lg-0 align-items-center ">
                <li className="me-3 mb-3 mb-lg-0" id="welcome-text">
                  Welcome <b>{sessionStorage.getItem("firstname")}</b>
                </li>
                <li className="nav-item">
                  <Link to="/create" className="nav-link me-3">
                    <button type="button" className="btn btn-primary">
                      <i className="bi bi-pen"></i>&nbsp;Create
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link me-3">
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
                  <Link to="/myprofile" className="nav-link me-3">
                    <button type="button" className="btn btn-primary">
                      <i className="bi bi-person"></i>&nbsp;My Profile
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link me-3">
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
            ) : (
              <ul className="navbar-nav ms-auto mb-3 mb-lg-0 mt-3 mt-lg-0 align-items-center">
                <li className="nav-item">
                  <Link to="/signup" className="nav-link me-3">
                    <button type="button" className="btn btn-primary ">
                      <i className="bi bi-person-plus"></i>&nbsp;Sign up
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link me-3">
                    <button type="button" className="btn btn-primary">
                      <i className="bi bi-door-open"></i>&nbsp;Log in
                    </button>
                  </Link>
                </li>
              </ul>
            )}
            <form className="d-flex ">
              <input
                type="search"
                className="form-control me-2"
                id="search"
                name="search"
                placeholder="Search by tag, e.g.#username"
                value={search}
                onChange={handleSearchInputChange}
                onKeyDown={handleSearchKeyDown}
              ></input>
            </form>
          </div>
        </div>
      </nav>
      <div className="container">
        <main>
          <Switch>
            <Route exact path="/">
              <Home
                thisPost={thisPost}
                setThisPost={setThisPost}
                refreshList={refreshList}
                setRefreshList={setRefreshList}
                isLoggedIn={isLoggedIn}
                list={list}
                setList={setList}
                pageAt={pageAt}
                setPageAt={setPageAt}
                username={sessionStorage.getItem("username")}
              />
            </Route>
            <Route path="/create">
              <Create
                pageAt={pageAt}
                refreshList={refreshList}
                setRefreshList={setRefreshList}
              />
            </Route>
            <Route path="/update">
              <Update
                thisPost={thisPost}
                setThisPost={setThisPost}
                setList={setList}
                refreshList={refreshList}
                setRefreshList={setRefreshList}
                pageAt={pageAt}
              />
            </Route>
            <Route path="/login">
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route path="/signup">
              <SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route path="/myblog">
              <MyBlog
                thisPost={thisPost}
                setThisPost={setThisPost}
                refreshList={refreshList}
                setRefreshList={setRefreshList}
                // refreshBlogList={refreshBlogList}
                // setRefreshBlogList={setRefreshBlogList}
                isLoggedIn={isLoggedIn}
                list={list}
                setList={setList}
                pageAt={pageAt}
                setPageAt={setPageAt}
                blogList={blogList}
                setBlogList={setBlogList}
                username={sessionStorage.getItem("username")}
              />
            </Route>
            <Route path="/myprofile">
              <MyProfile
                username={sessionStorage.getItem("username")}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;
