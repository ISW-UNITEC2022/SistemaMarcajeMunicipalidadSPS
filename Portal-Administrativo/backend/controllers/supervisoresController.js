import { db } from '../db/db.js'
import { CustomError } from '../utils/CustomError.js'

//Ruta api/supervisores GET
//Descripcion Devuelve una lista con todos los supervisores
export const obtenerSupervisores = async (_req, res, next) => {
  try {
    let supervisores = await db
      .select(
        'empleados.idempleado',
        'supervisor.idsupervisor as idauth0',
        'empleados.idsupervisor as supervisor',
        'empleados.nombre',
        'empleados.apellido',
        'empleados.correo',
        'empleados.departamento',
        'empleados.distrito',
        'empleados.status',
        'empleados.horaentrada',
        'empleados.horasalida'
      )
      .from('supervisor')
      .innerJoin('empleados', 'empleados.idempleado', 'supervisor.idempleado')
    res.json(supervisores)
  } catch (error) {
    next(error)
  }
}

//Ruta api/supervisores POST
//Descripcion actualiza el rol de un empleado a supervisor
// y devuelve el idempleado y el id de auth0
//Body
/*
{
  idempleado: string, el empleado que se va a actualizar
  idauth0: string
}
*/
export const crearSupervisor = async (req, res, next) => {
  try {
    const { idempleado, idauth0 } = req.body
    let transaction = await db.transaction()
    let [supervisor] = await db('supervisor')
      .transacting(transaction)
      .returning(['idempleado', 'idsupervisor as idauth0'])
      .insert({ idempleado, idsupervisor: idauth0 })
      .catch((err) => {
        transaction.rollback()
        if (err.constraint === 'supervisor_idempleado_fkey') {
          throw new CustomError(`No se encontro al empleado ${idempleado}`, 404)
        } else if (err.constraint === 'idempleado_unique') {
          throw new CustomError(
            `El empleado ${idempleado} ya es un supervisor`,
            409
          )
        } else if (err.constraint === 'supervisor_pkey') {
          throw new CustomError(`El codigo de supervisor ya existe`, 409)
        }
        throw new CustomError('No se pudo agregar al supervisor', 400, {
          error: err.message,
          stack: err.stack,
        })
      })
    await db('rolxempleado')
      .transacting(transaction)
      .where('idempleado', '=', idempleado)
      .update({ idrol: 1 }) //Actualizar el rol del empleado a supervisor
      .catch((err) => {
        transaction.rollback()
        throw new CustomError('No se pudo agregar al supervisor', 400, {
          error: err.message,
          stack: err.stack,
        })
      })
    transaction.commit()
    res.json(supervisor)
  } catch (error) {
    next(error)
  }
}

//Ruta /api/supervisores/:idauth0
//Descripcion Devuelve el id del empleado asignado al idauth0
export const obtenerIdEmpleado = async (req, res, next) => {
  try {
    const { idauth0 } = req.params
    let transaction = await db.transaction()
    let [idempleado] = await db()
      .transacting(transaction)
      .select('idempleado')
      .from('supervisor')
      .where({ idsupervisor: idauth0 })
    if (!idempleado) {
      throw new CustomError(
        `No se encontro ningun supervisor con id ${idauth0}`
      )
    }
    transaction.commit()
    res.json(idempleado)
  } catch (error) {
    next(error)
  }
}
