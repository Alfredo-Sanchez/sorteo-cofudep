


const parar = document.getElementById('parar')
const iniciar = document.getElementById('iniciar')
const numeros = document.getElementById('numeros')
const winnerList = document.getElementById('winnersList')
let num = 1;
let interval;
let avaible = false;

const actualizarNumero =  () => {
    var mili = new Date();
    var num = mili.getMilliseconds();
    
        numeros.textContent = num;
}

// actualizarNumero()
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

iniciar.addEventListener('click', ()=>{
        interval = setInterval(actualizarNumero, 10);
        avaible = true;
})

const renderWinner = (win)=>{
        const data = JSON.parse(win)
        sessionStorage.setItem('orden', data[0].part_orden)
        sessionStorage.setItem('socio', data[0].soc_nombre)
        sessionStorage.setItem('ganancia', data[0].soc_gan_desc)
        const newElement = document.createElement('LI')
              newElement.textContent = `${sessionStorage.getItem('orden')} - ${sessionStorage.getItem('socio')}: ${sessionStorage.getItem('ganancia')}.-`
              newElement.setAttribute('class', 'winner__items')
        winnerList.append(newElement)     
}

const getWinner = async (winner)=>{
        // console.log(`winner from function getWinner ${winner}`)

        fetch(`http://localhost:3000/winner/${winner}`, {
                method: 'PUT',
                body: JSON.stringify(),
                headers: {
                        "Content-type": "aplication/json"
                }
        })
        .then(response => response.json())
        .then((data) => {
                console.log(data);
                renderWinner(JSON.stringify(data));
        })
}

parar.addEventListener('click', ()=>{
        if(avaible){
                clearInterval(interval)
                var resp = getRandomInt(2,100)
                numeros.textContent = resp;
                getWinner(resp);
        }
        avaible = false
})


    

    