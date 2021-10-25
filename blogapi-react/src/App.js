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
            <List
              thisPost={thisPost}
              setThisPost={setThisPost}
              refreshList={refreshList}
              setRefreshList={setRefreshList}
              isLoggedIn={isLoggedIn}
              list={list}
              setList={setList}
            />
          </Route>
          <Route path="/create">
            <Create />
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
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/signup">
            <SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/myblog">
            <MyBlog
              list={list}
              blogList={blogList}
              setBlogList={setBlogList}
              isLoggedIn={isLoggedIn}
              thisPost={thisPost}
              setThisPost={setThisPost}
              username={sessionStorage.getItem("username")}
              refreshList={refreshList}
              setRefreshList={setRefreshList}
            />
          </Route>
          <Route path="/myprofile">
            <MyProfile />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
