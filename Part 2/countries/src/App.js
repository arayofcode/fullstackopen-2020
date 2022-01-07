import React, {useState, useEffect} from 'react';
import SearchBox from './Components/searchbox';
import ShowData from './Components/showdata';
import axios from 'axios';

const App = () => {
  const [search, setSearch] = useState('')
  const [countriesData, setCountriesData] = useState([])

  /* 
    - Store all countries data in app then do all operations 
    - useEffect runs after component is rendered
    - [] at the end means only once
  */
  useEffect(
    () => {
        axios.get('https://restcountries.com/v3.1/all')
        .then((response) => setCountriesData(response.data))
    }, []
  )
  
  return(
    <>
      {/* Show search box and result */}
      <SearchBox country={search} setCountry={setSearch}/>
      <ShowData search={search} setSearch={setSearch} countriesData={countriesData}/> 
    </>
  )
}

export default App;