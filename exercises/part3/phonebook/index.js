const express = require('express');
// const path = require('path');
const app = express();

app.use(express.json())

let persons = [
    { 
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
];

// const persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ];

// 3.1 - Implement a Node application that returns a hardcoded list of phonebook entries 
//       from the address http://localhost:3001/api/persons.
app.get('/api/persons', (req, res) => {
    res.json(persons)
});

// 3.2 - Implement a page at the address http://localhost:3001/info that looks roughly 
//       like this: 
//                 "Phonebook has info for 2 people"
//                 "Fri Aug 04 2023 10:53:07 GMT-0700 (Pacific Daylight Time)"
app.get('/info', (req,res) => {
    // res.sendFile(path.join(__dirname, "/info.html"))
    res.send(`Phonebook has info for ${persons.length} people </br> ${new Date().toString()}`)
});

// 3.3 - Implement the functionality for displaying the information for a single phonebook
//       entry. The url for getting the data for a person with the id 5 should be 
//       http://localhost:3001/api/persons/5
app.get('/api/persons/:id', (req, res) => {
    const foundPerson = persons.find(person => person.id === Number(req.params.id));

    if (foundPerson) {
        res.json(foundPerson)
    } else {
        res.status(404).send('no person found')
    }
})

// 3.4 - Implement functionality that makes it possible to delete a single phonebook entry
//       by making an HTTP DELETE request to the unique URL of that phonebook entry.
app.delete('/api/persons/:id', (req, res) => {
    // get the url id
    const { id } = req.params;

    // take out the person with the id no wanted from the persons array
    persons = persons.filter(person => person.id !== Number(id));

    res.send(204).end()
})

// 3.5 - Expand the backend so that new phonebook entries can be added by making HTTP POST
//       requests to the address http://localhost:3001/api/persons.
app.post('/api/persons', (req,res) => {
    // see if a name sent to server is already in the phonebook
    console.log(typeof req.body)


    if (!req.body.name) {
        res.status(400).send('no name entered')
    } else if (!req.body.number) {
        res.status(400).send('no number entered')
    } else if (persons.find(person => person.name.toLowerCase() === req.body.name.toLowerCase())) {
        res.status(400).send('duplicate name entered')
    } else {
        // get the data sent to the server via req.body
        const { body } = req;

        // create a person to pass into the persons array
        persons = persons.concat( {id: Math.round(Math.random() * 1000), ...body} );

        res.json(persons)
    }
    
})

app.listen(3001, () => {
    console.log(`app is running on port 3001`);
})



