import { CustomError } from '../utils/CustomError.js'

export const notFound = (req, res, next) => {
  const error = new CustomError(`Not Found - ${req.originalUrl}`, 404, {
    url: req.originalUrl,
  })
  res.status(404)
  next(error)
}

export const errorHandler = (err, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  if (!(err instanceof CustomError)) {
    let info = {
      error: err.message,
      stack: err.stack,
    }
    err = new CustomError(undefined, statusCode)
    if (process.env.ENVIRONMENT === 'development') {
      err.info = info
    }
    res.status(statusCode)
  } else {
    res.status(err.status)
  }
  res.json({
    message: err.message,
    status: err.status,
    info: err.info,
  })
}