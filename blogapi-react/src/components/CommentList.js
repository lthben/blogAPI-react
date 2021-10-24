import React from "react";

const CommentList = (props) => {
  const handleClick = () => {};

  //props.slug
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-link text-decoration-none"
        onClick={handleClick}
      >
        Comments
      </button>
    </React.Fragment>
  );
};

export default CommentList;
