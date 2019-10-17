const jwt = require('jsonwebtoken')
const secret = require('../../auth/config/secret')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(token){
        jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
            if(err){
                res.status(401).json({message: 'You shall not pass!!'})
            }
            else {
                req.username = decodedToken.username
                next()
            }
        })
    }
    else{
        res.status(400).json({message: 'a authorization token is required in the header'})
    }
}