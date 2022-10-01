import React from 'react'
import SignUpBtn from './SignUpBtn'
import LoginBtn from './LoginBtn'
import { UserAuth } from '../AuthContext'
import UserImg from './Pictures/user.png'
import { Link } from 'react-router-dom'






const UserActions = () => {


  const handleLogout = async (e) => {
     try{
         await logout()
     }catch (e){
       console.log(e.message)
     }
  }




    const { user, logout } = UserAuth();
   
  return (
       <>
        {user === null ?  <div className='Buttons'> <SignUpBtn />
        <LoginBtn /> </div> : <div class="dropdown">
         <img src={UserImg} alt="" className='img' />
         
         <div class="dropdown-content">
          <p>Hello, {user.email}</p>
            <Link  to={'/Account'}>
            <a href="#">Profile</a>
             </Link>
         
           <a href="#" onClick={handleLogout}>Logout</a>
         </div>
       </div>}
       
      
       </>
  )
}

export default UserActions