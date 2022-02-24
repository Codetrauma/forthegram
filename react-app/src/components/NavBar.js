
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import homebutton from '../images/homebutton.png';
import PostModal from '../components/PostModal/PostModal';
import './navbar.css'
import { useSelector } from 'react-redux';

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user);

  console.log(sessionUser)
  return (
    <div className='navbar-wrapper'>
      <div className='navbar-container'>
        <nav className='nav-wrapper'>
          <div className='home-forthegram'>
            <NavLink className='forthegram-text' to='/'>ForTheGram</NavLink>
          </div>
          <div className='right-side-wrapper'>
            <div className='right-side-navbar'>
              <NavLink to='/' exact={true} activeClassName='active'>
                <img className='home-button' src={homebutton} alt='home' height='25px' />
              </NavLink>
              <PostModal />
              <NavLink to={`/user/${sessionUser.id}`} className='user-pictures-navbar' exact={true}><img className='user-profile-picture' src={sessionUser.picture} height='35' /></NavLink>
              <LogoutButton />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
