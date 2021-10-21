import React, { useState, useEffect } from "react";
import PostEntry from "./PostEntry";

const List = (props) => {
  const [list, setList] = useState([]);

  // props:
  // const [refreshList, setRefreshList] = useState(false);

  const getList = async () => {
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

  useEffect(() => {
    getList();
  }, [props.refreshList]);

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
          setIsLoggedIn={props.setIsLoggedIn}
        />
      </div>
    );
  });

  return <div>{allPosts}</div>;
};

export default List;
