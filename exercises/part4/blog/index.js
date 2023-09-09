const app = require('./app')
const {MONGO_URI, PORT} = require('./utils/config')
const logger = require('./utils/logger')


app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
});