import React, { useState, useEffect } from "react";
import Post from "./Post";

const List = () => {
  const [list, setList] = useState([]);

  const getList = async () => {
    const URI = "http://localhost:8000/api/post-list/";
    await fetch(URI, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    })
      .then(async (response) => {
        const data = await response.json();
        setList(data);
        console.log("Data: ", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const allPosts = list.map((post, index) => {
    return (
      <div className="container" key={index}>
        <Post post={post} />
      </div>
    );
  });

  return <div>{allPosts}</div>;
};

export default List;
