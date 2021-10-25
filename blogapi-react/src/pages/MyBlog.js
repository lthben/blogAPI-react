import React, { useEffect } from "react";
import PostEntry from "../components/PostEntry";

const MyBlog = (props) => {
  //props: list, blogList, setBlogList, isLoggedIn, thisPost, setThisPost, username, refreshList, setRefreshList

  useEffect(() => {
    let isMounted = true;
    console.log("MyBlog page reached");
    const setMyBlogList = () => {
      console.log("setMyBlogList activated");
      const myList = props.list.filter((ele, ind) => {
        return ele.author === props.username;
      });
      if (isMounted) props.setBlogList(myList);
    };
    setMyBlogList();

    return () => {
      isMounted = false;
    };
  }, [props.refreshList, props.isLoggedIn]);

  //   console.log("bloglist: ", props.blogList);
  //   console.log("username: ", props.username);

  const allBlogPosts = props.blogList.map((post, index) => {
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

  return <div>{allBlogPosts}</div>;
};

export default MyBlog;
