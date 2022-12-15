import { db } from '../db/db.js'
import { CustomError } from '../utils/CustomError.js'

//Ruta api/supervisores GET
//Descripcion Devuelve una lista con todos los supervisores
export const obtenerSupervisores = async (_req, res, next) => {
  let transaction = await db.transaction()
  try {
    let supervisores = await db('supervisor as s')
      .transacting(transaction)
      .select(
        'e.idempleado',
        's.idsupervisor as idauth0',
        'e.idsupervisor as supervisor',
        'e.nombre',
        'e.apellido',
        'e.correo',
        'e.departamento',
        'e.distrito',
        'e.status',
        'e.horaentrada',
        'e.horasalida'
      )
      .innerJoin('empleados as e', 'e.idempleado', 's.idempleado')
    transaction.commit()
    res.json(supervisores)
  } catch (error) {
    transaction.rollback()
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
  let transaction = await db.transaction()
  try {
    const { idempleado, idauth0 } = req.body
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
    transaction.rollback()
    next(error)
  }
}

//Ruta /api/supervisores/:idauth0
//Descripcion Devuelve el id del empleado asignado al idauth0
export const obtenerIdEmpleado = async (req, res, next) => {
  let transaction = await db.transaction()
  try {
    const { idauth0 } = req.params
    let [idempleado] = await db('supervisor')
      .transacting(transaction)
      .select('idempleado')
      .where({ idsupervisor: idauth0 })
    if (!idempleado) {
      throw new CustomError(
        `No se encontro ningun supervisor con id ${idauth0}`,
        404
      )
    }
    transaction.commit()
    res.json(idempleado)
  } catch (error) {
    transaction.rollback()
    next(error)
  }
}

//Ruta /api/supervisores/:id/empleados
//Descripcion Devuelve los empleados asignados a un supervisor segun el idauth0
export const obtenerEmpleadosPorSupervisor = async (req, res, next) => {
  let transaction = await db.transaction()
  try {
    const { id } = req.params
    const [supervisor] = await db('supervisor')
      .transacting(transaction)
      .select('idempleado')
      .where({
        idsupervisor: id,
      })
      .orWhere({ idempleado: id })
    if (!supervisor) {
      throw new CustomError(
        'El supervisor no existe o no ha sido asignado como supervisor',
        404
      )
    }
    let empleados = await db('empleados')
      .transacting(transaction)
      .select(
        'empleados.idempleado',
        'idsupervisor',
        'nombre',
        'apellido',
        'correo',
        'departamento',
        'distrito',
        'status',
        'horaentrada',
        'horasalida',
        'zona',
        'roles.nombrerol as rol'
      )
      .innerJoin(
        'rolxempleado',
        'empleados.idempleado',
        'rolxempleado.idempleado'
      )
      .innerJoin('roles', 'rolxempleado.idrol', 'roles.idrol')
      .where({ idsupervisor: supervisor.idempleado })
    transaction.commit()
    res.json(empleados)
  } catch (error) {
    transaction.rollback()
    next(error)
  }
}
