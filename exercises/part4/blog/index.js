const app = require('./app')
const {MONGO_URI, PORT} = require('./utils/config')


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});