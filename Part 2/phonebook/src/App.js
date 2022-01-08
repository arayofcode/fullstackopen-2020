import React, { useEffect, useState } from 'react'
import Form from './Components/form'
import Filter from './Components/filter'
import Persons from './Components/persons'
import phonebookService from './services/phonebook'
import Notification from './Components/notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchPerson, setSearchPerson] = useState('')
    const [notification, setNotification] = useState(null)
    
    // Fetch all contacts from phonebook db after rendering components
    useEffect(() => {
        phonebookService.getAll()
        .then(persons => {
            setPersons(persons)
        })
    }, [])

    const updateName = (event) => {
        setNewName(event.target.value)
    }

    const updateNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const updateSearchPerson = (event) => {
        let search = event.target.value
        setSearchPerson(search)
    }

    // Add a new person's details
    const addPerson = (event) => {
        event.preventDefault()
        // Check if duplicate. If not, add
        let checkPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()) 
        if(checkPerson){
            // Show dialog box for replacing, if yes, update database and update persons state
            if(window.confirm(`${newName} is already added to phonebook, replace old one with new one?`)){
                setNotification(`Updated phone number of ${newName}`)
                // NOTE THIS DOWN: There will be a function in `.then`!!!
                phonebookService.update(checkPerson.id, {...checkPerson, number: newNumber})
                .then(
                    () => phonebookService.getAll().then(persons => setPersons(persons))
                )
            }
        }
        else{
            /* 
                If no duplicate exists, create newPerson object,
                update db, show notification and update persons state
                to render updated phonebook
            */
            let newPerson = {name: newName, number:newNumber, id: persons.length + 1}
            phonebookService.create(newPerson)
            .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
            setNotification(`Added ${newName}`)
        }
        // Set these empty to ensure the boxes are empty
        setNewName("")
        setNewNumber("")    
        // setTimeout requires a function as parameter too
        setTimeout(() => setNotification(null), 1500)
    }

    const filteredPersons = persons.filter(
        (person) => person.name.toLowerCase().includes(searchPerson.toLowerCase())
    )

    return (
    <div>
        <h2>Phonebook</h2>
        <Notification message={notification} />
        <Filter searchTerm={searchPerson} setSearchTerm={updateSearchPerson}/>
        <Form addPerson={addPerson} newName={newName} newNumber={newNumber} updateName={updateName} updateNumber={updateNumber}/>
        <h2>Numbers</h2>
        <Persons persons = {filteredPersons} setPersons={setPersons} setNotification={setNotification}/>
    </div>
    )
}

export default App