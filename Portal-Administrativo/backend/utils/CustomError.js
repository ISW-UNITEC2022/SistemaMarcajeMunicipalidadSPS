export class CustomError extends Error {
  constructor(message = 'Lo sentimos algo ha salido mal', status, info = {}) {
    super(message)
  }
}
