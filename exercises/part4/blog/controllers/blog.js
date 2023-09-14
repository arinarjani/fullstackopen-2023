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

blogsRouter.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const foundBlog = await Blog.findById(id).exec()
        res.status(200).json(foundBlog)
    } catch (err) {
        logger.error({error: `blog not found with the id of ${id}`})
    }
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

blogsRouter.delete('/:id', async (req,res) => {
    const { id } = req.params

    try {
        await Blog.findByIdAndDelete(id)
        res.status(204).end()
    } catch (err) {
        logger.error({error: `could not delete blog with id of ${id}`})
    }

    res.status(204)
})

module.exports = blogsRouter