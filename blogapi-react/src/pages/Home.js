import React, { useEffect } from "react";
import PostEntry from "../components/PostEntry";

const Home = (props) => {
  //  props: thisPost, setThisPost, refreshList, setRefreshList, isLoggedIn, list, setList, pageAt, setPageAt

  useEffect(() => {
    let isMounted = true;
    props.setPageAt("home");

    const getList = async () => {
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

  // console.log("list: ", props.list);

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
          pageAt={props.pageAt}
          setList={props.setList}
        />
      </div>
    );
  });

  return <div>{allPosts}</div>;
};

export default Home;
