const { Pool } = require('pg')

const config = process.env.NODE_ENV === 'production'
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
    : {
        user: 'postgres',
        password: '1945',
        database: 'guestbook',
        host: 'localhost',
        port: '5432',
    }

const pool = new Pool(config)

module.exports = pool
