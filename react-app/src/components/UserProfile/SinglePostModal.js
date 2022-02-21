import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import SinglePost from './SinglePost';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadAllPosts } from '../../store/posts';
import { loadAllComments } from '../../store/comments';
import { loadAllLikes } from '../../store/likes';
import { useDispatch } from 'react-redux';

function SinglePostModal({ post }) {
  const dispatch = useDispatch()
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const postObj = useSelector(state => state.posts)
  const posts = Object.values(postObj)
  const userPosts = posts.filter(post => post.user_id === +id.id)

  const commentObj = useSelector(state => state.comments)
  const comments = Object.values(commentObj)

  useEffect(() => {
    dispatch(loadAllPosts);
    dispatch(loadAllComments);
    dispatch(loadAllLikes);
  }, [dispatch]);

  return (
    <>
      <button className='single-post-button' onClick={() => setShowModal(true)}><img value={post.id} className='profile-posts' src={post?.photos[0]?.photo} height='200' className='user-profile-post' /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SinglePost setShowModal={setShowModal} post={post}/>
        </Modal>
      )}
    </>
  );
}

export default SinglePostModal;
