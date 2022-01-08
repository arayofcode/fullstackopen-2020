// Show Search box
const Filter = ({searchTerm, setSearchTerm}) => {
    return (
        <div>filter shown with <input onChange={setSearchTerm} value={searchTerm}/></div>
    )
}

export default Filter