import phonebookService from "../services/phonebook"

const Person = ({data, setPersons, setNotification}) => {
    // Handling deletion of user details
    const handleDelete = () => {
        // Confirm if user wants to delete data
        if (window.confirm(`Do you really want to delete ${data.name}?`)) {
            // Show a notification
            setNotification(`Deleted ${data.name} from the server`)
            // Remove name and show relevant message
            phonebookService.remove(data.id)
            .then(
                () => {
                    // Update phonebook from database
                    phonebookService.getAll()
                    .then(persons => setPersons(persons))
                }
            )
            .catch(
                (error) => {
                    // If error, show relevant message
                    setNotification(`${data.name} has already been removed from the server`)
                }
            )

            // Make notification null again
            setTimeout(() => setNotification(null), 1500)
        }
    }

    return (
        <li>
            {data.name} {data.number} <button onClick={handleDelete}> DELETE </button>
        </li>
    )
}

export default Person