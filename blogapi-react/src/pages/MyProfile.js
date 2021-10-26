import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { refreshToken } from "../components/RefreshToken";

const MyProfile = (props) => {
  // props: username, isLoggedIn, setIsLoggedIn
  let history = useHistory();

  const [data, setData] = useState({
    first_name: sessionStorage.getItem("firstname"),
    last_name: sessionStorage.getItem("lastname"),
    email: sessionStorage.getItem("email"),
    password: "",
    password1: "",
    password2: "",
  });

  useEffect(() => {
    if (data.password1 === data.password2) {
      setData({ ...data, password: data.password1 });
    }
  }, [data.password1, data.password2]);

  const handleLogout = () => {
    props.setIsLoggedIn(false);
    sessionStorage.clear();
    history.push("/");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  };

  const setUserData = async () => {
    const URI =
      "http://localhost:8000/user/set-user-data/" + props.username + "/";

    await fetch(URI, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const res = await response.json();
        // console.log("response: ", response);
        // console.log("res: ", res);
        if (res.code === "token_not_valid") {
          refreshToken();
          setUserData();
        }
        if (response.status === 200) {
          console.log("user data updated successfully");
          alert("Profile updated successfully. Please log in again.");
          handleLogout();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password1 !== data.password2) {
      alert("Passwords do not match! Please re-enter.");
      setData({ ...data, password1: "", password2: "" });
      return;
    } else {
      console.log("data to be sent: ", data);
    }
    setUserData();
  };

  return (
    <React.Fragment>
      <div className="border border-dark registration-box">
        <h3 className="mb-4">Edit your personal particulars</h3>
        <form>
          <div className="mb-3">
            <label className="form-label">User name (cannot be changed)</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={props.username}
              disabled={true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">First name</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={data.first_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last name</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={data.last_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={data.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New password</label>
            <input
              type="text"
              className="form-control"
              name="password1"
              value={data.password1}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Re-enter new password</label>
            <input
              type="text"
              className="form-control"
              name="password2"
              value={data.password2}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
