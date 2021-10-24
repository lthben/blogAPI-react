import React, { useState, useEffect } from "react";
import { refreshToken } from "./RefreshToken";

const CommentList = (props) => {
  //props: postID, refreshCommentsList

  const [visibility, setVisibility] = useState(false);
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    getList();
  }, [props.refreshCommentsList]);

  // console.log("postID: ", props.postID);

  const getList = async () => {
    const URI = "http://localhost:8000/api/comment-list/" + props.postID + "/";
    console.log("getting comments list ... ");

    await fetch(URI, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"), //Command K, S to save without auto-format
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
          console.log("list ok");
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

  // const listJSX = <h1>hello</h1>;

  const listJSX = commentsList.map((ele, index) => {
    return (
      <div key={index}>
        <small>
          {ele.content} &nbsp;
          <i>
            - {ele.author} on {ele.created_on.substring(0, 10)}{" "}
            {ele.created_on.substring(11, 16)}
          </i>
        </small>
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
          Comments
        </button>
      </div>
      <div className={visibility ? "visible" : "invisible"}>{listJSX}</div>
    </>
  );
};

export default CommentList;
