import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPosts } from '../../store/posts';
import { useParams } from 'react-router-dom';
import { loadAllUsers, updateUserInfo } from '../../store/users';
import SinglePostModal from './SinglePostModal';
import { followUser, unFollowUser } from '../../store/users';
import './UserProfile.css'


function UserProfile() {
  const dispatch = useDispatch();
  const id = useParams();

  const emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  const isEmail = field => emailPattern.test(field)

  const [showEditForm, setShowEditForm] = useState(false);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [followings, setFollowing] = useState(false);
  const [errors, setErrors] = useState([])

  const sessionUser = useSelector(state => state.session.user);

  const postObj = useSelector(state => state.posts)
  const posts = Object.values(postObj)
  const userPosts = posts.filter(post => post.user_id === +id.id)

  const userObj = useSelector(state => state.users)
  const users = Object.values(userObj)
  const user = users.filter(user => user.id === +id.id)

  const following = sessionUser.following.map(following => following.id)
  const followingBool = following.includes(+id.id)


  console.log('USER', user);
  useEffect(() => {
    dispatch(loadAllPosts());
    dispatch(loadAllUsers());
  }, [followingBool, dispatch]);

  const handleProfileSubmit = (e) => {
    let newErrors = [];
    e.preventDefault();
    if (!isEmail(email)) {
      newErrors.push('Please enter a valid email.')
      setErrors(newErrors)
    }
    else {
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
  }
  const handleCancel = (e) => {
    e.preventDefault();
    setShowEditForm(!showEditForm);
  }

  const handleFollow = (e) => {
    e.preventDefault();
    dispatch(followUser(+id.id));
    setFollowing(!followings)
    dispatch(loadAllUsers());
  }

  const handleUnfollow = (e) => {
    e.preventDefault();
    dispatch(unFollowUser(+id.id));
    setFollowing(!followings)
    dispatch(loadAllUsers());
  }


  return (
    <div className='profile-wrapper'>
      <div>
        <div className='profile-header-container'>
          <div className='profile-header'>
            <img src={user[0]?.picture} height='200' className='user-profile-picture-profile' />
            <div className='profile-info'>
              <h1>{user[0]?.username}</h1>
              <div>
                {sessionUser.id !== user[0]?.id ? followings === true ? <button onClick={handleUnfollow}>Unfollow</button> : <button onClick={handleFollow}>Follow</button> : null}
              </div>
              <h4>{user[0]?.followers?.length} Followers</h4>
              <h4>{user[0]?.following?.length} Following</h4>
              <h4>{userPosts.length} Posts</h4>
            </div>
          </div>
        </div>
        <div className='profile-info-wrapper'>
          <div className='profile-info-container'>
          {!showEditForm ? <h3>{user[0]?.fullname}</h3> : <></> }
          {sessionUser.id === user[0]?.id && !showEditForm ? <button className='edit-profile-button' onClick={() => setShowEditForm(!showEditForm)}>Edit Profile</button> : <></>}
          <div className='profile-fullname'>
            {showEditForm && (
              <div className='edit-profile-form-wrapper'>
                <form className='edit-profile-form'>
                  {errors.map(error => <p className='error-message'>{error}</p>)}
                  <input type='text' className='edit-profile-inputs' placeholder='Full Name' onChange={e => setFullname(e.target.value)} />
                  <input type='text' className='edit-profile-inputs' placeholder='Username' onChange={e => setUsername(e.target.value)} />
                  <input type='email' className='edit-profile-inputs' placeholder='Email' onChange={e => setEmail(e.target.value)} />
                  <textarea type='text'className='edit-profile-inputs-textarea' placeholder='Description' onChange={e => setDescription(e.target.value)} />
                  <button type='submit' onClick={handleProfileSubmit} className='save-button' value={user[0]?.id}>Save</button>
                  <button className='save-button' onClick={handleCancel}>Cancel</button>
                </form>
              </div>
            )}
          </div>
            {!showEditForm ? <p>{user[0]?.description}</p> : <></>}
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
