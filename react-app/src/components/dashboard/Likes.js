import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';
import addLike from '../../store/likes';

const Likes = ({ post }) => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const handleLike = async (e) => {
    e.preventDefault();
    const likePost = {
      'id': post.id
    }
    await dispatch(addLike(likePost))
    // dispatch(loadAllPosts())
    // console.log(likePost);
  }

  return (
    <div className='likes-wrapper'>
      <button onClick={handleLike}><img src='../../images/heart-icon.png'></img></button>
    </div>

  )
}

export default Likes;
