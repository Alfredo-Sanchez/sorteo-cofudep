


const parar = document.getElementById('parar')
const iniciar = document.getElementById('iniciar')
const numeros = document.getElementById('numeros')
let num = 1;
let interval;

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
        interval = setInterval(actualizarNumero, 10)
})

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
        .then(json => console.log(json))
}

parar.addEventListener('click', ()=>{
        clearInterval(interval)
        var resp = getRandomInt(2,100)
        numeros.textContent = resp;
        getWinner(resp);
})


    

    