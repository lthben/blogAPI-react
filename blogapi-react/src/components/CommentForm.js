import React, { useState } from "react";
import { refreshToken } from "./RefreshToken";

const CommentForm = (props) => {
  //props: commentFormVisibility, postID, setRefreshCommentsList, refreshCommentsList, setCommentsVisibility

  const [comment, setComment] = useState({
    author: sessionStorage.getItem("username"),
    post_id: props.postID,
    content: "",
  });

  // console.log("postID: ", props.postID);

  const createComment = async () => {
    const URI = "http://localhost:8000/api/comment-create/";
    console.log("creating comment: ", comment.content);

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
    setComment({ ...comment, content: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // console.log("comment: ", comment.content);
      createComment();
    }
  };

  return (
    <div className={props.commentFormVisibility ? "visible" : "invisible"}>
      <form>
        <div className="input-group input-group-sm mb-3">
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
    </div>
  );
};

export default CommentForm;
