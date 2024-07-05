const jwt = require('jsonwebtoken')
require('dotenv').config()

// 4.22 - create a new middleware userExtractor, that finds out the user and 
//        sets it to the request object.
const UserExtractor = (req, res, next) => {
    console.log('UserExtractor...')
    try {
        req.user = jwt.verify(req.token, process.env.SECRET).id
        console.log('req.user', req.user)
    } catch (error) {
        console.log(error)
    }   

    next()
}

module.exports = UserExtractor;