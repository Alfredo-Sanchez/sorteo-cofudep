const xlsx = require('xlsx');
const path = require('path')

const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) =>{
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ...data
    ];
    
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));
}

const exportUsersToExcel = (winners, workSheetColumnNames, workSheetName, filePath)=>{
    const data = winners.map(winner =>{
        return [winner.part_orden, winner.soc_nro, winner.soc_nombre, winner.soc_ganador, winner.soc_gan_desc];
    });

    exportExcel(data, workSheetColumnNames, workSheetName, filePath)
}

module.exports = exportUsersToExcel;