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
  const { id } = useParams();

  const emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  const isEmail = field => emailPattern.test(field)

  const [showEditForm, setShowEditForm] = useState(false);
  const [fullname, setFullname] = useState('');
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState([])

  const sessionUser = useSelector(state => state.session.user);

  const postObj = useSelector(state => state.posts)
  const posts = Object.values(postObj)
  const userPosts = posts.filter(post => post.user_id === +id)

  const userObj = useSelector(state => state.users)
  const users = Object.values(userObj)
  // const user = users.filter(user => user.id === +id)

  const following = sessionUser.following.map(following => following.id)
  const followingBool = following.includes(+id)
  const [followings, setFollowing] = useState(followingBool);
  const [control, setControl] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0, { behavior: 'smooth' });
    dispatch(loadAllUsers());
  }, [followings, dispatch]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      id: sessionUser.id,
      full_name: fullname,
      description: description,
      }
      const data = await dispatch(updateUserInfo(userInfo));
      console.log('DATA', data);
      if (data?.errors) {
        setErrors(data.errors)
      }
      setShowEditForm(!showEditForm);
  }
  const handleCancel = (e) => {
    e.preventDefault();
    setShowEditForm(!showEditForm);
  }

  const handleFollow = async (e) => {
    e.preventDefault();
    setControl(true)
    await dispatch(followUser(+id));
    setControl(false)
    setFollowing(prev => !prev)
  }

  const handleUnfollow = async (e) => {
    e.preventDefault();
    setControl(true)
    await dispatch(unFollowUser(+id));
    setControl(false)
    setFollowing(prev => !prev)
  }


  return (
    <div className='profile-wrapper'>
      <div>
        <div className='profile-header-container'>
          <div className='profile-header'>
            <img src={userObj[+id]?.picture} height='200' className='user-profile-picture-profile' />
            <div className='profile-info'>
              <h1>{userObj[+id]?.username}</h1>
              <div>
                {sessionUser.id !== userObj[+id]?.id ? followings === true ? <button disabled={control} onClick={handleUnfollow}>Unfollow</button> : <button disabled={control} onClick={handleFollow}>Follow</button> : null}
              </div>
              <h4>{userObj[+id]?.followers?.length} Followers</h4>
              <h4>{userObj[+id]?.following?.length} Following</h4>
              <h4>{userPosts.length} Posts</h4>
            </div>
          </div>
        </div>
        <div className='profile-info-wrapper'>
          <div className='profile-info-container'>
            {!showEditForm ? <h3>{userObj[+id]?.fullname}</h3> : <></>}
            {sessionUser.id === userObj[+id]?.id && !showEditForm ? <button className='edit-profile-button' onClick={() => setShowEditForm(!showEditForm)}>Edit Profile</button> : <></>}
            <div className='profile-fullname'>
              {showEditForm && (
                <div className='edit-profile-form-wrapper'>
                  <form className='edit-profile-form'>
                    {errors.map(error => <p className='error-message'>{error}</p>)}
                    <input type='text' className='edit-profile-inputs' placeholder='Full Name' onChange={e => setFullname(e.target.value)} />
                    {/* <input type='text' className='edit-profile-inputs' placeholder='Username' onChange={e => setUsername(e.target.value)} /> */}
                    {/* <input type='email' className='edit-profile-inputs' placeholder='Email' onChange={e => setEmail(e.target.value)} /> */}
                    <textarea type='text' className='edit-profile-inputs-textarea' placeholder='Description' onChange={e => setDescription(e.target.value)} />
                    <button type='submit' disabled={fullname.length <= 1 && description.length <= 0 ? true : false} onClick={handleProfileSubmit} className='save-button' value={userObj[+id]?.id}>Save</button>
                    <button className='save-button' onClick={handleCancel}>Cancel</button>
                  </form>
                </div>
              )}
            </div>
            {!showEditForm ? <p>{userObj[+id]?.description}</p> : <></>}
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
