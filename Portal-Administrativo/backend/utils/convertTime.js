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
