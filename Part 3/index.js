const express = require('express')
const morgan = require('morgan')

// Middleware definitions
morgan.token('body', (req, res) => {
    // When checking if object is empty, use length of keys
    if(Object.keys(req.body).length === 0){
        return ""
    }
    else{
        return JSON.stringify(req.body)
    }
})

// Setting up express server
const app = express()

// Using middlewares
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Initial phonebook
let phoneBook = [{
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// For fetching details of everyone in phonebook
app.get('/api/persons', (req, res) => {
    res.json(phoneBook)
})

// Fetching details of person with given id number
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = phoneBook.find(person => person.id === id)
    // If found, return else 404
    if (person) {
        res.json(person)
    } else {
        res.status(404).send('Person not found')
    }
})

// Delete person with given id
app.delete('/api/persons/:id', (req, res) => {
    // req.params will return strings. Convert them 
    const id = Number(req.params.id)
    // filter returns a copy of array elements that satisfy condition
    phoneBook = phoneBook.filter(person => person.id !== id)
    // Status 204: No content
    res.status(204).end()
})

// Information on data available in phonebook at time of request
app.get('/info', (req, res) => {
    
    res.send(`
    <div>
        <p>Phonebook has info for ${phoneBook.length} people</p>
    </div>
    <div>
        <p>${Date()}</p>
    </div>
    `)
})

// Add person to phonebook if not duplicate
app.post('/api/persons', (request, response) => {
    const body = request.body

    // Ensuring name and number are not empty
    if (!(body.name && body.number)) {
        return response.status(400).json({
            error: 'Name or number missing'
        })
    }

    const person = {
        id: (Math.random() * 999999) | 0,
        name: String(body.name),
        number: String(body.number)
    }

    // Name exists in PhoneBook
    if (phoneBook.find(person => person.name === body.name)) {
        return response.status(409).json({
            error: 'Name must be unique'
        })
    }

    // Add to phoneBook
    phoneBook = phoneBook.concat(person)
    response.json(person)
})

// For handling unknown links
const unknownEndpoint = (request, response) => {
    response.status(404).end()
}
app.use(unknownEndpoint)

// Server initialization
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})