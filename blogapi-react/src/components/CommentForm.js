import React, { useEffect, useState, useRef } from "react";
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
  const [like, setLike] = useState(false);

  const inputEl = useRef(null);

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
      setInputVisibility(false);
    }
  };

  const handleCommentBtn = () => {
    setInputVisibility(!inputVisibility);
  };

  useEffect(() => {
    if (inputVisibility) {
      inputEl.current.focus();
    }
  }, [inputVisibility]);

  const handleLikeBtn = (e) => {
    setLike(!like);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted === true) {
      if (like) setRandNum(randNum + 1);
      else setRandNum(randNum - 1);
    }
    return () => {
      isMounted = false;
    };
  }, [like]);

  return (
    <div className={props.commentFormVisibility ? "visible" : "invisible"}>
      {randNum} Likes &nbsp;
      <div className="btn-group btn-group-sm mb-1">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleLikeBtn}
          data-bs-toggle="button"
        >
          <i className="bi bi-hand-thumbs-up"></i>&nbsp;Like
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleCommentBtn}
        >
          <i className="bi bi-chat-dots"></i>&nbsp;Comment
        </button>
      </div>
      {inputVisibility ? (
        <form>
          <div className="input-group my-3">
            <input
              type="text"
              className="form-control"
              id="content"
              ref={inputEl}
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
