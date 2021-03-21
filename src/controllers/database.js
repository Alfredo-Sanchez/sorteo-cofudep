const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123',
    database: 'sorteos',
    port: '5432'
})

module.exports = pool