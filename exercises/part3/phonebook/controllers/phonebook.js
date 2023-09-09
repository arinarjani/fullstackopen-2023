const phonebookRouter = require('express').Router();
const Person = require('../models/phonebook');

// 3.1 - Implement a Node application that returns a hardcoded list of phonebook entries 
//       from the address http://localhost:3001/api/persons.
// 3.13 - Change the fetching of all phonebook entries
//        so that the data is fetched from the database.
phonebookRouter.get('/', (req, res) => {
    // res.json(persons)
    Person.find({}).then(people => {
        res.json(people);
    });
});

// 3.3 - Implement the functionality for displaying the information for a single phonebook
//       entry. The url for getting the data for a person with the id 5 should be
//       http://localhost:3001/api/persons/5
phonebookRouter.get('/:id', (req, res, next) => {
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
                res.json(foundPerson);
            } else {
                res.status(404).end();
            }
        }).catch(err => {
            // console.log(err)
            // res.status(400).send({error: 'malformatted id'})
            next(err);
        });
});

// 3.4 - Implement functionality that makes it possible to delete a single
// phonebook entry by making an HTTP DELETE request to the unique URL of
// that phonebook entry.

// 3.15 - Change the backend so that deleting phonebook entries is reflected in the
// database.
phonebookRouter.delete('/:id', (req, res, next) => {
    // get the url id
    const { id } = req.params;

    // take out the person with the id from the persons array
    // persons = persons.filter(person => person.id !== Number(id));

    Person
        .findByIdAndRemove(id)
        .then(() => res.status(204).end())
        .catch(err => next(err));

    res.sendStatus(204).end();
});

// 3.5 - Expand the backend so that new phonebook entries can be added by making HTTP POST
//       requests to the address http://localhost:3001/api/persons.
// 3.14 - Change the backend so that new numbers are saved to the database.
//        Verify that your frontend still works after the changes.
phonebookRouter.post('/', async (req,res, next) => {
    const foundPerson = await Person.find({ name: req.body.name }).exec();

    // see if a name sent to server is already in the phonebook
    if (!req.body.name) {
        // no name entered in req.body.name
        res.status(400).send('no name entered');
    } else if (!req.body.number) {
        // no number entered in req.body.number
        res.status(400).send('no number entered');
    } else if (foundPerson.length > 0) {
        // OLD persons.find(person => person.name.toLowerCase() === req.body.name.toLowerCase())
        // name already in persons array
        res.status(400).send('duplicate name entered');
    } else {
        // get the data sent to the server via req.body
        const { body } = req;

        // create a person to pass into the persons array
        // persons = persons.concat( {id: Math.round(Math.random() * 1000), ...body} );

        // add a person to the phonebook
        Person.create(body)
            .then(savedPerson => res.json(savedPerson))
            .catch(err => next(err));

        // res.json(persons)
    }
});

// 3.17 - If the user tries to create a new phonebook entry for a person whose
// name is already in the phonebook, the frontend will try to update the phone
// number of the existing entry by making an HTTP PUT request to the entry's
// unique URL.
phonebookRouter.put('/:id', (req, res) => {
    // do something PUT wise...
    Person
        .findOneAndUpdate(
            { name: req.body.name },
            { number: req.body.number },
            { new: true, runValidators: true, context: 'query' }
        )
        .then(updatedPerson => res.json(updatedPerson));
});

module.exports = phonebookRouter;