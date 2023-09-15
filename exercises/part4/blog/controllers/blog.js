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

        if (foundBlog) {
            res.json(foundBlog)
        } else {
            res.status(404).end()
        }
    } catch (Err) {
        logger.error({error: `blog not found with the id of ${id}`})
    }
})

blogsRouter.post('/', async (req, res) => {
    const blogPost = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes || 0
    })
                 
    try {
        const createdBlog = await Blog.create(blogPost);
        res.status(201).json(createdBlog);
    } catch (err) {
        logger.error(err)
        res.status(400).json({error: 'missing title or url'})
    }
})

blogsRouter.delete('/:id', async (req,res) => {
    const { id } = req.params
    try {
        await Blog.findByIdAndDelete(id)
        res.status(204).end()
    } catch (err) {
        logger.error({error: `could not delete blog with id of ${id}`})
    }
})

module.exports = blogsRouter