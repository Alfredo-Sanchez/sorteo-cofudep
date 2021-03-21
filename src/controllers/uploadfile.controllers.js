
const controller = {}
const path = require('path')

// DATABASE CONECTION
const pool = require('./database')


controller.file = (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../../public/uploadfile.html'))
}

controller.uploadFile = async (req, res)=>{
    try {
        await pool.query("DELETE FROM participantes");
        await pool.query(`copy public.participantes (part_orden, soc_nro, soc_nombre, soc_ganador, soc_gan_desc) FROM '${path.join(__dirname, '../../uploads/sorteo.csv')}' DELIMITER ';' CSV HEADER ENCODING 'LATIN1'`);
        res.json({"message": "Lista de participantes creada en la bases de datos."})
    } catch (error) {
        console.log(`el error es : ${error}`)
    }

}

module.exports = controller;