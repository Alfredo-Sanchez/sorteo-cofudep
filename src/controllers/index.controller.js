const controller = {}
const { response } = require('express')
const path = require('path')
const { Pool } = require('pg')
const { pid } = require('process')

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

controller.updateWinner = async (req, res)=>{
    try {
        const response = await pool.query("UPDATE participantes SET soc_ganador = $1, soc_gan_desc = $2 where part_orden = $3",
        [ 'si', 'Gano...', req.params.id])

        if (response.rowCount !== 0){
            // console.log(response)
            // res.json("competitor updated successfully")
            const winner = await pool.query("SELECT * FROM participantes WHERE part_orden = $1", [req.params.id]);
            res.send(winner.rows)
            res.status(200)
        }else{
            res.json("competitor does not exits")
        }
    } catch (error) {
        console.log(`error es : ${error}`)
    }

}

controller.winners = async (req, res) =>{
    // res.send('El socio ganador es: ' + req.params.id)
    try {
        const response = await pool.query('SELECT * FROM participantes WHERE part_orden = $1', [req.params.id])
        if (response.rows.length  !== 0) res.send(response.rows)
        else res.json("Este participante no existe")
    } catch (error) {
        console.log(`error es : ${error}`)
    }
    
    
}

module.exports = controller
