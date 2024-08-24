const { STATUSCODE } = require('../constants/statuscode')

const errorHandler = (err, req, res, next) => {
  console.log(err)
  const statusCode = res.statusCode ? res.statusCode : 500
  switch (statusCode) {
    case STATUSCODE.VALIDATION_ERROR:
      res.json({
        title: 'validation error',
        message: err.message,
        stackTrace: err.stack
      })
      break
    case STATUSCODE.UNAUTHORIZED:
      res.json({
        title: 'unauthorized access',
        message: err.message,
        stackTrace: err.stack
      })
      break
    case STATUSCODE.SERVER_ERROR:
      res.json({
        title: 'server error',
        message: err.message,
        stackTrace: err.stack
      })
      break
    case STATUSCODE.NOT_FOUND:
      res.json({
        title: 'Not Found',
        message: err.message,
        stackTrace: err.stack
      })
      break
    case STATUSCODE.FORBIDDEN:
      res.json({
        title: 'Forbidden',
        message: err.message,
        stackTrace: err.stack
      })
      break
    default:
      console.log('no error found')
      break
  }
}

module.exports = errorHandler
