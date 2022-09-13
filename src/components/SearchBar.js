import React from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar = ({onChange}) => {

  return (
    <div className='searchBar'>
        <i> <FaSearch className='imgSearch'/> </i>
        <input  className='input' type="text" onChange={onChange} placeholder='Find Crypto...'/>
        
    </div>
  )
}

export default SearchBar