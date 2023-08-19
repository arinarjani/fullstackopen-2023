const mongoose = require('mongoose')
require('dotenv').config()

const monogoDB = process.env.MONGODB;

mongoose.connect(monogoDB) 

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id.toString()
            delete ret._id
            delete ret.__v
        }
    },
    timestamps: {
        createdAt: 'created_at'
    }
})

const Person = mongoose.model('Person', personSchema)

// HOW I POPULATED THE DATABASE FOR TESTING PURPOSES...
// Person.deleteMany({}).then(response => {
//     console.log(response)

//     // take the data from persons array above and put it into the database
//     for (let index = 0; index < persons.length; index++) {
//         Person.create(persons[index])
//     }
// });

module.exports = Person;