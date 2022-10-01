import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserAuth } from '../AuthContext'
import HomeButton from './HomeButton';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {signIn, user} = UserAuth()
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
    
        try{
          
          await signIn(email, password)
          navigate('/Account');
        } catch (e){
          setError(e.message)
          console.log(e.message)
        }
      }



  return (
    <div className='loginPage'>
       <HomeButton />
        <h1>Sign In</h1>
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
           
            
            <button type='submit' className='createBtn'>Login</button>
        </form>
    </div>
  )
}

export default LoginPage