const controller = {}
const { response } = require('express')
const path = require('path')
const { Pool } = require('pg')
const { pid } = require('process')
const { pathToFileURL } = require('url')
const { measureMemory } = require('vm')


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

controller.file = (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../public/uploadfile.html'))
}

controller.uploadFile = async (req, res)=>{
    await pool.query("DELETE FROM participantes");
    await pool.query("copy public.participantes (part_orden, soc_nro, soc_nombre, soc_ganador, soc_gan_desc) FROM 'C:/Users/DELL/Documents/ejercicios_programacion/sorteo-cofudep/uploads/sorteo.csv' DELIMITER ';' CSV HEADER ENCODING 'LATIN1'");
    res.json({"message": "Lista de participantes creada en la bases de datos."})
}

controller.getParticipants = async (req, res)=> {
    try {
       const response = await pool.query('SELECT COUNT(part_orden) FROM participantes');
       res.send(response.rows[0].count)
    } catch (error) {
        console.log(`error es: ${error}`)
    }
}

controller.updateWinner = async (req, res)=>{
    try {
       const winnerValidated = await pool.query('SELECT * FROM participantes WHERE part_orden = $1', [req.params.id])
        // res.send(winnerValidated.rows[0].soc_ganador)
        if(winnerValidated.rows[0].soc_ganador !== "si"){
            try {
                const response = await pool.query("UPDATE participantes SET soc_ganador = $1, soc_gan_desc = $2 where part_orden = $3",
                [ 'si', 'Ganador de Gs. 1.000.000', req.params.id])

                if (response.rowCount !== 0){
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
        }else{
            let win = winnerValidated.rows[0].part_orden;
            res.json({"message": "Participante número " + win + " ya ha ganado."})
        }
    } catch (error) {
        console.log(`error es: ${error}`)
    }
}

controller.getWinners = async (req, res) =>{
    // res.send('El socio ganador es: ' + req.params.id)
    try {
        const response = await pool.query('SELECT * FROM participantes WHERE soc_ganador = $1', ['si'])
        if (response.rows.length  !== 0) res.send(response.rows)
        else res.json({"message": "Aún no hay ganadores"})
    } catch (error) {
        console.log(`error es : ${error}`)
    }
}

controller.winners = (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../public/ganadores.html'))
}

module.exports = controller
