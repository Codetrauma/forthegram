import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  const isEmail = field => emailPattern.test(field)
  useEffect(() => {
    const errors = [];
    if (username.length < 6) {
      errors.push('Username must be atleast 6 characters')
    }
    if (password.length < 8) {
      errors.push('Password must be atleast 8 characters')
    }
    setErrors(errors);
  },[username, password])

  const onSignUp = async (e) => {
    let newErrors = []
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);


    if (!isEmail(email)) {
      newErrors.push('Please enter a valid email.')
      setErrors(newErrors)
    }
    else if (password !== repeatPassword) {
      newErrors.push('Passwords do not match')
      setErrors(newErrors)
      setPassword('')
      setRepeatPassword('')
    }
    else if (password.length < 8) {
      newErrors.push('Password must be at least 8 characters long')
      setErrors(newErrors)
      setPassword('')
      setRepeatPassword('')
    }
    else if (username.length < 6) {
      newErrors.push('Username must be at least 6 characters long')
      setErrors(newErrors)
      setUsername('')
    }
    else if (username.length > 25) {
      newErrors.push('Username cannot be longer than 25 characters')
      setErrors(newErrors)
      setUsername('')
    }
    else if (password === repeatPassword) {
      // const data = await dispatch(signUp(formData));
      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFullname = (e) => {
    setFullName(e.target.value);
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-form-wrapper-div'>
      <div className='signup-form-wrapper'>
        <h2 className='login-title'>ForTheGram</h2>
        <p className='p-header'>Sign up to see photos and videos from your friends.</p>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>

            <input className='username-input'
              placeholder='Username *'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>

            <input className='email-input'
              placeholder='Email Address *'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>

            <input className='name-input'
              placeholder='Full Name *'
              type='text'
              name='full_name'
              onChange={updateFullname}
              value={full_name}>
            </input>
          </div>
          <div>

            <input className='password-input'
              placeholder='Password *'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>

            <input className='password-input'
              placeholder='Confirm Password *'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div>
            <label className='profile-picture' for='file-input'>Profile Picture</label>
            <input
              name='file-input'
              className='upload-image-div'
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
          </div>
          <button disabled={username.length >= 6 && email.length > 0 && password.length >= 8 && repeatPassword.length >= 8 && full_name.length > 0 ? false : true} className='submit-signup-button' type='submit'>Sign Up</button>
        </form>
        <p>Already have an account? <NavLink className='login-navlink' to='/login/'>Login</NavLink></p>
      </div>
    </div>
  );
};

export default SignUpForm;
