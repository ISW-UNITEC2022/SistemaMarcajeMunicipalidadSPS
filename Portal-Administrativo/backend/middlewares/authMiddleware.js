import { db } from '../db/db.js'
import { CustomError } from '../utils/CustomError.js'

const estaDeAlta = async (req, res, next) => {
  let transaction = await db.transaction()
  try {
    let { correo } = req.body
    let [empleado] = await db('empleados').select('status').where({ correo })
    if (!empleado) {
      throw new CustomError('El correo no esta asignado a ningun empleado', 404)
    }
    console.log(empleado)
    if (empleado.status === 'alta') {
      transaction.commit()
      next()
    } else {
      throw new CustomError(
        'El estado del empleado es de baja, no tiene acceso',
        401
      )
    }
  } catch (error) {
    transaction.rollback()
    next(error)
  }
}

export default estaDeAlta
