const logger = require('./logger');

// 3.16 - Move the error handling of the application to a new error handler middleware.
const errorHandler = (err, req, res, next) => {
    logger.error(err.message);

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ err: err.message });
    }
    next(err);
};

module.exports = { errorHandler };