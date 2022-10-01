import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillStar, AiOutlineClose } from 'react-icons/ai';
import { UserAuth } from '../AuthContext';
import { updateDoc, doc, deleteField} from 'firebase/firestore';
import { db } from '../Firebase';
import { useEffect } from 'react';
import { onSnapshot } from "firebase/firestore";
import { useState } from 'react';



const SavedCoin = ({coin}) => {
 
 const {user} = UserAuth();
 const [coins, setCoins] = useState([])
    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
          setCoins(doc.data()?.watchList)
          console.log(coins)
        })
       }, [])

    const coinPath = doc(db, 'users', `${user.email}`)

    const deleteCoin = async (id) => {
     
        const coin = coins.filter((coin) => coin.id !== id)
        await updateDoc(coinPath, {
         watchList: coin
        })  

       
       
      
    }

  return (
  
     <div className='savedCoin'>
        <div className="sides">
            <div className="left">
             <AiFillStar style={{color: 'gold'}}/>
             <Link to={'/Crypto/'+coin.id} style={{ textDecoration: 'none', display: 'flex', gap: '15px', height: '30px', justifyContent: 'center', alignItems:'center' }}>
             <img className='img' src={coin.image} alt="" />
             <p className='colorWhite'>{coin.name}</p>
             </Link>
            </div>
            <div className="right">
              <AiOutlineClose  style={{color: 'white', cursor: 'pointer'}} onClick={() => deleteCoin(coin.id)}/>
            </div>
        </div>
       
         
    </div>
   
   
  )
}

export default SavedCoin