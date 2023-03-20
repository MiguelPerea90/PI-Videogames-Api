const PORT = process.env.PORT || 3001


const DB_USER = process.env.DB_USER || 'postgres'
const DB_PASSWORD = process.env.DB_PASSWORD || 2017
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || 5432
const DB_NAME = process.env.DB_NAME || 'videogames'

module.exports = { PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME }

