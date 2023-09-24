const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }

    return null
}

blogsRouter.get('/', async (req,res) => {
    try {
        const allBlogs = await Blog.find({}).populate('user', {username: 1, name: 1});
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
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

    if (!decodedToken) {
        return res.status(401).json({ error: 'invalid token' })
    }

    const user = await User.findById(decodedToken.id)

    const blogPost = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes || 0,
        // pass a user id to the user field, as user stores id's only
        user: user.id,
    })

                 
    try {
        const createdBlog = await Blog.create(blogPost);

        // pass the createdBlog id to the user.blogs field
        user.blogs = user.blogs.concat(createdBlog._id)
        await user.save()

        res.status(201).json(createdBlog);
    } catch (err) {
        logger.error(err)
        return res.status(400).json({ error: 'could not create blog, missing title or url' })
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