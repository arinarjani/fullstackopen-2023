const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blogs = require('../models/blogs')

const api = supertest(app)

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

beforeEach(async () => {
  // delete all blogs in database
  await Blogs.deleteMany({});
  // save blog posts to the db
  await Blogs.create(initialBlogs);
})

test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('there are 2 blogs in the database', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length);
})

test('\'blog 1\' is in the blogs db', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(blog => blog.title)
  expect(contents).toContain('blog 1')
})

test('a blog is added to the database correctly and the db length is increased by one', 
  async () => {
    // POST blog to db
    await api
      .post('/api/blogs')
      .send({title: 'blog 3', author: 'author 3', url: 'url 3', likes: 3})
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // get all blogs from db
    const response = await api.get('/api/blogs')
    // create an array from the blogs with only the blog titles
    const content = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(content).toContain('blog 3')
})

test('blog without a title will not be added to the db',  async () => {
  // test to see if a blog without a title gets posted to the db
  await api
    .post('/api/blogs')
    .send({author: 'author 3', url: 'url 3', likes: 3})
    .expect(400)

  // check to see if the db increased in legnth -> the blog without a title got posted
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})
  
afterAll(async () => {
  await mongoose.connection.close()
})