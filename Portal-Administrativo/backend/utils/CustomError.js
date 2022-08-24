export class CustomError extends Error {
  constructor(
    message = 'Lo sentimos algo ha salido mal',
    status = 500,
    info = undefined
  ) {
    super(message)
    this.status = status
    this.info = info
  }
}
