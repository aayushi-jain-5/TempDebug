import React from 'react'
import './Footer.css'
import {assets} from '../../assets/frontend_assets/assets.js'

function Footer() {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img src={assets.log} />
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio asperiores nostrum ducimus obcaecati doloribus omnis excepturi consequuntur ipsa nulla tempora, iure corporis vitae quo itaque sed facere quibusdam natus molestiae.</p>

          <div className='footer-social-icons'>
            <img src={assets.facebook_icon}  alt=''/>
            <img src={assets.twitter_icon} alt='' />
            <img src={assets.linkedin_icon} alt='' />
          </div>


        </div>
        <div className='footer-content-center'>
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Private policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>+1-9898989898</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2024  Tomato.com -All Right Reserved</p>
    </div>
  )
}

export default Footer
