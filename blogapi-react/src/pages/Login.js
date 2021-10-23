import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  let history = useHistory();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  };

  const getTokens = () => {
    fetch("http://localhost:8000/api/token/", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const res = await response.json();
        console.log("get token response: ", res);
        localStorage.setItem("access_token", res.access);
        localStorage.setItem("refresh_token", res.refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/user/login/", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        setData({
          username: "",
          password: "",
        });
        // const data = await response.json();
        console.log(response);
        if (response.status !== 200) {
          console.log("failed to login");
          //   console.log(data.status);
          alert(
            "Login failed. Please check that your credentials are correct."
          );
          return Promise.reject("failed to login ");
        }
        console.log("successfully logged in: ");
        props.setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        console.log(
          "local stroage at login set: ",
          localStorage.getItem("isLoggedIn")
        );
        alert("Successful login");

        getTokens();

        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="border border-dark" className="registration-box">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <h3>Please log in</h3>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              User name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              value={data.username}
              name="username"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={data.password}
              name="password"
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
