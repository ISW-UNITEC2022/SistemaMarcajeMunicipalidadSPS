//Clase para crear errores personalizados
export class CustomError extends Error {
  constructor(
    //Mensaje por defecto se usa cuando el sistema falla inesperadamente
    message = 'Lo sentimos algo ha salido mal',
    status = 500,
    info = undefined
  ) {
    super(message)
    this.status = status
    this.info = info
  }
}
