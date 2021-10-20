import React from "react";

// author: "Mary";
// content: "lorem ipsum";
// created_on: "2021-10-20T04:41:12.388510Z";
// id: "f6dace8b-2d1c-46d2-8280-d3da52387514";
// slug: "my-second-post";
// title: "my second post";

const Post = (props) => {
  let date = props.post.created_on.substring(0, 10);

  console.log(typeof props.post.created_on);
  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col">
          <h3>{props.post.title}</h3>
          <p>{props.post.content}</p>
          <small>author: {props.post.author}</small>
          <br />
          <small>created on: {date}</small>
          <br />
          <button type="button" className="btn-sm btn-secondary mx-1">
            update
          </button>
          <button type="button" className="btn-sm btn-secondary m-2">
            delete
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Post;
