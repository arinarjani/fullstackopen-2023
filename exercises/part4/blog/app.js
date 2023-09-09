const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Blog = require('./models/blogs')
const {MONGO_URI, PORT} = require('./utils/config')
const blogsRouter = require('./controllers/blog')

mongoose.connect(MONGO_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter);

module.exports = app