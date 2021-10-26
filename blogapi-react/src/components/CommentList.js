import React, { useState, useEffect } from "react";
import { refreshToken } from "./RefreshToken";
import CommentButtons from "./CommentButtons";

const CommentList = (props) => {
  //props: postID, refreshCommentsList, setRefreshCommentsList, isLoggedIn, commentsVisibility ,setCommentsVisibility

  // const [visibility, setVisibility] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    let isMounted = true;
    setUsername(sessionStorage.getItem("username"));
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
            if (isMounted) setCommentsList(res);
          } else {
            console.log("Something went wrong");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getList();

    return () => {
      isMounted = false;
    };
  }, [props.refreshCommentsList]);

  // console.log("postID: ", props.postID);

  const handleClick = () => {
    props.setCommentsVisibility(!props.commentsVisibility);
  };

  const listJSX = commentsList.map((ele, index) => {
    return (
      <div key={index}>
        '{ele.content}' &nbsp;
        <small>
          <i>
            - {ele.author} on {ele.created_on.substring(0, 10)}{" "}
            {ele.created_on.substring(11, 16)}
          </i>
        </small>{" "}
        <br />
        {ele.author === username ? (
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
          <i class="bi bi-view-list"></i>&nbsp; All comments &nbsp;
          {props.commentsVisibility ? <>&darr;</> : <>&rarr;</>}
        </button>
      </div>
      <div>{props.commentsVisibility ? listJSX : null}</div>
    </>
  );
};

export default CommentList;
