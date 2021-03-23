const controller = {}
const path = require('path')

// DATABASE CONECTION
const pool = require('./database')

controller.winners = (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../public/ganadores.html'))
}

controller.getWinners = async (req, res) =>{
    // res.send('El socio ganador es: ' + req.params.id)
    try {
        const response = await pool.query('SELECT * FROM v_participantes')
        if (response.rows.length  !== 0) res.send(response.rows)
        else res.json({"message": "Aún no hay ganadores"})
    } catch (error) {
        console.log(`error es : ${error}`)
    }
}

module.exports = controller