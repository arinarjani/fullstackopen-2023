const app = require('./app.js');
const logger = require('./utils/logger.js');
const config = require('./utils/config');

app.listen(config.PORT, () => {
    logger.info(`app is running on ${config.PORT}`);
});



