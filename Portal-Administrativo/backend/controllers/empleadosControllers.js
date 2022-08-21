import { db } from '../db/db.js'
import { CustomError } from '../utils/CustomError.js'

//Ruta /api/empleados GET
//Descripcion Devuelve la informacion de todos los empleados
export const obtenerEmpleados = async (_req, res, next) => {
  try {
    let empleados = await db
      .select(
        'empleados.idempleado',
        'idsupervisor',
        'nombre',
        'apellido',
        'correo',
        'departamento',
        'distrito',
        'status',
        'nombrerol as rol'
      )
      .from('empleados')
      .innerJoin(
        'rolxempleado',
        'rolxempleado.idempleado',
        '=',
        'empleados.idempleado'
      )
      .innerJoin('roles', 'roles.idrol', '=', 'rolxempleado.idrol')
    if (empleados.length < 1) {
      res.status(404)
      throw new CustomError('No hay ningun empleado', 404)
    }
    res.json(empleados)
  } catch (error) {
    next(error)
  }
}

//Ruta /api/empleados/:id
//Descripcion Devuelve el correo y contraseña del empleado
//especificado en :id
export const obtenerEmpleado = async (req, res, next) => {
  try {
    const { id } = req.params
    let empleados = await db
      .select('correo', 'hashpassword')
      .from('empleados')
      .where('idempleado', id)
    if (empleados.length < 1) {
      res.status(404)
      throw new CustomError('No se ha encontrado el empleado', 404)
    }
    res.json(empleados)
  } catch (error) {
    next(error)
  }
}
