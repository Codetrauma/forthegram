import { React, useState, useEffect } from 'react';
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

  useEffect(() => {
    const newErrors = [];
    if (comment.length > 80) {
      newErrors.push('Comment is too long');
    }
    if (comment.length < 1 && comment.length) {
      newErrors.push('Comment is too short');
    }
    if (comment.indexOf(' ') === 0) {
      newErrors.push('Comment cannot start with a space');
    }
    setErrors(newErrors);
  }, [comment])


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
          </form>
        )
      }
        {!showEditForm ? <p className='single-comment'>{comments.comment}</p> : <></>}
        <div className='comment-button-container'>
      {showEditForm ? errors.map(error => (
        <p key={error} className='errors'>{error}</p>
      )) : <></>}
          {sessionUser?.id === comments.user_id ? <button className='comment-buttons' type='submit' value={comments.id} onClick={(e) => setShowEditForm(!showEditForm)}>Edit</button> : <></>}
          {!showEditForm && sessionUser?.id === comments.user_id ? <button className='comment-buttons-delete' type='submit' value={comments.id} onClick={handleDelete}>X</button> : <></>}
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default Comments
