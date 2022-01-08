import React, { useEffect, useState } from 'react'
import Form from './Components/form'
import Filter from './Components/filter'
import Persons from './Components/persons'
import phonebookService from './services/phonebook'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchPerson, setSearchPerson] = useState('')
    
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
            // alert(`${newName} is already added to phonebook`)
            console.log(checkPerson);
            if(window.confirm(`${newName} is already added to phonebook, replace old one with new one?`)){
                phonebookService.update(checkPerson.id, {...checkPerson, number: newNumber})
            }
        }
        else{
            let newPerson = {name: newName, number:newNumber, id: persons.length + 1}
            phonebookService.create(newPerson)
            .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
            setNewName("")
            setNewNumber("")    
        }
    }

    const filteredPersons = persons.filter(
        (person) => person.name.toLowerCase().includes(searchPerson.toLowerCase())
    )

    return (
    <div>
        <h2>Phonebook</h2>
        <Filter searchTerm={searchPerson} setSearchTerm={updateSearchPerson}/>
        <Form addPerson={addPerson} newName={newName} newNumber={newNumber} updateName={updateName} updateNumber={updateNumber}/>
        <h2>Numbers</h2>
        <Persons persons = {filteredPersons} setPersons={setPersons}/>
    </div>
    )
}

export default App