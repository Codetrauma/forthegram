import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditCaption from './EditPost'

function EditPost({ posts }) {
  const [showModal, setShowModal] = useState(false);


  return (
    <div className='edit-button-wrapper'>
      <div className='edit-button-container'>
        <button className='edit-caption-button' onClick={() => setShowModal(true)}>Edit</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditCaption setShowModal={setShowModal} posts={posts} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default EditPost;
