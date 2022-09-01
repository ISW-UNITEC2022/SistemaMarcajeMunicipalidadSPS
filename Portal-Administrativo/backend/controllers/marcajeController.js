import { db } from '../db/db.js'
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
    let fecha = new Date()
    //El rango de tiempo para validar si ya se marco, desde 'hoy' en la mañana hasta la noche
    let fechaInicio = new Date(fecha)
    fechaInicio.setHours(0, 0, 0)
    let fechaFinal = new Date(fecha)
    fechaFinal.setHours(12, 59, 0)
    let transaction = await db.transaction()
    let marcajeRepetido = await db('marcaje')
      .transacting(transaction)
      .select('tipo')
      .where({ idempleado: idempleado })
      .andWhereBetween('fecha', [
        fechaInicio.toLocaleString('en-US', {
          timeZone: 'America/Tegucigalpa',
        }),
        fechaFinal.toLocaleString('en-US', { timeZone: 'America/Tegucigalpa' }),
      ])
    if (marcajeRepetido.length > 0) {
      let marcas = marcajeRepetido.map((marca) => marca.tipo)
      if (marcas.includes(tipo)) {
        throw new CustomError(`Ya ha marcado su ${tipo} hoy`, 409)
      }
    } else if (marcajeRepetido.length <= 0 && tipo === 'salida') {
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
      fecha: marcaje.fecha.toLocaleString('en-US', {
        timeZone: 'America/Tegucigalpa',
      }),
    }
    res.json(marcaje)
  } catch (error) {
    next(error)
  }
}
