import React, { useState } from 'react';
import { updatePost } from '../../store/posts';
import { useDispatch } from 'react-redux';

const EditCaption = ({ posts, setShowModal }) => {
  const dispatch = useDispatch();
  console.log(posts, setShowModal)

  const [caption, setCaption] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCaption = {
      'id': posts.id,
      'caption': caption
    }
    console.log(newCaption)
    dispatch(updatePost(newCaption))
    setShowModal(false);
  }

    return (
      <div>
        <form>
          <h4>New Caption</h4>
          <textarea value={caption} onChange={(e) => setCaption(e.target.value)} />
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    )
}

export default EditCaption
