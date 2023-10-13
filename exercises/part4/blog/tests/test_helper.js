const Blog = require('../models/blogs')
const User = require('../models/user')

// HELPERS FOR BLOGS
const initialBlogs = [
    {
      title: 'blog 1',
      author: 'author 1',
      url: 'url 1',
      user: "65205ea408abb1155a37a5eb",
      likes: 1
    },
    {
      title: 'blog 2',
      author: 'author 2',
      url: 'url 2',
      user: "65205ea408abb1155a37a5eb",
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

// HELPERS FOR USERS
const usersInDb = async () => {
  const users = await User.find({})

  return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}


  