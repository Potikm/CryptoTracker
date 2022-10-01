import React from 'react'
import { Link } from 'react-router-dom'

const SignUpBtn = () => {
  return (
    <Link to={'/SignUp'} style={{ textDecoration: 'none' }}>
      <div className='SignUpBtn'>
         Sign Up
      </div>
    </Link>
   
  )
}

export default SignUpBtn