const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: '1945',
    database: 'guestbook',
    host: 'localhost',
    port: '5432',
})

module.exports = pool
