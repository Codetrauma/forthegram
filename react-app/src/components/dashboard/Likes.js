import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';
import { addLike, loadAllLikes, removeLike } from '../../store/likes';

const Likes = ({ post }) => {
  const dispatch = useDispatch();
  // console.log(post)


  const sessionUser = useSelector(state => state.session.user);
  const likes = useSelector(state => state.likes)
  const allLikes = Object.values(likes);
  console.log(likes);
  const postObj = useSelector(state => state.posts)
  const posts = Object.values(postObj)


  const handleLike = async (e) => {
    e.preventDefault();
    const likePost = {
      'id': post.id
    }
    await dispatch(addLike(likePost))
    dispatch(loadAllPosts())
    dispatch(loadAllLikes())
  }
  const handleUnlike = async (e) => {
    e.preventDefault();
    const id = e.target.value
    await dispatch(removeLike(id))
    dispatch(loadAllPosts())
    dispatch(loadAllLikes())
  }

  return (
    <div className='likes-wrapper'>
      {sessionUser.id === likes ? <button onClick={handleLike}>LIKED</button>
      :
      <button value={post.id} onClick={handleUnlike}>NOT LIKED</button> }
    </div>

  )
}

export default Likes;
