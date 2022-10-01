import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Sparklines, SparklinesLine  } from 'react-sparklines';
import DOMPurify from 'dompurify'
import HomeButton from './HomeButton';
import { UserAuth } from '../AuthContext';
import { updateDoc, doc, arrayUnion, onSnapshot} from 'firebase/firestore';
import { db } from '../Firebase';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { RingLoader } from 'react-spinners';


const CryptoInfo = () => {
   
   const [coin, setCoin] = useState({});
   var params = useParams();
   const [coins, setCoins] = useState([]);
   const url =`https://api.coingecko.com/api/v3/coins/${params.CryptoId}?localization=false&sparkline=true`;
   const { user } = UserAuth();
   const coinPath = doc(db, 'users', `${user?.email}`) 
   const [star, setStar] = useState(<AiOutlineStar style={{color: 'grey', cursor: 'pointer'}}/>)
   const [loading, setLoading] = useState(false)


   const saveCoin = async () => {
    if (user?.email){
      await updateDoc(coinPath, {watchList:
         arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image?.small,
          rank: coin.market_cap_rank,
          symbol: coin.symbol
        })})
      }
    }

    useEffect(() => {
      if (user){
        onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
          setCoins(doc.data()?.watchList) 
          for (let i = 0; i < doc.data()?.watchList.length; i++){
            
            if (doc.data()?.watchList[i].id === coin.id){
                 console.log(doc.data()?.watchList[i].id)
              setStar(<AiFillStar style={{color: 'gold', cursor: 'pointer'}} />)
          return
            } else{
              setStar(<AiOutlineStar style={{color: 'grey', cursor: 'pointer'}}/>)
            }
           }
        })
      }
  
      setLoading(false)
     }, [coin])
   
   var color = (coin.market_data?.price_change_percentage_24h.toFixed(2).includes('-') ? 'red' : 'green');

    useEffect(() => {
      axios.get(url).then((response) => {
        setCoin(response.data);
       
      });
      setLoading(true);
    }, [params.CryptoId]);
  

  return (
     <div className="cryptoInfo">
      <HomeButton />
        <div className="upInfo">
        <div className="star" onClick={saveCoin}>
          {loading ? <div className="loader"> <RingLoader size={'300px'}/></div>: star}
        </div>
        
        <div className='nameSection'>
         <img src={coin.image?.large} alt="" className='imgInfo'/>

         <div className="">
          <div className="nameDiv">
           <h1 className='name'>{coin.name}</h1>
           <h4 className='symbol colorWhite'>{coin.symbol}</h4>
          
          </div>
          <h5 className='rank colorWhite'>Rank #{coin.coingecko_rank}</h5>
         </div>
       
         
        </div>
        <div className="priceSection">

          <div className="priceDiv">
            <h2 className='price colorWhite'>${coin.market_data?.current_price?.usd.toLocaleString('en-US')}</h2>
            <h3 style={{color:color}} className='upDown colorWhite'>{coin.market_data?.price_change_percentage_24h.toFixed(2)}%</h3>
          </div>
      
         <h5 className='priceEth colorWhite'>{coin.market_data?.current_price?.eth.toLocaleString('en-US')} ETH</h5>
        </div>
       

        </div>


        <div className="downInfo">
          <div className="flex">
          <div className="chart">
            <p className='chartRange colorWhite'>7 day</p>
             <Sparklines  data={coin.market_data?.sparkline_7d.price}>
               <SparklinesLine color='teal'/>
             </Sparklines>
             <div className="underChart">
             <h3 className='MC colorWhite'>Market Cap: ${coin.market_data?.market_cap?.usd.toLocaleString('en-US')}</h3>
             <h3 className='volume colorWhite'>Volume: ${coin.market_data?.total_volume?.usd.toLocaleString('en-US')}</h3>
             </div>
          </div>
          <div className="stats borders">
            {coin.market_data?.max_supply === null ? <h4 className='supply colorWhite'>Max Supply: --</h4> :   <h4 className='supply colorWhite'>Max Supply: <br /> {coin.market_data?.max_supply}</h4>}
             <h4 className='ath colorWhite'>ATH: <br /> ${coin.market_data?.ath.usd.toLocaleString('en-US')}</h4>
             <h4 className='price7d colorWhite' >Price Change (7d): <br /> <div style={coin.market_data?.price_change_percentage_7d < 0 ? {color: 'red'} : {color: 'green'}}>{coin.market_data?.price_change_percentage_7d.toFixed(2)}%</div></h4>
             <h4 className='price14d colorWhite'>Price Change (14d): <br /> <div style={coin.market_data?.price_change_percentage_14d < 0 ? {color: 'red'} : {color: 'green'}}>{coin.market_data?.price_change_percentage_14d.toFixed(2)}%</div></h4>
             <h4 className='price30d colorWhite'>Price Change (30d): <br /> <div style={coin.market_data?.price_change_percentage_30d < 0 ? {color: 'red'} : {color: 'green'}}>{coin.market_data?.price_change_percentage_30d.toFixed(2)}%</div></h4>
             <h4 className='price1y colorWhite'>Price Change (1y): <br /> <div style={coin.market_data?.price_change_percentage_1y < 0 ? {color: 'red'} : {color: 'green'}}>{coin.market_data?.price_change_percentage_1y.toFixed(2)}%</div></h4>
          </div>
          </div>
        
          <div className="description2">
              <h2 className='aboutHeader colorWhite'>About {coin.name}</h2>
              <p className='about colorWhite' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),}}></p>
          </div>
        </div>
       
     </div>
   
 

    
  )
}

export default CryptoInfo