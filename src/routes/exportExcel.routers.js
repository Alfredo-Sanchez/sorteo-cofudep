
const { Router } = require('express');
const router = Router();
const path  = require('path')

//CONTROLLERS
const exportUsersToExcel = require('../controllers/exportExcel.controllers');

//ROUTES
router.get('/excelWinners', (req, res)=>{
    const users = [
        {
            id: 1,
            name: 'Peter',
            age: 25
        },
        {
            id: 2,
            name: 'Juan',
            age: 27
        },
        {
            id: 1,
            name: 'Alfredo',
            age: 22
        }
    
    ];
    
    const workSheetColumnNames = [
        'ID',
        'Name',
        'Age'
    ];
    
    const workSheetName = 'users';
    const filePath = path.join(__dirname, '../../ouputFiles/excel-from-js.xlsx');
    
    exportUsersToExcel(users,workSheetColumnNames, workSheetName, filePath )

    res.send({
        message: 'Excel exported'
    })
})

module.exports = router