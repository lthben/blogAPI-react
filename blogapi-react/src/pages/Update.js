import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { refreshToken } from "../components/RefreshToken";

const Update = (props) => {
  let history = useHistory();
  // props:
  // author: "Mary";
  // content: "lorem ipsum";
  // created_on: "2021-10-20T04:41:12.388510Z";
  // id: "f6dace8b-2d1c-46d2-8280-d3da52387514";
  // slug: "my-second-post";
  // title: "my second post";

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
        Authorization: "Bearer " + localStorage.getItem("access_token"), //Command K, S to save without auto-format
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
        } else if (res === "updated") {
          alert("post updated!");
          props.setRefreshList(!props.refreshList);
          history.push("/");
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

        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author:
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={post.author}
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
    </React.Fragment>
  );
};

export default Update;
