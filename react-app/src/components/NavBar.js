
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import homebutton from '../images/homebutton.png';
import PostModal from '../components/PostModal/PostModal';
import './navbar.css'

const NavBar = () => {
  return (
    <div className='navbar-wrapper'>
      <nav>
        <ul className='nav-header'>
          <NavLink to='/'>ForTheGram</NavLink>
          <li>
            {/* <NavLink to='/' exact={true} activeClassName='active'>
              <img src={homebutton} alt='home' height='25px' />
            </NavLink> */}
          </li>
          <li>
          <PostModal />
          </li>
            <LogoutButton />
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
