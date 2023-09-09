const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const Person = require('./models/phonebook');
const logger = require('./utils/logger');
const phonebookRouter = require('./controllers/phonebook');
const middleware = require('./utils/middleware');

// const path = require('path'); trying to send html files..goes with
// app.get('/info').....

// 3.8 - Configure morgan so that it also shows the data sent in HTTP POST requests
morgan.token('body', (req) => {
    // if the method is POST, return req.body, else return '-'
    return req.method === 'POST' ? JSON.stringify(req.body) : '-';
});
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

// let persons = [
//     {
//       'id': 1,
//       'name': 'Arto Hellas',
//       'number': '040-123456'
//     },
//     {
//       'id': 2,
//       'name': 'Ada Lovelace',
//       'number': '39-44-5323523'
//     },
//     {
//       'id': 3,
//       'name': 'Dan Abramov',
//       'number': '12-43-234345'
//     },
//     {
//       'id': 4,
//       'name': 'Mary Poppendieck',
//       'number': '39-23-6423122'
//     }
// ];

app.use('/api/persons', phonebookRouter);

// 3.2 - Implement a page at the address http://localhost:3001/info that looks roughly 
//       like this:
//                 'Phonebook has info for 2 people'
//                 'Fri Aug 04 2023 10:53:07 GMT-0700 (Pacific Daylight Time)'
phonebookRouter.get('/info', async (req,res) => {
    // res.sendFile(path.join(__dirname, '/info.html')) trying to send html files..goes with line 2
    const allPeople = await Person.find({});
    res.send(`Phonebook has info for ${allPeople.length} people </br> ${new Date().toString()}`)
});

app.use(middleware.errorHandler);

module.exports = app;