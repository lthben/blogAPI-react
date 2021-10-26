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
        await sessionStorage.setItem("access_token", res.access);
        await sessionStorage.setItem("refresh_token", res.refresh);
        console.log("sessionStorage tokens set!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserData = async () => {
    await fetch("http://localhost:8000/user/get-user-data/", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username: data.username }),
    })
      .then(async (response) => {
        const res = await response.json();
        console.log("res: ", res);
        console.log("response: ", response);
        // console.log("typeof res", typeof res);
        const myArr = res.split(",");
        sessionStorage.setItem("firstname", myArr[0]);
        sessionStorage.setItem("lastname", myArr[1]);
        sessionStorage.setItem("email", myArr[2]);
        console.log("myArr: ", myArr);
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
        // console.log("Login response: ", response);
        const res = await response.json();
        console.log("res: ", res);
        console.log("response: ", response);
        if (response.status !== 200) {
          console.log("failed to login");
          alert("Error signing in. Please check your credentials.");
          //   console.log(data.status);
          return Promise.reject("failed to login ");
        }
        await getTokens();
        await getUserData();

        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", data.username);
        props.setIsLoggedIn(true);
        console.log("successfully logged in: ");
        // alert("Successful login");

        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="border border-dark registration-box">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
          <div className="mb-4">
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
