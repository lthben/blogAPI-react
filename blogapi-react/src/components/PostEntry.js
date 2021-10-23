import { handleDelete } from "./Delete";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// props.post:
// author: "Mary";
// content: "lorem ipsum";
// created_on: "2021-10-20T04:41:12.388510Z";
// id: "f6dace8b-2d1c-46d2-8280-d3da52387514";
// slug: "my-second-post";
// title: "my second post";

// props:
// post = { post }
// refreshList={props.refreshList}
// setRefreshList={props.setRefreshList}
// thisPost={props.thisPost}
// setThisPost={props.setThisPost}
// isLoggedIn={props.isLoggedIn}
// setIsLoggedIn={props.setIsLoggedIn}

const PostEntry = (props) => {
  let history = useHistory();
  let date = props.post.created_on.substring(0, 10);
  let time = props.post.created_on.substring(11, 16);

  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    if (
      props.isLoggedIn === true &&
      props.post.author === localStorage.getItem("firstname")
    ) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
    console.log("in PostEntry, props.isLoggedIn: ", props.isLoggedIn);
    // console.log("vibisility of delete and update buttons: ", visibility);
  }, [props.isLoggedIn]);

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
      <div className="row ">
        <div className="col ">
          <h3 className="mt-3">{props.post.title}</h3>
          <small>
            {props.post.author} &nbsp; {date} &nbsp; {time}
          </small>
          <p className="mt-3">{props.post.content}</p>
          <div className="mb-3">
            <button
              type="button"
              className={
                "btn-sm btn-primary mx-1 " +
                (visibility ? "visible" : "invisible")
              }
              onClick={handleClick}
            >
              update
            </button>
            <button
              type="button"
              className={
                "btn-sm btn-primary mx-1 " +
                (visibility ? "visible" : "invisible")
              }
              onClick={myHandleDelete}
            >
              delete
            </button>
          </div>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default PostEntry;
