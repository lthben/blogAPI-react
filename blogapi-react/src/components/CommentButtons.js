import React, { useState } from "react";
import { refreshToken } from "./RefreshToken";

const CommentButtons = (props) => {
  //props: comment, refreshCommentsList, setRefreshCommentsList
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState({ ...props.comment });

  const handleEditBtn = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    const URI =
      "http://localhost:8000/api/comment-delete/" + props.comment.id + "/";
    await fetch(URI, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then(async (response) => {
        const res = await response.json();
        console.log("Response: ", res);
        if (res.code === "token_not_valid") {
          refreshToken();
          await handleDelete();
        } else {
          console.log("comment deleted!");
          props.setRefreshCommentsList(!props.refreshCommentsList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    setComment({ ...props.comment, content: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
      editComment();
    }
  };

  const editComment = async () => {
    const URI =
      "http://localhost:8000/api/comment-update/" + props.comment.id + "/";
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
        console.log("res: ", res);
        console.log("response: ", response);
        if (res.code === "token_not_valid") {
          refreshToken();
          editComment();
        } else if (response.status === 200) {
          console.log("comment updated");
          props.setRefreshCommentsList(!props.refreshCommentsList);
        } else {
          alert("error updating. Please try again.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // }
  };

  const buttonsJSX = (
    <div className="btn-group btn-group-sm" role="group">
      <button
        type="button"
        className="btn btn-link text-decoration-none"
        onClick={handleEditBtn}
      >
        Edit
      </button>
      <button
        type="button"
        className="btn btn-link text-decoration-none"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );

  const inputJSX = (
    <form>
      <div className="input-group input-group-sm mb-1">
        <input
          type="text"
          className="form-control"
          id="content"
          name="content"
          value={comment.content}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        ></input>
      </div>
    </form>
  );

  return <>{isEditing ? inputJSX : buttonsJSX}</>;
};

export default CommentButtons;
