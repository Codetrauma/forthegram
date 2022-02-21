import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';
import { useParams } from 'react-router-dom';
import { loadAllUsers } from '../../store/users';
import './UserProfile.css'


function UserProfile() {
  const dispatch = useDispatch();
  const id = useParams();

  const sessionUser = useSelector(state => state.session.user);

  const postObj = useSelector(state => state.posts)
  const posts = Object.values(postObj)
  const userPosts = posts.filter(post => post.user_id === +id.id)

  const userObj = useSelector(state => state.users)
  const users = Object.values(userObj)
  const user = users.filter(user => user.id === +id.id)
  console.log('USER', user);

  console.log(posts);
  useEffect(() => {
    dispatch(loadAllPosts());
    dispatch(loadAllUsers());
  }, [dispatch]);


  return (
    <div className='profile-wrapper'>
      <div>
        <div className='profile-header-container'>
          <div className='profile-header'>
            <img src={user[0]?.picture} height='200' className='user-profile-picture-profile' />
            <div className='profile-info'>
            <h1>{user[0]?.username}</h1>
            <h4>Followers</h4>
            <h4>Following</h4>
            <h4>{userPosts.length} Posts</h4>
            </div>
          </div>
        </div>
        <div className='profile-info-container'>
          <div className='profile-fullname'>
            <h3>{user[0]?.fullname}</h3>
            <p>{user[0]?.description}</p>
          </div>
        </div>
        <div className='profile-post-wrapper'>
          <div className='profile-post-container'>
            {userPosts.map(userPost => (
                <img value={userPost.id} className='profile-posts' src={userPost?.photos[0]?.photo} height='200' className='user-profile-post' />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
