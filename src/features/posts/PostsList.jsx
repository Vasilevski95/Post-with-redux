import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  //useSelector is a function that takes the current state as an argument
  //and returns whatever data you want from it.

  //I receive as an argument selectAllPosts, because if I change the shape of a state
  //I just need to change it in the slice, not in every component

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  //I check postStatus if its idle, and if it is I'am dispatching fetchPosts async thunk

  let content;
  if (postStatus === "idle") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
