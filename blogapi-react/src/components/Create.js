import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

const Create = (props) => {
  // author: "Mary";
  // content: "lorem ipsum";
  // created_on: "2021-10-20T04:41:12.388510Z";
  // id: "f6dace8b-2d1c-46d2-8280-d3da52387514";
  // slug: "my-second-post";
  // title: "my second post";

  //props: refreshList, setRefreshList

  //   let history = useHistory();

  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
    slug: "",
  });

  //   const [isPostDone, setIsPostDone] = useState(false);

  const createPost = async () => {
    // if (isPostDone == true) {
    const URI = "http://localhost:8000/api/post-create/";
    console.log("createPost triggered");
    //   console.log("post: ", post);
    await fetch(URI, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(post),
    })
      .then(async (response) => {
        const res = await response.json();
        console.log("Response: ", res);
        alert("post created!");
        // history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
    // }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    // console.log("name: ", name);
    // console.log("value: ", value);

    setPost({
      ...post,
      [name]: value,
      slug: post.title,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("post chicken here: ", post);
    let str = post.title;
    // let str = "?_ *^ this_is a tEst tiTle=123>";
    str = str.replace(/[\W_]+/g, "-");
    str = str.toLowerCase();
    // console.log("slug: ", str);
    // setPost({
    //   author: "author hi",
    //   title: "title hi",
    //   content: "content hi",
    //   slug: "slug hi",
    // });
    setPost({ ...post, slug: str });
    console.log("check post is set here: ", post);
    createPost();

    props.setRefreshList(!props.refreshList);
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

export default Create;
