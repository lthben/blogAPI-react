import React, { useState } from "react";
import PostComment from "./PostComment";

const CommentBtn = (props) => {
  const [visibility, setVisibility] = useState(false);

  const handleClick = () => {
    setVisibility(!visibility);
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
      <PostComment visibility={visibility} />
    </>
  );
};

export default CommentBtn;
