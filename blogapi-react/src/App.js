import "./App.css";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import List from "./components/Read";
import logo from "./logo.png";
import Create from "./components/Create";
import Update from "./components/Update";
import React, { useState } from "react";

function App() {
  const [refreshList, setRefreshList] = useState(false);
  const [thisPost, setThisPost] = useState({
    //for initialising the update post
    title: "",
    content: "",
    author: "",
    slug: "",
    id: "",
  });

  return (
    <div className="container">
      <nav>
        <br />
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-md-4 mb-3">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={logo} alt="logo" width="60px" height="60px" />
              <span id="log-site">log Site</span>
            </Link>
          </div>
          <div className="col-md-4 mb-3"></div>
          <div className="col-md-4 mb-3">
            <Link to="/create">
              <button type="button" className="btn btn-primary">
                Create
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <main>
        <Switch>
          <Route exact path="/">
            <List
              thisPost={thisPost}
              setThisPost={setThisPost}
              refreshList={refreshList}
              setRefreshList={setRefreshList}
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
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
