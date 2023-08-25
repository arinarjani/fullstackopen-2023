const mongoose = require('mongoose')
require('dotenv').config()

const monogoDB = process.env.MONGODB;

mongoose.connect(monogoDB) 

// 3.19 - Expand the validation so that the name stored in the database 
// has to be at least three characters long.
// 3.20 - Add validation to your phonebook application, which will 
// make sure that phone numbers are of the correct form.
const personSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        validate: {
            validator: (v) => {
                return v.length > 3
            },
            message: (props) => `The name must be longer than three characters, got ${props.value} instead`
        },
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: (v) => {
                return /\d{3}-\d{3}-\d{4}/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    }
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