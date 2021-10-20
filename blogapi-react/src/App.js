import "./App.css";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import List from "./components/Read";
import logo from "./logo.png";
import Create from "./components/Create";
import Update from "./components/Update";

function App() {
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
      <main>
        <Switch>
          <Route exact path="/">
            <List />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/update">
            <Update />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
