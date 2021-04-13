



const parar = document.getElementById('parar')
const iniciar = document.getElementById('iniciar')
const numeros = document.getElementById('numeros')
const winnerList = document.getElementById('winnersList')

let num = 1;
let interval;
let avaible = false;
let participants;

//modals
const modal = document.getElementById('winnerExists')
const modalText = document.getElementById('modalText')
const modalClose = document.getElementById('modalClose')

modal.addEventListener('click', (e)=>{
    if(e.target.classList.contains('modal')) modal.classList.remove('modal--show')
    numeros.textContent = '000'
})

modalClose.addEventListener('click', (e)=>{
        if(e.target.classList.contains('modal__submit')) modal.classList.remove('modal--show')
})

const actualizarNumero =  () => {
    var mili = new Date();
    var num = mili.getMilliseconds();
    
        numeros.textContent = num;
}

// actualizarNumero()
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

iniciar.addEventListener('click', async ()=>{
        await fetch('http://192.168.1.19:4000/participants')
         .then(response => response.json())
         .then((participant) =>{
                 participants = participant
         })

        interval = setInterval(actualizarNumero, 10);
        avaible = true;
})

const renderWinner = (win)=>{
        const data = JSON.parse(win)
        // console.log(data.hasOwnProperty('message'))
        if(!data.hasOwnProperty('message')){
                sessionStorage.setItem('orden', data[0].part_orden)
                sessionStorage.setItem('socio', data[0].soc_nombre)
                sessionStorage.setItem('ganancia', data[0].soc_gan_desc)
                const newElement = document.createElement('LI')
                      newElement.textContent = `${sessionStorage.getItem('orden')} - ${sessionStorage.getItem('socio')}: ${sessionStorage.getItem('ganancia')}.-`
                      newElement.setAttribute('class', 'winner__items')
                winnerList.append(newElement)     
        }else{
                modalText.textContent = `${data.message}`
                modal.classList.add('modal--show')
        }
                
}

const getWinner = (winner)=>{
        // console.log(`winner from function getWinner ${winner}`)

        fetch(`http://192.168.1.19:4000/winner/${winner}`, {
                method: 'PUT',
                body: JSON.stringify(),
                headers: {
                        "Content-type": "application/json"
                }
        })
        .then(response => response.json())
        .then((data) => {
                // console.log(data);
                renderWinner(JSON.stringify(data));
        })
}

parar.addEventListener('click',()=>{
       
        if(avaible){
                clearInterval(interval)
                var resp = getRandomInt(2,participants)
                numeros.textContent = resp;
                getWinner(resp);
        }
        avaible = false
})


    

    