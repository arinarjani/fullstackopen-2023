const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const TokenHandler = require('../middleware/TokenHandler')
const UserExtractor = require('../middleware/UserExtractor')
require('dotenv').config()

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')

//     if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')
//     }

//     return null
// }

// WAY DONE BY THE TUTORIAL
// blogsRouter.get('/', async (req,res) => {
//     try {
//         const allBlogs = await Blog.find({}).populate('user', {username: 1, name: 1});
//         res.json(allBlogs);
//     } catch (err) {
//         logger.info(err);
//     }
//     // Blog.find({}).then(blogs => res.json(blogs))
// })

// WAY DONE BY READING THE MONGOOSE DOCS, BUT select: ['username', 'blogs] isn't in the docs, and it works, so there it that
// 4.17 - Expand blogs so that each blog contains information on the creator of the blog.
//      - Expand users so that each usercontains information on the blogs created by each user.
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

// 4.19 - Modify adding new blogs so that it is only possible if a valid token is sent 
//        with the HTTP POST request. The user identified by the token is designated as 
//        the creator of the blog.
// 4.22 - create a new middleware userExtractor, that finds out the user and 
//        sets it to the request object. **THIS ROUTE IS MORE FOR CHAINING MIDDLEWARE**
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

// 4.21 - Change the delete blog operation so that a blog can be deleted only by 
//        the user who added the blog.
// 4.22 - create a new middleware userExtractor, that finds out the user and 
//        sets it to the request object. **THIS ROUTE IS MORE FOR CHAINING MIDDLEWARE**
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
    
    // try {
    //     await Blog.findByIdAndDelete(id)
    //     res.status(204).end()
    // } catch (err) {
    //     logger.error({error: `could not delete blog with id of ${id}`})
    // }
})

blogsRouter.put('/:id',TokenHandler, UserExtractor, async (req, res, next) => {
    try {
        const { id } = req.params
        const { likes } = req.body

        const foundBlog = await Blog.findById(id)

        if ( foundBlog.user.toString() === req.user ) {
            foundBlog.likes = likes
            await foundBlog.save()
            res.status(200).send(foundBlog)
        }
    } catch (error) {
        next(error)
        res.status(401).send({ error: 'unable to update blog' })
    }
})

module.exports = blogsRouter