



const parar = document.getElementById('parar')
const iniciar = document.getElementById('iniciar')
const numeros = document.getElementById('numeros')
const winnerList = document.getElementById('winnersList')

let num = 1;
let interval;
let avaible = false;
let participants;

//numero aleatorio
let resp = 0;

//modals
const modalAwards = document.getElementById('winnerAwards')
const modalAwardsClose = document.getElementById('modalAdwardsClose')

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
        await fetch('http://localhost:4000/participants')
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

const getWinner = (winnerData)=>{
        // debugger
        console.log(`winner from function getWinner ${winnerData.winner}`)

        fetch(`http://localhost:4000/winner/${winnerData.winner}`, {
                method: 'PUT',
                body: JSON.stringify(winnerData),
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
        // debugger
        if(avaible){
                clearInterval(interval)
                resp = getRandomInt(2,participants)
                numeros.textContent = resp;
                modalAwards.classList.add('modal--show')
        }
        avaible = false
})

modalAwardsClose.addEventListener('click', (e)=>{
        if(e.target.classList.contains('modal__submit')) {
            
                const award = document.getElementById('modalInput').value.trim()
                if( award !== ""){
                        const winnerData = {
                                winner: resp,
                                awards: award
                        }
                        console.log(winnerData)
                       getWinner(winnerData)
                       winnerData.winner = 0;
                       winnerData.awards = ""
                       console.log(winnerData)
                        modalAwards.classList.remove('modal--show')
                }
        }
})




    

    