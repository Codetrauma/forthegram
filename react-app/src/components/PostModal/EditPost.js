import React, { useState } from 'react';
import { updatePost } from '../../store/posts';
import { useDispatch } from 'react-redux';

const EditCaption = ({ posts, setShowModal }) => {
  const dispatch = useDispatch();
  console.log(posts)

  localStorage.setItem('caption', posts.caption)

  const [caption, setCaption] = useState(localStorage.getItem('caption'))
  const [errors, setErrors] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCaption = {
      'id': posts.id,
      'caption': caption
    }
    console.log(newCaption)
    await dispatch(updatePost(newCaption))
    setShowModal(false);
  }

    return (
      <div className='form-wrapper'>
        <h1>Edit Caption</h1>
        <form className='post-modal-form'>
          <textarea className='post-textarea' rows='7' cols='40' value={caption} onChange={(e) => setCaption(e.target.value)} />
          <button disabled={caption.length <= 0 ? true : false} className='post-modal-submit' type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    )
}

export default EditCaption
