import React, { useState, useEffect } from "react";
import CommentButtons from "./CommentButtons";

const CommentList = (props) => {
  //props: postID, refreshList, setRefreshList, refreshCommentsList, setRefreshCommentsList, isLoggedIn, commentsVisibility ,setCommentsVisibility, username

  const [commentsList, setCommentsList] = useState([]);
  const [numComments, setNumComments] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const getList = async () => {
      const URI =
        "http://localhost:8000/api/comment-list/" + props.postID + "/";
      // console.log("getting comments list ... ");

      await fetch(URI, {
        headers: {
          // Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
        method: "GET",
      })
        .then(async (response) => {
          const res = await response.json();
          // console.log("response: ", response);
          // console.log("res: ", res);
          if (response.status === 200) {
            // console.log("comments list ok");
            if (isMounted) {
              // props.setCommentsVisibility(true); //for testing only
              setCommentsList(res);
              setNumComments(res.length);
            }
          } else {
            console.log("Something went wrong");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (isMounted) getList();

    return () => {
      isMounted = false;
    };
  }, [props.refreshCommentsList]);

  const handleClick = () => {
    props.setCommentsVisibility(!props.commentsVisibility);
  };

  const listJSX = commentsList.map((ele, index) => {
    return (
      <div key={index}>
        &nbsp;&nbsp;&nbsp;&nbsp;'{ele.content}' &nbsp;
        <small>
          <i>
            - {ele.author} on {ele.created_on.substring(0, 10)}{" "}
            {ele.created_on.substring(11, 16)}
          </i>
        </small>{" "}
        <br />
        &nbsp; &nbsp; &nbsp;&nbsp;
        {ele.author === props.username ? (
          <CommentButtons
            comment={ele}
            refreshCommentsList={props.refreshCommentsList}
            setRefreshCommentsList={props.setRefreshCommentsList}
            isLoggedIn={props.isLoggedIn}
          />
        ) : null}
      </div>
    );
  });

  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-link text-decoration-none"
          onClick={handleClick}
        >
          <i className="bi bi-view-list"></i>&nbsp; {numComments}{" "}
          {numComments > 1 ? "comments" : "comment"}
          &nbsp;
          {props.commentsVisibility ? <>&darr;</> : <>&rarr;</>}
        </button>
      </div>
      <div>{props.commentsVisibility ? listJSX : null}</div>
    </>
  );
};

export default CommentList;
