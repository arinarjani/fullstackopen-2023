const TokenHandler = (req, res, next) => {
    // if (req.method === 'POST') {
    //     if (req.get('authorization').startsWith('Bearer ')) {
    //         req.token = req.get('authorization').replace('Bearer ', '')
    //     }
    // }

    try {
        req.token = req.get('authorization').replace('Bearer ', '')
    } catch (error) {
        console.log(error)
    }
    // if (req.get('authorization').startsWith('Bearer ')) {
    //     console.log('token:', req.get('authorization'))
    //     req.token = req.get('authorization').replace('Bearer ', '')
    // }    

    next()
}

module.exports = TokenHandler;