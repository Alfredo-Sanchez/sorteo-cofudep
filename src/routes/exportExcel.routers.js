
const { Router } = require('express');
const router = Router();
const path  = require('path')

//DATABASE CONECTION
const pool = require('../controllers/database')

//CONTROLLERS
const exportUsersToExcel = require('../controllers/exportExcel.controllers');

//ROUTES
router.get('/excelWinners', async (req, res)=>{

    let winners;
    try {
        const response = await pool.query('SELECT * FROM v_participantes')
        if (response.rows.length  !== 0){
            winners = [...response.rows];
            const workSheetColumnNames = [
                'Orden',
                'Socio numero',
                'Nombre y Apellido',
                'Ganador',
                'Descripcion'
            ];
            
            const workSheetName = 'Ganadores';
            const filePath = path.join(__dirname, '../../ouputFiles/excel-from-js.xlsx');
            
            exportUsersToExcel(winners,workSheetColumnNames, workSheetName, filePath );
        
            res.send({ message: 'Excel exported' }) 
        } 
        else res.json({"error": "Aún no hay ganadores"})
    } catch (error) {
        console.log(`error es : ${error}`)
    }
    
    

})

module.exports = router