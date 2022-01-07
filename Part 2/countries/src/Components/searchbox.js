const SearchBox = ({country, setCountry}) => {

    // Stop refreshing on form submission
    const handleFormSubmit = (event) => {
        event.preventDefault()
    }

    // Ensure this is saved
    const handleSearchChange = (event) =>{
        setCountry(event.target.value)
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                Find countries <input value={country} onChange={handleSearchChange}/>
            </div>
        </form>
    )
}

export default SearchBox