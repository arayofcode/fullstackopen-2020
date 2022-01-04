import React, { useEffect, useState } from 'react'
import Form from './Components/form'
import Filter from './Components/filter'
import Persons from './Components/persons'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchPerson, setSearchPerson] = useState('')
    
    useEffect(() => {
        axios.get('http://localhost:3001/persons')
        .then(response => {
            setPersons(response.data)
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
        if(persons.find(person => person.name === newName)){
            alert(`${newName} is already added to phonebook`)
        }
        else{
            setPersons([...persons, {name: newName, number:newNumber, id: persons.length + 1}])
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
        <Persons persons = {filteredPersons} />
    </div>
    )
}

export default App