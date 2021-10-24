import React, { useState } from "react";

const CommentForm = (props) => {
  //props: formVisibility

  const [comment, setComment] = useState({
    content: "",
    author: sessionStorage.getItem("firstname"),
  });

  return <React.Fragment></React.Fragment>;
};

export default CommentForm;
