import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';
import { useParams } from 'react-router-dom';
import { loadAllUsers, updateUserInfo } from '../../store/users';
import SinglePostModal from './SinglePostModal';
import './UserProfile.css'


function UserProfile() {
  const dispatch = useDispatch();
  const id = useParams();

  const [showEditForm, setShowEditForm] = useState(false);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

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

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      id: sessionUser.id,
      full_name: fullname,
      username: username,
      email: email,
      description: description,
    }
    dispatch(updateUserInfo(userInfo));
    setShowEditForm(!showEditForm);
  }


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
            <h3>{user[0]?.fullname}</h3>{sessionUser.id === user[0]?.id ? <button className='edit-profile-button' onClick={() => setShowEditForm(!showEditForm)}>Edit Profile</button> : <></>}
            {showEditForm && (
              <div className='edit-profile-form'>
                <form className='edit-profile-form' onSubmit={handleProfileSubmit}>
                  <input type='text' placeholder='Full Name' onChange={e => setFullname(e.target.value)}/>
                  <input type='text' placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                  <input type='text' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                  <input type='text' placeholder='Description' onChange={e => setDescription(e.target.value)}/>
                  <button type='submit' value={user[0]?.id}>Save</button>
                </form>
              </div>
            )}
            <p>{user[0]?.description}</p>
          </div>
        </div>
          <div className='divider'></div>
        <div className='profile-post-wrapper'>
          <div className='profile-post-container'>
            {userPosts.map(userPost => (
              <SinglePostModal post={userPost} key={userPost.id} />
                // <img value={userPost.id} className='profile-posts' src={userPost?.photos[0]?.photo} height='200' className='user-profile-post' />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
