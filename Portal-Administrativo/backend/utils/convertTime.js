import { CustomError } from './CustomError.js'

//Extrae la hora en 24hrs de un objeto Date y lo convierte en un string
export const dateToTimeString = (dataD) => {
  let data = new Date(dataD)
  let hrs = data.getHours()
  let mins = data.getMinutes()
  if (hrs <= 9) hrs = '0' + hrs
  if (mins < 10) mins = '0' + mins
  const postTime = hrs + ':' + mins
  return postTime
}

//Convierte un string en la forma 00:00tm de 12hrs a 24hrs
export const objectToTimeString = (time) => {
  let [hora, minuto] = time.hora.split(':')
  hora = parseInt(hora)
  minuto = parseInt(minuto)
  if (time.tiempo.toLowerCase() === 'pm') {
    hora += 12
  }
  if (hora <= 9) hora = '0' + hora
  if (minuto < 10) minuto = '0' + minuto
  return hora + ':' + minuto
}

//Convierte un string en la forma 00:00 de 24hrs a 12hrs
export const toFormat12h = (horaEn24h) => {
  let [hora, minuto] = horaEn24h.split(':')
  hora = parseInt(hora)
  minuto = parseInt(minuto)
  let tiempo = 'am'
  if (hora > 12) {
    hora -= 12
    tiempo = 'pm'
  }
  if (hora <= 9) hora = '0' + hora
  if (minuto < 10) minuto = '0' + minuto
  return hora + ':' + minuto + tiempo
}

//Devuelve tres fechas equivalentes al dia en el sistema o a la fecha enviada por parametro
// fecha: un Date equivalente al momento actual o a la fecha enviada por parametro
// fechaInicio: un Date equivalente al mismo dia que fecha pero con la hora 00:00
// fechaFinal: un Date equivalente al mismo dia que fecha pero con la hora 23:59
export const getToday = (date = undefined) => {
  //La fecha actual
  let fecha = date ? new Date(date) : new Date()
  let fechaInicio = new Date(fecha)
  //La fechaInicio con horas de la primera hora del dia
  fechaInicio.setHours(0)
  fechaInicio.setMinutes(0)
  fechaInicio.setSeconds(0)
  let fechaFinal = new Date(fecha)
  //La fechaFinal con horas de la ultima hora del dia
  fechaFinal.setHours(23)
  fechaFinal.setMinutes(59)
  fechaFinal.setSeconds(0)
  return [fecha, fechaInicio, fechaFinal]
}

//Convierte un objeto Date a un string en el timezone especificado
export const toLocale = (date) => {
  return date.toLocaleString('es-HN', {
    timeZone: 'America/Tegucigalpa',
  })
}

//Devuelve un string unicamente con la fecha de un objeto Date
export const removeTime = (dateObject) => {
  let date = new Date(dateObject)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

//Devuelve un rango de fechas desde el momento actual hasta la cantidad de dias especificadas en el parametro
//fechaInicio: un Date con la hora 00:00 que comienza ciertos dias antes de hoy
//fechaInicio: un Date del dia actual con la hora 23:59
export const getRangeDates = (days) => {
  let fechaInicio = new Date()
  fechaInicio.setHours(0)
  fechaInicio.setMinutes(0)
  fechaInicio.setSeconds(0)
  //Restar los dias especificados a la fecha actual
  fechaInicio.setDate(fechaInicio.getDate() - days)
  let fechaFinal = new Date()
  fechaFinal.setHours(23)
  fechaFinal.setMinutes(59)
  fechaFinal.setSeconds(0)
  return [fechaInicio, fechaFinal]
}

//Devuelve un rango de fechas, del primer dia del mes al ultimo dia del mes especificado
export const getRangeMonth = (month) => {
  if (month > 12 || month < 1) {
    throw CustomError('El rango del mes es incorrecto')
  }
  month = month - 1
  let fecha = new Date()
  let fechaInicio = new Date(fecha.getFullYear(), month, 1)
  fechaInicio.setHours(0)
  fechaInicio.setMinutes(0)
  fechaInicio.setSeconds(0)
  //La fechaFinal
  let fechaFinal = new Date(fecha.getFullYear(), month + 1, 0)
  fechaFinal.setDate(fechaFinal.getDate() - 1)
  fechaFinal.setHours(23)
  fechaFinal.setMinutes(59)
  fechaFinal.setSeconds(0)
  return [fechaInicio, fechaFinal]
}

//Devuelve un rango de fechas desde el primer dia del primer mes hasta el ultimo dia del segundo mes
export const getRangeMonths = (rangoInicial, rangoFinal) => {
  let { month: firstMonth, year: firstYear } = rangoInicial
  let { month: lastMonth, year: lastYear } = rangoFinal
  if (firstMonth > 12 || firstMonth < 1) {
    throw new CustomError('El mes inicial es incorrecto')
  } else if (lastMonth < 1 || lastMonth > 12) {
    throw new CustomError('El mes final es incorrecto')
  }
  firstMonth -= 1
  let fechaInicio = new Date(firstYear, firstMonth, 1)
  fechaInicio.setHours(0)
  fechaInicio.setMinutes(0)
  fechaInicio.setSeconds(0)
  let fechaFinal = new Date(lastYear, lastMonth, 1)
  fechaFinal.setHours(23)
  fechaFinal.setMinutes(59)
  fechaFinal.setSeconds(0)
  fechaFinal.setDate(fechaFinal.getDate() - 1)
  return [fechaInicio, fechaFinal]
}
