import React from "react";

const CommentBtn = (props) => {
  const handleClick = () => {};

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
    </>
  );
};

export default CommentBtn;
