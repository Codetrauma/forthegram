import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';
import { addLike, loadAllLikes, removeLike, postsLikes } from '../../store/likes';
import heartIconRed from '../../images/heart-icon-red.png'
import heartIcon from '../../images/heart-icon.png'

const Likes = ({ post }) => {
  const dispatch = useDispatch();
  console.log(post)


  const sessionUser = useSelector(state => state.session.user);
  const likes = useSelector(state => state.likes)
  const allLikes = Object.values(likes);
  const postObj = useSelector(state => state.posts)
  const posts = Object.values(postObj)
  // console.log(likes)

  const allUserLikes = allLikes.filter(like => like.user_id === sessionUser.id)
  const oneLike = allUserLikes.filter(likes => likes.post_id === post)
  // console.log('USERS LIKES', oneLike)


  const handleLike = async (e) => {
    e.preventDefault();
    console.log('HANDLE LIKE')
    const likePost = {
      'id': post
    }
    await dispatch(addLike(likePost))
    dispatch(loadAllPosts())
    dispatch(loadAllLikes())
  }
  const handleUnlike = async (e) => {
    e.preventDefault();
    console.log('WHATEVER')
    const id = post
    console.log(id)
    await dispatch(removeLike(id))
    dispatch(loadAllPosts())
    dispatch(loadAllLikes())
  }
  // <button onClick={handleUnlike}>LIKED</button>
  // <button value={post} onClick={handleLike}>NOT LIKED</button>
  return (
    <div className='likes-wrapper'>
      {sessionUser.id === oneLike[0]?.user_id ? <img className='heartIcon' onClick={handleUnlike} src={heartIconRed} height='50'/>
      :
      <img className='heartIcon' onClick={handleLike} src={heartIcon} height='50'/>}
    </div>

  )
}

export default Likes;
