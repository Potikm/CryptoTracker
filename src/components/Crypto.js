import React from 'react'
import {Link} from 'react-router-dom'


const Crypto = ({crypto}) => {
  const percent = crypto.price_change_percentage_24h+"";
  var color = (percent.includes('-') ? 'red' : 'green');

  return (
    <Link to={'/Crypto/'+crypto.id} style={{ textDecoration: 'none' }}>
     <div className='crypto'>
      <h3 className='rank colorWhite'>{crypto.market_cap_rank}</h3>

      <div className="description1">
      <img src={crypto.image} alt="" className='img'/>
       <h3 className='name colorWhite'>{crypto.id}</h3>
      </div>
        <h4 className='symbol colorWhite'>{crypto.symbol}</h4>
        <h3 className='price colorWhite'>${crypto.current_price.toLocaleString('en-US')}</h3>
        <h3 className='upDown colorWhite' style={{color:color}}>{crypto.price_change_percentage_24h}%</h3>
        <h3 className='MC colorWhite'>${crypto.market_cap.toLocaleString('en-US')}</h3>
    </div>
    </Link>
   
    
  )
}

export default Crypto