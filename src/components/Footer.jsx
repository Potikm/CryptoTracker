import React from 'react'
import { FaInstagram, FaTiktok, FaGithub, FaLinkedin, FaFacebookSquare } from "react-icons/fa";


const Footer = () => {
  return (
    <div className='footer'>
        <div className="left">
          <div className="support">
            <h3 className='colorWhite'>Support</h3>
            <p className='colorWhite'>help center</p>
            <p className='colorWhite'>contact us</p>
            <p className='colorWhite'>api status</p>
            <p className='colorWhite'>documentation</p>
          </div>
          <div className="info">
            <h3 className='colorWhite'>Info</h3>
             <p className='colorWhite'>about us</p>
             <p className='colorWhite'>careers</p>
             <p className='colorWhite'>invest</p>
             <p className='colorWhite'>legal</p>
          </div>
        </div>
        <div className="right">
           <h3 className='colorWhite'>sign up for crypto news</h3>
           <div className="social">
             <FaInstagram className='faImg'/>
             <FaTiktok className='faImg'/>
             <FaGithub className='faImg'/>
             <FaLinkedin className='faImg'/>
             <FaFacebookSquare className='faImg'/>
           </div>
        </div>
    </div>
  )
}

export default Footer