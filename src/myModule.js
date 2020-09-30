// Exportar solo como nombre
// Default export - sin nombnre , solo uno

const message = 'Algun mensaje desde myModule'

const name ="Pedro"

const location = "New York"

const getGreating = (name) => {
  return `Welcome to the course ${name}`
}

export { message, name, getGreating, location as default }