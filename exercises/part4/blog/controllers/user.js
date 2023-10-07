const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (req,res) => {
   const users = await User.find({}).populate('blogs', {title: 1, likes: 1}).exec()

   res.json(users)
})

// 4.15 - implement a way to create users
usersRouter.post('/', async (req, res, next) => {
   const { username, name, password } = req.body

   try {
      if (password.length < 3) {
         return res.status(400).json({ error: 'password must be at least 3 characters long' })
      }

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = new User({
         username, 
         name,
         passwordHash,
      })
      
      const savedUser = await User.create(user)

      res.status(201).json(savedUser)
   } catch (err) {
      res.status(400)
      next(err)
   }

   // try {
   //    const saltRounds = 10
   //    const passwordHash = await bcrypt.hash(password, saltRounds)

   //    const user = new User({
   //       username, 
   //       name,
   //       passwordHash,
   //    })

   //    const savedUser = await User.create(user)

   //    res.status(201).json(savedUser)
   // } catch (err) {
   //    res.status(400)
   //    next(err)
   // }
})

module.exports = usersRouter