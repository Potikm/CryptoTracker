import React from 'react'
import Crypto from './Crypto'


const Cryptos = ({cryptos}) => {
    
 

  return (
    <div className='cryptos'>
   
     {cryptos.map((cry, index) => (
     
        <Crypto key={index} crypto={cry}/>
        
      ))}
        


    </div>
  )
}

export default Cryptos