// получение возраста по дате рождения
// из строки вида "dd.mm.yyyy"
const getAge = function(date) {
  let dateString = date.slice(3, 6) + date.slice(0, 3) + date.slice(6)
  let today = new Date()
  let birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  let month = today.getMonth() - birthDate.getMonth()
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

// capitalize для строк

const capitalize = function(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

// сведение массива фильтрующих функций в одну функцию
const combineFilters = function(filters) {
  return function filterWithReduce(x) {
    return filters.reduce((prev, current) => prev && current(x), true)
  }
}

export { getAge, capitalize, combineFilters }
