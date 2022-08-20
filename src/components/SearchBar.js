import React from 'react'


const SearchBar = ({onChange}) => {
 

  

  return (
    <div className='searchBar'>
        
        <input  className='input' type="text" onChange={onChange} placeholder='Find Crypto...'/>
        
    </div>
  )
}

export default SearchBar