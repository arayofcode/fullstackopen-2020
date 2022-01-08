import Person from "./person";

// Shows list of people in phonebook
const Persons = ({persons, setPersons, setNotification}) => {
    if( persons.length === 0){
        return <div>No data to show</div>
    }
    else{
        return(
            <ul>
                {persons.map(
                    (person) => <Person key={person.id} data={person} setPersons={setPersons} setNotification={setNotification}/>
                )}
            </ul>
        )
    }

}

export default Persons