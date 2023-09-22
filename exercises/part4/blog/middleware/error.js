const ErrorHandler = (err, req, res, next) => {
    res.json({error: err.message})
    next()
}

module.exports = ErrorHandler