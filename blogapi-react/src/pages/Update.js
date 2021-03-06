import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { refreshToken } from "../components/RefreshToken";

const Update = (props) => {
  let history = useHistory();
  // props: thisPost, setThisPost, pageAt, refreshList, setRefreshList

  const [post, setPost] = useState({
    title: props.thisPost.title,
    content: props.thisPost.content,
    author: props.thisPost.author,
    slug: props.thisPost.slug,
  });

  const updatePost = async () => {
    const URI =
      "http://localhost:8000/api/post-update/" + props.thisPost.id + "/";
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
          updatePost();
        } else if (res === "post updated") {
          // alert("post updated!");
          props.setRefreshList(!props.refreshList);
          // console.log("pageAt in Update: ", props.pageAt);

          if (props.pageAt === "home") {
            history.push("/");
          } else if (props.pageAt === "blog") history.push("/myblog");
        } else {
          alert("error updating. Please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("check post is properly set here: ", post);
    await updatePost();
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

  return (
    <React.Fragment>
      <h1 className="my-3">Edit your post</h1>
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

export default Update;
