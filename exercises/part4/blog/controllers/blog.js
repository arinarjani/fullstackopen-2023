const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const logger = require('../utils/logger')

blogsRouter.get('/', (req,res) => {
    Blog.find({}).then(blogs => res.json(blogs));
})

blogsRouter.post('/', (req, res) => {
    const blogPost = new Blog(req.body)

    Blog.create(blogPost)
        .then(createdBlog => res.status(201).json(createdBlog))
        .catch(err => logger.info('blog not created...'))
})

module.exports = blogsRouter