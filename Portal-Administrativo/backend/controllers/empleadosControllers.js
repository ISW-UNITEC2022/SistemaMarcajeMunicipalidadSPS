import { db } from '../db/db.js'
import { CustomError } from '../utils/CustomError.js'
import bcrypt from 'bcrypt'
import { dateToTimeString, objectToTimeString } from '../utils/convertTime.js'

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

//Ruta /api/empleados POST
//Descripcion crea un nuevo empleado
/*
Body
{ idempleado: string, 
  idsupervisor: string | null,
  nombre: string,
  apellido: string,
  correo: string,
  password: string,
  distrito: int | null
  departamento: string
  horaentrada: string
  horasalida: string
}
*/
export const crearEmpleado = async (req, res, next) => {
  try {
    const {
      idempleado,
      idsupervisor,
      nombre,
      apellido,
      correo,
      password,
      distrito,
      departamento,
      horaentrada,
      horasalida,
    } = req.body
    let salt = bcrypt.genSaltSync()
    let hashpassword = bcrypt.hashSync(password, salt)
    let [user] = await db('empleados').insert(
      {
        idempleado,
        idsupervisor,
        nombre,
        apellido,
        correo,
        hashpassword,
        distrito,
        departamento,
        horaentrada,
        horasalida,
      },
      [
        'idempleado',
        'idsupervisor',
        'nombre',
        'apellido',
        'correo',
        'distrito',
        'departamento',
        'horaentrada',
        'horasalida',
      ]
    )
    if (user) {
      let [idrol] = await db('rolxempleado').insert(
        {
          idempleado: user.idempleado,
          idrol: 1, // Rol de empleado por default
        },
        ['idrol']
      )
      if (!idrol) {
        throw new CustomError('No se pudo asignar el rol al empleado')
      } else user.rol = 'Empleado'
    }
    res.json(user)
  } catch (error) {
    if (error.constraint === 'correo_unico')
      next(new CustomError('El correo ya esta en uso'))
    else if (error.constraint === 'empleados_pkey')
      next(new CustomError('La identidad del empleado ya esta en uso'))
    else if (error.constraint == 'empleados_departamento_check')
      next(new CustomError('El departamento no es valido'))
    else if (error.constraint == 'empleados_distrito_check')
      next(new CustomError('El distrito no es valido'))

    next(error)
  }
}

//Ruta /api/empleados/auth POST
//Descripcion valida usuario y contraseña
//Body { correo: string, password: string }
export const authEmpleado = async (req, res, next) => {
  try {
    const { correo, password } = req.body
    let [user] = await db
      .select('hashpassword')
      .from('empleados')
      .where('correo', '=', correo)
    if (!user) {
      throw new CustomError('Correo o contraseña incorrectos', 401)
    }
    let success = await bcrypt.compare(password, user.hashpassword)
    let userInfo
    if (success) {
      userInfo = await db
        .select(
          'idempleado',
          'idsupervisor',
          'nombre',
          'apellido',
          'correo',
          'departamento',
          'distrito',
          'status',
          'horaentrada',
          'horasalida'
        )
        .from('empleados')
        .where('correo', correo)
    } else {
      throw new CustomError('Correo o contraseña incorrectos', 401)
    }
    res.json(userInfo[0])
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
