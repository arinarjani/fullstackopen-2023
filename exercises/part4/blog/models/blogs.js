const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    author: String,
    url: String,
    likes: Number,
  }, {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret.__v
        delete ret._id
      }
    }
  })
  
  const Blog = mongoose.model('Blog', blogSchema)

  module.exports = Blog;