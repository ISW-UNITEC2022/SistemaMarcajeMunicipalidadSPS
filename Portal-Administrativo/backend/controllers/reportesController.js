import { db } from '../db/db.js'
//import { CustomError } from '../utils/CustomError.js'
import {
  dateToTimeString,
  getRangeDates,
  getToday,
  removeTime,
  toFormat12h,
} from '../utils/convertTime.js'

//Ruta api/reportes/tarde?supervisor=
//Descripcion Devuelve las entradas tardes de los empleados
export const obtenerReportesTarde = async (req, res, next) => {
  let transaction = await db.transaction()
  try {
    let { supervisor } = req.query
    let [fechaInicio, fechaFinal] = getRangeDates(16)
    let reportes = await db('marcaje as m')
      .transacting(transaction)
      .select(
        'm.idempleado',
        'nombre',
        'apellido',
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
    let [fechaInicio, fechaFinal] = getRangeDates(16)
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
                "tipo", "fecha"
              ) 
              ) as marcas`)
          )
          .whereBetween('fecha', [fechaInicio, fechaFinal])
          .groupBy('m.idempleado', db.raw('date(fecha)'))
          .orderBy('m.idempleado')
      )
      .select('me.idempleado', 'nombre', 'apellido', 'marcas[1]')
      .innerJoin('empleados as e', 'e.idempleado', 'me.idempleado')
      .where(db.raw(`array_length(marcas, 1) < 2 `))
      .modify((m) => {
        if (supervisor) {
          m.andWhere('e.idsupervisor', supervisor)
        }
      })

    reportes = reportes.map((reporte) => {
      let entrada = reporte.marcas.entrada
      delete reporte.marcas
      return {
        ...reporte,
        fecha: removeTime(entrada),
        entrada: toFormat12h(dateToTimeString(entrada)),
        salida: 'N/A',
      }
    })

    transaction.commit()
    res.json(reportes)
  } catch (error) {
    transaction.rollback()
    next(error)
  }
}
