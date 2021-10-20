import "./App.css";
import React, { useState, createContext } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import List from "./components/List";
import logo from "./logo.png";
import Create from "./components/Create";

function App() {
  const [refreshList, setRefreshList] = useState(false);

  return (
    <div className="container">
      <nav>
        <br />
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-md-4 mb-3">
            <Link to="/">
              <img src={logo} alt="logo" width="60px" height="60px" />
            </Link>
          </div>
          <div className="col-md-6 mb-3"></div>
          <div className="col-md-2 mb-3">
            <Link to="/create">
              <button type="button" className="btn btn-primary">
                Post
              </button>
            </Link>
          </div>
        </div>
      </nav>
      {/* <DataContext.Provider value={userData}>
        <ComponentA />
        <ComponentE />
      </DataContext.Provider> */}
      <main>
        <Route exact path="/">
          <List />
        </Route>
        <Route path="/create">
          <Create refreshList={refreshList} setRefreshList={setRefreshList} />
        </Route>
      </main>
    </div>
  );
}

export default App;
// export const DataContext = createContext();
