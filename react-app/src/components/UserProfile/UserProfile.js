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

  const [errors, setErrors] = useState([])

  const sessionUser = useSelector(state => state.session.user);

  const postObj = useSelector(state => state.posts)
  const posts = Object.values(postObj)
  const userPosts = posts.filter(post => post.user_id === +id)

  const userObj = useSelector(state => state.users)

  localStorage.setItem('name', sessionUser.fullname)
  localStorage.setItem('description', sessionUser.description)
  const [showEditForm, setShowEditForm] = useState(false);
  const [fullname, setFullname] = useState(localStorage.getItem('name'));
  const [description, setDescription] = useState(localStorage.getItem('description'));


  const following = sessionUser.following.map(following => following.id)
  const followingBool = following.includes(+id)
  const [followings, setFollowing] = useState(followingBool);
  const [control, setControl] = useState(false);
  const [followErrors, setFollowErrors] = useState([]);

  let followed = userObj[+id]?.followers.filter(one => one.id == sessionUser.id)

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
    setFollowErrors([])

    const follower = await dispatch(followUser(+id));
    if (follower.errors) {
      setFollowErrors(follower.errors)
    }
    setFollowing(prev => !prev)
  }

  const handleUnfollow = async (e) => {
    e.preventDefault();
    setFollowErrors([])
    const unfollower = await dispatch(unFollowUser(+id));
    if (unfollower.errors) {
      setFollowErrors(unfollower.errors)
    }
    setFollowing(prev => !prev)
  }

  if (followed?.length > 0) {

    return (
      <div className='profile-wrapper'>
        <div>
          <div className='profile-header-container'>
            <div className='profile-header'>
              <img src={userObj[+id]?.picture} height='200' className='user-profile-picture-profile' />
              <div className='profile-info'>
                <h1>{userObj[+id]?.username}</h1>
                <div>
                  {sessionUser.id !== userObj[+id]?.id ? <button onClick={handleUnfollow} disabled={control}>Unfollow</button> : <></>}
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
              <div className='about-me-links'>
                {+id === 6 ? <a className='github-link' href='https://github.com/JTannerShaw' target='_blank'>My Github</a> : <></>}
                {+id === 6 ? <a className='linkedin-link' href='https://www.linkedin.com/in/tanner-shaw-a25702162/' target='_blank'>My LinkedIn</a> : <></>}
              </div>
              {sessionUser.id === userObj[+id]?.id && !showEditForm ? <button className='edit-profile-button' onClick={() => setShowEditForm(!showEditForm)}>Edit Profile</button> : <></>}
              <div className='profile-fullname'>
                {showEditForm && (
                  <div className='edit-profile-form-wrapper'>
                    <form className='edit-profile-form'>
                      {errors.map(error => <p className='error-message'>{error}</p>)}
                      <input type='text' className='edit-profile-inputs' value={fullname} placeholder='Full Name' onChange={e => setFullname(e.target.value)} />
                      <textarea type='text' className='edit-profile-inputs-textarea' value={description} placeholder='Description' onChange={e => setDescription(e.target.value)} />
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
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (

      <div className='profile-wrapper'>
        <div>
          <div className='profile-header-container'>
            <div className='profile-header'>
              <img src={userObj[+id]?.picture} height='200' className='user-profile-picture-profile' />
              <div className='profile-info'>
                <h1>{userObj[+id]?.username}</h1>
                <div>
                  {sessionUser.id !== userObj[+id]?.id ? <button onClick={handleFollow} disabled={control}>Follow</button> : <></>}
                </div>
                <h4>{userObj[+id]?.followers?.length} Followers</h4>
                <h4>{userObj[+id]?.following?.length} Following</h4>
                <h4>{userPosts.length} Posts</h4>
              </div>
            </div>
          </div>
          <div className='profile-info-wrapper'>
            <div className='profile-info-container'>
              {followErrors}
              {!showEditForm ? <h3>{userObj[+id]?.fullname}</h3> : <></>}
              {sessionUser.id === userObj[+id]?.id && !showEditForm ? <button className='edit-profile-button' onClick={() => setShowEditForm(!showEditForm)}>Edit Profile</button> : <></>}
              <div className='profile-fullname'>
                {showEditForm && (
                  <div className='edit-profile-form-wrapper'>
                    <form className='edit-profile-form'>
                      {errors.map(error => <p className='error-message'>{error}</p>)}
                      <input type='text' className='edit-profile-inputs' placeholder='Full Name' onChange={e => setFullname(e.target.value)} />
                      <textarea type='text' className='edit-profile-inputs-textarea' placeholder='Description' onChange={e => setDescription(e.target.value)} />
                      <button type='submit' onClick={handleProfileSubmit} className='save-button' value={userObj[+id]?.id}>Save</button>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default UserProfile
