import React from 'react'
import HomePic from './Pictures/home.png'
import { useNavigate } from 'react-router-dom'




const HomeButton = () => {

  const navigate = useNavigate();



  const returnHome = () =>{
     navigate("/")
  }



  return (
    <div className='homeBtn' onClick={returnHome}>
        <img src={HomePic} alt="" className='img'/>
    </div>
  )
}

export default HomeButton