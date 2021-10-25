import { handleDelete } from "./Delete";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

// props.post:
// author: "Mary";
// content: "lorem ipsum";
// created_on: "2021-10-20T04:41:12.388510Z";
// id: "f6dace8b-2d1c-46d2-8280-d3da52387514";
// slug: "my-second-post";
// title: "my second post";

const PostEntry = (props) => {
  // props: post, refreshList, setRefreshList, thisPost, setThisPost, isLoggedIn
  let history = useHistory();
  let date = props.post.created_on.substring(0, 10);
  let time = props.post.created_on.substring(11, 16);

  const [visibility, setVisibility] = useState(false); //update and delete buttons
  const [commentFormVisibility, setCommentFormVisibility] = useState(false); //comment button
  const [refreshCommentsList, setRefreshCommentsList] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isMounted === true) {
      setCommentFormVisibility(props.isLoggedIn);
      if (
        props.isLoggedIn === true &&
        props.post.author === sessionStorage.getItem("username")
      ) {
        setVisibility(true);
      } else {
        setVisibility(false);
      }
    }
    return () => {
      isMounted = false;
    };
    // console.log("in PostEntry, props.isLoggedIn: ", props.isLoggedIn);
    // console.log("vibisility of delete and update buttons: ", visibility);
  }, [props.isLoggedIn, props.refreshList]);

  const myHandleDelete = async () => {
    await handleDelete(props.post.id);
    props.setRefreshList(!props.refreshList);
    history.push("/");
  };

  const handleEditBtn = () => {
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
      <div className="row">
        <div className="col">
          <div className="row align-items-center">
            <h3 className="col mt-3">{props.post.title} </h3>
            <div className="col text-end">
              <button
                type="button"
                className={
                  "btn-sm btn-primary mx-1 " +
                  (visibility ? "visible" : "invisible")
                }
                onClick={handleEditBtn}
              >
                edit
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
          <small>
            <i>
              - {props.post.author} on {date} {time}
            </i>
          </small>

          <p className="mt-3">{props.post.content}</p>
          <div className="row mb-3">
            <div className="col">
              <CommentForm
                commentFormVisibility={commentFormVisibility}
                postID={props.post.id}
                refreshCommentsList={refreshCommentsList}
                setRefreshCommentsList={setRefreshCommentsList}
              />
            </div>
            <div className="col text-end ">
              <CommentList
                postID={props.post.id}
                refreshCommentsList={refreshCommentsList}
                setRefreshCommentsList={setRefreshCommentsList}
                isLoggedIn={props.isLoggedIn}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default PostEntry;
