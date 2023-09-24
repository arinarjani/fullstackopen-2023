const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// 4.16 - Add a feature which adds the following restrictions to creating 
//        new users: Both username and password must be given. Both username 
//        and password must be at least 3 characters long. The username must be unique.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (v) => {
                return v.length > 3
            },
            message: props => `${props.value} is too short. username must be more than 3 characters long`
        },
    },
    name: {
        type: String,
        required: true,
    },
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

