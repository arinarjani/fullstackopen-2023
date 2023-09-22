const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: String,
    passwordHash: {
        type: String,
        required: true,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
    }, {
    toJSON: {
        transform: (document, returnedObj) => {
            returnedObj.id = returnedObj._id.toString(),
            delete returnedObj._id 
            delete returnedObj.__v 
            delete returnedObj.passwordHash
        }
    }
})

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' })

const User = mongoose.model('User', userSchema)

module.exports = User

