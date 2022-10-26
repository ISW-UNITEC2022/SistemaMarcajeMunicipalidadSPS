import { db } from '../db/db.js'
//import { CustomError } from '../utils/CustomError.js'
import { getRangeDates, getToday, toFormat12h } from '../utils/convertTime.js'

//Ruta api/reportes/tarde?supervisor=
//Descripcion Devuelve las entradas tardes de los empleados
export const obtenerReportesTarde = async (req, res, next) => {
  let transaction = await db.transaction()
  try {
    let { supervisor } = req.query
    let [fechaInicio, fechaFinal] = getRangeDates(16)
    let [_, hoyInicio, hoyFinal] = getToday()
    console.log(`rango: ${fechaInicio} -> ${fechaFinal}`)
    console.log(`hoy: ${hoyInicio} -> ${hoyFinal}`)
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
          m.where('idsupervisor', supervisor)
        }
      })
      .orderBy('m.idempleado')

    reportes = reportes.map((reporte) => {
      return {
        ...reporte,
        fecha: reporte.fecha.toLocaleDateString(),
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
