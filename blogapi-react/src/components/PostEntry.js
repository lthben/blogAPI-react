import { handleDelete } from "./Delete";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const PostEntry = (props) => {
  // props: post, refreshList, setRefreshList, refreshCommentsList, setRefreshCommentsList, thisPost, setThisPost, isLoggedIn, pageAt, username
  let history = useHistory();
  let date = props.post.created_on.substring(0, 10);
  let time = props.post.created_on.substring(11, 16);

  const [editBtnVisibility, setEditBtnVisibility] = useState(false); //update and delete buttons
  const [commentFormVisibility, setCommentFormVisibility] = useState(false); //comment input field
  const [commentsVisibility, setCommentsVisibility] = useState(false);
  const [triggerOne, setTriggerOne] = useState(false); //not a real state, just to trigger a series of useEffect
  const [triggerTwo, setTriggerTwo] = useState(false); //not a real state, just to trigger a series of useEffect

  useEffect(() => {
    let isMounted = true;

    if (isMounted === true) {
      setCommentFormVisibility(props.isLoggedIn);
      setTriggerOne(!triggerOne);
    }
    return () => {
      isMounted = false;
    };
    // console.log("in PostEntry, props.isLoggedIn: ", props.isLoggedIn);
    // console.log("vibisility of delete and update buttons: ", visibility);
  }, [props.isLoggedIn, props.refreshList]);

  useEffect(() => {
    //update editBtnVisibility on next state change cos sometimes not appear on first render
    let isMounted = true;
    if (isMounted) {
      setTriggerTwo(!triggerTwo);
      if (props.isLoggedIn === true && props.post.author === props.username) {
        setEditBtnVisibility(true);
      } else {
        setEditBtnVisibility(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [triggerOne]); //to fix bug: MyBlog editBtn sometimes don't appear, so re-render this components

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      props.setRefreshCommentsList(!props.refreshCommentsList); //force the comments list to re-render
    }
    return () => {
      isMounted = false;
    };
  }, [triggerTwo]);

  const myHandleDelete = async () => {
    await handleDelete(props.post.id);
    console.log("pageAt in PostEntry Delete: ", props.pageAt);
    props.setRefreshList(!props.refreshList);

    if (props.pageAt === "home") {
      history.push("/");
    } else if (props.pageAt === "blog") {
      history.push("/myblog");
    }
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
                  "btn-sm btn-secondary mx-1 " +
                  (editBtnVisibility ? "visible" : "invisible")
                }
                onClick={handleEditBtn}
              >
                <i className="bi bi-pen-fill"></i>
              </button>
              <button
                type="button"
                className={
                  "btn-sm btn-secondary mx-1 " +
                  (editBtnVisibility ? "visible" : "invisible")
                }
                onClick={myHandleDelete}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
          <small>
            <i>
              - {props.post.author} on {date} {time}
            </i>
          </small>

          <p className="my-4">{props.post.content}</p>
          <p>
            Tags:&nbsp;
            <i>
              #{props.post.author} #{props.post.slug}
            </i>
          </p>

          <div className="row mb-3">
            <div className="col-lg-6 text-start ">
              <CommentList
                postID={props.post.id}
                refreshCommentsList={props.refreshCommentsList}
                setRefreshCommentsList={props.setRefreshCommentsList}
                isLoggedIn={props.isLoggedIn}
                commentsVisibility={commentsVisibility}
                setCommentsVisibility={setCommentsVisibility}
                username={props.username}
                refreshList={props.refreshList}
                setRefreshList={props.setRefreshList}
              />
            </div>
            <div className="col-lg-6 text-end">
              <CommentForm
                commentFormVisibility={commentFormVisibility}
                postID={props.post.id}
                refreshCommentsList={props.refreshCommentsList}
                setRefreshCommentsList={props.setRefreshCommentsList}
                setCommentsVisibility={setCommentsVisibility}
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
