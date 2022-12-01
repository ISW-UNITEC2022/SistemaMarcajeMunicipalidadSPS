import { CustomError } from '../utils/CustomError.js'

//Mostrar un error personalizado si se accede a una ruta inexistente
export const notFound = (req, res, next) => {
  const error = new CustomError(`Not Found - ${req.originalUrl}`, 404, {
    url: req.originalUrl,
  })
  res.status(404)
  next(error)
}

//Manejar los errores para mosrar mensajes personalizados al usuario
export const errorHandler = (err, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  /*
    Si el error no es instancia de CustomError quiere decir que el 
    sistema fallo inesperadamente, en ese caso se agrega la informacion
    del error al mensaje de error
  */
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
