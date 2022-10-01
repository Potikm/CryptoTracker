import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react' 
import { UserAuth } from '../AuthContext'
import HomeButton from './HomeButton';



const SignUpPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {signUp} = UserAuth()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try{
      console.log(email)
      await signUp(email, password)
      navigate('/Account');
    } catch (e){
      setError(e.message)
      console.log(e.message)
    }
  }

  return (
    <div className='signUpPage'>
        <HomeButton />
        <h1>Create New Account</h1>
        <form onSubmit={handleSubmit} className='signUpForm'>
            {error ? <p style={{color: "red"}}>{error}</p> : null}
            <div className="inputDiv">
              <p className='colorWhite'>Email Address</p>
            <input className='input' type="email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
           
           <div className="inputDiv">
            <p className='colorWhite'>Password</p>
            <input className='input' type="password" onChange={(e) => setPassword(e.target.value)}/>
           </div>
           
            
            <button type='submit' className='createBtn'>Create an Account</button>
        </form>
    </div>
  )
}

export default SignUpPage