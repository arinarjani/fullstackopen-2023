const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Blog = require('./models/blogs')
const {MONGO_URI, PORT} = require('./utils/config')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const ErrorHandler = require('./middleware/error')

mongoose.connect(MONGO_URI)

// const ErrorHandler = (err, req, res, next) => {
//     res.json({error: err.message})
//     next()
// }

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(ErrorHandler)

module.exports = app