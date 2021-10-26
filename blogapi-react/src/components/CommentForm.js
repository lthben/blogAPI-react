import React, { useState } from "react";
import { refreshToken } from "./RefreshToken";

const CommentForm = (props) => {
  //props: commentFormVisibility, postID, setRefreshCommentsList, refreshCommentsList, setCommentsVisibility

  const [comment, setComment] = useState({
    author: sessionStorage.getItem("username"),
    post_id: props.postID,
    content: "",
  });
  const [randNum, setRandNum] = useState(Math.round(Math.random() * 50));
  const [inputVisibility, setInputVisibility] = useState(false);

  const createComment = async () => {
    const URI = "http://localhost:8000/api/comment-create/";
    console.log("creating comment: ", comment);

    await fetch(URI, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"), //Command K, S to save without auto-format
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(comment),
    })
      .then(async (response) => {
        const res = await response.json();
        console.log("response: ", response);
        console.log("res: ", res);
        if (res.code === "token_not_valid") {
          refreshToken();
          createComment();
        } else if (res === "ok") {
          console.log("comment created!");
          setComment({ ...comment, content: "" });
          props.setRefreshCommentsList(!props.refreshCommentsList);
          props.setCommentsVisibility(true);
        } else {
          alert("Error creating. Please check all fields are filled in.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    setComment({ ...comment, content: e.target.value, post_id: props.postID });
    console.log("postID: ", props.postID);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // console.log("comment: ", comment.content);
      createComment();
    }
  };

  const handleCommentBtn = () => {
    setInputVisibility(!inputVisibility);
  };

  return (
    <div className={props.commentFormVisibility ? "visible" : "invisible"}>
      {randNum} Likes &nbsp;
      <div className="btn-group mb-1 ">
        <button type="button" className="btn btn-link text-decoration-none">
          Like
        </button>{" "}
        &nbsp;{" "}
        <button
          type="button"
          className="btn btn-link text-decoration-none"
          onClick={handleCommentBtn}
        >
          Comment
        </button>
      </div>
      {inputVisibility ? (
        <form>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="content"
              name="content"
              placeholder="Write a comment ..."
              value={comment.content}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            ></input>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default CommentForm;
