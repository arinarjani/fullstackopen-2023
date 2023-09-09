const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', (req,res) => {
    Blog.find({}).then(blogs => res.json(blogs));
})

blogsRouter.post('/', (req, res) => {
    const blogPost = new Blog(req.body)

    Blog.create(blogPost)
        .then(createdBlog => res.status(201).json(createdBlog))
        .catch(err => console.log('blog not created...'))
})

module.exports = blogsRouter