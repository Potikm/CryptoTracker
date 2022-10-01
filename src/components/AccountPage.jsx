import React from 'react'
import { UserAuth } from '../AuthContext'
import HomeButton from './HomeButton';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase'; 
import { useEffect } from 'react';
import { useState } from 'react';
import SavedCoin from './SavedCoin';
import { RingLoader } from 'react-spinners';
import { Navigate, useNavigate } from 'react-router-dom';

const AccountPage = () => {


  const [coins, setCoins] = useState([]);

  const {user} = UserAuth()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

   useEffect(() => {

    if (user){
      onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
        setCoins(doc.data()?.watchList)
       
        setLoading(false)
      })
    }
    
   }, [user])

if (user){
  return (
    
    <div className='AccountPage'>
        <HomeButton />
        <h3 className='colorWhite'>Hi, {user.email}</h3>
        <h2 className='colorWhite headerList'>WatchList: </h2>
        {loading ? <div className="loader"> <RingLoader size={'300px'}/></div>: null}

      <div className="savedCoins">
        
          {coins.length === 0 ? 
        <p className='colorWhite'>You need to add some coins at first ;)</p>
        :
         coins.map((coi, index) => (
           
           <SavedCoin index={index} coin={coi}/>
          
        ))
        }
     </div>
      
    </div>
  )
}else{
  return <Navigate to={'/SignUp'}/>
}

}

export default AccountPage