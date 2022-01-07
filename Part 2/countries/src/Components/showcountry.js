const ShowCountry = ({country}) => {
    // Shows a single country
    return(
        <div>
            <h1>{country.name.common}</h1>
            {/* In case there are more than one capitals
                "" + [...country.capital] returns all elements as string
            */}
            <div><strong>Capital: </strong> {"" + [...country.capital]}</div>
            <div><strong>Population: </strong>{country.population}</div>
            <h2>Spoken Languages</h2>
            {/* Showing all languages  */}
            <ul>
                {/* Get all language ids using Object.keys(country.languages), 
                    use them to get the language and also provide key attribute
                    to li tags
                */}
                {Object.keys(country.languages).map((language_id) =>
                    <li key={language_id}>{country.languages[language_id]}</li>
                )}
            </ul>
            {/* Didn't use svg because I'd have to reshape and I'm lazyx */}
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
        </div>
    )
}

export default ShowCountry