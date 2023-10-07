const TokenHandler = (req, res, next) => {
    if (req.method === 'POST') {
        if (req.get('authorization').startsWith('Bearer ')) {
            req.token = req.get('authorization').replace('Bearer ', '')
        }
    }

    next()
}

module.exports = TokenHandler;