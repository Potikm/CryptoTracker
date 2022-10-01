import React from 'react'
import {Link} from 'react-router-dom'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { async } from '@firebase/util';
import { UserAuth } from '../AuthContext';
import { updateDoc, doc, arrayUnion} from 'firebase/firestore';
import { db } from '../Firebase';
import { useEffect } from 'react';
import { onSnapshot } from "firebase/firestore";
import { useState } from 'react';
import { RingLoader } from 'react-spinners';



const Crypto = ({crypto}) => {

  const { user } = UserAuth();
  const coinPath = doc(db, 'users', `${user?.email}`)
  const percent = crypto.price_change_percentage_24h+"";
  var color = (percent.includes('-') ? 'red' : 'green');
  const [star, setStar] = useState(<AiOutlineStar style={{color: 'grey', cursor: 'pointer'}}/>)
  const [loading, setLoading] = useState(true)



  const saveCoin = async () => {
    if (user){
      if (user?.email){
        await updateDoc(coinPath, {watchList:
           arrayUnion({
            id: crypto.id,
            name: crypto.name,
            image: crypto.image,
            rank: crypto.market_cap_rank,
            symbol: crypto.symbol
          })})
      }
    }
     
  }
  
  useEffect(() => {

    if (user){
      
      onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
        
        for (let i = 0; i < doc.data()?.watchList.length; i++){
          if (doc.data()?.watchList[i].id === crypto.id){
               
            setStar(<AiFillStar style={{color: 'gold', cursor: 'pointer'}} />)
            setLoading(false)
        return
          } else{
            setStar(<AiOutlineStar style={{color: 'grey', cursor: 'pointer'}}/>)
          }
         }
      
         
        setLoading(false)
      })
   
    }else{
      setLoading(false)
      setStar(<AiOutlineStar style={{color: 'grey', cursor: 'pointer'}}/>)
    }
  
   }, [user])
 
 

  return (
    
     
     <div className='crypto'>

      <div className="star" onClick={saveCoin}>
        {loading ? <div className="loader"> <RingLoader size={'300px'}/></div>: star}
      </div>
  
      <h3 className='rank colorWhite'>{crypto.market_cap_rank}</h3>
      <Link to={'/Crypto/'+crypto.id} style={{ textDecoration: 'none' }}>
        <div className="description1">
        <img src={crypto.image} alt="" className='img'/>
         <h3 className='name colorWhite'>{crypto.id}</h3>
         
        </div>
      </Link>
      <div className="" style={{width: '100px', textAlign: 'left'}}>
      <h4 className='symbol colorWhite'>{crypto.symbol}</h4>
      </div>
      <div className="" style={{width: '100px', textAlign: 'left'}}>
      <h3 className='price colorWhite'>${crypto.current_price.toLocaleString('en-US')}</h3>
      </div>
      <div className="" style={{width: '100px', textAlign: 'left'}}>
      <h3 className='upDown colorWhite' style={{color:color}}>{crypto.price_change_percentage_24h}%</h3>
      </div>
      <div className="" style={{width: '100px', textAlign: 'left'}}>
      <h3 className='MC colorWhite'>${crypto.market_cap.toLocaleString('en-US')}</h3>
      </div>
     
       
      
     
    </div>
    
   
    
  )
}

export default Crypto