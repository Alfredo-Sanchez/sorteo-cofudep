const controller = {}
const path = require('path')

// DATABASE CONECTION
const pool = require('./database')

controller.index =  (req, res)=>{
    // res.send('la conexion ha sido sastifactoria desde controllers')
    res.sendFile(path.resolve(__dirname, '../../public/index.html'))
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
    console.log(req.body)
    const {winner, awards} =req.body
    try {
       const winnerValidated = await pool.query('SELECT * FROM participantes WHERE part_orden = $1', [req.body.winner])
        // res.send(winnerValidated.rows[0].soc_ganador)
        if(winnerValidated.rows[0].soc_ganador !== "si"){
            try {
                const response = await pool.query("UPDATE participantes SET soc_ganador = $1, soc_gan_desc = $2 where part_orden = $3",
                [ 'si', awards, winner])

                if (response.rowCount !== 0){
                    // res.json("competitor updated successfully")
                    const winner = await pool.query("SELECT * FROM participantes WHERE part_orden = $1", [req.body.winner]);
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

module.exports = controller
