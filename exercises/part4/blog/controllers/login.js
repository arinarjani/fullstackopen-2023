const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
require('dotenv').config()

loginRouter.get('/', async (req, res) => {
    res.send('hello from \/api\/login...')
})

loginRouter.post('/', async (req, res, next) => {
    try {
        const {username, password} = req.body

        const user = await User.findOne({username})
        const passwordCorrect = user === null 
            ? false 
            : await bcrypt.compare(password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            return res.status(401)
                      .json({error: `invalid password - ${password} or username - ${username}`})
        }

        const userForToken = {
            username: user.username,
            id: user.id
        }

        const token = await jwt.sign(userForToken, process.env.SECRET, {expiresIn: '1h'})

        res.status(200)
            .send({
                token,
                username: user.username,
                name: user.name
            })
    } catch (err) {
        console.log('hit the error...')
        next(err)
    }
})

module.exports = loginRouter