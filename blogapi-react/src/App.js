import "./App.css";
import { Route, Link, Redirect, Switch } from "react-router-dom";
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

  useEffect(() => {
    // setUsername(sessionStorage.getItem("username"));
    const loginStatus = sessionStorage.getItem("isLoggedIn");
    if (loginStatus === "true") setIsLoggedIn(true);
    else setIsLoggedIn(false);
    // console.log("in App useEffect, isLoggedIn: ", loginStatus);
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
          <UserButtons
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            refreshList={refreshList}
            setRefreshList={setRefreshList}
          />
        </div>
      </nav>
      <hr />
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
            <Create pageAt={pageAt} />
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
  );
}

export default App;
