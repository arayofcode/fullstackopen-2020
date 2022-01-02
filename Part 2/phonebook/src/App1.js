import React, { useState } from 'react'
import Filter from './Components/filter'
import Persons from './persons'

const ShowPerson = ({person}) => <div><span>{person.name}</span> <span>{person.number}</span> </div>

const App = () => {
  // Array of objects
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  // Use this to store value of input box
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPeople, setFilter] = useState(persons)

  // When someone edits the input box
  const handleNameChange = (event) => {
    // Change state of newName to whatever value is in box
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // Change state of newName to whatever value is in box
    setNewNumber(event.target.value)
  }

  // Check if newName exists in persons array. If yes, alert
  const checkDuplicate = () => {
    if(persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return true
    }
    return false
  }

  const addNewName = (event) => {
    event.preventDefault()
    let dups = checkDuplicate()
    if(!dups){
      let newNameObj = {name: newName, number: newNumber, id: persons.length + 1} 
      setPersons(persons.concat(newNameObj))
    }
  }

  const handleSearchChange = (event) => {
    let search = event.target.id
    setSearchTerm(search)
    let searchResult = persons.filter(
      (person) => person.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilter(searchResult)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm}  setSearchTerm={handleSearchChange}/>
      <form onSubmit={addNewName}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <ShowPerson person={person} key={person.id}/>)
      }
      <h2>Test thing</h2>
      {
        filteredPeople.map(
          (person) => <div key={person.id}>{person.name} {person.number}</div>
        )
      }
    </div>
  )
}

export default App