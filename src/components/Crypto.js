import React from 'react'

const Crypto = ({crypto}) => {
  const percent = crypto.price_change_percentage_24h+"";
  var color = (percent.includes('-') ? 'red' : 'green');
  console.log(crypto)
  return (
    <div className='crypto'>
      <h3 className='rank'>{crypto.market_cap_rank}</h3>
      <img src={crypto.image} alt="" className='img'/>
       <h3 className='name'>{crypto.id}</h3>
        <h4 >{crypto.symbol}</h4>
        <h3 className='price'>${crypto.current_price.toLocaleString('en-US')}</h3>
        <h3 className='upDown' style={{color:color}}>{crypto.price_change_percentage_24h}%</h3>
        <h3 className='MC'>${crypto.market_cap.toLocaleString('en-US')}</h3>
    </div>
  )
}

export default Crypto