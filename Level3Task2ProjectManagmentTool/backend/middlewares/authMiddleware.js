const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  let token
  let authHeader = req.headers.Authorization || req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401)
    throw new Error('There is no header!')
  }
  token = authHeader.split(' ')[1]
  if (!token) {
    res.status(401)
    throw new Error('There is no token!')
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => {
    if (err) {
      res.status(401)
      throw new Error('User is not authorized!')
    }
    req.user = decoded.user
    next()
  })
}

module.exports = authenticate
