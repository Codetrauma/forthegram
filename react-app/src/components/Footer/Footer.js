import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css'

const Footer = () => {

  return (
    <div className='footer-wrapper'>
      <div className='footer-container'>
        <div className='about-me'>
          <div className='about-me-container'>
            <NavLink to='/user/6'><img className='user-profile-picture-profile-footer' src='https://i.imgur.com/BaF3Ype.jpg' /></NavLink>
            <h2>The Dev</h2>
            <NavLink to='/user/6'><h4>Tanner Shaw</h4></NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
