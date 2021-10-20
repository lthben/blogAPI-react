import "./App.css";
// import React, { createContext } from "react";
// import { Route, Link, Redirect } from "react-router-dom";
import List from "./components/List";
import logo from "./logo.png";

function App() {
  return (
    <div className="container">
      <nav>
        <br />
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-md-4 mb-3">
            <img src={logo} alt="logo" width="60px" height="60px" />
          </div>
          <div className="col-md-6 mb-3"></div>
          <div className="col-md-2 mb-3">
            <button type="button" className="btn btn-primary">
              Post
            </button>
          </div>
        </div>
      </nav>
      <List />
      {/* <DataContext.Provider value={userData}>
        <ComponentA />
        <ComponentE />
      </DataContext.Provider> */}
    </div>
  );
}

export default App;
// export const DataContext = createContext();
