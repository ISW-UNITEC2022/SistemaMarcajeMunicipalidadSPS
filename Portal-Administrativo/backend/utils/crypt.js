import bcrypt from 'bcrypt'

export const hashPassword = (password) => {
  let salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(password, salt)
}

export const validarPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}
