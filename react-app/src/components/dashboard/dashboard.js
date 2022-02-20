import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';
import { loadAllComments, updateComment, addComment, removeComment } from '../../store/comments';
import Comments  from './Comments'
import Captions from './Caption'
import Likes from './Likes'
import './dashboard.css'
import { loadAllLikes } from '../../store/likes';

function Dashboard() {
  const dispatch = useDispatch();

  // const posts = useSelector(state => state.posts?.entries);
  const postObj = useSelector(state => state.posts)
  const posts = Object.values(postObj)
  const sessionUser = useSelector(state => state.session.user);
  const commentObj = useSelector(state => state.comments)
  const comments = Object.values(commentObj)

  // console.log(posts)
  const [comment, setComment] = useState('');


  useEffect(() => {
    dispatch(loadAllPosts());
    dispatch(loadAllComments());
    dispatch(loadAllLikes());
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
      <div className='posts-wrapper'>
        <ul className='ul-posts'>
          {posts?.map(post => (
            <li key={post.id} className='posts'>
              <div className='post-username-container'>
              <h4 className='posts-username'>{post.user.username}</h4>
              </div>
              <img className='posts-images' src={post.photos[0]?.photo} alt={post.caption} />
              <Likes post={post.id} />
              <Captions post={post} />
              {post?.comments?.map(comment => (
                <Comments comments={comment} />
              ))}
              <form className='post-comment-form'>
                <div className='input-post-container'>
                  {/* {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)} */}
                <input className='comment-input' placeholder='Enter a comment' type='text' value={comment} onSubmit={e => setComment('')} onChange={e => setComment(e.target.value)} />
                <button disabled={comment.length <= 0 ? true : false} className='post-button' type='submit' value={post.id} onClick={handleSubmit}>Post</button>
                </div>
              </form>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Dashboard;
