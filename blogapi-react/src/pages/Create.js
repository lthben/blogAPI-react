import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { refreshToken } from "../components/RefreshToken";

const Create = (props) => {
  //props: pageAt

  let history = useHistory();

  const [post, setPost] = useState({
    title: "",
    content: "",
    author: sessionStorage.getItem("firstname"),
    slug: "",
  });

  const createPost = async () => {
    const URI = "http://localhost:8000/api/post-create/";
    console.log("creating post: ", post);

    await fetch(URI, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"), //Command K, S to save without auto-format
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(post),
    })
      .then(async (response) => {
        const res = await response.json();
        console.log("Response: ", res);
        if (res.code === "token_not_valid") {
          refreshToken();
          // console.log("calling createPost again ... ");
          createPost();
        } else if (res === "ok") {
          alert("post created!");

          if (props.pageAt === "home") {
            history.push("/");
          } else if (props.pageAt === "blog") history.push("/myblog");
        } else {
          alert("Error creating. Please check all fields are filled in.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // }
  };

  const generateSlug = (title) => {
    let str = title;
    str = str.replace(/[\W_]+/g, "-");
    str = str.toLowerCase();
    return str;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    console.log("name: ", name);
    console.log("value: ", value);

    setPost({
      ...post,
      [name]: value,
      slug: generateSlug(document.querySelector("input[name=title]").value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("check post is properly set here: ", post);
    createPost();
  };

  return (
    <React.Fragment>
      <h1 className="my-3">Create a new post</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={post.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content:
          </label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={post.content}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default Create;
