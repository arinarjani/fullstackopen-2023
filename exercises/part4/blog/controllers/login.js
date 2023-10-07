const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
require('dotenv').config()

// 4.18 - Implement token-based authentication according to part 4 chapter Token authentication.
// create a route to login
loginRouter.post('/', async (req, res, next) => {
    // grab username and password from req
    const { username, password } = req.body

    try {
        // find user in db
        const user = await User.findOne({ username: username })
        // see if user password matches provided password

        const isPasswordCorrect = user === null
        ? false
        : bcrypt.compareSync(password, user.passwordHash) 
        // either await bcrpyt.compare or this

        // if all checks out create a token with jwt and send back the token
       if (!(user && isPasswordCorrect)) {
            return res.status(401).json({error: 'invalid username or password'})
       } else {
        const infoForToken = {
            username: user.username,
            id: user.id
        }

        const token = jwt.sign(infoForToken, process.env.SECRET, {expiresIn: '1h'})

        res.status(200)
            .send({
                token,
                username: user.username,
                name: user.name
            })
       }
    } catch (err) {
        next(err)
    }

})

module.exports = loginRouter