import React from 'react'
import {Link} from 'react-router-dom'

const trendCoin = ({tre}) => {
  return (
    <Link to={'/Crypto/'+tre.item.id} style={{ textDecoration: 'none' }}>
    <div className='trendCoin'>
        <img src={tre.item.small} alt="" />
        <p className='colorWhite'>{tre.item.name}</p>
    </div>
    </Link>
  )
}

export default trendCoin