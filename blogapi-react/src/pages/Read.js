import React, { useState, useEffect } from "react";
import PostEntry from "../components/PostEntry";

const List = (props) => {
  const [list, setList] = useState([]);

  //  thisPost = { thisPost };
  //  setThisPost = { setThisPost };
  //  refreshList = { refreshList };
  //  setRefreshList = { setRefreshList };
  //  isLoggedIn = { isLoggedIn };

  useEffect(() => {
    getList();
  }, [props.refreshList, props.isLoggedIn]);

  const getList = async () => {
    console.log("getList in Read.js called ... ");

    const URI = "http://localhost:8000/api/post-list/";
    await fetch(URI, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    })
      .then(async (response) => {
        const data = await response.json();
        setList(data);
        // console.log("In Read.js: Data: ", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const allPosts = list.map((post, index) => {
    return (
      <div className="container" key={index}>
        <PostEntry
          post={post}
          refreshList={props.refreshList}
          setRefreshList={props.setRefreshList}
          thisPost={props.thisPost}
          setThisPost={props.setThisPost}
          isLoggedIn={props.isLoggedIn}
        />
      </div>
    );
  });

  return <div>{allPosts}</div>;
};

export default List;
