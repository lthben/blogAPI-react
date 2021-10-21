import { handleDelete } from "./Delete";
import React from "react";
import { useHistory } from "react-router-dom";

// props.post:
// author: "Mary";
// content: "lorem ipsum";
// created_on: "2021-10-20T04:41:12.388510Z";
// id: "f6dace8b-2d1c-46d2-8280-d3da52387514";
// slug: "my-second-post";
// title: "my second post";

//props: refreshList, setRefreshList
//props: thisPost, setThisPost

const PostEntry = (props) => {
  let history = useHistory();
  let date = props.post.created_on.substring(0, 10);
  let time = props.post.created_on.substring(11, 16);

  const myHandleDelete = async () => {
    await handleDelete(props.post.id);
    props.setRefreshList(!props.refreshList);
  };

  const handleClick = () => {
    props.setThisPost({
      title: props.post.title,
      content: props.post.content,
      author: props.post.author,
      slug: props.post.slug,
      id: props.post.id,
    });
    history.push("/update");
  };

  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col">
          <h3 className="mb-3">{props.post.title}</h3>
          <p>{props.post.content}</p>
          <small>author: {props.post.author}</small>
          <br />
          <small>
            created on: {date} {time}
          </small>
          <br />
          <button
            type="button"
            className="btn-sm btn-primary mx-1"
            onClick={handleClick}
            disabled={!props.isLoggedIn}
          >
            update
          </button>
          <button
            type="button"
            className="btn-sm btn-primary m-2"
            onClick={myHandleDelete}
            disabled={!props.isLoggedIn}
          >
            delete
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostEntry;
