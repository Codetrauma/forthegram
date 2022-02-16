import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

function AddPost() {
  const [showModal, setShowModal] = useState(false);


    return (
      <>
        <button className='answer-button' onClick={() => setShowModal(true)}>Answer!</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            {/* <CreateAnswer setShowModal={setShowModal} /> */}
          </Modal>
        )}
      </>
    );
}

export default AddPost;
