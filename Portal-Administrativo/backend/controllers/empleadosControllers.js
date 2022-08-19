import { db } from '../db/db.js'
import { CustomError } from '../utils/CustomError.js'

export const obtenerEmpleados = (req, res, next) => {
  const { id } = req.params
  db.select('correo', 'hashpassword')
    .from('empleados')
    .where('idempleado', id)
    .then((empleados) => {
      if (empleados.length < 1) {
        res.status(404)
        throw new CustomError('No se ha encontrado el empleado', 404)
      }
      res.json(empleados)
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
}
