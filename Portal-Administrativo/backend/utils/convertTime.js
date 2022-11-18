import { CustomError } from './CustomError.js'

export const dateToTimeString = (dataD) => {
  let data = new Date(dataD)
  let hrs = data.getHours()
  let mins = data.getMinutes()
  if (hrs <= 9) hrs = '0' + hrs
  if (mins < 10) mins = '0' + mins
  const postTime = hrs + ':' + mins
  return postTime
}

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

export const getToday = (date = undefined) => {
  let fecha = date ? new Date(date) : new Date()
  let fechaInicio = new Date(fecha)
  fechaInicio.setHours(0)
  fechaInicio.setMinutes(0)
  fechaInicio.setSeconds(0)
  let fechaFinal = new Date(fecha)
  fechaFinal.setHours(23)
  fechaFinal.setMinutes(59)
  fechaFinal.setSeconds(0)
  return [fecha, fechaInicio, fechaFinal]
}

export const toLocale = (date) => {
  return date.toLocaleString('es-HN', {
    timeZone: 'America/Tegucigalpa',
  })
}

export const removeTime = (dateObject) => {
  let date = new Date(dateObject)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const getRangeDates = (days) => {
  let fechaInicio = new Date()
  fechaInicio.setHours(0)
  fechaInicio.setMinutes(0)
  fechaInicio.setSeconds(0)
  fechaInicio.setDate(fechaInicio.getDate() - days)
  let fechaFinal = new Date()
  fechaFinal.setHours(23)
  fechaFinal.setMinutes(59)
  fechaFinal.setSeconds(0)
  return [fechaInicio, fechaFinal]
}

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
  let fechaFinal = new Date(fecha.getFullYear(), month + 1, 0)
  fechaFinal.setDate(fechaFinal.getDate() - 1)
  fechaFinal.setHours(23)
  fechaFinal.setMinutes(59)
  fechaFinal.setSeconds(0)
  return [fechaInicio, fechaFinal]
}

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
