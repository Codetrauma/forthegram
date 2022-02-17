import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';
import { loadAllComments, updateComment, addComment, removeComment } from '../../store/comments';
import Comments  from './Comments'
import Captions from './Caption'
import './dashboard.css'

function Dashboard() {
  const dispatch = useDispatch();

  // const posts = useSelector(state => state.posts?.entries);
  const postObj = useSelector(state => state.posts)
  const posts = Object.values(postObj)
  const sessionUser = useSelector(state => state.session.user);
  const commentObj = useSelector(state => state.comments)
  const comments = Object.values(commentObj)


  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(loadAllPosts());
    dispatch(loadAllComments());
  }, [comment, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      post_id: e.target.value,
      comment,
      user_id: sessionUser.id,
    }
    await dispatch(addComment(newComment));
    dispatch(loadAllComments())
    setComment('');
    return newComment;
  }

  if (sessionUser) {
    return (
      <div>
        <ul>
          {posts?.map(post => (
            <li key={post.id} className='posts'>
              <h4>{post.user.username}</h4>
              <img src={post.photos[0]?.photo} alt={post.caption} />
              <Captions post={post} />
              {post?.comments?.map(comment => (
                <Comments comments={comment}/>
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
