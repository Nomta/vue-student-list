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

const combineFilters = function(filters) {
  return function filterWithReduce(x) {
    return filters.reduce((prev, current) => prev && current(x), true)
  }
}

export { getAge, combineFilters }
