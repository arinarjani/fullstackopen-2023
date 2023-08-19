const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

const mongoDB = process.env.MONGODB;

mongoose.set('strictQuery',false);
// https://stackoverflow.com/questions/55695565/error-message-mongoerror-bad-auth-authentication-failed-through-uri-string
mongoose.connect(mongoDB);

const User = mongoose.model('User', {
    name: String,
    age: Number, 
});

// const arin = new User({
//     name: 'arin 8/17',
//     age: 29 
// })

// arin.save().then(console.log('arin is saved'));

User.find({}).then(result => {
    console.log(result)
    mongoose.connection.close();
})

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(3001, () => {
    console.log('you are on PORT 3001')
})