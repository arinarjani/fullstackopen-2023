const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const logger = require('../utils/logger')

blogsRouter.get('/', async (req,res) => {
    try {
        const allBlogs = await Blog.find({});
        res.json(allBlogs);
    } catch (err) {
        logger.info(err);
    }
    // Blog.find({}).then(blogs => res.json(blogs))
})

blogsRouter.post('/', async (req, res) => {
    const blogPost = new Blog(req.body)

    try {
        const createdBlog = await Blog.create(blogPost);
        res.status(201).json(createdBlog);
    } catch (err) {
        logger.info(err);
        res.status(400).json({error: 'missing required information'})
    }
    // Blog.create(blogPost)
    //     .then(createdBlog => res.status(201).json(createdBlog))
    //     .catch(err => logger.info('blog not created...'))
})

module.exports = blogsRouter