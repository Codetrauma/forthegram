import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadPicture from '../UploadImage/UploadImage';
function AddPost() {
  const [showModal, setShowModal] = useState(false);


    return (
      <>
        <button className='answer-button' onClick={() => setShowModal(true)}>Answer!</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <UploadPicture setShowModel={setShowModal}/>
          </Modal>
        )}
      </>
    );
}

export default AddPost;
