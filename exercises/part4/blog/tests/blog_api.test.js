const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('there are 2 blogs in the database', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2);
})

test('the first not if titled \'a\'', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('a')
})

test.skip('blogs are added to the database correctly', async () => {
  await api
    .post('/api/blogs')
    .send({title: 'a', author: 'aa', url: 'aaa', likes: 1})
    .expect(201)
})


  
afterAll(async () => {
  await mongoose.connection.close()
})