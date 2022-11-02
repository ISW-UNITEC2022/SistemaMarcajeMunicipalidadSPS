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
  let transaction = await db.transaction()
  try {
    let { idempleado, lat, lon, tipo } = req.body
    tipo = tipo ? 'entrada' : 'salida'
    //El rango de tiempo para validar si ya se marco, desde 'hoy' en la mañana hasta la noche
    let [fecha, fechaInicio, fechaFinal] = getToday()
    let marcas = await db('marcaje')
      .transacting(transaction)
      .select('tipo')
      .where({ idempleado: idempleado })
      .andWhereBetween('fecha', [fechaInicio, fechaFinal])
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
          fecha,
          tipo,
          latitud: lat,
          longitud: lon,
          google_url: `https://www.google.com/maps/place/15%C2%B031'37.5%22N+87%C2%B059'17.7%22W/@${lat},${lon}z`,
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
    marcaje = {
      ...marcaje,
      fecha: toLocale(marcaje.fecha),
    }
    transaction.commit()
    res.json(marcaje)
  } catch (error) {
    transaction.rollback()
    next(error)
  }
}

//Ruta api/marcaje/:correo?tipo=boolean GET
//Descripcion Devuelve true si el empleado ya marco
export const validarMarca = async (req, res, next) => {
  let transaction = await db.transaction()
  try {
    const { correo } = req.params
    let { tipo } = req.query || true
    tipo = tipo === 'true' ? 'entrada' : 'salida'
    let [_, fechaInicio, fechaFinal] = getToday()
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
    transaction.rollback()
    next(error)
  }
}
