const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const TokenHandler = require('../middleware/TokenHandler')
const UserExtractor = require('../middleware/UserExtractor')
require('dotenv').config()


blogsRouter.get('/', async (req, res) => {
    try {
        // get all blogs and list the users info for each blog
        const allBlogs = await Blog.find({}).populate({ path: 'user', select: ['username', 'blogs'] }).exec()
    
        res.json(allBlogs)
    } catch (err) {
        logger.info(err)
    }
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

blogsRouter.post('/', TokenHandler, async (req, res) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        // const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

        if (!decodedToken) {
            return res.status(401).json({ error: 'invalid token' })
        }

        const user = await User.findById(decodedToken.id)

        // UNCOMMENT WHEN TESTING AND COMMENT OUT LINE 75
        // const user = await User.findById('652970c9dd3d5cdbed32fc73')

        const blogPost = new Blog({
            title: req.body.title,
            author: req.body.author,
            url: req.body.url,
            likes: req.body.likes || 0,
            // pass a user id to the user field, as user stores id's only
            user: user.id,
        })

        const createdBlog = await Blog.create(blogPost);

        // pass the createdBlog id to the user.blogs field
        user.blogs = user.blogs.concat(createdBlog._id)
        await user.save()

        res.status(201).json(createdBlog);
    } catch (err) {
        logger.error(err)
        return res.status(400).json({ error: 'could not create blog' })
    }
})

blogsRouter.delete('/:id', TokenHandler, UserExtractor, async (req,res) => {
    const { id } = req.params

    try {
        // const verified = jwt.verify(req.token, process.env.SECRET)
        const foundBlog = await Blog.findById(id)

        // see if blog user id matches token id
        if ( foundBlog.user.toString() === req.user ) {
            // delete blog if all checks out, else error
            await Blog.findByIdAndDelete(id)
            return res.status(204).end()
        }
    } catch (error) {
        logger.error({error: `could not delete blog with id of ${id}`})
    }
})

blogsRouter.put('/:id', TokenHandler, UserExtractor, async (req, res, next) => {
    console.log('you have hit the /api/blogs/:id PUT route... :)')
    console.log('req.body', req.body)
    console.log('req.token', req.token)
    console.log('req.user', req.user)

    // TODO: FIGURE OUT HOW TO GET THE USE AND TOKEN AND HEADER STUFF WITH AXIOS

    // try {
    //     const { id } = req.params
    //     const { likes } = req.body

    //     const foundBlog = await Blog.findById(id)

    //     if ( foundBlog.user.toString() === req.user ) {
    //         foundBlog.likes = likes
    //         await foundBlog.save()
    //         res.status(200).send(foundBlog)
    //     }
    // } catch (error) {
    //     next(error)
    //     res.status(401).send({ error: 'unable to update blog' })
    // }
})

module.exports = blogsRouter