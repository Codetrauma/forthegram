import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';
import { addLike, loadAllLikes, removeLike } from '../../store/likes';

const Likes = ({ posts }) => {
  const dispatch = useDispatch();
  // console.log(posts.likes)


  const sessionUser = useSelector(state => state.session.user);
  const likes = useSelector(state => state.likes.likes)
  console.log(likes);


  const handleLike = async (e) => {
    e.preventDefault();
    const likePost = {
      'id': posts.id
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
      {sessionUser.id === posts ? <button onClick={handleLike}>LIKED</button>
      :
      <button value={posts.id} onClick={handleUnlike}>NOT LIKED</button> }
    </div>

  )
}

export default Likes;
