const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blogs = require('../models/blogs')
const { initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  // delete all blogs in database
  await Blogs.deleteMany({});
  // save blog posts to the db
  await Blogs.create(initialBlogs);
})

test('blogs are returned as json', async () => {
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
    const response = await blogsInDb()

    // create an array from the blogs with only the blog titles
    const content = response.map(r => r.title)

    expect(response).toHaveLength(initialBlogs.length + 1)
    expect(content).toContain('blog 3')
})

test('blog without a title will not be added to the db',  async () => {
  // test to see if a blog without a title gets posted to the db
  await api
    .post('/api/blogs')
    .send({author: 'author 3', url: 'url 3', likes: 3})
    .expect(400)

  // check to see if the db increased in legnth 
  //   -> the blog without a title got posted, so
  //      the length of the db did not increase
  const response = await blogsInDb()

  expect(response).toHaveLength(initialBlogs.length)
})

test('find a blog based on id', async () => {
  // get all the blogs in the db
  const allBlogs = await blogsInDb()

  // select the first blog in the db
  const blogToView = allBlogs[0]

  // use GET with the blogToView.id to see if the server responds with
  // the correct blog
  const blogReturnedFromServer = 
    await api 
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)


  // see if blogReturnedFromServer matches blogToView
  expect(blogReturnedFromServer.body.id).toEqual(blogToView.id)

})

test('can one delete a blog from the db', async () => {
  // get all the blogs in the db before the delete
  const allBlogsBeforeDelete = await blogsInDb()

  // delete the first blog
  await api
    .delete(`/api/blogs/${allBlogsBeforeDelete[0].id}`)
    .expect(204)

  // get all the blogs in the db after the delete  
  const allBlogsAfterDelete = await blogsInDb()

  expect(allBlogsAfterDelete).toHaveLength(allBlogsBeforeDelete.length - 1)

  // get all the id's of blogs in allBlogsAfterDelete
  const ids = allBlogsAfterDelete.map(blog => blog.id)

  expect(ids).not.toContain(allBlogsBeforeDelete[0].id)
})
  
afterAll(async () => {
  await mongoose.connection.close()
})