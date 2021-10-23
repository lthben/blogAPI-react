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

  const getTokens = async () => {
    await fetch("http://localhost:8000/api/token/", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const res = await response.json();
        console.log("got tokens! ");
        await localStorage.setItem("access_token", res.access);
        await localStorage.setItem("refresh_token", res.refresh);
        console.log("localstorage tokens set!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFirstName = async () => {
    await fetch("http://localhost:8000/user/firstname/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username: data.username }),
    })
      .then(async (response) => {
        const res = await response.json();
        console.log("first name obtained!");
        localStorage.setItem("firstname", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/user/login/", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        setData({
          username: "",
          password: "",
        });
        // const data = await response.json();
        console.log("Login response: ", response);
        const res = await response.json();
        console.log("Login response json: ", res);
        if (response.status !== 200) {
          console.log("failed to login");
          //   console.log(data.status);
          alert(
            "Login failed. Please check that your credentials are correct."
          );
          return Promise.reject("failed to login ");
        }
        await getTokens();

        console.log("successfully logged in: ");

        localStorage.setItem("isLoggedIn", true);

        await getFirstName();

        props.setIsLoggedIn(true);
        alert("Successful login");

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
