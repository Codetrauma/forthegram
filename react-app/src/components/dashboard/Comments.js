import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment, removeComment } from '../../store/comments';


const Comments = ({comments}) => {
  const dispatch = useDispatch();
  console.log(comments);
  const sessionUser = useSelector(state => state.session.user);

  const [showEditForm, setShowEditForm] = useState(false);
  const [comment, setComment] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    const id = e.target.value;
    dispatch(removeComment(id));
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const editComment = {
      id: e.target.value,
      'text': comment,
    }
    dispatch(updateComment(editComment));
  }

  return (
    <div>
      <h4>{comments.user?.username}</h4>
      <p>{comments.comment}</p>
      {sessionUser?.id === comments.user_id ? <button type='submit' value={comments.id} onClick={handleDelete}>x</button> : <></>}
      {sessionUser?.id === comments.user_id ? <button type='submit' value={comments.id} onClick={(e) => setShowEditForm(!showEditForm)}>Edit</button> : <></>}
      {showEditForm && (
        <form>
          <input type='text' onChange={e => setComment(e.target.value)} />
          <button type='submit' value={comments.id} onClick={handleEdit}>Edit Comment</button>
        </form>
      )
      }
    </div>
  )
}

export default Comments
