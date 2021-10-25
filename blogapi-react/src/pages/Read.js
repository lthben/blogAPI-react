import React, { useState, useEffect } from "react";
import PostEntry from "../components/PostEntry";

const List = (props) => {
  //  props: thisPost, setThisPost, refreshList, setRefreshList, isLoggedIn, list, setList

  useEffect(() => {
    let isMounted = true;
    // console.log("getList in Read.js called ... ");
    const getList = async () => {
      const URI = "http://localhost:8000/api/post-list/";
      await fetch(URI, {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      })
        .then(async (response) => {
          const data = await response.json();
          if (isMounted) props.setList(data);
          console.log("In Read.js: Data: ", data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getList();
    return () => {
      isMounted = false;
    };
  }, [props.refreshList, props.isLoggedIn]);

  const allPosts = props.list.map((post, index) => {
    return (
      <div key={index}>
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
