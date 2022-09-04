import { db } from '../db/db.js'
import { getToday, toLocale } from '../utils/convertTime.js'
import { CustomError } from '../utils/CustomError.js'

//Ruta /api/marcaje POST
//Descripcion agrega una marca de empleado
//Body
/*
{ 
  idempleado: string,
  lat: float,
  lon: float,
  tipo: boolean, true para entrada, false para salida
}
*/
export const marcarEmpleado = async (req, res, next) => {
  try {
    let { idempleado, lat, lon, tipo } = req.body
    tipo = tipo ? 'entrada' : 'salida'
    //El rango de tiempo para validar si ya se marco, desde 'hoy' en la mañana hasta la noche
    let [fecha, fechaInicio, fechaFinal] = getToday()
    let transaction = await db.transaction()
    let marcas = await db('marcaje')
      .transacting(transaction)
      .select('tipo')
      .where({ idempleado: idempleado })
      .andWhereBetween('fecha', [
        fechaInicio.toLocaleString('en-US', {
          timeZone: 'America/Tegucigalpa',
        }),
        fechaFinal.toLocaleString('en-US', { timeZone: 'America/Tegucigalpa' }),
      ])
    if (marcas.length > 0) {
      marcas = marcas.map((marca) => marca.tipo)
      if (marcas.includes(tipo)) {
        throw new CustomError(`Ya ha marcado su ${tipo} hoy`, 409)
      }
    } else if (marcas.length <= 0 && tipo === 'salida') {
      throw new CustomError(`Aun no ha marcado entrada`, 401)
    }
    let [marcaje] = await db('marcaje')
      .transacting(transaction)
      .insert(
        {
          idempleado,
          fecha: fecha.toLocaleString('en-US', {
            timeZone: 'America/Tegucigalpa',
          }),
          tipo,
          latitud: lat,
          longitud: lon,
          google_url: `https://www.google.com/maps/@${lat},${lon}`,
        },
        [
          'idmarca',
          'idempleado',
          'fecha',
          'tipo',
          'latitud',
          'longitud',
          'google_url',
        ]
      )
    transaction.commit()
    marcaje = {
      ...marcaje,
      fecha: toLocale(marcaje.fecha),
    }
    res.json(marcaje)
  } catch (error) {
    next(error)
  }
}

//Ruta api/marcaje/:correo?tipo=boolean GET
//Descripcion Devuelve true si el empleado ya marco
export const validarMarca = async (req, res, next) => {
  try {
    const { correo } = req.params
    let { tipo } = req.query || true
    tipo = tipo === 'true' ? 'entrada' : 'salida'
    let [_, fechaInicio, fechaFinal] = getToday()
    let transaction = await db.transaction()
    let marcas = await db('empleados')
      .transacting(transaction)
      .select('marcaje.tipo')
      .innerJoin('marcaje', 'empleados.idempleado', 'marcaje.idempleado')
      .where({ correo: correo, tipo: tipo })
      .andWhereBetween('fecha', [toLocale(fechaInicio), toLocale(fechaFinal)])
    let marca = marcas.find((m) => m.tipo === tipo)
    transaction.commit()
    res.json({ marcado: !marca ? false : true })
  } catch (error) {
    next(error)
  }
}
