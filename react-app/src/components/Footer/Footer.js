import React from 'react';
import './footer.css'

const Footer = () => {

  return (
    <div className='footer-wrapper'>
      <div className='footer-container'>
        <div className='about-me'>
          <div className='about-me-container'>
          <img  className='user-profile-picture-profile-footer' src='https://i.imgur.com/BaF3Ype.jpg' />
          <h4>Tanner Shaw</h4>
          <a href='https://github.com/JTannerShaw/' target='_blank' rel="noreferrer">Github</a>
          <a href='https://www.linkedin.com/in/tanner-shaw-a25702162/' target='_blank' rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <ul className='footer-list'>
          <li>Python</li>
          <li>Flask</li>
          <li>SQLAlchemy</li>
          <li>JavaScript</li>
          <li>NodeJS</li>
          <li>React</li>
          <li>Redux</li>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>AWS</li>
          <li>Docker</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer;
