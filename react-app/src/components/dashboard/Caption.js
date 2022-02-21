import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditPostModal from '../PostModal/EditPostModal';
import { removePost } from '../../store/posts';

const Captions = ({ post }) => {
  const dispatch = useDispatch();
  // console.log(post)
  const sessionUser = useSelector(state => state.session.user);



  return (
    <div className='captions-wrapper'>
      <div className='captions-container'>
        <div className='likes-container'>
          <p className='likes-counter'>{post.likes.length} likes</p>
        </div>
        <div className='caption'>
        <p className='caption-username'>{post.user.username}</p><p className='captions'>{post.caption}</p> {sessionUser?.id === post.user_id ? <EditPostModal posts={post} /> : <></>}
        </div>
        {/* {sessionUser?.id === post.user_id ? <EditPostModal posts={post} /> : <></>} */}
      </div>
    </div>
  )

}

export default Captions
