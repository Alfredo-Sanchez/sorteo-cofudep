const fileInput = document.getElementById('fileupload')
const dropZone = document.getElementById('drop-zone')
const dropZoneText = document.getElementById('drop-zone-text')

dropZone.addEventListener('click', ()=> fileInput.click())

dropZone.addEventListener('dragover', (e)=>{
    e.preventDefault()
    dropZone.classList.add('drop-zone--active')
    dropZoneText.textContent = 'Ahora sueltalo aquí'
})

dropZone.addEventListener('dragleave', (e)=>{
    e.preventDefault()
    dropZone.classList.remove('drop-zone--active')
    dropZoneText.textContent = 'Arrastre o haga click para alzar el archivo'
})

dropZone.addEventListener('drop', (e)=>{
    e.preventDefault()
    // console.log(e.dataTransfer) 
    dropZoneText.textContent = '¡¡ Archivo cargado. !!'
    fileInput.files = e.dataTransfer.files
})

