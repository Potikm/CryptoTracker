import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import TrendCoin from './TrendCoin';



const Trending = () => {
 const url = 'https://api.coingecko.com/api/v3/search/trending';

   const [trending, setTrending] = useState([]);



   useEffect(() => {
    axios.get(url).then((response) => {
        setTrending(response.data.coins);
        console.log(response.data.coins);
       
      });
   }, [])







  return (
    <div className='trending'>
       <h1 className='trendHeader'>Trending Coins</h1>
        {trending.map((tre, index) => (
         
           <TrendCoin tre={tre} index={index} />
      
        ))}
    
    </div>
  )
}

export default Trending