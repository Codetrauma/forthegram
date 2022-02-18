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
      <h3 className='captions'>{post.caption}</h3>
      {sessionUser?.id === post.user_id ? <EditPostModal posts={post} /> : <></>}
      {sessionUser?.id === post.user_id ? <button onClick={handleDelete}>Delete Post</button> : <></>}
    </div>
  )

}

export default Captions
