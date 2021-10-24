import "./App.css";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import List from "./pages/Read";
import logo from "./logo.png";
import Create from "./pages/Create";
import Update from "./pages/Update";
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserButtons from "./components/UserButtons";

function App() {
  // const [accessToken, setAccessToken] = useState("");
  // const [refreshToken, setRefreshToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [thisPost, setThisPost] = useState({
    //for initialising the update post
    title: "",
    content: "",
    author: "",
    slug: "",
    id: "",
  });

  useEffect(() => {
    const loginStatus = sessionStorage.getItem("isLoggedIn");
    if (loginStatus === "true") setIsLoggedIn(true);
    else setIsLoggedIn(false);
    console.log("in App useEffect, isLoggedIn: ", loginStatus);

    return function cleanup() {
      sessionStorage.clear();
    };
  }, []);

  return (
    <div className="container">
      <nav className="row my-3 align-items-center">
        <div className="col-md-4  text-start">
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={logo} alt="logo" width="60px" height="60px" />
            <span id="log-site">log Site</span>
          </Link>
        </div>
        <div className="col-md-8 text-end">
          <UserButtons isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      </nav>
      <hr />
      <main>
        <Switch>
          <Route exact path="/">
            <List
              thisPost={thisPost}
              setThisPost={setThisPost}
              refreshList={refreshList}
              setRefreshList={setRefreshList}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route path="/create">
            <Create
            // accessToken={accessToken}
            />
          </Route>
          <Route path="/update">
            <Update
              thisPost={thisPost}
              setThisPost={setThisPost}
              refreshList={refreshList}
              setRefreshList={setRefreshList}
            />
          </Route>
          <Route path="/login">
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              // accessToken={accessToken}
              // refreshToken={refreshToken}
              // setAccessToken={setAccessToken}
              // setRefreshToken={setRefreshToken}
            />
          </Route>
          <Route path="/signup">
            <SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
