import { db } from '../db/db.js'
import { CustomError } from '../utils/CustomError.js'
import bcrypt from 'bcrypt'
import {
  dateToTimeString,
  getRangeDates,
  removeTime,
  toFormat12h,
  toLocale,
} from '../utils/convertTime.js'
import { hashPassword, validarPassword } from '../utils/crypt.js'

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
        'zona',
        'horaentrada',
        'horasalida',
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
    empleados = empleados.map((empleado) => {
      return {
        ...empleado,
        horaentrada: toFormat12h(empleado.horaentrada),
        horasalida: toFormat12h(empleado.horasalida),
      }
    })
    res.json(empleados)
  } catch (error) {
    next(error)
  }
}

//Ruta /api/empleados GET
//Descripcion Devuelve la informacion de todos los empleados
export const obtenerEmpleadosPorRol = async (_req, res, next) => {
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
        'zona',
        'horaentrada',
        'horasalida',
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
      .where('roles.idrol', 2)
    if (empleados.length < 1) {
      res.status(404)
      throw new CustomError('No hay ningun empleado', 404)
    }
    empleados = empleados.map((empleado) => {
      return {
        ...empleado,
        horaentrada: toFormat12h(empleado.horaentrada),
        horasalida: toFormat12h(empleado.horasalida),
      }
    })
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
  zona: string | null
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
      zona,
      departamento,
      horaentrada,
      horasalida,
    } = req.body
    let hashpassword = hashPassword(password)
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
        zona,
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
        'zona',
      ]
    )
    if (user) {
      let [idrol] = await db('rolxempleado').insert(
        {
          idempleado: user.idempleado,
          idrol: 2, // Rol de empleado por default
        },
        ['idrol']
      )
      if (!idrol) {
        throw new CustomError('No se pudo asignar el rol al empleado')
      } else user.rol = 'Empleado'
    }
    user = {
      ...user,
      horaentrada: toFormat12h(user.horaentrada),
      horasalida: toFormat12h(user.horasalida),
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
    let success = validarPassword(password, user.hashpassword)
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
          'horasalida',
          'zona'
        )
        .from('empleados')
        .where('correo', correo)
    } else {
      throw new CustomError('Correo o contraseña incorrectos', 401)
    }
    userInfo = {
      ...userInfo[0],
      horaentrada: userInfo[0].horaentrada,
      horasalida: userInfo[0].horasalida,
    }
    res.json(userInfo)
  } catch (error) {
    next(error)
  }
}

//Ruta /api/empleados/:id
//Descripcion Devuelve la informacion del empleado con el :id
export const obtenerEmpleadoPorId = async (req, res, next) => {
  try {
    const { id } = req.params
    let [empleado] = await db
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
        'roles.nombrerol as rol',
        'zona'
      )
      .from('empleados')
      .innerJoin(
        'rolxempleado',
        'empleados.idempleado',
        'rolxempleado.idempleado'
      )
      .innerJoin('roles', 'rolxempleado.idrol', 'roles.idrol')
      .where('empleados.idempleado', id)
    if (!empleado) {
      res.status(404)
      throw new CustomError('No se ha encontrado el empleado', 404)
    }
    empleado = {
      ...empleado,
      horaentrada: toFormat12h(empleado.horaentrada),
      horasalida: toFormat12h(empleado.horasalida),
    }
    res.json(empleado)
  } catch (error) {
    next(error)
  }
}

//Ruta api/empleados PUT
//Descripcion modifica la informacion de un empleado
//Body
/*{ 
  idempleado: string,
  idsupervisor: string | null,
  correo: string,
  status: string,
  distrito: int | null,
  zona: string | null,
  password: string | null
  departamento: string,
  horaentrada: string,
  horasalida: string,
}
*/
export const actualizarEmpleado = async (req, res, next) => {
  try {
    const {
      idempleado,
      idsupervisor,
      correo,
      distrito,
      zona,
      password,
      departamento,
      horaentrada,
      horasalida,
    } = req.body
    let updateBody = {}
    if (!password) {
      updateBody = {
        idsupervisor,
        correo,
        distrito,
        zona,
        departamento,
        horaentrada,
        horasalida,
      }
    } else {
      let hashpassword = hashPassword(password)
      updateBody = {
        idsupervisor,
        correo,
        distrito,
        zona,
        hashpassword,
        departamento,
        horaentrada,
        horasalida,
      }
    }
    let [empleadoActualizado] = await db('empleados')
      .where('idempleado', idempleado)
      .update(updateBody, [
        'idempleado',
        'idsupervisor',
        'nombre',
        'apellido',
        'correo',
        'distrito',
        'zona',
        'departamento',
        'horaentrada',
        'horasalida',
        'status',
      ])
    res.json(empleadoActualizado)
  } catch (error) {
    if (error.constraint === 'correo_unico')
      next(new CustomError('El correo ya esta en uso'))
    else if (error.constraint == 'empleados_departamento_check')
      next(new CustomError('El departamento no es valido'))
    else if (error.constraint == 'empleados_distrito_check')
      next(new CustomError('El distrito no es valido'))
    else if (error.constraint == 'empleados_status_check')
      next(new CustomError('El status no es valido'))

    next(error)
  }
}

//Ruta api/empleados/status
//Descripcion Actualiza el estado de un empleado
//Body
/*{ 
  idempleado: string,
  status: string, alta o baja
}
*/
export const actualizarStatus = async (req, res, next) => {
  let transaction = await db.transaction()
  try {
    let { idempleado, status } = req.body
    let [empleado] = await db('empleados')
      .select('status')
      .where({ idempleado })
    if (!empleado) {
      throw new CustomError('No se ha encontrado el empleado', 404)
    }
    if (empleado.status === status) {
      throw new CustomError(`El empleado ya tiene status de ${status}`, 400)
    }
    let [empleadoActualizado] = await db('empleados')
      .transacting(transaction)
      .update(
        {
          status,
        },
        [
          'idempleado',
          'idsupervisor',
          'nombre',
          'apellido',
          'correo',
          'distrito',
          'zona',
          'departamento',
          'horaentrada',
          'horasalida',
          'status',
        ]
      )
      .where('idempleado', idempleado)
    transaction.commit()
    res.json(empleadoActualizado)
  } catch (error) {
    transaction.rollback()
    if (error.constraint === 'empleados_status_check') {
      next(new CustomError('Status de empleado no valido', 400))
    }
    next(error)
  }
}

//Ruta api/empleados/historial/:idempleado GET
//Descripcion devuelve un array con el historial de marcas de un empleado
export const obtenerHistorialDeMarca = async (req, res, next) => {
  let transaction = await db.transaction()
  try {
    let { idempleado } = req.params
    let [fechaInicio, fechaFinal] = getRangeDates(16)
    let historial = await db('marcaje')
      .transacting(transaction)
      .select('fecha', 'tipo')
      .where({ idempleado: idempleado })
      .andWhereBetween('fecha', [fechaInicio, fechaFinal])
    let group = {}
    historial.forEach((element) => {
      const fecha = removeTime(element.fecha)
      group[fecha] = group[fecha] ?? { fecha }
      if (element.tipo === 'entrada') {
        group[fecha]['horaentrada'] = toFormat12h(
          dateToTimeString(element.fecha)
        )
      } else {
        group[fecha]['horasalida'] = toFormat12h(
          dateToTimeString(element.fecha)
        )
      }
    })
    historial = []
    for (let marcas in group) {
      historial.push(group[marcas])
    }
    transaction.commit()
    res.json(historial)
  } catch (error) {
    transaction.rollback()
    next(error)
  }
}
