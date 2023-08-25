const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const Person = require('./models/phonebook')

// const path = require('path'); trying to send html files..goes with 
// app.get('/info').....

// 3.8 - Configure morgan so that it also shows the data sent in HTTP POST requests
morgan.token('body', (req) => {
    // if the method is POST, return req.body, else return '-'
    return req.method === "POST" ? JSON.stringify(req.body) : '-';
})
const app = express();

// 3.11 - generate a 'build' folder via 'npm run build', put this 'build' folder
//        into the backend directory, and test
app.use(express.static('build'));
// 3.9 - makae the backend work with the front-end. I did this via proxy in 
//       'package.json' after changing the url in '/services/phonebook.js' from
//       'http://localhost:3001/persons' to '/api/persons' in part2/phonebook/src
app.use(cors());
app.use(express.json());
// 3.7 - Add the morgan middleware to your application for logging. 
//       Configure it to log messages to your console based on the tiny configuration.
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

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

// 3.1 - Implement a Node application that returns a hardcoded list of phonebook entries 
//       from the address http://localhost:3001/api/persons.
// 3.13 - Change the fetching of all phonebook entries 
//        so that the data is fetched from the database.
app.get('/api/persons', (req, res) => {
    // res.json(persons)
    Person.find({}).then(people => {
        res.json(people)
    })
});

// 3.2 - Implement a page at the address http://localhost:3001/info that looks roughly 
//       like this: 
//                 "Phonebook has info for 2 people"
//                 "Fri Aug 04 2023 10:53:07 GMT-0700 (Pacific Daylight Time)"
app.get('/info', (req,res) => {
    // res.sendFile(path.join(__dirname, "/info.html")) trying to send html files..goes with line 2
    res.send(`Phonebook has info for ${persons.length} people </br> ${new Date().toString()}`)
});

// 3.3 - Implement the functionality for displaying the information for a single phonebook
//       entry. The url for getting the data for a person with the id 5 should be 
//       http://localhost:3001/api/persons/5
app.get('/api/persons/:id', (req, res, next) => {
    // // find perosn with :id in url in persons array
    // const foundPerson = persons.find(person => person.id === Number(req.params.id));

    // if (foundPerson) {
    //     // person is found, send the person via server
    //     res.json(foundPerson)
    // } else {
    //     // no person found, send an error message
    //     res.status(404).send('no person found')
    // }

    Person.findById(req.params.id)
          .exec()
          .then(foundPerson => {
            if (foundPerson) {
                res.json(foundPerson)
            } else {
                res.status(404).end()
            }
          }).catch(err => {
            // console.log(err)
            // res.status(400).send({error: 'malformatted id'})
            next(err)
          })
})

// 3.4 - Implement functionality that makes it possible to delete a single 
// phonebook entry by making an HTTP DELETE request to the unique URL of 
// that phonebook entry.

// 3.15 - Change the backend so that deleting phonebook entries is reflected in the 
// database.
app.delete('/api/persons/:id', (req, res, next) => {
    // get the url id
    const { id } = req.params;

    // take out the person with the id from the persons array
    // persons = persons.filter(person => person.id !== Number(id));

    Person
        .findByIdAndRemove(id)
        .then(result => res.status(204).end())
        .catch(err => next(err));

    res.sendStatus(204).end()
})

// 3.5 - Expand the backend so that new phonebook entries can be added by making HTTP POST
//       requests to the address http://localhost:3001/api/persons.
// 3.14 - Change the backend so that new numbers are saved to the database. 
//        Verify that your frontend still works after the changes.
app.post('/api/persons', async (req,res) => {
    console.log('in post....')

    const foundPerson = await Person.find({name: req.body.name}).exec()

    // see if a name sent to server is already in the phonebook
    if (!req.body.name) {
        // no name entered in req.body.name
        res.status(400).send('no name entered')
    } else if (!req.body.number) {
        // no number entered in req.body.number
        res.status(400).send('no number entered')
    } else if (foundPerson.length > 0) {
        // OLD persons.find(person => person.name.toLowerCase() === req.body.name.toLowerCase())
        
        // name already in persons array
        res.status(400).send('duplicate name entered')
    } else {
        // get the data sent to the server via req.body
        const { body } = req;

        // create a person to pass into the persons array
        // persons = persons.concat( {id: Math.round(Math.random() * 1000), ...body} );

        // add a person to the phonebook
        Person.create(body).then(savedPerson => res.json(savedPerson))

        // res.json(persons)
    }
    
})

// 3.17 - If the user tries to create a new phonebook entry for a person whose 
// name is already in the phonebook, the frontend will try to update the phone 
// number of the existing entry by making an HTTP PUT request to the entry's 
// unique URL.
app.put('/api/persons/:id', (req, res) => {
    console.log('in PUT...')

    // do something PUT wise...
    Person
        .findOneAndUpdate({name: req.body.name}, {number: req.body.number}, {new: true})
        .then(updatedPerson => res.json(updatedPerson))
})

// 3.16 - Move the error handling of the application to a new error handler middleware.
const errorHandler = (err, req, res, next) => {
    console.log(err.message)

    if (err.name === 'CastError') {
        return res.status(400).send({error: 'malformatted id'});
    }
    
    next(err);
}

app.use(errorHandler);

app.listen(3001, () => {
    console.log(`app is running on port 3001`);
})



