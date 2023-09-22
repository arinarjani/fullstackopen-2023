const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const { usersInDb } = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there is initially one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)

        await User.create({
            username: 'arin', passwordHash
        })
    })

    test('creation succeeds with a fresh username', async () => {
        const startUsers = await usersInDb()

        const newUser = {
            username: 'sara',
            name: 'sara',
            password: 'sara'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const endUsers = await usersInDb()

        expect(endUsers).toHaveLength(startUsers.length + 1)

        const usernames = endUsers.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test.only(`creation of a user fails with proper status code 
         and message if username alaready taken`, async () => {
            const usersAtStart = await usersInDb();

            const user = {
                username: 'arin',
                password: 'arin',
            }

           const result = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

            // users in db have not increased
            const usersAtEnd = await usersInDb()
            expect(usersAtEnd).toEqual(usersAtStart)
            // error message should be, 'expected `username` to be unique'
            expect(result._body.error).toContain('expected `username` to be unique')
         })
})

afterAll(async () => {
    await mongoose.connection.close()
})