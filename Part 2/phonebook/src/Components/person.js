import phonebookService from "../services/phonebook"

const Person = ({data, setPersons}) => {

    const handleDelete = () => {
        if (window.confirm(`Do you really want to delete ${data.name}?`)) {
            phonebookService.remove(data.id)
            .then(
                () => phonebookService.getAll()
                .then(persons => setPersons(persons))
            )
        }
    }

    return (
        <li>
            {data.name} {data.number} <button onClick={handleDelete}> DELETE </button>
        </li>
    )
}

export default Person