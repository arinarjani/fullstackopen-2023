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

// 4.8 - makes an HTTP GET request to the /api/blogs URL
test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

// 4.9 - write a test that verifies the id of a blog is .id and not_id
test('.id is the identifier, not _id', async () => {
  // get all blogs from db
  const blogs = await blogsInDb()

  for (const blog of blogs) {
    expect(blog.id).toBeDefined()
  }
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

// 4.10 - write a test to add blogs to the db. verify the length has increased and 
//        some sort of content is saved correctly. I chose the title of the new blog
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

// 4.12 - Write tests related to creating new blogs via the /api/blogs endpoint, that verify that 
//        if the title or url properties are missing from the request data, the backend responds 
//        to the request with the status code 400 Bad Request
test('blog without a title, or url, will not be added to the db and respond with 400',  
  async () => {
  // test to see if a blog without a title gets posted to the db
  await api
    .post('/api/blogs')
    .send({author: 'author 3', likes: 3})
    .expect(400)

  // code before 'express-async-errors' installed and with the correct http status code
  //   the library defaults to 500
  // await api
  //   .post('/api/blogs')
  //   .send({author: 'author 3', url: 'url 3', likes: 3})
  //   .expect(400)

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

// 4.11 - Write a test that verifies that if the likes property is missing 
//        from the request, it will default to the value 0.
test('if a blog post does not have any likes, it defaults to 0', async () => {

  // POST a blog to the db without likes
  await api 
    .post('/api/blogs')
    .send({title: 'no likes', author: 'no likes', url: 'no likes'})
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // grab all the blogs in the db
  const blogs = await blogsInDb()

  expect(blogs[blogs.length - 1].likes).toEqual(0)
})
  
afterAll(async () => {
  await mongoose.connection.close()
})