import React, { useEffect, useState } from "react";
import PostEntry from "../components/PostEntry";

const MyBlog = (props) => {
  //props: list, setList, blogList, setBlogList, isLoggedIn, thisPost, setThisPost, username, refreshList, setRefreshList, refreshCommentsList, setRefreshCommentsList, pageAt, setPageAt

  useEffect(() => {
    let isMounted = true;
    props.setPageAt("blog");

    const getList = async () => {
      // console.log("getList activated!");
      const URI = "http://localhost:8000/api/post-list/";
      await fetch(URI, {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      })
        .then(async (response) => {
          const data = await response.json();
          if (isMounted) props.setList(data);
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

  useEffect(() => {
    let isMounted = true;
    const setMyBlogList = () => {
      // console.log("setMyBlogList activated");
      const bList = props.list.filter((ele, ind) => {
        return ele.author === props.username;
      });
      if (isMounted) props.setBlogList(bList);
    };
    setMyBlogList();

    return () => {
      isMounted = false;
    };
  }, [props.list]);

  // console.log("bloglist: ", props.blogList);
  //   console.log("username: ", props.username);

  const allBlogPosts = props.blogList.map((post, index) => {
    return (
      <div key={index}>
        <PostEntry
          post={post}
          setList={props.setList}
          refreshList={props.refreshList}
          setRefreshList={props.setRefreshList}
          thisPost={props.thisPost}
          setThisPost={props.setThisPost}
          isLoggedIn={props.isLoggedIn}
          pageAt={props.pageAt}
          username={props.username}
          refreshCommentsList={props.refreshCommentsList}
          setRefreshCommentsList={props.setRefreshCommentsList}
        />
      </div>
    );
  });

  return <div>{allBlogPosts}</div>;
};

export default MyBlog;
