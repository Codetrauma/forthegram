import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPost from './EditPost'
function AddPost() {
  const [showModal, setShowModal] = useState(false);


    return (
      <>
        <button className='answer-button' onClick={() => setShowModal(true)}>Edit Caption</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditPost setShowModel={setShowModal}/>
          </Modal>
        )}
      </>
    );
}

export default AddPost;
