import React from 'react'
import { Link } from 'react-router-dom'

const LoginBtn = () => {
  return (
    <Link to={'/Login'} style={{ textDecoration: 'none' }}>
      <div className='loginBtn'>
         Login
      </div>
    </Link>
   
  )
}

export default LoginBtn