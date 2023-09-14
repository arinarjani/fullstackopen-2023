const Blog = require('../models/blogs')

const initialBlogs = [
    {
      title: 'blog 1',
      author: 'author 1',
      url: 'url 1',
      likes: 1
    },
    {
      title: 'blog 2',
      author: 'author 2',
      url: 'url 2',
      likes: 2
    }
]

const nonExistingId = async () => {
    const blog = await Blog.create({title: 'blog 3', author: 'author 3', url: 'url 3', likes: 3})
    
    // don't know what this does
    await blog.deleteOne()

    return blog.id
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})

    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}


  