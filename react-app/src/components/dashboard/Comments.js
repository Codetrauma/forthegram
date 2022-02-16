import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment, removeComment, loadAllComments } from '../../store/comments';
import { loadAllPosts } from '../../store/posts';


const Comments = ({comments}) => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const stateComments = useSelector(state => state.posts)

  const [showEditForm, setShowEditForm] = useState(false);
  const [comment, setComment] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    const id = e.target.value;
    await dispatch(removeComment(id));
    return;
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const editComment = {
      id: e.target.value,
      'text': comment,
    }
    await dispatch(updateComment(editComment));
  }
  
  // useEffect(() => {
  //   dispatch(loadAllPosts())
  //   dispatch(loadAllComments())
  // }, [dispatch])
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
