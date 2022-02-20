
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import homebutton from '../images/homebutton.png';
import PostModal from '../components/PostModal/PostModal';
import './navbar.css'

const NavBar = () => {
  return (
    <div className='navbar-wrapper'>
      <div className='navbar-container'>
        <nav className='nav-wrapper'>
          <div className='home-forthegram'>
            <NavLink className='forthegram-text' to='/'>ForTheGram</NavLink>
          </div>
          <div className='right-side-navbar'>
            <NavLink to='/' exact={true} activeClassName='active'>
              <img src={homebutton} alt='home' height='25px' />
            </NavLink>
            <PostModal />
            <LogoutButton />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
