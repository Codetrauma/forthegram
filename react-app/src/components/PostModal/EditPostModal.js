import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditCaption from './EditPost'

function EditPost({ posts }) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className='answer-button' onClick={() => setShowModal(true)}>Edit Caption</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCaption setShowModal={setShowModal} posts={posts}/>
        </Modal>
      )}
    </>
  );
}

export default EditPost;
