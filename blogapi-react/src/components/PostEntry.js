import { handleDelete } from "./Delete";
import React, { useState } from "react";
import Update from "./Update";
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

  const [showUpdate, setShowUpdate] = useState(false);

  const myHandleDelete = async () => {
    await handleDelete(props.post.id);
    props.setRefreshList(!props.refreshList);
    setShowUpdate(false);
  };

  const handleClick = () => {
    // setShowUpdate(!showUpdate);
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
          <small>created on: {date}</small>
          <br />
          <button
            type="button"
            className="btn-sm btn-secondary mx-1"
            onClick={handleClick}
          >
            update
          </button>
          <button
            type="button"
            className="btn-sm btn-secondary m-2"
            onClick={myHandleDelete}
          >
            delete
          </button>
        </div>
      </div>
      {/* {showUpdate ? (
        <Update
          post={props.post}
          refreshList={props.refreshList}
          setRefreshList={props.setRefreshList}
          setShowUpdate={setShowUpdate}
        />
      ) : null} */}
    </React.Fragment>
  );
};

export default PostEntry;
