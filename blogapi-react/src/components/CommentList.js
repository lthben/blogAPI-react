import React, { useState, useEffect } from "react";
import { refreshToken } from "./RefreshToken";
import CommentButtons from "./CommentButtons";

const CommentList = (props) => {
  //props: postID, refreshCommentsList, setRefreshCommentsList

  const [visibility, setVisibility] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    getList();
    setUsername(sessionStorage.getItem("username"));
  }, [props.refreshCommentsList]);

  // console.log("postID: ", props.postID);

  const getList = async () => {
    const URI = "http://localhost:8000/api/comment-list/" + props.postID + "/";
    console.log("getting comments list ... ");

    await fetch(URI, {
      headers: {
        // Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        const res = await response.json();
        console.log("response: ", response);
        console.log("res: ", res);
        if (res.code === "token_not_valid") {
          refreshToken();
          getList();
        } else if (response.status === 200) {
          console.log("comments list ok");
          setCommentsList(res);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = () => {
    setVisibility(!visibility);
  };

  const listJSX = commentsList.map((ele, index) => {
    return (
      <div key={index}>
        <small>
          {ele.content} &nbsp;
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
          Comments {visibility ? <>&darr;</> : <>&rarr;</>}
        </button>
      </div>
      <div>{visibility ? listJSX : null}</div>
    </>
  );
};

export default CommentList;
