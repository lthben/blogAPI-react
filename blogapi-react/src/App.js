import "./App.css";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyBlog from "./pages/MyBlog";
import MyProfile from "./pages/MyProfile";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

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
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        refreshList={refreshList}
        setRefreshList={setRefreshList}
      />
      <main className="container" id="main-container">
        <Switch>
          <Route exact path="/">
            <SideBar />
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
      <Footer />
    </React.Fragment>
  );
}

export default App;
