const TokenHandler = (req, res, next) => {
    console.log('hit TokenHandler...')
    try {
        req.token = req.get('authorization').replace('Bearer ', '')
    } catch (error) {
        console.log(error)
    }   

    next()
}

module.exports = TokenHandler;