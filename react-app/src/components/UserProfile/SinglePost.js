import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';
import { loadAllComments } from '../../store/comments';


function SinglePost() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllPosts());
    dispatch(loadAllComments());
  }, [dispatch]);


  return (
    <div>
      <h1>Single Post</h1>
    </div>
  );
}


export default SinglePost;
