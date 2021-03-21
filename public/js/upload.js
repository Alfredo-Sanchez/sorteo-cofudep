const fileInput = document.getElementById('fileupload')
const dropZone = document.getElementById('drop-zone')
const dropZoneText = document.getElementById('drop-zone-text')
const form = document.getElementById('form')
const popUp  = document.getElementById('pop-up')

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

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    fetch('http://localhost:3000/uploadfile',{
        method: 'POST', 
        body: JSON.stringify(),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then((data) => {
        // console.log(data.message);
        popUp.classList.add('popup--show')
        dropZone.classList.remove('drop-zone--active')
        dropZoneText.textContent = 'Arrastre o haga click para alzar el archivo'
    })

    setTimeout(() => {
        popUp.classList.remove('popup--show')
    }, 5000);
})
