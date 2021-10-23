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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/user/signup/", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        setData({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
        });
        // console.log("res: ", typeof response.status);
        if (response.status !== 201) {
          return Promise.reject("failed to sign up ");
        }
        console.log("successfully signed up ");
        props.setIsLoggedIn(true);

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
      <div className="border border-dark" className="registration-box">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <h3>Sign up for an account:</h3>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              value={data.first_name}
              name="first_name"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              value={data.last_name}
              name="last_name"
              onChange={handleInputChange}
            />
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
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={data.email}
              name="email"
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

export default SignUp;
