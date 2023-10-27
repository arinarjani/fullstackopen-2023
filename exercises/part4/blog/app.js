const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Blog = require('./models/blogs')
const {MONGO_URI, PORT} = require('./utils/config')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const ErrorHandler = require('./middleware/error')
const TokenHandler = require('./middleware/TokenHandler')
const UserExtractor = require('./middleware/UserExtractor')

mongoose.connect(MONGO_URI)

// const ErrorHandler = (err, req, res, next) => {
//     res.json({error: err.message})
//     next()
// }

app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
// 4.20 - create a middleware that gets the token, and modify request to have request.token
// app.use(TokenHandler) // in controllers/blog.js
// app.use(UserExtractor) // in controllers/blog.js
app.use('/api/blogs', blogsRouter)
app.use(ErrorHandler)

module.exports = app