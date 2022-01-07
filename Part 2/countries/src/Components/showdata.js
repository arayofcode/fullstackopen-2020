import ShowCountry from "./showcountry";

const Data = ({ data, setSearch }) => {

  if (Array.isArray(data)) {
    // When searchbox is empty or didn't find any country
    if (data.length === 0){
      return <div>No search results or nothing searched yet</div>
    }
    // Single country as results
    else if (data.length === 1) {
      return <ShowCountry country={data[0]} />;
    } 
    // Number of results <= 10
    else if (data.length <= 10) {
      return (
        <ul>
          {/* From data, map each country name with button that 
              allows you to show that country */}
          {data.map((country) => {
            return (
              <li key={country.name.common}>
                <div>
                  {country.name.common}
                  {/* When clicked on button, make country name as search
                      Fetches the country details. 
                      Issue: if you search sudan, it won't take you anywhere
                      */}
                  <button onClick={() => setSearch(country.name.common)}>show</button>
                </div>
              </li>
            );
          })}
        </ul>
      );
    } 
    else {
      return <div>Too many matches, specify another filter</div>;
    }
  } else {
    return <div>No results found</div>;
  }
};

const ShowData = ({ search, countriesData, setSearch }) => {
  let countriesFilter = search ? countriesData.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase())) : [];

  return <Data data={countriesFilter} setSearch={setSearch}/>;
};

export default ShowData;
