import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment, removeComment } from '../../store/comments';
import { loadAllPosts } from '../../store/posts';

const Comments = ({ comments }) => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  
  localStorage.setItem('comment', comments.comment);


  const [showEditForm, setShowEditForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [comment, setComment] = useState(localStorage.getItem('comment'))


  const handleDelete = async (e) => {
    e.preventDefault();
    const id = e.target.value;
    await dispatch(removeComment(id));
    await dispatch(loadAllPosts());
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const editedComment = {
      id: e.target.value,
      'text': comment,
    }
    const data = await dispatch(updateComment(editedComment));
    if (data.errors) {
      setErrors(data.errors)
    }
    setShowEditForm(!showEditForm);
    await dispatch(loadAllPosts());
  }

  return (
    <div className='comments-wrapper'>
      <div className='comments-container'>
        <h4 className='comment-username'>{comments.user?.username}</h4>
        {showEditForm && (
          <form className='edit-comment-form'>
            <input type='text' value={comment} onChange={e => setComment(e.target.value)} />
            <button disabled={comment?.length <= 0 || comment?.length > 80 ? true : false} type='submit' value={comments.id} onClick={handleEdit}>Submit</button>
            {errors.map(error => (
              <p key={error} className='comment-error'>{error}</p>
            ))}
          </form>
        )
        }
        <p hidden={showEditForm === true ? true : false} className='single-comment'>{comments.comment}</p>
        <div className='comment-button-container'>
          {sessionUser?.id === comments.user_id ? <button className='comment-buttons' type='submit' value={comments.id} onClick={(e) => setShowEditForm(!showEditForm)}>Edit</button> : <></>}
          {!showEditForm && sessionUser?.id === comments.user_id ? <button className='comment-buttons-delete' type='submit' value={comments.id} onClick={handleDelete}>X</button> : <></>}
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default Comments
