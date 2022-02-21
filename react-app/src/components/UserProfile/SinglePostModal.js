import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SinglePost from './SinglePost';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function SinglePostModal({ post }) {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const postObj = useSelector(state => state.posts)
  const posts = Object.values(postObj)
  const userPosts = posts.filter(post => post.user_id === +id.id)

  return (
    <>
      <button className='single-post-button' onClick={() => setShowModal(true)}><img value={post.id} className='profile-posts' src={post?.photos[0]?.photo} height='200' className='user-profile-post' /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SinglePost setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default SinglePostModal;
