import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditPostModal from '../PostModal/EditPostModal';
import { removePost } from '../../store/posts';

const Captions = ({ post }) => {
  const dispatch = useDispatch();
  // console.log(post)
  const sessionUser = useSelector(state => state.session.user);


  const handleDelete = async (e) => {
    e.preventDefault();
    const deletePost = {
      'id': post.id
    }
    dispatch(removePost(deletePost))
  }

  return (
    <div className='captions-wrapper'>
      <div className='captions-container'>
        <div className='caption'>
        <p className='caption-username'>{post.user.username}</p><p className='captions'>{post.caption}</p>
        </div>
        {sessionUser?.id === post.user_id ? <EditPostModal posts={post} /> : <></>}
        {sessionUser?.id === post.user_id ? <button onClick={handleDelete}>Delete Post</button> : <></>}
      </div>
    </div>
  )

}

export default Captions
