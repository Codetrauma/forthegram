import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../store/posts';
import Comments from './Comments';
import EditCaption from '../PostModal/EditPostModal'

const Captions = ({ post }) => {
  const dispatch = useDispatch();
  console.log(post)
  const sessionUser = useSelector(state => state.session.user);


  const handleDelete = async (e) => {
    e.preventDefault();
    const id = e.target.value;
    return;
  }

  return (
    <div>
      <h3>{post.caption}</h3>
      {sessionUser?.id === post.user_id ? <EditCaption /> : <></>}
      {sessionUser?.id === post.user_id ? <button>Delete Post</button> : <></>}
    </div>
  )

  }

export default Captions
