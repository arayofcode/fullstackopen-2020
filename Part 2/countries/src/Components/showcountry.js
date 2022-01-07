import axios from "axios"
import { useEffect, useState } from "react"

// Shows a single country
const ShowCountry = ({country}) => {
    const [weather, setWeather] = useState([])
    const [temp, setTemp] = useState(undefined)
    const [imgURL, setIMG] = useState(undefined)
    const [wind, setWind] = useState(undefined)

    useEffect(
        () => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then(response => {
                setWeather(response.data)
                setTemp((weather.main.temp).toFixed(0))
                setIMG(`https://openweathermap.org/img/w/${response.data.weather.icon}.png`)
                setWind((response.data.wind.speed * 2.236936).toFixed())
            }
        )}, [country.capital, weather]
    )
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
            <div><strong>Temperature: </strong>{temp}</div>
            <img src={imgURL} alt="Weather icon"/>
            <div><strong>Wind: </strong>{wind} mph</div>
        </div>
    )
}

export default ShowCountry