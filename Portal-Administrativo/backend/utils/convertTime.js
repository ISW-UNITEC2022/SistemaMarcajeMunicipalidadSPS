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

export const getToday = () => {
  let fecha = new Date()
  let fechaInicio = new Date()
  fechaInicio.setHours(0)
  fechaInicio.setMinutes(0)
  fechaInicio.setSeconds(0)
  let fechaFinal = new Date()
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
