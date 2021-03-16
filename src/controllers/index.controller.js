const controller = {}
const path = require('path')
const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'sorteos',
    port: '5432'
})

controller.index =  (req, res)=>{
    // res.send('la conexion ha sido sastifactoria desde controllers')
    res.sendFile(path.resolve(__dirname, '../../public/index.html'))
}

controller.ganador = async (req, res) =>{
    // res.send('El socio ganador es: ' + req.params.id)
    const response = await pool.query('SELECT * FROM participantes WHERE part_orden = $1', [req.params.id])
    res.json(response.rows)
}

module.exports = controller