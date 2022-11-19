import { db } from '../db/db.js'
//import { CustomError } from '../utils/CustomError.js'
import {
  dateToTimeString,
  getRangeMonths,
  removeTime,
  toFormat12h,
} from '../utils/convertTime.js'
import { CustomError } from '../utils/CustomError.js'

//Ruta api/reportes/tarde?supervisor=
//Descripcion Devuelve las entradas tardes de los empleados
export const obtenerReportesTarde = async (req, res, next) => {
  let transaction = await db.transaction()
  try {
    let { supervisor } = req.query
    let { mesInicial, mesFinal } = req.body
    let [fechaInicio, fechaFinal] = getRangeMonths(mesInicial, mesFinal)
    let reportes = await db('marcaje as m')
      .transacting(transaction)
      .select(
        'm.idempleado',
        'nombre',
        'apellido',
        'departamento',
        'distrito',
        'latitud',
        'longitud',
        db.raw('date(fecha) as fecha'),
        'e.horaentrada as hora_asignada',
        db.raw('m.fecha::time as hora_entrada')
      )
      .innerJoin('empleados as e', 'e.idempleado', 'm.idempleado')
      .whereBetween('fecha', [fechaInicio, fechaFinal])
      .andWhere((b) => {
        b.where('tipo', 'entrada').andWhere(
          db.raw('cast(m.fecha as time) > cast(e.horaentrada as time)')
        )
      })
      .andWhere('status', 'alta')
      .modify((m) => {
        if (supervisor) {
          m.andWhere('idsupervisor', supervisor)
        }
      })
      .orderBy('m.idempleado')

    reportes = reportes.map((reporte) => {
      return {
        ...reporte,
        fecha: removeTime(reporte.fecha),
        hora_asignada: toFormat12h(reporte.hora_asignada),
        hora_entrada: toFormat12h(reporte.hora_entrada),
      }
    })

    transaction.commit()
    res.json(reportes)
  } catch (error) {
    transaction.rollback()
    next(error)
  }
}

//Ruta api/reportes/incompleto?supervisor=
//Descripcion Devuelve las marcas incompletas de los usuarios
export const obtenerReportesIncompletos = async (req, res, next) => {
  let transaction = await db.transaction()
  try {
    let { supervisor } = req.query
    let { mesInicial, mesFinal } = req.body
    let [fechaInicio, fechaFinal] = getRangeMonths(mesInicial, mesFinal)
    let reportes = await db('marcas_empleados as me')
      .transacting(transaction)
      .with(
        'marcas_empleados',
        db('marcaje as m')
          .transacting(transaction)
          .select(
            'm.idempleado as idempleado',
            db.raw(`array_agg(
              json_build_object(
                "tipo", "fecha",
                'latitud', "latitud",
                'longitud', "longitud"
              ) 
              ) as marcas`)
          )
          .whereBetween('fecha', [fechaInicio, fechaFinal])
          .groupBy('m.idempleado', db.raw('date(fecha)'))
          .orderBy('m.idempleado')
      )
      .select(
        'me.idempleado',
        'nombre',
        'apellido',
        'departamento',
        'distrito',
        'marcas[1]'
      )
      .innerJoin('empleados as e', 'e.idempleado', 'me.idempleado')
      .where(db.raw(`array_length(marcas, 1) < 2 `))
      .modify((m) => {
        if (supervisor) {
          m.andWhere('e.idsupervisor', supervisor)
        }
      })

    reportes = reportes.map((reporte) => {
      let { entrada, latitud, longitud } = reporte.marcas
      delete reporte.marcas
      return {
        ...reporte,
        fecha: removeTime(entrada),
        entrada: toFormat12h(dateToTimeString(entrada)),
        salida: 'N/A',
        latitud,
        longitud,
      }
    })

    transaction.commit()
    res.json(reportes)
  } catch (error) {
    transaction.rollback()
    next(error)
  }
}

//Ruta api/reportes/asistencias
//Descripcion Devuelve las asistencias de los empleados
export const obtenerReportesAsistencias = async (req, res, next) => {
  let transaction = await db.transaction()
  try {
    let { supervisor } = req.query
    let { mesInicial, mesFinal } = req.body
    let [fechaInicio, fechaFinal] = getRangeMonths(mesInicial, mesFinal)
    let reportes = await db('marcaje as m')
      .transacting(transaction)
      .select(
        'm.idempleado',
        'nombre',
        'apellido',
        'departamento',
        'distrito',
        db.raw('date(fecha) as fecha'),
        db.raw(`json_agg(
        json_build_object(
          "tipo", json_build_object( 'hora', "fecha"::time, 'latitud', "latitud", 'longitud', "longitud" )
          ) 
        ) as marcas`)
      )
      .innerJoin('empleados as e', 'e.idempleado', 'm.idempleado')
      .whereBetween('fecha', [fechaInicio, fechaFinal])
      .modify((m) => {
        if (supervisor) {
          m.andWhere('idsupervisor', supervisor)
        }
      })
      .groupBy(
        'm.idempleado',
        db.raw('date(fecha)'),
        'nombre',
        'apellido',
        'departamento',
        'distrito'
      )
      .orderBy('idempleado')
    reportes = reportes.map((reporte) => {
      let marcas = {}
      for (let marca of reporte.marcas) {
        if (marca.entrada) {
          marcas['entrada'] = {
            hora: toFormat12h(marca.entrada.hora),
            latitud: marca.entrada.latitud,
            longitud: marca.entrada.longitud,
          }
        } else if (marca.salida) {
          marcas['salida'] = {
            hora: toFormat12h(marca.salida.hora),
            latitud: marca.salida.latitud,
            longitud: marca.salida.longitud,
          }
        }
      }
      return {
        ...reporte,
        fecha: removeTime(reporte.fecha),
        marcas,
      }
    })
    transaction.commit()
    res.json(reportes)
  } catch (error) {
    transaction.rollback()
    next(error)
  }
}

//Ruta /api/reportes/disponible
//Descripcion Devuelve los años disponibles para reporte
export const obtenerFechasDisponible = async (_req, res, next) => {
  let transaction = await db.transaction()
  try {
    let years = await db('marcaje')
      .transacting(transaction)
      .select(db.raw('extract (year from fecha)::integer as fecha'))
      .groupBy(db.raw('extract (year from fecha)'))
    if (years.length < 1) {
      throw new CustomError('No existen años disponibles', 404)
    }
    transaction.commit()
    res.json(years)
  } catch (error) {
    transaction.rollback()
    next(error)
  }
}
