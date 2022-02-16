import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';
import { loadAllComments } from '../../store/comments';
import { addComment } from '../../store/comments';
import { removeComment } from '../../store/comments';

function Dashboard() {
  const dispatch = useDispatch();

  const posts = useSelector(state => state.posts?.entries);
  const sessionUser = useSelector(state => state.session.user);
  const comments = useSelector(state => state.comments?.entries);

  const [comment, setComment] = useState('');
  const [image, setImage] = useState('');

    useEffect(() => {
      dispatch(loadAllPosts());
      dispatch(loadAllComments());
    }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      post_id: e.target.value,
      comment,
      user_id: sessionUser.id,
    }
    await dispatch(addComment(newComment));
    setComment('');
    return newComment;
  }
  const handleDelete = async (e) => {
    e.preventDefault();
    const id = e.target.value;
    console.log('COMMENT', id);
    dispatch(removeComment(id));
  }

  if (sessionUser) {
    return (
      <div>
        <ul>
          {posts?.posts.map(post => (
            <li key={post.id}>
              <h4>{post.user.username}</h4>
              <img src={post.photos[0]?.photo} alt={post.caption} />
              <h3>{post.caption}</h3>
              {post?.comments.map(comment => (
                <div>
                  <h4>{comment?.user.username}</h4>
                  <p key={comment?.id}>{comment.comment}</p>
                  {sessionUser?.id === comment.user_id ? <button type='submit' value={comment.id} onClick={handleDelete}>x</button> : <></>}
                </div>
              ))}
              <form>
                <input type='text' onChange={e => setComment(e.target.value)} />
                <button type='submit' value={post.id} onClick={handleSubmit}>Post</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Dashboard;
