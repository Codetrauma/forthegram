import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts, removePost } from '../../store/posts';
import { loadAllComments, updateComment, addComment, removeComment } from '../../store/comments';
import Comments from './Comments'
import Captions from './Caption'
import Likes from './Likes'
import './dashboard.css'
import { loadAllLikes } from '../../store/likes';
import { NavLink } from 'react-router-dom';

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
  const handleDelete = async (e) => {
    e.preventDefault();
    const deletePost = {
      'id': e.target.value
    }
    dispatch(removePost(deletePost))
  }

  if (sessionUser) {
    return (
      <div className='posts-wrapper'>
        <ul className='ul-posts'>
          {posts?.map(post => (
            <li key={post.id} className='posts'>
              <div className='post-username-container'>
                <h4 className='posts-username'><NavLink className='user-pictures' to={`/users/${post.user.id}`}><img src={post.user.picture} height='30' className='user-profile-picture'/></NavLink> {post.user.username}</h4>
                {sessionUser?.id === post.user_id ? <button className='delete-post-button' value={post.id} onClick={handleDelete}>Delete Post</button> : <></>}
              </div>
              <img className='posts-images' src={post.photos[0]?.photo} alt={post.caption} />
              <Likes post={post.id} />
              <Captions post={post} />
              {post?.comments?.map(comment => (
                <Comments comments={comment} />
              ))}
              <div className='comment-form-container'>
                <form className='post-comment-form'>
                  <div className='input-post-container'>
                    {/* {errors.map((error, idx) => <li className='errors' key={idx}>{error}</li>)} */}
                    <input className='comment-input' placeholder='Enter a comment' type='text' value={comment} onSubmit={e => setComment('')} onChange={e => setComment(e.target.value)} />
                    <button disabled={comment.length <= 0 ? true : false} className='post-button' type='submit' value={post.id} onClick={handleSubmit}>Post</button>
                  </div>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Dashboard;
