import React from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import './App.css';
import { useEffect, useState, } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Cryptos from './components/Cryptos';
import CryptoInfo from './components/CryptoInfo';
import Footer from './components/Footer';
import Trending from './components/Trending';


//https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
function App() {

  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [allCoins, setAllCoins] = useState(true);

   useEffect(() => {
     axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCryptos(res.data)
    
    
    })
   
    
  }, [])

  const change = e => {
    setSearch(e.target.value);
    setFilteredCoins(cryptos.filter(cry => cry.name.toLowerCase().includes(search.toLowerCase())))
    if (e.target.value === ''){
      setAllCoins(true)
    }else{
      setAllCoins(false)
    }
  }


 

  return (
    <BrowserRouter >
    <div className="App">
    <h1>Crypto Tracker</h1>
       
    
      <Routes>
   
      {allCoins ?  <Route exact path='/CryptoTracker' element={<><SearchBar onChange = {change} /> <Trending /> <Cryptos cryptos={cryptos}/></>}/>  : <Route path='/CryptoTracker' element={<><SearchBar onChange = {change} /> <Cryptos cryptos={filteredCoins}/></>}/>}
      <Route path='/Crypto/:CryptoId' element={<CryptoInfo />}></Route>
     
      </Routes>
    
      <Footer />


    </div>
    </BrowserRouter>
  );
 
}

export default App;
