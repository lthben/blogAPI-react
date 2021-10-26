import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
  let history = useHistory();

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/user/signup/", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        setData({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
        });
        // const res = await response.json();
        console.log("sign up response: ", response);
        if (response.status !== 201) {
          alert("Failed to sign up. Username already exists.");
          return Promise.reject("failed to sign up ");
        }
        console.log("successfully signed up ");
        // props.setIsLoggedIn(true);

        alert(
          "Successful sign up. Please proceed to log in with the same credentials."
        );
        history.push("/login");
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
            <h3>Sign up for an account</h3>
          </div>

          <div className="mb-3">
            <label className="form-label">
              User name (cannot be changed later)
            </label>
            <input
              type="text"
              className="form-control"
              value={data.username}
              name="username"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">First name</label>
            <input
              type="text"
              className="form-control"
              value={data.first_name}
              name="first_name"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last name</label>
            <input
              type="text"
              className="form-control"
              value={data.last_name}
              name="last_name"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={data.email}
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
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

export default SignUp;
