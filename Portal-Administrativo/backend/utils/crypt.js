import bcrypt from 'bcrypt'

//Encriptar la contreseña del usuario
export const hashPassword = (password) => {
  let salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(password, salt)
}

//Validar que una contraseña sea valida
export const validarPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}
