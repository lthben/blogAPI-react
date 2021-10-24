import React, { useState } from "react";
import PostComment from "./CommentForm";

const CommentBtn = (props) => {
  const [formVisibility, setFormVisibility] = useState(false);

  const handleClick = () => {
    setFormVisibility(!formVisibility);
  };

  return (
    <>
      <button
        type="button"
        className={
          "btn-sm btn-primary mx-1 " +
          (props.commentBtnVisibility ? "visible" : "invisible")
        }
        onClick={handleClick}
      >
        comment
      </button>
      <PostComment formVisibility={formVisibility} />
    </>
  );
};

export default CommentBtn;
