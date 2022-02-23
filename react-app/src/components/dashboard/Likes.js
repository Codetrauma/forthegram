import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';
import { addLike, loadAllLikes, removeLike } from '../../store/likes';
import heartIconRed from '../../images/heart-icon-red.png'
import heartIcon from '../../images/heart-icon.png'

const Likes = ({ post }) => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const likes = useSelector(state => state.likes)
  const allLikes = Object.values(likes);
  const postObj = useSelector(state => state.posts)
  const posts = Object.values(postObj)

  const allUserLikes = allLikes.filter(like => like.user_id === sessionUser.id)
  const oneLike = allUserLikes.filter(likes => likes.post_id === post)



  const handleLike = async (e) => {
    e.preventDefault();
    const likePost = {
      'id': post
    }
    await dispatch(addLike(likePost))
    dispatch(loadAllPosts())
    // dispatch(loadAllLikes())
  }

  const handleUnlike = async (e) => {
    e.preventDefault();
    const id = post
    await dispatch(removeLike(id))
    dispatch(loadAllPosts())
    dispatch(loadAllLikes())
  }
  return (
    <div className='likes-container'>
      <div className='likes-wrapper'>
        {sessionUser.id === oneLike[0]?.user_id ? <img className='heartIcon' onClick={handleUnlike} src={heartIconRed} height='40' />
          :
          <img className='heartIcon' onClick={handleLike} src={heartIcon} height='40' />}
      </div>
    </div>
  )
}

export default Likes;
