export function timeConverter(UNIX_Date) {
  const date = new Date(UNIX_Date * 1000)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  minutes = (minutes < 10) ? '0' + minutes : minutes
  hours = (hours < 10) ? '0' + hours : hours
  const dateTime = `${hours}:${minutes}`
  return dateTime
}
export function dateConverter(UNIX_Date) {
  const date = new Date(UNIX_Date * 1000)
  const month = date.toLocaleString('en', {month: 'long'})
  const day = date.getDate()
  const fullDate = `${day} ${month}`
  return fullDate
}